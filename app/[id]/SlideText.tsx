import { useInView } from 'react-intersection-observer';

const SlideText = ({ title }) => {
    const [ref, inView] = useInView({
        // triggerOnce:true
    })
    return (
        <p
            className={`text-2xl font-medium textDown ${inView ? 'active' : ''}`}
            ref={ref}
        >
            {title}
        </p>
    )
}

export default SlideText;