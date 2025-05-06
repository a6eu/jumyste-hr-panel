'use client'

import * as Yup from 'yup'
import React, { useState } from 'react'
import { useAppDispatch, useToast } from '@/shared/hooks'
import { useFormik } from 'formik'
import { postJob } from '@/entities/jobs/model/jobsSlice'
import Slider from '@mui/material/Slider'
import { useTranslation } from 'react-i18next'
import { RichTextEditor } from '@/shared/widgets/tiptap-editor'
import { Types } from '@/entities/jobs/model/types'
import { Input, Label, Radio, Select, SelectButton } from '@/shared/ui'
import $api from '@/http/setup'
import { Loader2 } from 'lucide-react'

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

export const skillsOptions = [
    // Frontend
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'React', label: 'React' },
    { value: 'Angular', label: 'Angular' },
    { value: 'Vue.js', label: 'Vue.js' },

    // Backend
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Express.js', label: 'Express.js' },
    { value: 'Python', label: 'Python' },
    { value: 'Django', label: 'Django' },
    { value: 'Flask', label: 'Flask' },
    { value: 'PHP', label: 'PHP' },
    { value: 'Laravel', label: 'Laravel' },
    { value: 'Java', label: 'Java' },
    { value: 'Spring', label: 'Spring' },
    { value: 'C#', label: 'C#' },
    { value: '.NET', label: '.NET' },
    { value: 'Go', label: 'Go' },
    { value: 'Ruby', label: 'Ruby' },
    { value: 'Ruby on Rails', label: 'Ruby on Rails' },

    // Mobile
    { value: 'Swift', label: 'Swift' },
    { value: 'Kotlin', label: 'Kotlin' },
    { value: 'React Native', label: 'React Native' },
    { value: 'Flutter', label: 'Flutter' },

    // DevOps
    { value: 'Docker', label: 'Docker' },
    { value: 'Kubernetes', label: 'Kubernetes' },
    { value: 'GitLab CI/CD', label: 'GitLab CI/CD' },
    { value: 'Jenkins', label: 'Jenkins' },
    { value: 'Terraform', label: 'Terraform' },
    { value: 'Ansible', label: 'Ansible' },

    // Databases
    { value: 'PostgreSQL', label: 'PostgreSQL' },
    { value: 'MySQL', label: 'MySQL' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'Redis', label: 'Redis' },
    { value: 'Oracle', label: 'Oracle' },
    { value: 'Microsoft SQL Server', label: 'Microsoft SQL Server' },
    { value: 'SQLite', label: 'SQLite' },

    // Cloud
    { value: 'AWS', label: 'AWS' },
    { value: 'Azure', label: 'Azure' },
    { value: 'Google Cloud', label: 'Google Cloud' },
    { value: 'Yandex Cloud', label: 'Yandex Cloud' },

    // Testing
    { value: 'Jest', label: 'Jest' },
    { value: 'Mocha', label: 'Mocha' },
    { value: 'Selenium', label: 'Selenium' },
    { value: 'Cypress', label: 'Cypress' },

    // Tools
    { value: 'Git', label: 'Git' },
    { value: 'Jira', label: 'Jira' },
    { value: 'Figma', label: 'Figma' },
    { value: 'Postman', label: 'Postman' },

    // Analytics / Data Science
    { value: 'SQL', label: 'SQL' },
    { value: 'Pandas', label: 'Pandas' },
    { value: 'NumPy', label: 'NumPy' },
    { value: 'TensorFlow', label: 'TensorFlow' },
    { value: 'Keras', label: 'Keras' },
    { value: 'Scikit-learn', label: 'Scikit-learn' },

    // Security
    { value: 'OAuth 2.0', label: 'OAuth 2.0' },
    { value: 'JWT', label: 'JWT' },
    { value: 'SAML', label: 'SAML' },
]

