import React from 'react'
import {
  SpeakerWaveIcon
} from '@heroicons/react/24/outline'

const Homepage = () => {
  return (
    <div className='mt-[80px] min-h-screen dark:bg-black p-4 pt-[30px]'>
      <div className='border border-gray-500 rounded-sm shadow-[0_0_5px_0_rgb(80,80,80)] p-[10px]'>
        <div className='flex items-center gap-[20px]'>
          <SpeakerWaveIcon className='text-black w-[30px] p-[5px] border border-gray-300 rounded-[50px] cursor-pointer'/>
          <h2 className='text-xl flex-1'>Candid</h2>
          <a className='text-[#5e78c6]' href="https://www.google.com/search?q=candid" target='_blank' rel='noreferrer'>Search on Google</a>
        </div>
        <div className='pt-[10px]'>
          <p className='text-gray-500 text-[15px]'>nounn</p>
          <div>
            <p className='pl-[20px]'>meaning of the word</p>
            <div className='ml-[20px] flex items-center gap-[10px]'>
              <span className='text-sm text-gray-500'>Ex: </span>
              <p className='p-[3px] px-[10px] border rounded-[50px] inline'>
              example of the word
              </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage