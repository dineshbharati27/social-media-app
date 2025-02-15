import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import BlogList from '../components/Bloglist'
import Notification from '../components/Notification'
import { Route, Router, Routes } from 'react-router-dom'
import CreateBlog from '../components/CreateBlog'	
import MyBlogs from '../components/MyBlogs'
import Profile from '../components/Profile'
import EditProfile from '../components/EditProfile'
import UserProfile from '../components/UserProfile'
import Search from '../components/Search'
export default function Home() {

  return (
    <div className="flex h-screen p-10">
      <Sidebar />
      <div className="w-3/5 overflow-y-scroll hide-scrollbar">
        <Routes>
          <Route path='/' element={<BlogList/>}/>
          <Route path='create' element={<CreateBlog/>}/>
          <Route path='myblogs' element={<MyBlogs/>}/>
          <Route path='edit/:id' element={<CreateBlog/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='userprofile/:userId' element={<UserProfile/>}/>
          <Route path='editprofile' element={<EditProfile/>}/>
          <Route path='search' element={<Search/>}/>
          

        </Routes>
        
      </div>
      <Notification />
    </div>
  )
}