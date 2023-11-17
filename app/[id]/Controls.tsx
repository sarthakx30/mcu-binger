import Image from 'next/image';
import arrow from '../components/icons8-right-16.png'

const Controls=()=>{
    return(
        <div className="justify-center align-center text-white">
            <a target="_blank" href="https://icons8.com/icon/98968/right">Right</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
            <button><Image src={arrow} alt='left button' style={{color: 'orange'}} /></button>
            <button><Image src={arrow} alt='right button' /></button>
        </div>
    )
}

export default Controls; 