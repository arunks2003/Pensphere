import Layout from '@/file-components/layout/Layout'
import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from '@/firebase/FirebaseConfig';

const BlogInfo = () => {
    const { id } = useParams(); // Fetch id from params
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(fireDB, "blogPost", id); // Specify your collection name and id
                console.log("id", id)
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);
    console.log("blog data", data)
    console.log("id", id)
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
        <div>
            <Layout>
                {/* <div className="flex justify-center">
                    <div className="w-1/2 border-2 h-screen mt-10 flex flex-col">
                        <img
                            className="h-1/2"
                            src={data?.thumbnail}
                            alt=""
                        />
                        <div className="p-5 overflow-y-auto h-1/2">
                            <h1 className="font-bold text-3xl font-serif">{data?.blogs.title}</h1>
                            <p className="text-gray-700 text-sm mr-2 flex justify-between">{data?.blogs.author}<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{data?.blogs.category}</span></p>
                            <p dangerouslySetInnerHTML={createMarkup(data?.blogs.content)}></p>
                        </div>
                    </div>
                </div> */}

                <div className="h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
                    {/* Left Section: Fixed Image */}
                    <div className="w-1/2 h-screen sticky top-0 mb-5 flex justify-center items-center">
                        <img
                            src={data?.thumbnail}
                            alt={data?.blogs?.title}
                            className="object-cover w-3/4 h-3/4 rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Right Section: Scrollable Content */}
                    <div className="w-1/2 h-screen overflow-y-scroll p-10">
                        <div className="max-w-2xl mx-auto">
                            {/* Blog Title and Author */}
                            <div className="mb-4">
                                <h1 className="text-4xl font-bold mb-2">{data?.blogs?.title}</h1>
                                <p className="text-gray-600 dark:text-gray-400">by: {data?.blogs?.author}</p>
                            </div>

                            {/* Blog Body */}
                            <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                <div dangerouslySetInnerHTML={createMarkup(data?.blogs?.content)} />
                            </div>

                            {/* Category Tag */}
                            <div className="mt-6">
                                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full text-sm font-medium">
                                    #{data?.blogs?.category}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </div>
    )
}

export default BlogInfo
