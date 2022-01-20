import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAR } from "../utils/useAR";

const SecondaryHeader = (props: any) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuOpender = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        } else {
            setIsMenuOpen(true);
        }
    }
    return (
        
        <div>
            <>
                {isMenuOpen && (
                <div className="fixed z-20 left-0 bg-white w-7/12 p-8 h-full sm:hidden transition-all">
                    <div className="flex justify-between mb-4">
                        <h1 className="font-bold">LÄMP</h1>
                        <svg onClick={handleMenuOpender} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <ul className="font-semibold">
                        <li> <Link to="/">Home</Link> </li>
                        <li> <Link to="/products">Products</Link> </li>
                        <li> <Link to="/about">About</Link> </li>
                    </ul>
                </div>
                )}
            </>
            <header className="px-8 py-4 justify-between flex items-center bg-white fixed top-0 w-full z-10">
                <svg onClick={handleMenuOpender} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:hidden block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <div>
                    <h1 className="font-bold hidden sm:block">LÄMP</h1>
                </div>
                <ul className=" space-x-4 font-semibold sm:flex hidden">
                    <li> <Link to="/">Home</Link> </li>
                    <li> <Link to="/products">Products</Link> </li>
                    <li> <Link to="/about">About</Link> </li>
                </ul>
                <div className="flex space-x-4">
                <div className="flex items-center justify-center w-full">
                    
                    <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                        <div className="relative">
                        <input type="checkbox" id="toggleB" className="sr-only"/>
                        <div className="bgcolor block bg-orange-400 w-12 h-7 rounded-full">
                        </div>
                        <div className="dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition"></div>
                        </div>
                    </label>

                </div>
                    <div className="flex items-center justify-center rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>

                </div>
                
            </header>
        </div>
        
    );
};

export default SecondaryHeader;