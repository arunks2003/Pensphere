import React, { useContext, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Layout from '@/file-components/layout/Layout';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs"
import MyContext from '@/context/data/MyContext';
import {
    Button,
    Typography,
} from "@material-tailwind/react";
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { fireDB, storage } from '@/firebase/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import toast from 'react-hot-toast';

const CreateBlog = () => {
    // const context = useContext(MyContext);
    const apiKey = import.meta.env.VITE_API_KEY;
    const context = useContext(MyContext);
    const { mode, user } = context;
    // console.log(user.email)

    const navigate = useNavigate();

    // const [blogs, setBlogs] = useState('');
    // const [blogs, setBlogs] = useState({
    //     title: '',
    //     category: '',
    //     content: '',
    //     time: Timestamp.now(),
    // });
    const [blogs, setBlogs] = useState({
        title: '',
        category: '',
        content: '',
        time: Timestamp.now(),
        author: user?.email,
    });
    const [thumbnail, setthumbnail] = useState();

    //* Add Post Function 
    const addPost = async () => {
        if (blogs.title === "" || blogs.category === "" || blogs.content === "" || blogs.thumbnail === "") {
            toast.error('Please Fill All Fields');
        }
        // console.log(blogs.content)
        uploadImage()
    }

    //* Upload Image Function 
    const uploadImage = () => {
        if (!thumbnail) return;

        const imageRef = ref(storage, `blogimage/${thumbnail.name}`);

        uploadBytes(imageRef, thumbnail)
            .then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            })
            .then((url) => {
                const productRef = collection(fireDB, "blogPost");
                return addDoc(productRef, {
                    blogs,
                    thumbnail: url,
                    time: Timestamp.now(),
                    date: new Date().toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    ),
                });
            })
            .then(() => {
                navigate('/dashboard');
                toast.success('Post Added Successfully');
            })
            .catch((error) => {
                toast.error(error.message);
                console.error("Error adding document: ", error);
            });

    }

    const [text, settext] = useState('');

    //* Create markup function 
    function createMarkup(c) {
        return { __html: c };
    }
    return (
        <Layout>
            <div className=' container mx-auto max-w-5xl py-6'>
                <div className="p-5" style={{
                    background: mode === 'dark'
                        ? '#353b48'
                        : 'rgb(226, 232, 240)',
                    borderBottom: mode === 'dark'
                        ? ' 4px solid rgb(226, 232, 240)'
                        : ' 4px solid rgb(30, 41, 59)'
                }}>
                    {/* Top Item  */}
                    <div className="mb-2 flex justify-between">
                        <div className="flex gap-2 items-center">
                            {/* Dashboard Link  */}
                            <Link to={'/dashboard'}>
                                <BsFillArrowLeftCircleFill size={25} />
                            </Link>
                            {/* Text  */}
                            <Typography
                                variant="h4"
                                style={{
                                    color: mode === 'dark'
                                        ? 'white'
                                        : 'black'
                                }}
                            >
                            </Typography>
                        </div>
                    </div>
                    {/* main Content  */}
                    <div className="mb-3">
                        {/* Thumbnail  */}
                        {thumbnail && <img className=" w-full rounded-md mb-3 "
                            src={thumbnail
                                ? URL.createObjectURL(thumbnail)
                                : ""}
                            alt="thumbnail"
                        />}
                        {/* Text  */}
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 font-semibold"
                            style={{ color: mode === 'dark' ? 'white' : 'black' }}
                        >
                        </Typography>
                        {/* First Thumbnail Input  */}
                        <input
                            type="file"
                            label="Upload thumbnail"
                            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
                            style={{
                                background: mode === 'dark'
                                    ? '#dcdde1'
                                    : 'rgb(226, 232, 240)'
                            }}
                            onChange={(e) => setthumbnail(e.target.files[0])}
                        />
                    </div>
                    {/* Second Title Input */}
                    <div className="mb-3">
                        <input
                            label="Enter your Title"
                            className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${mode === 'dark'
                                    ? 'placeholder-black'
                                    : 'placeholder-black'}`}
                            placeholder="Enter Your Title"
                            style={{
                                background: mode === 'dark'
                                    ? '#dcdde1'
                                    : 'rgb(226, 232, 240)'
                            }}
                            name="title"
                            onChange={(e) => setBlogs({ ...blogs, title: e.target.value })}
                            value={blogs.title}
                        />
                    </div>
                    {/* Third Category Input  */}
                    <div className="mb-3">
                        <input
                            label="Enter your Category"
                            className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${mode === 'dark'
                                    ? 'placeholder-black'
                                    : 'placeholder-black'}`}
                            placeholder="Enter Your Category"
                            style={{
                                background: mode === 'dark'
                                    ? '#dcdde1'
                                    : 'rgb(226, 232, 240)'
                            }}
                            name="category"
                            onChange={(e) => setBlogs({ ...blogs, category: e.target.value })}
                            value={blogs.category}
                        />
                    </div>
                    {/* Four Editor  */}
                    <Editor
                        apiKey={apiKey}
                        onEditorChange={(newValue, editor) => {
                            setBlogs({ ...blogs, content: newValue });
                            settext(editor.getContent({ format: 'text' }));
                        }}
                        onInit={(evt, editor) => {
                            settext(editor.getContent({ format: 'text' }));
                        }}
                        init={{
                            plugins: 'a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template  tinydrive tinymcespellchecker typography visualblocks visualchars wordcount'
                        }}
                    />
                    {/* Five Submit Button  */}
                    <Button className=" w-full mt-5"
                        onClick={addPost}
                        style={{
                            background: mode === 'dark'
                                ? 'rgb(226, 232, 240)'
                                : 'rgb(30, 41, 59)',
                            color: mode === 'dark'
                                ? 'rgb(30, 41, 59)'
                                : 'rgb(226, 232, 240)'
                        }}
                    >Post
                    </Button>
                    {/* Six Preview Section  */}
                    <div className="">
                        <h1 className=" text-center mb-3 text-2xl">Preview</h1>
                        <div className="content">
                            <div className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                        ${mode === 'dark' ? '[&>h1]:text-[#ff4d4d]' : '[&>h1]:text-black'}
                        ${mode === 'dark' ? '[&>h2]:text-white' : '[&>h2]:text-black'}
                        ${mode === 'dark' ? '[&>h3]:text-white' : '[&>h3]:text-black'}
                        ${mode === 'dark' ? '[&>h4]:text-white' : '[&>h4]:text-black'}
                        ${mode === 'dark' ? '[&>h5]:text-white' : '[&>h5]:text-black'}
                        ${mode === 'dark' ? '[&>h6]:text-white' : '[&>h6]:text-black'}
                        ${mode === 'dark' ? '[&>p]:text-[#7efff5]' : '[&>p]:text-black'}
                        ${mode === 'dark' ? '[&>ul]:text-white' : '[&>ul]:text-black'}
                        ${mode === 'dark' ? '[&>ol]:text-white' : '[&>ol]:text-black'}
                        ${mode === 'dark' ? '[&>ol]:text-white' : '[&>ol]:text-black'}
                        `} dangerouslySetInnerHTML={createMarkup(blogs.content)}></div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateBlog
