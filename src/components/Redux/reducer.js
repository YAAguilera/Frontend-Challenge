import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [], // Aquí almacenaremos los proyectos
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    deleteProject: (state, action) => {
      const projectId = action.payload;
      state.projects = state.projects.filter((project) => project.id !== projectId);
    },
    editProject: (state, action) => {
      const { id, newData } = action.payload;
      const projectIndex = state.projects.findIndex((project) => project.id === id);
      if (projectIndex !== -1) {
        state.projects[projectIndex] = { ...state.projects[projectIndex], ...newData };
      }
    },
  },
});

export const { addProject, deleteProject, editProject } = projectSlice.actions;
export default projectSlice.reducer;