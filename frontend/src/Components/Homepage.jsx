import React from 'react';
import WordCard from './WordCard';
import { useState } from 'react';
import {PlusCircleIcon} from '@heroicons/react/24/outline'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import AddWord from './AddWord';

const Homepage = () => {
  const [isAddWordDiaglogOpen, setIsAddWordDiaglogOpen] = useState(false);
  return (
    <div className='mt-[80px] min-h-screen dark:bg-black p-4 pt-[30px]'>
      <WordCard/>
      <PlusCircleIcon className='text-[#033f63] fixed w-[50px] bottom-[20px] right-[20px] cursor-pointer' title='Add New Word' onClick={() => setIsAddWordDiaglogOpen(true)}/>
      <Dialog open={isAddWordDiaglogOpen} onClose={() => setIsAddWordDiaglogOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border rounded-[4px] bg-white p-12 shadow-2xl">
            <AddWord/>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}

export default Homepage