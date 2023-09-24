import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import MyProyects from './components/MyProyects'
import CreateProyect from './components/CreateProyect'
import { useEffect } from 'react';
import { addProject } from './components/Redux/reducer';
import EditProject from './components/EditProject'
import { useDispatch, useSelector } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  const projectsInState = useSelector((state) => state.projects.projects);

  useEffect(() => {
    // Verificar si hay datos en el localStorage
    const localStorageProjects = JSON.parse(localStorage.getItem('projects'));

    // Si hay proyectos en el localStorage, agregarlos al estado global si no existen ya
    if (localStorageProjects && localStorageProjects.length > 0) {
      localStorageProjects.forEach((project) => {
        // Comprueba si el proyecto ya existe en el estado global
        const projectExists = projectsInState.some((existingProject) => existingProject.id === project.id);

        // Si el proyecto no existe en el estado global, agrégalo
        if (!projectExists) {
          dispatch(addProject(project));
        }
      });
    }
  }, [dispatch, projectsInState]);
  return (

  <Router>
    <main className='overflow-hidden'>
  <Header/>
  <Routes>
    <Route exact path='/' element={<MyProyects/>}/>
    <Route path='/create' element={<CreateProyect />} />
    <Route path='/edit/:id' element={<EditProject/>}/>
  </Routes>  
    </main>
    </Router>
  )
}

export default App
