import MyContext from '@/context/data/MyContext';
import { Loader } from 'lucide-react';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

const BlogPostCard = () => {
    const context = useContext(MyContext);
    const { mode, user,filteredBlogs } = context;
    // console.log(user.email);
    const navigate = useNavigate();
    const htmlToPlainText = (html) => {
        // Create a new DOMParser instance
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };
    function createMarkup(c) {
        return { __html: c };
    }
    return (
        <>
            {filteredBlogs.length > 0 ? <>{
                filteredBlogs.map((item, index) => {
                    const { thumbnail, id, date } = item
                    console.log(item)
                    const plainText = htmlToPlainText(item.blogs.content);
                    let c;
                    c = plainText;
                    return (
                        <div className="max-w-sm rounded overflow-hidden shadow-lg hover:cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform duration-300" key={index} style={{ height: '400px' }}>
                            <img
                                onClick={() => navigate(`/bloginfo/${id}`)}
                                className="w-full h-48 object-cover"
                                src={thumbnail}
                                alt="blog"
                            />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2 truncate">{item.blogs.title}</div>
                                <p className="text-gray-700 text-base overflow-hidden h-16" dangerouslySetInnerHTML={createMarkup(item.blogs.content)}>
                                    {/* {c}  Adjust this height to manage text content overflow */}
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{item.blogs.category}</span>
                                <p className="text-gray-700 text-sm mr-2">by: {item.blogs.author}</p>
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
