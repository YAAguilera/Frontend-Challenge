import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProject } from './Redux/reducer';
import { BsThreeDotsVertical } from "react-icons/bs";
import Swal from 'sweetalert2';
import ProyectDetail from './ProyectDetail';
import { TiPencil, TiDelete } from "react-icons/ti";
import { FiInfo } from "react-icons/fi";
import SearchBar from './Searchbar';

const MyProyects = () => {
  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();

  const handleDeleteProject = async (projectId, index) => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this project?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      dispatch(deleteProject(projectId));
  
      // Actualiza el localStorage después de eliminar
      const localStorageProjects = JSON.parse(localStorage.getItem('projects')) || [];
      const updatedProjects = localStorageProjects.filter((project) => project.id !== projectId);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
  
      // Actualiza el estado de isMenuOpenArray para reflejar la nueva longitud
      setIsMenuOpenArray((prevIsMenuOpenArray) => {
        const newIsMenuOpenArray = [...prevIsMenuOpenArray];
        newIsMenuOpenArray.splice(index, 1); // Elimina el valor correspondiente
        return newIsMenuOpenArray;
      });
    }

    setIsMenuOpenArray(Array(projects.length).fill(false))
  };
  

  const [isMenuOpenArray, setIsMenuOpenArray] = useState(Array(projects.length).fill(false));

  const toggleMenu = (index) => {
    const newIsMenuOpenArray = [...isMenuOpenArray];
    newIsMenuOpenArray[index] = !newIsMenuOpenArray[index];
    setIsMenuOpenArray(newIsMenuOpenArray);
  };

  useEffect(() => {
  }, [projects]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
 

  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (project, index) => {
    setSelectedProject(project);
    setIsMenuOpenArray((prevIsMenuOpenArray) => {
      const newIsMenuOpenArray = [...prevIsMenuOpenArray];
      newIsMenuOpenArray[index] = false; // Cierra el menú cuando se abre el modal
      return newIsMenuOpenArray;
    });
    setIsModalOpen(true);
  };

  return (
    <main className='bg-gray-100 h-screen w-screen overflow-hidden flex flex-col gap-4 items-center'>
      <header className='bg-white w-screen h-auto p-2 flex flex-row justify-between align-middle items-center pl-3 pr-5'>
      
        <h1 className='font-bold 
        xxl:text-5xl
        xl:text-4xl
        lg:text-3xl
        md:text-2xl
        sm:text-xl'>
          My projects
        </h1>
        <Link to='/create'>
          <button className='bg-red-500 p-[7px] text-white font-bold rounded-lg transition-all duration-500 ease-in-out hover:bg-red-600
          xxl:text-3xl
          xl:text-2xl
          lg:text-xl
          md:text-xl
          sm:text-md
          '>
            + Add project
          </button>
        </Link>
      </header>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={(e) => setSearchTerm(e.target.value)}
        placeHolder="Search by project name"
      />
      <section className='px-1 h-auto w-full flex flex-col justify-center items-center'>
        {projects.map((project, index) => {
          if (project.projectName.toLowerCase().includes(searchTerm.toLowerCase())) {
            return (
              <article
                className='w-[98%] bg-white h-auto flex flex-col mt-1 px-7 py-4 rounded-xl'
                key={project.id}
              >
                <section className='w-full flex flex-row h-auto justify-between items-center'>
                  <div className='flex flex-col'>
                    <h1 className='text-xl font-semibold'>{project.projectName}</h1>
                    <h4 className='text-gray-400'>Creation date: {project.creationDate}</h4>
                    <h2>Assigned to: {project.assignedTo}</h2>
                  </div>
                  <div className='relative text-xl'>
                    <BsThreeDotsVertical onClick={() => toggleMenu(index)} />
                    {isMenuOpenArray[index] && (
                      <div className='absolute mt-[20%] right-0 w-40 opacity-100 bg-white border flex flex-col items-center border-gray-400 shadow-lg rounded-lg py-2'>
                        <Link to={`/edit/${project.id}`}>
                          <div className='flex flex-row justify-center items-center'>
                            <TiPencil className='text-2xl'/>
                            <button className='text-lg block px-4 py-2'>Edit</button>
                          </div>
                        </Link>
                        <div className='w-full h-[1px] bg-gray-400'></div>
                        <div className='flex flex-row items-center justify-center align-middle'>
                          <TiDelete className='text-2xl'/>
                          <button onClick={() => handleDeleteProject(project.id)} className='text-lg block px-4 py-2'>Delete</button>
                        </div>

                        <div className='w-full h-[1px] bg-gray-400'></div>

                        <div className='flex flex-row items-center justify-center align-middle'>
                          <button className='flex flex-row items-center justify-center' onClick={() => openModal(project, index)}>
                          <FiInfo className='text-2xl'/>
                          <span className='text-lg block px-4 py-2'>More info</span>
                        </button>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </article>
            );
          } else {
            return null; // No renderizar si no coincide con el término de búsqueda
          }
        })}
      </section>

      {isModalOpen && selectedProject && (
        <ProyectDetail
          project={selectedProject}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
}

export default MyProyects;
