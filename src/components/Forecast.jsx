import React from 'react'
import { iconUrlFFromCode } from '../services/WeatherService'

function Forecast({ title, items }) {
    //const {title} = props;
    console.log(items);

    return (
        <div>
            <div className='flex items-center justify-start my-6'>
                <p className='text-white font-medium uppercase'> {title} </p>
            </div>
            <hr className='my-2' />

            <div className='flex flex-row items-center justify-between text-white'>
                {items.map((item, index) => (
                    <div className='flex flex-col items-center justify-center' key={index}>
                        <p className='font-light text-sm'>{item.title}</p>
                        <img
                            src={iconUrlFFromCode(item.icon)}
                            alt=""
                            className='w-12 my-1'
                        />
                        <p className='font-medium'> {`${item.temp.toFixed()}°`} </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Forecast
