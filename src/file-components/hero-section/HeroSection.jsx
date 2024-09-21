import { Typography } from '@material-tailwind/react'
import React, { useContext } from 'react'
import MyContext from '../../context/data/MyContext';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';
import bg from '../../bg/bg.jpg'

function HeroSection() {
    const context = useContext(MyContext);
    const { mode, user } = context;
    return (
        <section
            style={{
                background: `url(${bg})`, backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundColor: mode === 'dark' ? 'black' : 'white',
            }}>

            {/* Hero Section  */}
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                {/* Main Content  */}
                <main>
                    <div className="text-center">
                        <div className="mb-2">
                            {/* Image  */}
                            <div className="flex justify-center mb-6">
                                <img src="https://github.com/arunks2003/images/blob/main/icon.png?raw=true" alt="" style={{ height: "100px" }} />
                            </div>

                            {/* Text  */}
                            <h1 className=' text-3xl text-white font-bold'>Get Started</h1>
                            <div className=''>
                                {
                                    user ? <div className='flex gap-4 justify-center my-7'><Link to='/allblogs'><Button variant="outline" className='gap-1'><b>Go</b> <FaArrowAltCircleRight /></Button></Link></div> :
                                        <div className='flex gap-4 justify-center my-7'>
                                            <Link to='/register'><Button variant="outline">Sign Up</Button></Link>
                                            <Button variant="outline"><Link to='/admin-login'>Login</Link></Button>
                                        </div>
                                }
                            </div>
                        </div>

                        {/* Paragraph  */}
                        <p
                            style={{ color: mode === 'dark' ? 'white' : 'white' }}
                            className="sm:text-3xl text-xl font-extralight sm:mx-auto ">
                            Here are some blogs and tutorials contributed by Arun.
                        </p>
                    </div>

                </main>
            </div >
        </section >
    )
}

export default HeroSection