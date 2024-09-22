import MyContext from '@/context/data/MyContext'
import Layout from '@/file-components/layout/Layout'
import { Button } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../../file-components/loader/Loader'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { fireDB } from '@/firebase/FirebaseConfig'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const Dashboard = () => {
    const context = useContext(MyContext);
    const navigate = useNavigate();
    const logout = async () => {
        try {
            await signOut(auth); // Log the user out
            toast.success('Logout successful');

            // Optionally, clear any local storage or user data if needed
            localStorage.removeItem('admin');

            // Navigate to the login page after logout
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
            toast.error('Logout failed');
        }
    };
    const { mode } = context;
    const [blogs, setBlogs] = useState([]);
    const [flag, setFlag] = useState(false);
    function getAllBlogsFunc() {
        try {
            const q = query(
                collection(fireDB, "blogPost"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let blogArray = [];
                QuerySnapshot.forEach((doc) => {
                    blogArray.push({ ...doc.data(), id: doc.id });
                });

                setBlogs(blogArray)
                // console.log(productsArray) 
            });
            return () => data;
        } catch (error) {
            console.log(error)
            // setloading(false)
        }
    }
    useEffect(() => {
        getAllBlogsFunc();
    }, [flag])
    const deleteblog = async (id) => {
        console.log("Deleting document with ID:", id);
        try {
            const docRef = doc(fireDB, 'blogPost', id);
            await deleteDoc(docRef);
            toast.success("Document deleted successfully!");
            setFlag(!flag);
        } catch (error) {
            console.error("Error deleting document:", error);
            toast.error("Error deleting document. Please try again.");
        }
    };
    return (
        <div>
            <Layout>
                <div className="py-10">
                    <div
                        className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
                        <div className="left">
                            <img
                                className=" w-40 h-40  object-cover rounded-full border-2 border-pink-600 p-1"
                                src={'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'} alt="profile"
                            />
                        </div>
                        <div className="right">
                            <h1
                                className='font-bold text-2xl mb-2'
                                style={{ color: mode === 'dark' ? 'white' : 'black' }}
                            >Arun Kumar
                            </h1>
                            <h2
                                style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">
                                Software Developer
                            </h2>
                            <h2
                                style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">arun.kumar.cd.civ21@itbu.ac.in
                            </h2>
                            <h2
                                style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">
                                <span>Total Blog : </span>  {blogs.length}
                            </h2>
                            <div className=" flex gap-2 mt-2">
                                <Link to={'/create-blog'}>
                                    <div className=" mb-2">
                                        <Button
                                        >Create Blog
                                        </Button>
                                    </div>
                                </Link>
                                <div className="mb-2">
                                    <Button onClick={logout}
                                    >Logout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Line  */}
                    <hr className={`border-2
                 ${mode === 'dark'
                            ? 'border-gray-300'
                            : 'border-gray-400'}`
                    }
                    />
                    {/* Table  */}
                    <div className="">
                        <div className=' container mx-auto px-4 max-w-7xl my-5' >
                            <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                                {/* table  */}
                                <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400" >
                                    {/* thead  */}
                                    <thead
                                        style={{
                                            background: mode === 'dark'
                                                ? 'white'
                                                : 'rgb(30, 41, 59)'
                                        }}
                                        className="text-xs ">
                                        <tr>
                                            <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">S.No.
                                            </th>
                                            <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">Thumbnail
                                            </th>
                                            <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">Title
                                            </th>
                                            <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">Category
                                            </th>
                                            <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">Date
                                            </th>
                                            <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">Action
                                            </th>
                                        </tr>
                                    </thead>
                                    {/* tbody  */}
                                    {
                                        blogs.length > 0
                                            ?
                                            <>
                                                {blogs.map((item, index) => {
                                                    const { thumbnail, date } = item;
                                                    return (
                                                        <tbody>
                                                            <tr className=" border-b-2" style={{ background: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}>
                                                                {/* S.No   */}
                                                                <td style={{ color: mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4">
                                                                    {index + 1}.
                                                                </td>
                                                                {/* Blog Thumbnail  */}
                                                                <th style={{ color: mode === 'dark' ? 'white' : 'black' }} scope="row" className="px-6 py-4 font-medium ">
                                                                    {/* thumbnail  */}
                                                                    <img className='w-16 rounded-lg'
                                                                        src={thumbnail} alt="thumbnail" />
                                                                </th>
                                                                {/* Blog Title  */}
                                                                <td style={{ color: mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4">
                                                                    {item.blogs.title}
                                                                </td>
                                                                {/* Blog Category  */}
                                                                <td style={{ color: mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4">
                                                                    {item.blogs.category}
                                                                </td>
                                                                {/* Blog Date  */}
                                                                <td style={{ color: mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4">
                                                                    {date}
                                                                </td>
                                                                {/* Delete Blog  */}
                                                                <td style={{ color: mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4">
                                                                    {/* <Button onClick={(e) => deleteblog(item.id)} className=' px-4 py-1 rounded-lg text-white font-bold bg-red-500'>
                                                                        Delete
                                                                    </Button> */}
                                                                    <AlertDialog>
                                                                        <AlertDialogTrigger asChild>
                                                                            <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white">Delete</Button>
                                                                        </AlertDialogTrigger>
                                                                        <AlertDialogContent>
                                                                            <AlertDialogHeader>
                                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                                <AlertDialogDescription> This will permanently delete this blog
                                                                                    and remove your data from our servers.
                                                                                </AlertDialogDescription>
                                                                            </AlertDialogHeader>
                                                                            <AlertDialogFooter>
                                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                                <AlertDialogAction className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white" onClick={(e) => deleteblog(item.id)}>Delete</AlertDialogAction>
                                                                            </AlertDialogFooter>
                                                                        </AlertDialogContent>
                                                                    </AlertDialog>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                })}</>
                                            :
                                            <Loader>
                                            </Loader>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

        </div>
    )
}

export default Dashboard