const JobCreateForm = () => {
    const [hideSalary, setHideSalary] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const { showToast } = useToast()

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
                .then(() => {
                    showToast('success', 'Job created successfully.')
                })
                .catch(() => {
                    showToast('error', 'Something went wrong')
                })
        },
    })

    const jobTypeArray = t('jobForm.jobType.array', { returnObjects: true }) as Types[] | []
    const workFormatArray = t('jobForm.workFormat.array', { returnObjects: true }) as Types[] | []
    const experienceArray = t('jobForm.experience.array', { returnObjects: true }) as Types[] ?? []

    const jobTypeOptions = Array.isArray(jobTypeArray) ? jobTypeArray : []
    const workFormatOptions = Array.isArray(workFormatArray) ? workFormatArray : []
    const experienceOptions = Array.isArray(experienceArray) ? experienceArray : []

    const generateDescription = async () => {
        setIsGenerating(true)
        try {
            const response = await $api.post('vacancies/generate-description', {
                title: formik.values.jobTitle,
                employment_type: formik.values.employmentType,
                work_format: formik.values.workFormat,
                experience: formik.values.experience,
                location: formik.values.location,
                salary_min: formik.values.salary[0],
                salary_max: formik.values.salary[1],
                skills: formik.values.skills,
            })

            await formik.setFieldValue('description', response.data.description)
            console.log(response.data.description)
            showToast('success', 'Описание вакансии сгенерировано!')
        } catch (error) {
            showToast('error', 'Ошибка при генерации описания.')
            console.error(error)
        } finally {
            setIsGenerating(false)
        }
    }


    return <form className="lg:px-24 px-4 py-14">
        <div className="flex flex-col gap-2 mb-6">
            <Label htmlFor="name">{t('jobForm.companyName.title')}</Label>
            <Input
                onChange={formik.handleChange}
                name="jobTitle"
                type="text"
                placeholder={t('jobForm.companyName.placeholder')}
                value={formik.values.jobTitle}
            />
            {formik.touched.jobTitle && formik.errors.jobTitle && (
                <div className="text-red-500 text-sm">
                    {formik.errors.jobTitle}
                </div>
            )}
        </div>

        <div className="flex flex-col gap-2 mb-6">
            <Label htmlFor="employmentType">{t('jobForm.jobType.title')}</Label>
            <div className="flex flex-wrap gap-4">
                {jobTypeOptions.map((type) => (
                    <SelectButton
                        key={type.value}
                        value={type.value}
                        onClick={() =>
                            formik.setFieldValue('employmentType', type.value)
                        }
                        isActive={formik.values.employmentType === type.value}
                    >
                        {type.label}
                    </SelectButton>
                ))}
            </div>
            {formik.touched.employmentType &&
                formik.errors.employmentType && (
                    <div className="text-red-500 text-sm">
                        {formik.errors.employmentType}
                    </div>
                )
            }
        </div>

        <div className="flex flex-col gap-2 mb-6">
            <Label htmlFor="workFormat">{t('jobForm.workFormat.title')}</Label>
            <div className="flex flex-wrap gap-4">
                {workFormatOptions.map((type) => (
                    <SelectButton
                        key={type.value}
                        value={type.value}
                        onClick={() =>
                            formik.setFieldValue('workFormat', type.value)
                        }
                        isActive={formik.values.workFormat === type.value}
                    >
                        {type.label}
                    </SelectButton>
                ))}
            </div>
            {formik.touched.workFormat && formik.errors.workFormat && (
                <div className="text-red-500 text-sm">
                    {formik.errors.workFormat}
                </div>
            )}
        </div>

        <div className="flex flex-col gap-2 mb-6">
            <Label>{t('jobForm.experience.title')}</Label>
            <div className="flex flex-col gap-2 mb-6">
                {experienceOptions.map(
                    (exp) => (
                        <Radio
                            key={exp.value}
                            name="experience"
                            value={exp.value}
                            label={exp.label}
                            selected={formik.values.experience === exp.value}
                            onChange={formik.handleChange}
                        />
                    ),
                )}
            </div>
            {formik.touched.experience && formik.errors.experience && (
                <div className="text-red-500 text-sm">
                    {formik.errors.experience}
                </div>
            )}
        </div>
        <h3 className="text-lg mb-2">{t('jobForm.salary.title')}</h3>
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
            {t('jobForm.salary.checkbox')}
        </label>

        <div className="flex flex-col gap-2 mb-6">
            <Label htmlFor="location">{t('jobForm.location.title')}</Label>
            <Select
                defaultValue=""
                options={[
                    { label: 'Almaty', value: 'Almaty' },
                    { label: 'Astana', value: 'Astana' },
                ]}
                placeholder="Select a city"
                onChangeAction={(option) => formik.setFieldValue('location', option)}
                value={formik.values.location}
            />

            {formik.touched.location && formik.errors.location && (
                <div className="text-red-500 text-sm">
                    {formik.errors.location}
                </div>
            )}
        </div>

        <div className="flex flex-col gap-2 mb-6">
            <Label htmlFor="skills">{t('jobForm.skills.title')}</Label>
            <Select
                isMulti
                options={skillsOptions}
                onChangeAction={(selected) => formik.setFieldValue('skills', selected)}
                value={formik.values.skills} placeholder={'Select skills'}
            />

            {formik.touched.skills && formik.errors.skills && (
                <div className="text-red-500 text-sm">
                    {formik.errors.skills}
                </div>
            )}
        </div>
        <div className="flex flex-col gap-2 mb-6">
            <Label htmlFor="jobDescription">
                {t('jobForm.jobDescription')}
            </Label>
            <div className="max-w-xl space-y-2">
                <RichTextEditor
                    key={formik.values.description}
                    content={formik.values.description}
                    onUpdate={({ editor }) =>
                        formik.setFieldValue('description', editor.getHTML())
                    }
                />

                <button
                    type="button"
                    className="max-w-52 bg-button px-3 py-2.5 rounded text-white flex items-center justify-center gap-2"
                    onClick={generateDescription}
                    disabled={isGenerating}
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Generating...
                        </>
                    ) : (
                        'Generate job description'
                    )}
                </button>
            </div>
            {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm">
                    {formik.errors.description}
                </div>
            )}
        </div>
        <button
            onClick={(e) => {
                e.preventDefault()
                formik.handleSubmit()
            }}
            type="button"
            className="px-4 py-2 bg-primaryBlocks text-white rounded-md mt-5"
        >
            {t('jobForm.submit')}
        </button>
    </form>

}

export default JobCreateForm
