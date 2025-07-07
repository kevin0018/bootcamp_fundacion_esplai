import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import Admin from './pages/Admin.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import App from './App.jsx';
import LanguageProvider from './i18n/LanguageProvider.jsx';
import Configuration from './pages/Configuration.jsx';
import Profile from './pages/Profile.jsx';
import MyCourses from './pages/MyCourses.jsx';

import Progress from './pages/Progress.jsx';
import { ProgressProvider } from './context/progressContext.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'courses', element: <Courses /> },
      { path: 'courses/:id', element: <CourseDetail /> },
      { path: 'admin', element: <Admin /> },
      { path: 'login', element: <Login /> },
      { path: 'configuracion', element: <Configuration /> },
      { path: 'profile', element: <Profile /> },
      { path: 'mis-cursos', element: <MyCourses /> },
      { path: 'progress', element: <Progress /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <ProgressProvider>
        <RouterProvider router={router} />
      </ProgressProvider>
    </LanguageProvider>
  </StrictMode>,
);
