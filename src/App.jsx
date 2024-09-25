import React from 'react'
import { Button } from './components/ui/button'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from './pages/home/Home';
import Blog from './pages/blog/Blog';
import AllBlogs from './pages/allBlogs/AllBlogs';
import NoPage from './pages/nopage/NoPage';
import BlogInfo from './pages/blogInfo/BlogInfo';
import AdminLogin from './pages/admin/admin-login/AdminLogin';
import Dashboard from './pages/admin/dashboard/Dashboard';
import MyState from './context/data/MyState';
import toast, { Toaster } from 'react-hot-toast';
import CreateBlog from './pages/admin/createBlog/CreateBlog';
import Register from './pages/register/Register';
import ForgotPassword from './pages/change-password/ForgotPassword';
import ImageGenerator from './pages/img-gen/ImageGenerate';

const App = () => {
  return (
    <MyState>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/allblogs" element={<AllBlogs />} />
        <Route path="/bloginfo/:id" element={<BlogInfo />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/dashboard" element={
          <ProtectedRouteForAdmin>
            <Dashboard />
          </ProtectedRouteForAdmin>} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/create-blog" element={<ProtectedRouteForUser><CreateBlog /></ProtectedRouteForUser>} />
        <Route path="/*" element={<NoPage />} />
        <Route path="/gen-img" element={<ImageGenerator />} />
        <Route path="/register" element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
      </Routes>
    </MyState>
  )
}

export default App
export const ProtectedRouteForAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('admin'))
  if (user?.user?.email === "testuser@gmail.com") {
    return children
  }
  else {
    console.log(user)
    return <Navigate to={'/'} />
  }
}
export const ProtectedRouteForUser = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('admin'))
  if (user) {
    return children
  }
  else {
    console.log(user)
    toast.error('Login First')
    return <Navigate to={'/'} />
  }
}
