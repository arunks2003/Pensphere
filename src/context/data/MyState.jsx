import React, { useState, useEffect } from 'react'
import MyContext from './MyContext.jsx';
import { auth, fireDB } from '@/firebase/FirebaseConfig'; // Firebase config
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

function MyState(props) {
    const [mode, setMode] = useState('light');
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    }
    const [user, setUser] = useState(null); // Track the user's login state
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // User is logged in
                setUser(currentUser);
            } else {
                // User is logged out
                setUser(null);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [navigate]);
    const [searchKey, setSearchKey] = useState('');
    const [loading, setloading] = useState(false)
    const [getAllBlog, setGetAllBlog] = useState([]);

    function getAllBlogsFunc() {
        setloading(true);
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

                setGetAllBlog(blogArray)
                // console.log(productsArray)   
                setloading(false)

            });
            return () => data;
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    useEffect(() => {
        getAllBlogsFunc();
    }, []);

    const [filteredBlogs, setFilteredBlogs] = useState([]);

    const filterBlogs = (searchTerm) => {
        const filtered = getAllBlog.filter(item => {
            return (

                (item.blogs.title?.toLowerCase().includes(searchTerm) ||
                    item.blogs.content?.toLowerCase().includes(searchTerm) ||
                    item.blogs.category?.toLowerCase().includes(searchTerm))
            );
        });
        // console.log("filtered Blogs:", filtered);
        setFilteredBlogs(filtered);
    };

    useEffect(() => {
        console.log('searchKey:', searchKey);
        console.log('getAllBlog:', getAllBlog);
        setFilteredBlogs(getAllBlog);
        if (searchKey.length > 0) {
            filterBlogs(searchKey.toLowerCase());
        } else {
            setFilteredBlogs(getAllBlog); // Reset to all blogs if no search
        }
    }, [searchKey, getAllBlog]);

    return (
        <MyContext.Provider value={{ mode, toggleMode, user, searchKey, setSearchKey, loading, setloading, getAllBlog, setGetAllBlog, filteredBlogs }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState