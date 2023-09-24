import React from 'react'
import { GrClose } from 'react-icons/gr'; 

const ProyectDetail = ({ project, closeModal }) => {
  return (
    <main className="fixed inset-0 flex flex-col justify-center items-center bg-red-500 bg-opacity-50">
         <section className="flex flex-col bg-white w-auto h-auto p-8 rounded-xl justify-center items-center gap-2">
        <div className="flex flex-col items-end w-full">
        <button className="" onClick={closeModal}>
        <GrClose/>
        </button> 
        </div>
        <h1 className="font-extrabold font-serif text-red-400
        xxl:text-7xl 
        xl:text-5xl 
        lg:text-5xl 
        md:text-3xl 
        sm:text-2xl 
        ">Project details</h1>
        <div className="flex flex-col justify-center items-center align-middle gap-5 text-gray-400 font-semibold xxl:text-4xl
        xl:text-2xl 
        lg:text-2xl 
        md:text-xl 
        sm:text-lg 
        ">
        <h2><span className='font-bold'>Project name:</span> {project.projectName}</h2>
        <h2><span className='font-bold'>Creation date:</span> {project.creationDate}</h2>
        <h2><span className='font-bold'>Description:</span> {project.description}</h2>
        <h2><span className='font-bold'>Project manager:</span> {project.projectManager}</h2>
        <h2><span className='font-bold'>Assigned to:</span> {project.assignedTo}</h2>
        <h2><span className='font-bold'>Status:</span> {project.status}</h2>
        </div>
      </section>
    </main>
  )
}

export default ProyectDetail