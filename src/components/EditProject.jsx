import React from 'react'
import {useForm} from 'react-hook-form'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editProject } from './Redux/reducer';
import { Link } from 'react-router-dom';
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const EditProject = () => {
const nav=useNavigate()
const { id } = useParams();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const projectToEdit = projects.find((project) => project.id === id);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(editProject({ id, newData: data }));
    console.log(data);
    nav('/')
  }

 

  return (
    <main className='bg-gray-100 h-full w-screen flex flex-col gap-4'>
    <header className='bg-white w-screen h-auto p-2 flex flex-row justify-start align-middle items-center gap-6'>
        <Link to='/' className='flex flex-row items-center gap-2'>
          <MdOutlineArrowBack className='text-gray-400'/>
          <h2 className='text-gray-400 font-semibold text-sm'>Back</h2>
        </Link>
        <h1 className='text-black font-bold text-lg'>Edit proyect</h1>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className='w-screen h-auto bg-white text-lg font-semibold p-5 flex flex-col gap-5'>
        <div className='flex flex-col'>
        <label htmlFor="projectName">Project name</label>
        <input 
        className='border border-solid border-gray-300 h-10'
        type="text"
        name='projectName' {...register('projectName',
        { 
            required: 'This field is required',
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: 'Only letters and spaces are allowed',
          },
        }
        )} defaultValue={projectToEdit.projectName} />
        </div>
        
        <div className='flex flex-col'>
        <label htmlFor="description">Description</label>
        <textarea
        className='border border-solid border-gray-300 h-24'
        type="text"
        name='description' {...register('description',
        { 
            required: 'This field is required',
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: 'Only letters and spaces are allowed',
          },
        }
        )} defaultValue={projectToEdit.description} />
        </div>

        <div className='flex flex-col'>
        <label htmlFor="projectManager">Project manager</label>
        <textarea
        className='border border-solid border-gray-300 h-10'
        type="text"
        name='projectManager' {...register('projectManager',
        { 
            required: 'This field is required',
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: 'Only letters and spaces are allowed',
          },
        }
        )} defaultValue={projectToEdit.projectManager} />
        </div>

        <div className='flex flex-col'>
        <label htmlFor="assignedTo">Assigned to</label>
        <textarea
        className='border border-solid border-gray-300 h-10'
        type="text"
        name='assignedTo' {...register('assignedTo',
        { 
            required: 'This field is required',
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: 'Only letters and spaces are allowed',
          },
        }
        )} defaultValue={projectToEdit.assignedTo} />
        </div>

        <select
  className='border border-solid border-gray-300 h-10'
  name="status"
  defaultValue={projectToEdit.status}
  {...register('status',{ required: 'This field is required' })}
>
  <option value="status" disabled>Select status</option>
  <option value="enable">Enable</option>
  <option value="disable">Disable</option>
</select>
        <button type="submit" className='bg-red-500 p-[7px] text-white font-bold rounded-lg text-md transition-all duration-500 ease-in-out hover:bg-red-600 xxl:w-[10%] xl:w-[10%] lg:w-[15%] md:w-[30%] sm:w-[50%]'>Save changes</button>
      </form>

      </main>
  )
}

export default EditProject