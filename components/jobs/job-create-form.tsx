'use client'

import * as Yup from 'yup'
import { useState } from 'react'
import { useAppDispatch } from '@/redux/store'
import { useFormik } from 'formik'
import { postJob } from '@/redux/jobs/jobsSlice'
import Slider from '@mui/material/Slider'
import Select from 'react-select'
import Editor from '@/components/text-editor/text-editor'


const validationSchema = Yup.object({
    jobTitle: Yup.string().required('Введите название вакансии'),
    employmentType: Yup.string().required('Выберите тип занятости'),
    workFormat: Yup.string().required('Выберите формат работы'),
    experience: Yup.string().required('Выберите опыт работы'),
    salary: Yup.array().of(Yup.number()).min(2, 'Задайте диапазон зарплаты'),
    location: Yup.string().required('Выберите город'),
    skills: Yup.array().required('Введите основные навыки'),
    description: Yup.string().required('Введите описание вакансии'),
})


const skillsOptions = [
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'Python', label: 'Python' },
    { value: 'SQL', label: 'SQL' },
    { value: 'Docker', label: 'Docker' },
]


const JobCreateForm = () => {
    const [hideSalary, setHideSalary] = useState(false)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            jobTitle: '',
            employmentType: '',
            workFormat: '',
            experience: '',
            salary: [0, 350000],
            location: '',
            skills: [''],
            description: '',
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(
                postJob({
                    title: values.jobTitle,
                    employment_type: values.employmentType,
                    work_format: values.workFormat,
                    experience: values.experience,
                    salary_min: values.salary[0],
                    salary_max: values.salary[1],
                    location: values.location,
                    category: 'IT',
                    skills: values.skills,
                    description: values.description,
                }),
            )

        },
    })

    return <form className="lg:px-24 px-4 py-14">
        <h2 className="text-xl mb-2">Название вакансии</h2>
        <input
            type="text"
            name="jobTitle"
            placeholder="Введите название вакансии"
            className="w-full p-2 border rounded-md mb-1 max-w-72"
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
                ),
            )}
        </div>
        {formik.touched.experience && formik.errors.experience && (
            <div className="text-red-500 text-sm">
                {formik.errors.experience}
            </div>
        )}

        <h3 className="text-lg mb-2">Заработная плата</h3>
        <div className="flex flex-col gap-2 mb-6 max-w-sm">
            <div className="flex justify-between *:rounded">
                <input
                    type="number"
                    value={formik.values.salary[0]}
                    onChange={(e) =>
                        formik.setFieldValue('salary', [
                            +e.target.value,
                            formik.values.salary[1],
                        ])
                    }
                    className="border w-[111px] pl-2"
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
                    className="border w-[111px] pl-2"
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
        <Select
            className="max-w-72"
            name="location"
            defaultValue={{ label: 'Выберите город', value: '' }}
            onChange={(e) =>
                formik.setFieldValue('location', e?.value)
            }
            options={[
                { label: 'Almaty', value: 'Almaty' },
                { label: 'Astana', value: 'Astana' },
            ]}
        />
        {formik.touched.location && formik.errors.location && (
            <div className="text-red-500 text-sm">
                {formik.errors.location}
            </div>
        )}

        <h3 className="text-lg mb-2 mt-6">Основные навыки</h3>

        <Select
            isMulti
            name="skills"
            options={skillsOptions}
            className="basic-multi-select max-w-72 select-none"
            classNamePrefix="select"
            onChange={(selectedOptions) =>
                formik.setFieldValue(
                    'skills',
                    selectedOptions.map((option) => option.value),
                )
            }
            value={skillsOptions.filter((option) =>
                formik.values.skills.includes(option.value),
            )}
        />
        {formik.touched.skills && formik.errors.skills && (
            <div className="text-red-500 text-sm">
                {formik.errors.skills}
            </div>
        )}
        {/*
                        <button className="px-4 py-2 bg-primaryBlocks text-white text-nowrap rounded-md">
                            Сгенерировать описание с ИИ
                        </button>
                    */}

        <h3 className="text-lg mb-2 mt-6">Описание вакансии</h3>
        <Editor
            content={formik.values.description}
            onUpdate={({ editor }) =>
                formik.setFieldValue(
                    'description',
                    editor.getHTML(),
                )
            }
        />
        {formik.touched.description &&
            formik.errors.description && (
                <div className="text-red-500 text-sm">
                    {formik.errors.description}
                </div>
            )}

        <button
            onClick={(e) => {
                e.preventDefault()
                formik.handleSubmit()
            }}
            type="button"
            className="px-4 py-2 bg-primaryBlocks text-white rounded-md mt-5"
        >
            Опубликовать вакансию
        </button>
    </form>

}

export default JobCreateForm
