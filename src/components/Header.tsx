import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAR } from "../utils/useAR";

const Header = (props: any) => {
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        if (window.pageYOffset > 0) {
            if (isAtTop) setIsAtTop(false);
        } else {
        if (!isAtTop) setIsAtTop(true);
        }
    }, [window.pageYOffset])

    return (
        <>
        {isAtTop ? (
            <header className="px-8 py-4 justify-between flex items-center bg-yellow-50 fixed top-0 w-full z-10">
            <div>
                <h1 className="font-bold">LÄMP</h1>
            </div>
            <ul className=" space-x-4 font-semibold flex">
                <li> <Link to="/">Home</Link> </li>
                <li> <Link to="/products">Products</Link> </li>
                <li> <Link to="/about">About</Link> </li>
            </ul>
            <div className="flex space-x-4">
            <div className="flex items-center justify-center w-full">
                
                <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                    <div className="relative">
                    <input type="checkbox" id="toggleB" className="sr-only"/>
                    <div className="bgcolor block bg-yellow-400 w-12 h-7 rounded-full">
                    </div>
                    <div className="dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition"></div>
                    </div>
                </label>

            </div>
                <div className="flex items-center justify-center bg-gray-200 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>

            </div>
            
        </header>
        ) : (
            <header className="px-8 py-4 justify-between flex items-center">
            <div>
                <h1 className="font-bold">LÄMP</h1>
            </div>
            <ul className=" space-x-4 font-semibold flex">
                <li> <Link to="/">Home</Link> </li>
                <li> <Link to="/products">Products</Link> </li>
                <li> <Link to="/about">About</Link> </li>
            </ul>
            <div className="flex space-x-4">
            <div className="flex items-center justify-center w-full">
                
                <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                    <div className="relative">
                    <input type="checkbox" id="toggleB" className="sr-only"/>
                    <div className="bgcolor block bg-yellow-400 w-12 h-7 rounded-full">
                    </div>
                    <div className="dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition"></div>
                    </div>
                </label>

            </div>
                <div className="flex items-center justify-center bg-gray-200 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>

            </div>
            
        </header>
        )}
        
        </>
        
    );
};

export default Header;