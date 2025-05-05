import React from 'react'

interface SelectButtonProps {
    children: string
    value: string
    onClick: React.MouseEventHandler<HTMLButtonElement>
    isActive?: boolean
}

export const SelectButton = ({ value, children, onClick, isActive = false }: SelectButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-5 py-2 border rounded-lg text-nowrap ${
                isActive
                    ? 'border-[#8B5DFF] bg-[#F0EAFF] text-black'
                    : 'border-gray-300 bg-gray text-black'
            }`}
        >
            {children}
        </button>
    )
}