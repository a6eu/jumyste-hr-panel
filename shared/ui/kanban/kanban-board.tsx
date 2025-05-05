'use client'

import { CandidateCard } from '@/shared/ui/kanban'
import React, { useEffect, useState } from 'react'
import { cn } from '@/shared/utils'
import { ICandidate } from '@/types/user'
import $api from '@/http/setup'

interface KanbanBoardProps {
    id: string
}

const columns = [
    { id: 'new', label: 'New', color: '#FFCC00' },
    { id: 'invited', label: 'Invite', color: '#007AFF' },
    { id: 'interview', label: 'Interview', color: '#AF52DE' },
    { id: 'accepted', label: 'Accepted', color: '#34C759' },
    { id: 'rejected', label: 'Rejected', color: '#FF3B30' },
]

export const KanbanBoard = ({ id }: KanbanBoardProps) => {
    const [cards, setCards] = useState<ICandidate[]>([])

    useEffect(() => {
        $api.get('jobs/' + id)
            .then(r => {
                const transformed = r.data.map((candidate: any) => ({
                    ...candidate,
                    column: candidate.status,
                    id: candidate.id.toString(),
                }))
                setCards(transformed)
            })
            .catch(e => console.error(e))
    }, [id])


    console.log(cards)

    return (
        <div className="flex items-start gap-5 p-2.5 overflow-scroll">
            {columns.map((column) => (
                <Column key={column.id} column={column} cards={cards} setCards={setCards} />
            ))}
        </div>
    )
}

interface ColumnProps {
    cards: ICandidate[]
    setCards: (cards: ICandidate[]) => void
    column: {
        id: string
        label: string
        color: string
    }
}

const Column = ({ column, cards, setCards }: ColumnProps) => {
    const [active, setActive] = useState(false)

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setActive(true)
    }

    const handleDragLeave = () => {
        setActive(false)
    }

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        const cardId = e.dataTransfer.getData('cardId')
        setActive(false)

        let copy = [...cards]
        let cardToTransfer = copy.find((c) => c.id === cardId)
        if (!cardToTransfer) return

        const newStatus = column.id

        try {
            await $api.put(`jobs/${cardId}/status/${newStatus}`)
            cardToTransfer = { ...cardToTransfer, column: newStatus }
            copy = copy.filter((c) => c.id !== cardId)
            copy.push(cardToTransfer)
            setCards(copy)
        } catch (error) {
            console.error('Failed to update status:', error)
        }
    }

    return (
        <div
            id={column.id}

            className="flex flex-col gap-2"
        >
            <div
                className="w-52 rounded-lg px-2 h-6 flex justify-between items-center text-[#696969] font-semibold text-sm"
                style={{ backgroundColor: `${column.color}33` }}
            >
                {column.label}
                <div
                    className="w-8 h-3.5 flex justify-center items-center text-white leading-none rounded-lg"
                    style={{ backgroundColor: column.color }}
                >
                    {
                        cards.filter((card) => card.column === column.id).length
                    }
                </div>
            </div>

            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                className={cn('flex flex-col gap-3 min-h-72 border-2 border-transparent border-dashed rounded-lg w-52', active && 'border-dashed border-primaryBlocks opacity-40')}
            >
                {cards
                    ? cards.filter((card) => card.column === column.id)
                    .map((card) => (
                        <CandidateCard key={card.id} candidate={card} />
                    ))
                    : null
                }
            </div>
        </div>
    )
}