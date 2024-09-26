import React from 'react'
import Layout from '../../file-components/layout/Layout'
import { Link } from 'react-router-dom'

const NoPage = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center h-full text-center justify-center my-auto">
                <h2 className="text-6xl font-bold text-red-500">404</h2>
                <p className="mt-4 text-lg text-gray-700">Oops! The page you are looking for does not exist.</p>
                <p className="mt-2 text-gray-500">It might have been removed, had its name changed, or is temporarily unavailable.</p>

                <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Go Back to Home
                </Link>
            </div>

        </Layout>
    )
}

export default NoPage
