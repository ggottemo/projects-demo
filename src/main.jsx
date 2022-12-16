import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Fonts for Mui
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Routing
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

// Mui theme
import DarkThemeProvider from "./config/MuiThemeProvider.jsx";

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
    <DarkThemeProvider>
      <ApolloClientSetup>
        <RouterProvider router={router}>
          <Navbar />
          <App />
        </RouterProvider>
      </ApolloClientSetup>
    </DarkThemeProvider>
  </React.StrictMode>
);
