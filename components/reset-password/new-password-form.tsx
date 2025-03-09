'use client'

import { useToast } from '@/hooks/use-toast'
import $api from '@/http/setup'
import { useFormik } from 'formik'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import * as Yup from 'yup'

const ResetPasswordForm = ({
    code,
    email,
}: {
    code: string
    email: string
}) => {
    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = () => setShowPassword(!showPassword)
    const { showToast } = useToast()

    const formik = useFormik({
        initialValues: { password: '', confirmPassword: '' },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Минимум 8 символов')
                .required('Обязательное поле'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
                .required('Обязательное поле'),
        }),
        onSubmit: (values) => {
            $api.post('/api/auth/reset-password', {
                email: email,
                reset_code: code,
                new_password: values.password,
                confirm_password: values.confirmPassword,
            })
                .then((r) => {
                    console.log(r.data)
                    showToast('success', 'Пароль был сброшен!')
                    setTimeout(() => {
                        window.location.href = '/auth?reg=true'
                    }, 1000)
                })
                .catch((err) => {
                    console.error(err.data)
                    showToast('error', 'Ошибка! Попробуйте еще раз, но позже')
                })
        },
    })

    return (
        <>
            <h1 className="text-3xl mt-20 mb-4">Сброс пароля</h1>
            <p>
                Придумайте новый пароль и введите его дважды для подтверждения
            </p>
            <form className="flex flex-col mt-8" onSubmit={formik.handleSubmit}>
                <div className="relative">
                    <input
                        className="h-12 rounded-xl border border-gray-400 px-4 w-full"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Пароль"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {showPassword ? (
                        <EyeOff
                            onClick={toggleShowPassword}
                            className="absolute right-3 top-3 cursor-pointer"
                        />
                    ) : (
                        <Eye
                            onClick={toggleShowPassword}
                            className="absolute right-3 top-3 cursor-pointer"
                        />
                    )}
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-white bg-red-500 px-5 py-2 mt-2 rounded-md text-sm w-max">
                            {formik.errors.password}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <input
                        className="h-12 rounded-xl border border-gray-400 px-4 w-full"
                        type="password"
                        name="confirmPassword"
                        placeholder="Подтвердите пароль"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                    />
                    {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                            <p className="text-white bg-red-500 px-5 py-2 mt-2 rounded-md text-sm w-max">
                                {formik.errors.confirmPassword}
                            </p>
                        )}
                </div>

                <button
                    type="submit"
                    className="rounded-xl text-white h-12 bg-button mt-14"
                >
                    Сохранить пароль
                </button>
            </form>
        </>
    )
}

export default ResetPasswordForm
