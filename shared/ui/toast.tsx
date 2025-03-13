import { useAppSelector } from '@/redux/store'

const Toast = () => {
    const { show, content, type } = useAppSelector(state => state.toast)
    return (
        <div>
            <div>

            </div>
            <div>
                <h1></h1>
                <p></p>
            </div>
        </div>
    )
}