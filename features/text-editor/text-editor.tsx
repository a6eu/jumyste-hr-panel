'use client'

import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { ToolBar } from './toolbar'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ImageResize from 'tiptap-extension-resize-image'

interface EditorProps {
    content: string
    onUpdate?: (props: { editor: Editor }) => void
    disabled?: boolean
}

export const RichTextEditor = ({ content, onUpdate }: EditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Heading.configure({
                levels: [1, 2, 3],
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: 'list-decimal ml-3',
                },
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: 'list-disc ml-3',
                },
            }),
            Highlight,
            Image,
            ImageResize,
        ],
        immediatelyRender: false,
        content: content,
        editorProps: {
            attributes: {
                class: 'min-h-[156px] border border-t-0 rounded-b-md bg-secondary/20 py-2 px-3',
            },
        },
        onUpdate: ({ editor }) => {
            console.log(editor.getHTML())
            onUpdate?.({ editor })
        },
    })

    return (
        <div>
            <ToolBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}
