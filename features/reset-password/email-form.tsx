import $api from '@/shared/http/setup'
import { isAxiosError } from 'axios'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

export const EmailForm = ({ onNext }: { onNext: (email: string) => void }) => {
    const { t } = useTranslation()
    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: Yup.object({
            email: Yup.string()
                .email(t('errors.emailInvalid'))
                .required(t('errors.required')),
        }),
        onSubmit: (values) => {
            try {
                $api.post('/api/auth/forgot-password', { email: values.email })
                onNext(values.email)
            } catch (error) {
                if (isAxiosError(error)) {
                    console.error(error)
                }
            }
        },
    })

    return (
        <>
            <h1 className="text-3xl mt-20 mb-4">{t('resetPassword.title')}</h1>
            <p>{t('resetPassword.description')}</p>
            <form
                className="flex flex-col space-y-14 mt-8"
                onSubmit={formik.handleSubmit}
            >
                <div>
                    <input
                        className="h-12 rounded-xl border border-gray-400 px-4 w-full"
                        type="email"
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
                <button
                    type="submit"
                    className="rounded-xl text-white h-12 bg-button"
                >
                    {t('resetPassword.button')}
                </button>
            </form>
        </>
    )
}

