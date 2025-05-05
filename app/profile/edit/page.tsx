'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, User } from 'lucide-react'
import Image from 'next/image'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { updateUser } from '@/entities/profile/model/userSlice'

const EditProfilePage = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { user } = useAppSelector((state) => state.user)

    const formik = useFormik({
        initialValues: {
            name: user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : '',
            position: user?.position || '',
            phone: user?.phone || '',
            linkedin: user?.linkedin || '',
            github: user?.github || '',
            telegram: user?.telegram || '',
        },
        validationSchema: Yup.object({
            name: Yup.string(),
            position: Yup.string(),
            phone: Yup.string(),
        }),
        onSubmit: async (values) => {
            await dispatch(updateUser({ first_name: values.name.split(' ')[0] }))
        },
    })


    return (
        <div className="relative border-t-[3px]">
            <div
                onClick={() => router.replace('/profile')}
                className="absolute top-4 lg:top-6 left-5 lg:left-10 flex justify-center items-center border border-black rounded-full size-[50px] cursor-pointer"
            >
                <ArrowLeft />
            </div>

            <div className="px-4 lg:px-32 pt-20">
                <h1 className="lg:ml-8 font-semibold text-2xl">
                    Редактирование профиля
                </h1>

                <form onSubmit={formik.handleSubmit}>
                    <div
                        className="border border-[#E4E4E4] rounded-2xl p-6 mt-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-14">
                        <div className="relative">
                            <div className="bg-secondaryLight size-32 rounded-full flex justify-center items-center">
                                <User size={65} />
                            </div>
                            <div
                                className="bg-[#493D9E] size-[50px] rounded-full flex justify-center items-center absolute -bottom-2 right-0 cursor-pointer">
                                <Image
                                    src="/svg/camera.svg"
                                    alt=""
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 w-full">
                            <div className="flex flex-col w-full">
                                <label htmlFor="name">ФИО</label>
                                <input
                                    id="name"
                                    {...formik.getFieldProps('name')}
                                    className="border border-[#9F9F9F] rounded-[5px] pl-[14px] py-3 h-10 w-full"
                                    type="text"
                                    placeholder="Джон Смит Нурланович"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="position">Должность</label>
                                <input
                                    id="position"
                                    {...formik.getFieldProps('position')}
                                    className="border border-[#9F9F9F] rounded-[5px] pl-[14px] py-3 h-10 w-full"
                                    type="text"
                                    placeholder="HR Manager"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border border-[#E4E4E4] rounded-2xl p-8 mt-8">
                        <h2 className="font-semibold text-xl mb-4">Общая информация</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            {['phone', 'linkedin', 'github', 'telegram'].map((field) => (
                                <div key={field} className="flex flex-col">
                                    <label htmlFor={field}>
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <input
                                        id={field}
                                        {...formik.getFieldProps(field)}
                                        className="border border-[#9F9F9F] rounded-[5px] pl-[14px] py-3 h-10 w-full"
                                        type="text"
                                        placeholder={`${field}.com`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            type="submit"
                            className="bg-primaryBlocks text-white px-6 py-3 rounded-lg hover:opacity-80 transition"
                        >
                            Сохранить изменения
                        </button>

                        <button
                            type="button"
                            className="bg-[#D34343] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                        >
                            Удалить аккаунт
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfilePage
