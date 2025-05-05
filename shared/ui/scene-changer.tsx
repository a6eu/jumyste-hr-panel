'use client'

import { useState } from 'react'
import { cn } from '@/shared/utils'

const options = ['Чаты', 'Каналы', 'Черновики']

export const SceneChanger = () => {
    const [activeOption, setActiveOption] = useState(0)

    return (
        <div className="flex rounded-full h-10 bg-lightGray w-fit">
            {options.map((option, index) => (
                <div
                    key={index}
                    onClick={() => setActiveOption(index)}
                    className={cn('lg:px-12 px-4 rounded-full flex justify-center items-center cursor-pointer select-none font-medium text-lg',
                        activeOption === index ? 'bg-primaryBlocks text-white' : 'bg-transparent text-black',
                    )}
                >
                    {option}
                </div>
            ))}
        </div>
    )
}