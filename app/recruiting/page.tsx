'use client'

import PageHeader from '@/components/page-header'
import { useEffect, useState } from 'react'
import * as React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Slider from '@mui/material/Slider'
import { useRouter } from 'next/navigation'
import ModalDialog from '@/components/dialogs/modal-dialog'

const validationSchema = Yup.object({
    jobTitle: Yup.string().required('Введите название вакансии'),
    employmentType: Yup.string().required('Выберите тип занятости'),
    workFormat: Yup.string().required('Выберите формат работы'),
    experience: Yup.string().required('Выберите опыт работы'),
    salary: Yup.array().of(Yup.number()).min(2, 'Задайте диапазон зарплаты'),
    location: Yup.string().required('Выберите город'),
    skills: Yup.string().required('Введите основные навыки'),
    description: Yup.string().required('Введите описание вакансии'),
})

const RecruitingPage = () => {
    const [hideSalary, setHideSalary] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pendingRoute, setPendingRoute] = useState<string | null>(null)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            jobTitle: '',
            employmentType: '',
            workFormat: '',
            experience: '',
            salary: [0, 350000],
            location: '',
            skills: '',
            description: '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('Form Data:', values)
        },
    })

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (formik.dirty) {
                event.preventDefault()
                event.returnValue = '' 
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [formik.dirty])

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (formik.dirty) {
                setPendingRoute(url)
                setIsModalOpen(true)
                throw 'Route change aborted'
            }
        }

        const originalPush = router.push
        router.push = (url: string) => {
            handleRouteChange(url)
        }

        return () => {
            router.push = originalPush
        }
    }, [formik.dirty, router])

    const handleLeave = () => {
        setIsModalOpen(false)
        if (pendingRoute) {
            router.push(pendingRoute) 
            setPendingRoute(null)
        }
    }

    return (
        <>
            <PageHeader />
            <div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="lg:px-24 px-4 py-14"
                >
                    <h2 className="text-xl mb-2">Название вакансии</h2>
                    <input
                        type="text"
                        name="jobTitle"
                        placeholder="Введите название вакансии"
                        className="w-full p-2 border rounded-md mb-1"
                        onChange={formik.handleChange}
                        value={formik.values.jobTitle}
                    />
                    {formik.touched.jobTitle && formik.errors.jobTitle && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.jobTitle}
                        </div>
                    )}

                    <h3 className="text-lg mb-2 mt-6">Тип занятости</h3>
                    <div className="flex flex-wrap gap-4">
                        {[
                            'Полная занятость',
                            'Частичная занятость',
                            'Фриланс',
                            'Стажировка',
                        ].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() =>
                                    formik.setFieldValue('employmentType', type)
                                }
                                className={`px-5 py-2 border rounded-lg text-nowrap ${
                                    formik.values.employmentType === type
                                        ? 'border-[#8B5DFF] bg-[#F0EAFF] text-black'
                                        : 'border-gray-300 bg-gray-100 text-black'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    {formik.touched.employmentType &&
                        formik.errors.employmentType && (
                            <div className="text-red-500 text-sm">
                                {formik.errors.employmentType}
                            </div>
                        )}

                    <h3 className="text-lg mb-2 mt-6">Формат работы</h3>
                    <div className="flex flex-wrap gap-4">
                        {['Офис', 'Гибрид', 'Удаленно'].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() =>
                                    formik.setFieldValue('workFormat', type)
                                }
                                className={`px-5 py-2 border rounded-lg text-nowrap ${
                                    formik.values.workFormat === type
                                        ? 'border-[#8B5DFF] bg-[#F0EAFF] text-black'
                                        : 'border-gray-300 bg-gray-100 text-black'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    {formik.touched.workFormat && formik.errors.workFormat && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.workFormat}
                        </div>
                    )}

                    <h3 className="text-lg mb-2 mt-6">Опыт работы</h3>
                    <div className="flex flex-col gap-2 mb-6">
                        {['Без опыта', '1-3 года', '5-6 лет', '7+ лет'].map(
                            (exp) => (
                                <label
                                    key={exp}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={exp}
                                        onChange={formik.handleChange}
                                        checked={
                                            formik.values.experience === exp
                                        }
                                    />
                                    {exp}
                                </label>
                            )
                        )}
                    </div>
                    {formik.touched.experience && formik.errors.experience && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.experience}
                        </div>
                    )}

                    <h3 className="text-lg mb-2">Заработная плата</h3>
                    <div className="flex flex-col gap-2 mb-6 max-w-sm">
                        <div className="flex justify-between">
                            <input
                                type="number"
                                value={formik.values.salary[0]}
                                onChange={(e) =>
                                    formik.setFieldValue('salary', [
                                        +e.target.value,
                                        formik.values.salary[1],
                                    ])
                                }
                                className="border w-[111px] px-5"
                            />
                            <input
                                type="number"
                                value={formik.values.salary[1]}
                                onChange={(e) =>
                                    formik.setFieldValue('salary', [
                                        formik.values.salary[0],
                                        +e.target.value,
                                    ])
                                }
                                className="border w-[111px] px-5"
                            />
                        </div>
                        <Slider
                            value={formik.values.salary}
                            onChange={(_, newValue) =>
                                formik.setFieldValue('salary', newValue)
                            }
                            valueLabelDisplay="auto"
                            min={0}
                            max={1000000}
                            step={1000}
                            sx={{ color: '#8B5DFF' }}
                        />
                    </div>
                    {formik.touched.salary && formik.errors.salary && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.salary}
                        </div>
                    )}

                    <label className="flex items-center gap-2 mb-6">
                        <input
                            type="checkbox"
                            checked={hideSalary}
                            onChange={() => setHideSalary(!hideSalary)}
                            className="w-4 h-4"
                        />
                        Не указывать зарплату
                    </label>

                    <h3 className="text-lg mb-2">Локация</h3>
                    <select
                        name="location"
                        className="w-full p-2 border rounded-md mb-1"
                        onChange={formik.handleChange}
                        value={formik.values.location}
                    >
                        <option value="">Выберите свой город</option>
                        <option value="Алматы">Алматы</option>
                        <option value="Астана">Астана</option>
                    </select>
                    {formik.touched.location && formik.errors.location && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.location}
                        </div>
                    )}

                    <h3 className="text-lg mb-2 mt-6">Основные навыки</h3>
                    <input
                        type="text"
                        name="skills"
                        placeholder="Введите основные навыки"
                        className="w-full p-2 border rounded-md mb-1"
                        onChange={formik.handleChange}
                        value={formik.values.skills}
                    />
                    {formik.touched.skills && formik.errors.skills && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.skills}
                        </div>
                    )}

                    <h3 className="text-lg mb-2 mt-6">Описание вакансии</h3>
                    <div className="flex flex-wrap items-start gap-7">
                        <textarea
                            name="description"
                            className="w-full max-w-[400px] p-2 border rounded-md mb-4"
                            rows={4}
                            placeholder="Введите описание вакансии"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        ></textarea>
                        <button className="px-4 py-2 bg-primaryBlocks text-white text-nowrap rounded-md">
                            Сгенерировать описание с ИИ
                        </button>
                    </div>
                    {formik.touched.description &&
                        formik.errors.description && (
                            <div className="text-red-500 text-sm">
                                {formik.errors.description}
                            </div>
                        )}

                    <button
                        type="submit"
                        className="px-4 py-2 bg-primaryBlocks text-white rounded-md mt-5"
                    >
                        Опубликовать вакансию
                    </button>
                </form>
            </div>

            {isModalOpen && (
                <ModalDialog
                    title="Уйти без сохранения?"
                    description="Если уйдете, то изменения не сохранятся"
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={handleLeave}
                />
            )}
        </>
    )
}

export default RecruitingPage
