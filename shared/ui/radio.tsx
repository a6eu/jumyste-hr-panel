import { ChangeEventHandler } from 'react'


export const Radio = ({ value, label, onChange, selected, name }: {
    value: string | number,
    label: string
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined,
    selected: boolean,
    name: string
}) => {
    return (
                <label key={value} className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        value={value}
                        checked={selected}
                        onChange={onChange}
                        className="hidden"
                    />
                    <div
                        className={`size-[22px] flex items-center justify-center border rounded-md ${
                            selected ? 'border-[#8B5DFF]' : 'border-gray-400'
                        }`}
                    >
                        {selected && <div className="size-2 bg-[#8B5DFF] rounded-full" />}
                    </div>
                    <span className="text-sm">{label}</span>
                </label>
    )
}
