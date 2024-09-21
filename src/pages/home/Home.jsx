import Loader from '@/file-components/loader/Loader.jsx'
import BlogPostCard from '../../file-components/blogPostCard/BlogPostCard.jsx'
import HeroSection from '../../file-components/hero-section/HeroSection.jsx'
import Layout from '../../file-components/layout/Layout.jsx'
import React from 'react'

const Home = () => {
    return (
        <div>
            <Layout>

                <HeroSection></HeroSection>
                <div className='p-5 flex gap-5 flex-wrap justify-center'>
                    <BlogPostCard></BlogPostCard>
                </div>

            </Layout>
        </div>
    )
}

export default Home
