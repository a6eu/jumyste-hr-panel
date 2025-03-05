import { X } from 'lucide-react'

const ModalDialog = ({
    title,
    description,
    onCancel,
    onConfirm,
}: {
    title: string
    description: string
    onCancel: () => void
    onConfirm: () => void
}) => {
    return (
        <div className="absolute w-full h-full bg-black/50 flex justify-center items-center overflow-hidden z-50">
            <div className="flex p-8 relative shadow-md bg-white flex-col rounded-xl gap-10">
                <button
                    onClick={onCancel}
                    className="bg-[#E5E5E5] flex justify-center items-center size-6 absolute top-2 right-2 rounded-full"
                >
                    <X size={13} />
                </button>
                <div className="flex gap-6">
                    <div className="bg-secondaryLight size-14 rounded-lg"></div>
                    <div className="flex flex-col justify-between">
                        <h1 className="text-xl font-semibold">{title}</h1>
                        <p className="text-sm text-black/75">{description}</p>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="w-[140px] h-12 rounded-lg border border-[#CCCCCC] flex justify-center items-center"
                    >
                        Остаться
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-[140px] rounded-lg h-12 border border-transparent text-white bg-primaryBlocks flex justify-center items-center"
                    >
                        Уйти
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalDialog
