import React from 'react'
import axiosHttp from '../utils/Axios'

const AddWord = () => {

  const handleAddWord = () => {
    axiosHttp.post('/addWord', {});
  }

  return (
    <>
<div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg text-center">
    <h1 className="text-2xl font-bold sm:text-3xl">Add a New Word</h1>
  </div>

  <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
    <div>
      <label htmlFor="email" className="sr-only">Email</label>

      <div className="relative">
        <input
          type="text"
          className="w-full border rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Enter Word"
        />
      </div>
    </div>

    <div>
      <label htmlFor="password" className="sr-only">Password</label>

      <div className="relative">
        <input
          type="text"
          className="w-full border rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Enter Meaning"
        />
      </div>
    </div>
      <button
        type="submit"
        className="w-full inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        onClick={handleAddWord}
      >
        Add
      </button>

  </form>
</div>
    </>
  )
}

export default AddWord