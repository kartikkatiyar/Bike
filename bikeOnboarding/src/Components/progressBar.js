import React from 'react'
import { useState } from 'react'

const   ProgressBar = ({progress}) => {
    
  return (
    <div className='flex w-full mb-5'>
        {Array.from({length : 7}).map((_,index) => {
            return(
                <div
            key={index}
            className={`w-10 h-2 border mr-2 rounded-lg ${index < progress ? ' bg-sky-400' : 'bg-gray-200'}`}
          ></div>
            )
            
        })}
    </div>
  )
}

export default ProgressBar