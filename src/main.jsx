import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

// Nav
import ReposPage from "./pages/Repos.jsx";
import ProjectsPage from "./pages/Projects.jsx";
import ProjectView from "./pages/ProjectView.jsx";
import Navbar from "./components/Navbar.jsx";

// Apollo Client Setup
import ApolloClientSetup from "./config/apolloClientSetup.jsx";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Navbar />}>
      <Route path="/ProjectView/:projectID" element={<ProjectView />} />
      } />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/repos" element={<ReposPage />} />,
    </Route>,
  ])
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloClientSetup>
      <RouterProvider router={router}>
        <Navbar />
        <App />
      </RouterProvider>
    </ApolloClientSetup>
  </React.StrictMode>
);
