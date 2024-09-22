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
    const [arr, setArray] = useState([]);

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
                setArray(blogArray);
                // console.log(productsArray)   
                setloading(false)
            });
            return () => data;
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }
    function searchBlog({ }) {

    }

    useEffect(() => {
        getAllBlogsFunc();
    }, []);
    return (
        <MyContext.Provider value={{ mode, arr, setArray, toggleMode, user, searchKey, setSearchKey, loading, setloading, getAllBlog, searchBlog, setGetAllBlog }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState