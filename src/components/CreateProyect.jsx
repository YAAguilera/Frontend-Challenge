import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {addProject} from './Redux/reducer'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';



const CreateProyect = () => {
  const { trigger, register, handleSubmit, reset, formState: {errors} } = useForm();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const onSubmit = (data) => {
    const date=new Date()
    const currentDate=date.getDay() + "/" + (date.getMonth(+1)) + "/" + date.getFullYear()
    const currentHour = date.getHours() + ":" + date.getMinutes()
    const creationDate=currentDate + ' ' + currentHour
    // Asigna un ID único al proyecto usando uuid
    const projectWithId = { ...data, id: uuidv4(), creationDate };
  
    dispatch(addProject(projectWithId));
    reset();
    console.log(projectWithId);
  
    // Guarda el proyecto en localStorage
    const localStorageProjects = JSON.parse(localStorage.getItem('projects')) || [];
    localStorageProjects.push(projectWithId);
    localStorage.setItem('projects', JSON.stringify(localStorageProjects));
  
    // Redirige al usuario
    nav('/');
  };
  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  return (
    <main className='bg-gray-100 h-full w-screen flex flex-col gap-4'>
      <header className='bg-white w-screen h-auto p-2 flex flex-row justify-start align-middle items-center gap-6'>
        <Link to='/' className='flex flex-row items-center gap-2'>
          <MdOutlineArrowBack className='text-gray-400'/>
          <h2 className='text-gray-400 font-semibold text-sm'>Back</h2>
        </Link>
        <h1 className='text-black font-bold text-lg'>Add proyect</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className='w-screen h-full bg-white text-lg font-semibold p-5 flex flex-col gap-5'>
        <div className='flex flex-col '>
          <label htmlFor="projectName">Project name</label>
          <input
          className='border border-solid border-gray-300 h-10'
            type="text"
            name="projectName"
            {...register('projectName',{ 
              required: 'This field is required',
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: 'Only letters and spaces are allowed',
            },
          })}
          onBlur={() => handleBlur('projectName')}
              />
              {errors.projectName ? (
                <span className='text-red-500'>{errors.projectName.message}</span>
              ) : (
                <></>
              )}
        </div>
        <div className='flex flex-col '>
          <label htmlFor="description">Description</label>
          <textarea
          className='border border-solid border-gray-300 h-24'
            name="description"
            {...register('description',{ 
              required: 'This field is required',
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: 'Only letters and spaces are allowed',
            },
          })}
          onBlur={() => handleBlur('description')}
              />
              {errors.description ? (
                <span className='text-red-500'>{errors.description.message}</span>
              ) : (
                <></>
              )}
        </div>
        <div className='flex flex-col '>
          <label htmlFor="projectManager">Project Manager:</label>
          <input
          className='border border-solid border-gray-300 h-10'
            type="text"
            name="projectManager"
            {...register('projectManager',{ 
              required: 'This field is required',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'Only letters and spaces are allowed',
        },
      })}
      onBlur={() => handleBlur('description')}
          />
          {errors.description ? (
            <span className='text-red-500'>{errors.description.message}</span>
          ) : (
            <></>
          )}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="assignedTo">Assigned To:</label>
          <input
          className='border border-solid border-gray-300 h-10'
            type="text"
            name="assignedTo"
            {...register('assignedTo',{ required: 'This field is required',
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: 'Only letters and spaces are allowed',
      },
    })}
    onBlur={() => handleBlur('description')}
        />
        {errors.description ? (
          <span className='text-red-500'>{errors.description.message}</span>
        ) : (
          <></>
        )}
        </div>
        <div className='flex flex-col '>
          <label htmlFor="status">Status:</label>
          <select className='border border-solid border-gray-300 h-10' name="status" defaultValue="status" {...register('status',{ required: 'This field is required' })} 
           onBlur={() => handleBlur('status')}
          >
            {errors.status ? (
                <span className='text-red-500'>{errors.status.message}</span>
              ) : (
                <></>
              )}
            <option value="status" disabled>Select status</option>
            <option value="enable">Enable</option>
            <option value="disable">Disable</option>
          </select>
      
        </div>
        <button type="submit" className='bg-red-500 p-[7px] text-white font-bold rounded-lg text-md transition-all duration-500 ease-in-out hover:bg-red-600 xxl:w-[8%] xl:w-[8%] lg:w-[10%] md:w-[20%] sm:w-[30%]'>Create</button>
      </form>
    </main>
  );
};

export default CreateProyect;
