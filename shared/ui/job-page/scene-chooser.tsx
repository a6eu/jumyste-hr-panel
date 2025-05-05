'use client'

import { BookOpenTextIcon, UserIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams, useRouter } from 'next/navigation'
import { cn } from '@/shared/utils'

const scenes = [
    {
        key: 'description',
        title: {
            kz: 'Jumys turaly',
            ru: 'Описание вакансии',
            en: 'Job Description',
        },
        icon: <BookOpenTextIcon className="shrink-0" size={25} />,
    },
    {
        key: 'candidates',
        title: {
            kz: 'Kandidattar',
            ru: 'Кандидаты',
            en: 'Candidates',
        },
        icon: <UserIcon className="shrink-0" size={25} />,
    },
]

export const SceneChooser = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { i18n } = useTranslation()

    const initialScene = searchParams.get('scene') || 'candidates'
    const [activeScene, setActiveScene] = useState(initialScene)

    useEffect(() => {
        const scene = searchParams.get('scene')
        if (scene && scene !== activeScene) {
            setActiveScene(scene)
        }
    }, [searchParams])

    const handleSceneChange = (scene: string) => {
        setActiveScene(scene)
        const params = new URLSearchParams(searchParams)
        params.set('scene', scene)
        router.push(`?${params.toString()}`)
    }

    return (
        <div className="flex gap-20 px-2 lg:px-24 font-semibold h-14 border-[3px] border-t-0 border-r-0 border-l-0 border-b-midGray text-midGray">
            {scenes.map((scene) => (
                <button
                    key={scene.key}
                    className={cn(
                        'flex justify-center gap-1.5 items-center w-56 relative text-nowrap',
                        activeScene === scene.key && 'text-primaryBlocks'
                    )}
                    onClick={() => handleSceneChange(scene.key)}
                >
                    {scene.icon}
                    {scene.title[i18n.language as 'kz' | 'ru' | 'en'] || scene.title.en}
                    <div
                        className={cn(
                            'bg-primaryBlocks h-1 w-full absolute -bottom-[3.7px] rounded-full hidden',
                            activeScene === scene.key && 'flex'
                        )}
                    />
                </button>
            ))}
        </div>
    )
}
