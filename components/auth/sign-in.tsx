'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'
import Logo from '@/public/logo-text.svg'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useAppDispatch } from '@/store/store'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { signIn } from '@/store/auth/authSlice'
import { useState } from 'react'
import { cn } from '@/lib/twmerge'

const SignIn = () => {
    const dispatch = useAppDispatch()
    const { loading } = useSelector((state: RootState) => state.auth)
    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Некорректный email')
                .required('Обязательное поле'),
            password: Yup.string()
                .min(6, 'Минимум 6 символов')
                .required('Обязательное поле'),
        }),
        onSubmit: (values) => {
            console.log('Submitting:', values)

            dispatch(signIn(values))
        },
    })

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="flex flex-col flex-1 self-center">
            <Image className="self-center" src={Logo} alt="Logo" />
            <h1 className="text-2xl mt-20">С возвращением!</h1>
            <p>Войдите в свой аккаунт.</p>
            <form
                className="flex flex-col space-y-4 mt-8"
                onSubmit={formik.handleSubmit}
            >
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

                <Link
                    href="/auth/forgot-password"
                    className="text-primary self-end cursor-pointer"
                >
                    Забыли пароль?
                </Link>
                <button
                    type="submit"
                    className={cn(
                        'rounded-xl text-white h-12',
                        !loading ? 'bg-button' : 'bg-button/50'
                    )}
                    disabled={loading}
                >
                    {!loading ? 'Войти' : 'Подождите...'}
                </button>

                <span className="self-center">
                    Нет аккаунта?
                    <Link href="/auth?reg=false" className="text-primary ml-3">
                        Зарегистрируйтесь
                    </Link>
                </span>
            </form>
        </div>
    )
}

export default SignIn
