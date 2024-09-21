import MyContext from '@/context/data/MyContext';
import { Loader } from 'lucide-react';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

const BlogPostCard = () => {
    const context = useContext(MyContext);
    const { mode, getAllBlog, user } = context;
    // console.log(user.email);
    const navigate = useNavigate();

    return (
        <>
            {getAllBlog.length > 0 ? <>{
                getAllBlog.map((item, index) => {
                    const { thumbnail, id, date } = item
                    console.log(item)
                    return (
                        <div className="max-w-sm rounded overflow-hidden shadow-lg hover:cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform duration-300" key={index}>
                            <img onClick={() => navigate(`/bloginfo/${id}`)} className="w-full" src={thumbnail} alt="blog" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{item.blogs.title}</div>
                                <p className="text-gray-700 text-base">
                                    {item.blogs.content}
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{item.blogs.category}</span>
                                <p className='text-gray-700 mr-2 mb-2'>by: {item.blogs.author}</p>
                            </div>
                        </div>

                    )
                })
            }</>
                : <>
                    <Loader>
                    </Loader>
                </>}

        </>
    )
}

export default BlogPostCard
