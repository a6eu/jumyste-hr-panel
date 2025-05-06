import { SearchIcon } from 'lucide-react'
import React, { ChangeEvent } from 'react'
import { cn } from '@/shared/utils'

interface SearchInputProps extends React.HTMLProps<HTMLInputElement> {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput = ({ onChange, ...props }: SearchInputProps) => {
    return (
        <div className={cn('relative w-full', props.className)}>
            <div
                className="bg-primaryBlocks rounded-full absolute size-9 top-1/2 -translate-y-1/2 left-[17px] flex items-center justify-center">
                <SearchIcon color="white" size={20} />
            </div>
            <input className="w-full rounded-2xl border h-full pl-16 bg-transparent" type="text" placeholder={props.placeholder} onChange={onChange} />
        </div>
    )
}