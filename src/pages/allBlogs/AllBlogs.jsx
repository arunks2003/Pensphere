import BlogPostCard from '@/file-components/blogPostCard/BlogPostCard'
import Layout from '@/file-components/layout/Layout'
import React from 'react'

const AllBlogs = () => {
    return (
        <Layout>
            <p className='font-serif text-5xl flex justify-center mt-4 underline'>All Blogs</p>
            <div className='p-5 flex flex-wrap justify-center gap-5'>
                <BlogPostCard></BlogPostCard>
            </div>
        </Layout>
    )
}

export default AllBlogs
