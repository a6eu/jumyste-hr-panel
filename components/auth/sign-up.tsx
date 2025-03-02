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
import { useTranslation } from 'react-i18next'

const SignUp = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { loading } = useSelector((state: RootState) => state.auth)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required(t('errors.required')),
            lastName: Yup.string().required(t('errors.required')),
            email: Yup.string()
                .email(t('errors.emailInvalid'))
                .required(t('errors.required')),
            password: Yup.string()
                .min(6, t('errors.passwordMin'))
                .required(t('errors.required')),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], t('errors.passwordMismatch'))
                .min(6, t('errors.passwordMin'))
                .required(t('errors.required')),
        }),
        onSubmit: (values) => {
            const userData = {
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                password: values.password,
            }
            dispatch(signUp(userData))
        },
    })

    return (
        <div className="flex flex-col flex-1 self-center">
            <Image
                className="self-center"
                priority={true}
                src={Logo}
                alt="Logo"
            />
            <h1 className="text-3xl mt-20">{t('register.welcome')}</h1>
            <p>{t('register.description')}</p>
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
                            placeholder={t('register.name')}
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
                            className="min-h-12 rounded-xl border border-[#9F9F9F] px-4 w-full"
                            type="text"
                            name="lastName"
                            placeholder={t('register.surname')}
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
                        placeholder="Email"
                        autoComplete="username"
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
                        autoComplete="new-password"
                        placeholder={t('register.password')}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {showPassword ? (
                        <EyeOff
                            onClick={() => setShowPassword(false)}
                            className="absolute right-3 top-3 cursor-pointer"
                        />
                    ) : (
                        <Eye
                            onClick={() => setShowPassword(true)}
                            className="absolute right-3 top-3 cursor-pointer"
                        />
                    )}
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-white bg-red-500 px-5 py-2 mt-2 rounded-md text-sm w-max">
                            {formik.errors.password}
                        </p>
                    )}
                </div>
                <div className="relative">
                    <input
                        className="h-12 rounded-xl border border-[#9F9F9F] px-4 w-full"
                        type={!showConfirmPassword ? 'password' : 'text'}
                        name="confirmPassword"
                        autoComplete="new-password"
                        placeholder={t('register.confirmPassword')}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                    />
                    {showConfirmPassword ? (
                        <EyeOff
                            onClick={() => setShowConfirmPassword(false)}
                            className="absolute right-3 top-3 cursor-pointer"
                        />
                    ) : (
                        <Eye
                            onClick={() => setShowConfirmPassword(true)}
                            className="absolute right-3 top-3 cursor-pointer"
                        />
                    )}
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
                    {!loading ? t('register.button') : t('loading')}
                </button>
                <span className="self-center">
                    {t('register.haveAccount')}
                    <Link href="/auth?reg=true" className="text-primary ml-3">
                        {t('register.login')}
                    </Link>
                </span>
            </form>
        </div>
    )
}

export default SignUp
