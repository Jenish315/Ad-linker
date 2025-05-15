import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Layout from './Layout.jsx'
import Home from '../home/Home.jsx'
import { SignInPage } from "../component/tools/signin/SignInPage.jsx";
import SignupForm from '../component/tools/register/SignupForm.jsx'
import AdviserPage from '../component/tools/advertiser/AdvertiserPage.jsx'
import AddCompanyForm from '../component/tools/advertiser/AddCompanyForm.jsx'
import ContactUs from "../component/tools/contactus/Contactus.jsx";
import { ForgotPassword } from "../component/tools/signin/ForgotPassword";
import { ResetPassword } from "../component/tools/signin/ResetPassword";
import PublisherPage from '../component/tools/publisher/PublisherPage.jsx'
import PublishForm from '../component/tools/publisher/PublishForm.jsx'
import EditPublisher from '../component/tools/publisher/EditPublisher.jsx'
import Logout from "../component/tools/logout/Logout.jsx"; // ✅ Import Logout
import { AuthProvider } from "./context/AuthContext.jsx";
import EditCompanyForm from "../component/tools/advertiser/EditCompanyForm.jsx";




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
     
      <Route path='' element={<Home/>} />
      <Route path='/register' element={<SignupForm/>} />
      <Route path='/login' element={<SignInPage/>} />
      <Route path='/advertiser' element={<AdviserPage/>} />
      <Route path='/advertiser/form' element={<AddCompanyForm/>} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path='/advertiser/form' element={<AddCompanyForm/>} />
      <Route path="/publisher" element={ <PublisherPage/>} />
      <Route path="/publisher/form" element={ <PublishForm/>} />
      <Route path="/publisher/edit/:id" element={<EditPublisher />} />
      <Route path="/advertiser/edit/:id" element={<EditCompanyForm />} />
      <Route path="/logout" element={<Logout />} /> {/* ✅ Fix: Correct Logout Route */}
    </Route>
  )
)

// ✅ Wrap the entire app with AuthProvider
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);






