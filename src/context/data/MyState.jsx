import React, { useState, useEffect } from 'react'
import MyContext from './MyContext.jsx';
import { auth, fireDB } from '@/firebase/FirebaseConfig'; // Firebase config
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

function MyState(props) {
    class Trie {
        constructor() {
            // Define Node class inside Trie constructor
            this.Node = class {
                constructor() {
                    this.next = Array(26).fill(null);
                    this.end = false;
                }
            };

            this.root = new this.Node();
        }

        insert(word) {
            let node = this.root;
            for (let i = 0; i < word.length; i++) {
                const c = word.charCodeAt(i) - 'a'.charCodeAt(0);
                if (!node.next[c]) {
                    node.next[c] = new this.Node(); // Instantiate new node
                }
                node = node.next[c];
            }
            node.end = true; // Mark the end of the word
        }
        search(word) {
            let node = this.root;
            for (let i = 0; i < word.length; i++) {
                const c = word.charCodeAt(i) - 'a'.charCodeAt(0);
                if (!node.next[c]) {
                    return false; // Character not found, word does not exist
                }
                node = node.next[c];
            }
            return node.end; // Return true if it's the end of a valid word
        }

        searchPrefixNode(prefix) {
            let node = this.root;
            for (let i = 0; i < prefix.length; i++) {
                const c = prefix.charCodeAt(i) - 'a'.charCodeAt(0);
                if (!node.next[c]) {  // Correctly checks for a missing node
                    return null;
                }
                node = node.next[c];
            }
            return node;  // Return the node if found
        }
        getWordsFromNode(node, prefix, suggestions) {
            if (node.end) {
                suggestions.push(prefix);  // If the node marks the end of a word, add the prefix
            }
            for (let i = 0; i < 26; i++) {
                if (node.next[i]) {  // Check for non-falsy child nodes
                    this.getWordsFromNode(node.next[i], prefix + String.fromCharCode(i + 'a'.charCodeAt(0)), suggestions);
                }
            }
        }

        getSuggestions(prefix) {
            let node = this.searchPrefixNode(prefix);
            const suggestions = [];
            if (node) {  // Only search if the node exists
                this.getWordsFromNode(node, prefix, suggestions);
            }
            return suggestions;  // Return the collected suggestions
        }

    }
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
    const [suggestion, setSuggestions] = useState([]);
    let trie = new Trie();

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
                console.log("blog", blogArray)
                // makeTrie(blogArray)
                setGetAllBlog(blogArray)
                console.log(getAllBlog)
                // console.log(productsArray)   
                setloading(false)

            });
            return () => data;
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }
    const makeTrie = (arr) => {
        if (arr.length > 0) {
            // Clear Trie (if needed) before re-inserting blogs
            trie = new Trie();  // Ensure this is intended if trie is a state variable

            // Insert blogs into Trie
            arr.forEach(word => {
                if (word.blogs && word.blogs.title) {
                    // Process and insert the title
                    let titleStr = word.blogs.title.split(' ').join('');
                    console.log(titleStr.toLowerCase());  // Debugging output
                    trie.insert(titleStr.toLowerCase());

                    // Process and insert the category if it exists
                    // console.log(word.blogs.category)
                    if (word.blogs.category) {
                        let categoryStr = word.blogs.category.split(' ').join('');
                        trie.insert(categoryStr.toLowerCase());
                    }
                }
            });
            let str = "beautifylstars"
            console.log("trie check", trie.search(str.toLowerCase()))
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
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        if (searchKey.length > 0) {
            console.log('searchKey:', searchKey);
            let temp = searchKey;
            let str = temp.split(' ').join('');
            makeTrie(getAllBlog)
            const newSuggestions = trie.getSuggestions(str.toLowerCase());
            console.log('Suggestions:', newSuggestions);
            setSuggestions(newSuggestions)
            // if (searchKey.length > 0) {
        }
        // }
        else {
            setSuggestions([]); // Reset suggestions when searchKey is empty
            setFilteredBlogs(getAllBlog);
        }
    }, [searchKey, getAllBlog]);

    useEffect(() => {
        filterBlogs(searchKey.toLowerCase());
    }, [flag]);

    return (
        <MyContext.Provider value={{ mode, toggleMode, flag, setFlag, suggestion, user, searchKey, setSearchKey, loading, setloading, getAllBlog, setGetAllBlog, filteredBlogs }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState