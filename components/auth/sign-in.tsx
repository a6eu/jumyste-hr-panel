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
import { useTranslation } from 'react-i18next'

const SignIn = () => {
    const { t } = useTranslation()
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
                .email(t('errors.emailInvalid'))
                .required(t('errors.required')),
            password: Yup.string()
                .min(6, t('errors.passwordMin'))
                .required(t('errors.required')),
        }),
        onSubmit: async (values) => {
            await dispatch(signIn(values))
        },
    })

    const handleShowPassword = () => setShowPassword(!showPassword)

    return (
        <div className="flex flex-col flex-1 self-center">
            <Image
                className="self-center"
                priority={true}
                src={Logo}
                alt="Logo"
            />
            <h1 className="text-2xl mt-20">{t('login.welcome')}</h1>
            <p>{t('login.description')}</p>
            <form
                className="flex flex-col space-y-4 mt-8"
                onSubmit={formik.handleSubmit}
            >
                <div>
                    <input
                        className="h-12 rounded-xl border border-[#9F9F9F] px-4 w-full"
                        type="text"
                        name="email"
                        autoComplete="email"
                        placeholder={t('login.email')}
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
                        autoComplete="current-password"
                        placeholder={t('login.password')}
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
                    {t('login.forgotPassword')}
                </Link>

                <button
                    type="submit"
                    className={cn(
                        'rounded-xl text-white h-12',
                        !loading ? 'bg-button' : 'bg-button/50'
                    )}
                    disabled={loading}
                >
                    {!loading ? t('login.button') : t('loading')}
                </button>

                <span className="self-center">
                    {t('login.noAccount')}
                    <Link href="/auth?reg=false" className="text-primary ml-3">
                        {t('login.register')}
                    </Link>
                </span>
            </form>
        </div>
    )
}

export default SignIn
