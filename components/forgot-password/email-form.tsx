import { useFormik } from 'formik'
import * as Yup from 'yup'

const EmailForm = ({ onNext }: { onNext: () => void }) => {
    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Некорректный email')
                .required('Обязательное поле'),
        }),
        onSubmit: () => onNext(),
    })

    return (
        <>
            <h1 className="text-3xl mt-20 mb-4">Восстановление пароля</h1>
            <p>Введите ваш email, и мы отправим вам код для сброса пароля</p>
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
                    Отправить код
                </button>
            </form>
        </>
    )
}

export default EmailForm
