'use client'

import { Editor } from '@tiptap/react'
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    List,
    ListOrdered,
    Sparkles,
    Strikethrough,
    Upload,
} from 'lucide-react'

interface ToolBarProps {
    editor: Editor | null
}

export function ToolBar({ editor }: ToolBarProps) {
    if (!editor) return null

    const addImage = () => {
        const url = window.prompt('Enter Image URL:')
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    const Options = [
        {
            icon: <Heading1 className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
            active: editor.isActive('heading', { level: 1 }),
        },
        {
            icon: <Heading2 className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
            active: editor.isActive('heading', { level: 2 }),
        },
        {
            icon: <Heading3 className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 3 }).run(),
            active: editor.isActive('heading', { level: 3 }),
        },
        {
            icon: <Bold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            active: editor.isActive('bold'),
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            active: editor.isActive('italic'),
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            active: editor.isActive('strike'),
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign('left').run(),
            active: editor.isActive({ textAlign: 'left' }),
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign('center').run(),
            active: editor.isActive({ textAlign: 'center' }),
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign('right').run(),
            active: editor.isActive({ textAlign: 'right' }),
        },
        {
            icon: <List className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            active: editor.isActive('bulletList'),
        },
        {
            icon: <ListOrdered className="size-4" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            active: editor.isActive('orderedList'),
        },
        {
            icon: <Code className="size-4" />,
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
            active: editor.isActive('codeBlock'),
        },
        {
            icon: <Highlighter className="size-4" />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            active: editor.isActive('highlight'),
        },
        {
            icon: <Upload className="size-4" />,
            onClick: addImage,
            active: false,
        },
    ]

    const logSelectedText = () => {
        const { state } = editor
        const { from, to } = state.selection
        const selectedText = editor.state.doc.textBetween(from, to, ' ')
        console.log('Selected text:', selectedText)
    }

    return (
        <div className="border rounded-t-md p-1.5 bg-primaryBlocks/30 sticky top-10 flex flex-wrap gap-1">
            {Options.map((option, i) => (
                <button
                    type="button"
                    key={i}
                    onClick={option.onClick}
                    className={`p-2 rounded-md border bg-white hover:bg-gray-200 transition ${
                        option.active
                            ? 'bg-gray-300 border-gray-500'
                            : 'border-gray-300'
                    }`}
                >
                    {option.icon}
                </button>
            ))}
            {/* AI Button */}
            <button
                type="button"
                onClick={logSelectedText}
                className="p-2 rounded-md border bg-white hover:bg-gray-200 transition border-gray-300"
            >
                <Sparkles className="size-4" />
            </button>
        </div>
    )
}
