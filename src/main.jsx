import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
    Route, createRoutesFromElements
} from "react-router-dom";
import ProjectsPage from "./pages/Projects";
import Navbar from "./components/Navbar.jsx";

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/projects" element={<ProjectsPage/>} />,
        <Route path="/" element={<App />} />
    ])

)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Navbar>
        <RouterProvider router={router} />

      </Navbar>
  </React.StrictMode>
)
