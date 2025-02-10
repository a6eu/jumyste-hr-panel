'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'
import Logo from '@/public/logo-text.svg'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { RootState, useAppDispatch } from '@/store/store'
import { useSelector } from 'react-redux'
import { signUp } from '@/store/auth/authSlice'
import { useState } from 'react'
import { cn } from '@/lib/twmerge'

const SignUp = () => {
    const dispatch = useAppDispatch()
    const { loading, error } = useSelector((state: RootState) => state.auth)
    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Обязательное поле'),
            lastName: Yup.string().required('Обязательное поле'),
            email: Yup.string()
                .email('Проверьте правильность ввода email')
                .required('Обязательное поле'),
            password: Yup.string()
                .min(6, 'Минимум 6 символов')
                .required('Обязательное поле'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
                .min(6, 'Минимум 6 символов')
                .required('Обязательное поле'),
        }),
        onSubmit: (values) => {
            console.log('Submitting:', values)

            const userData = {
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                password: values.password,
            }

            dispatch(signUp(userData))

            if (error) {
                console.error(error)
            }
        },
    })

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="flex flex-col flex-1 self-center">
            <Image className="self-center" src={Logo} alt="Logo" />
            <h1 className="text-3xl mt-20">Закройте вакансии быстрее!</h1>
            <p>
                Регистрируйтесь и находите лучших кандидатов за считанные
                минуты.
            </p>
            <form
                className="flex flex-col space-y-4 mt-8"
                onSubmit={formik.handleSubmit}
            >
                <div className="flex flex-col sm:flex-row justify-between gap-2 h-min">
                    <div className="flex-1">
                        <input
                            className="min-h-12 rounded-xl border border-[#9F9F9F] px-4 w-full"
                            type="text"
                            name="firstName"
                            placeholder="Имя"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                        />
                        {formik.touched.firstName &&
                            formik.errors.firstName && (
                                <p className="text-white bg-red-500 px-5 py-2 mt-2 rounded-md text-sm w-max">
                                    {formik.errors.firstName}
                                </p>
                            )}
                    </div>

                    <div className="flex-1">
                        <input
                            className="min-h-12 rounded-xl border border-[#9F9F9F] px-4 flex-1 w-full"
                            type="text"
                            name="lastName"
                            placeholder="Фамилия"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                            <p className="text-white bg-red-500 px-5 py-2 mt-2 rounded-md text-sm w-max">
                                {formik.errors.lastName}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <input
                        className="h-12 rounded-xl border border-[#9F9F9F] px-4 w-full"
                        type="text"
                        name="email"
                        placeholder="Логин или Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-white bg-red-500 px-5 py-2 mt-2 rounded-md text-sm w-max">
                            {formik.errors.email}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <input
                        className="h-12 rounded-xl border border-[#9F9F9F] px-4 w-full"
                        type={!showPassword ? 'password' : 'text'}
                        name="password"
                        placeholder="Пароль"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />

                    {!showPassword ? (
                        <Eye
                            onClick={handleShowPassword}
                            color="#616161"
                            className="absolute right-3 top-3 cursor-pointer"
                        />
                    ) : (
                        <EyeOff
                            onClick={handleShowPassword}
                            color="#616161"
                            className="absolute right-3 top-3 cursor-pointer"
                        />
                    )}
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-white bg-red-500 px-5 py-2 mt-2 rounded-md text-sm w-max">
                            {formik.errors.password}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        className="h-12 rounded-xl border border-[#9F9F9F] px-4 w-full"
                        type={!showPassword ? 'password' : 'text'}
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
                    className={cn(
                        'rounded-xl text-white h-12',
                        !loading ? 'bg-button' : 'bg-button/50'
                    )}
                    disabled={loading}
                >
                    {!loading ? 'Зарегистрироваться' : 'Подождите...'}
                </button>

                <span className="self-center">
                    Уже есть аккаунт?
                    <Link href="/auth?reg=true" className="text-primary ml-3">
                        Войти
                    </Link>
                </span>
            </form>
        </div>
    )
}

export default SignUp
