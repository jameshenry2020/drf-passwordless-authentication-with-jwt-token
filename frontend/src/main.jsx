import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import App from './App.jsx'
import PhoneNumberLogin from './pages/Login.jsx';
import OtpInput from './pages/OtpInput.jsx';
import CreateProfile from './pages/update-profile.jsx';
import ProfilePage from './pages/user-profile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <PhoneNumberLogin/>,
  },
  {
    path: "/security-code",
    element: <OtpInput/>
  },
  {
    path: "/create-profile",
    element: <CreateProfile/>
  },
  {
    path: "/profile",
    element: <ProfilePage/>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>

     <RouterProvider router={router} />
     <ToastContainer />
  </StrictMode>,
)
