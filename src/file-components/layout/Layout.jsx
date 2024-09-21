import React from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'

// Destructure `children` from props
const Layout = ({ children }) => {
    return (
        <div>
            {/* Navbar  */}
            <Navbar />
            {/* Main Content */}
            <div className="content min-h-screen">
                {children}
            </div>
            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Layout
