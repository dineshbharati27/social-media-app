import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllBlogs } from "../store/slices/blogSlice";
import { getAllUsers } from "../store/slices/authSlice";
import { Calendar, User, ThumbsUp, MessageCircle, Share } from "lucide-react";
import Stories from "./Stories";
import BlogCard from "./BlogCard";


const BlogList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, isLoading } = useSelector((state) => state.blog);
  const { allUsers, isLoading: usersLoading } = useSelector((state) => state.auth);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  useEffect(() => {
    // Only fetch if we don't already have the data
    if (!blogs.length) {
      dispatch(getAllBlogs());
    }
    if (!allUsers?.length) {
      dispatch(getAllUsers());
    }
  }, []); 

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Show loading state while either blogs or users are loading
  if ((isLoading && !blogs.length) || (usersLoading && !allUsers?.length)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  // Check if we have both blogs and users data
  if (!blogs || !allUsers) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">No data available</div>
      </div>
    );
  }

  // Calculate indexes for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);



  return (
    <>
    <div className="px-2 md:px-10">
      <Stories/>
    </div>
    
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto px-3 sm:px-1 lg:px-8">

      <div className="mt-0 md:mt-5 sm:px-1 md:px-8 lg:px-12 max-w-3xl mx-auto flex flex-col gap-8">
          {currentBlogs.map((blog, index) => {
            // Find the user that matches the blog's userId
            const user = allUsers.find(user => user._id === blog.userId.toString());

            return (
              <BlogCard key={blog._id} allUsers={allUsers} blog={blog} user={user} />
            );
          })}
        </div>


        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default BlogList;
