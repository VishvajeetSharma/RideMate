import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import Start from './pages/Start'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import CaptainTerms from './pages/CaptainTerms'
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import UserTerms from './pages/UserTerms'
import AdminLogin from './pages/AdminLogin'
import AdminProtectedWrapper from './pages/AdminProtectedWrapper'
import AdminHome from './pages/AdminHome'
import AdminCaptains from './pages/AdminCaptains'
import AdminUsers from './pages/AdminUsers'
import AdminLogout from './pages/AdminLogout'

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Start/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignUp/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignUp/>}/>
        <Route path='/admin-login' element={<AdminLogin/>}/>

        {/* User Routes */}
        <Route path='/home' element={
        <UserProtectedWrapper>
          <Home/>
        </UserProtectedWrapper>}/>
        
        <Route path='users/logout' element={
          <UserProtectedWrapper>
            <UserLogout/>
          </UserProtectedWrapper>}/>

        
          <Route path='riding' element={
            <UserProtectedWrapper>
              <Riding/>
            </UserProtectedWrapper>
          }/>
          
            {/* Captain Routes */}
          <Route path='/captain-home' element={
            <CaptainProtectedWrapper>
              <CaptainHome/>
            </CaptainProtectedWrapper>
          }/>
          <Route path='/captains/logout' element={
            <CaptainProtectedWrapper>
              <CaptainLogout/>
            </CaptainProtectedWrapper>
          }/>
          <Route path='/captain-riding' element={
            <CaptainProtectedWrapper>
              <CaptainRiding/>
            </CaptainProtectedWrapper>
          }/>
          <Route path='/captain-terms' element={
              <CaptainTerms/>
          }/>
          <Route path='/user-terms' element={
              <UserTerms/>
          }/>

          {/* Admin Routes */}
          <Route path='/admin' element={
            <AdminProtectedWrapper>
              <AdminHome/>
            </AdminProtectedWrapper>
          }/>
          <Route path='/captains-list' element={
            <AdminProtectedWrapper>
              <AdminCaptains/>
            </AdminProtectedWrapper>
          }/>
          <Route path='/users-list' element={
            <AdminProtectedWrapper>
              <AdminUsers/>
            </AdminProtectedWrapper>
          }/>
          <Route path='/admin-logout' element={
            <AdminProtectedWrapper>
              <AdminLogout/>
            </AdminProtectedWrapper>
          }/>
      </Routes>
    </div>
  )
}

export default App
