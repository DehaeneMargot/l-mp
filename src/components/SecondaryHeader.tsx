import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/globalState";

const SecondaryHeader = (props: any) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [productOptionsOpen, setProductOptionsOpen] = useState(false);
    const [activePage] = useGlobalState("activePage");
    const [backButton, setBackButton] = useState<boolean>();
    const [isAtTop, setIsAtTop] = useState(true);
    const navigate = useNavigate();

    const handleMenuOpender = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        } else {
            setIsMenuOpen(true);
        }
    }

    const handleOptionsOpen = () => {
        if (productOptionsOpen) {
            setProductOptionsOpen(false);
        } else {
            setProductOptionsOpen(true);
        }
    }

    const handleScroll = () => {
        if (window.scrollY === 0) {
            if (!isAtTop) setIsAtTop(true);
        } else {
            if (isAtTop) setIsAtTop(false);
        }
    }

    window.addEventListener('scroll', handleScroll);

    useEffect(() => {
        if (activePage === "productdetail") {
            setBackButton(true);
        } else {
            setBackButton(false);
        }
        let main = document.getElementById("main");
        let toggle = document.getElementById("toggle") as HTMLInputElement;

        if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
            localStorage.setItem('theme', 'light');
            toggle!.checked = false;
            main?.classList.remove('dark');
        } else if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            localStorage.setItem('theme', 'dark');
            toggle!.checked = true;
            main?.classList.add('dark');
            toggle?.classList.add('checked');
        }
    }, [activePage])

    const handleDarkModeToggle = () => {
        let main = document.getElementById("main");

        if (localStorage.theme === 'light') {
            main?.classList.add('dark');
            localStorage.setItem('theme', 'dark');

        } else if(localStorage.theme === 'dark' ) {
            main?.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }


    return (
        
        <div id="main">
            <>
                {isMenuOpen && (
                <div className="fixed z-40 left-0 bg-white w-7/12 p-8 h-full sm:hidden transition-all">
                    <div className="flex justify-between mb-4">
                        <h1 className="font-bold dark:text-white">LÄMP</h1>
                        <svg onClick={handleMenuOpender} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <ul className="font-semibold">
                        <li> <Link to="/home">Home</Link> </li>
                        <li><p>Lamps</p>
                            <div className="py-1 flex flex-col" role="none">
                                <Link replace to="/lamps?type=all_lamps" className="text-black px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" id="menu-item-2" onClick={handleMenuOpender}>All lamps</Link>
                                <Link replace to="/lamps?type=table_lamps" className="text-black px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" id="menu-item-0" onClick={handleMenuOpender}>Table lamps</Link>
                                <Link replace to="/lamps?type=ceiling_lamps" className="text-black px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" id="menu-item-1" onClick={handleMenuOpender}>Ceiling lamps</Link>
                                <Link replace to="/lamps?type=standing_lamps" className="text-black px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" id="menu-item-2" onClick={handleMenuOpender}>Standing lamps</Link>
                                <Link replace to="/lamps?type=desk_lamps" className="text-black px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" id="menu-item-2" onClick={handleMenuOpender}>Desk lamps</Link>
                                <Link replace to="/lamps?type=wall_lamps" className="text-black px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" id="menu-item-2" onClick={handleMenuOpender}>Wall lamps</Link>
                            </div>
                        </li>
                    </ul>
                </div>
                )}
            </>
            
            <header className={`${
                (isAtTop) ? "bg-transparent" : "bg-white dark:bg-zinc-900"
                }  md:px-8 px-4 py-4 justify-between flex items-center fixed top-0 w-full z-30`}>
                <div>
                    {backButton ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer dark:stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => navigate(-1)}>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                    ): (
                        <div>
                            <svg onClick={handleMenuOpender} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:hidden block dark:stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <h1 className="font-bold hidden sm:block dark:text-white">LÄMP</h1>
                        </div>
                    )}
                </div>
                <ul className=" space-x-4 font-semibold sm:flex hidden">
                    <li> <Link className="dark:text-white" to="/home">Home</Link> </li>
                    <li onClick={handleOptionsOpen} onMouseLeave={() => {setProductOptionsOpen(false)}} className="relative">
                        <button className="flex justify-center items-center ">
                            <h1 className="font-semibold dark:text-white">Lamps</h1>
                            <svg className="-mr-1 ml-1 h-5 w-5 dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                            {productOptionsOpen && (
                                <div className="absolute right-30 top-6 w-44 rounded-md ring-1 ring-neutral-100 shadow-lg bg-white focus:outline-none">
                                    <div className="md:py-0 py-1 flex flex-col text-left divide-y divide-neutral-100" role="none">
                                        <Link replace to="/lamps?type=all_lamps" className="text-black px-4 py-2 text-sm hover:bg-gray-100 " onClick={handleMenuOpender}>All lamps</Link>
                                        <Link replace to="/lamps?type=table_lamps" className="text-black px-4 py-2 text-sm hover:bg-gray-100" onClick={handleMenuOpender}>Table lamps</Link>
                                        <Link replace to="/lamps?type=ceiling_lamps" className="text-black px-4 py-2 text-sm hover:bg-gray-100" onClick={handleMenuOpender}>Ceiling lamps</Link>
                                        <Link replace to="/lamps?type=standing_lamps" className="text-black px-4 py-2 text-sm hover:bg-gray-100" onClick={handleMenuOpender}>Standing lamps</Link>
                                        <Link replace to="/lamps?type=desk_lamps" className="text-black px-4 py-2 text-sm hover:bg-gray-100" onClick={handleMenuOpender}>Desk lamps</Link>
                                        <Link replace to="/lamps?type=wall_lamps" className="text-black px-4 py-2 text-sm hover:bg-gray-100" onClick={handleMenuOpender}>Wall lamps</Link>
                                    </div>
                                </div>
                            )}
                        </button>


                    </li>
                </ul>
                <div className="flex space-x-4">
                <div className="flex items-center justify-center w-full">
                    
                    <label htmlFor="toggle" className="flex items-center cursor-pointer">
                        <div className="relative">
                        <input type="checkbox" id="toggle" className="sr-only" onChange={handleDarkModeToggle}/>
                        <div className="bgcolor block bg-orange-400 w-12 h-7 rounded-full">
                        </div>
                        <div className="dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition"></div>
                        </div>
                    </label>

                </div>
                    <div className="flex items-center justify-center rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>

                </div>
                
            </header>
        </div>
        
    );
};

export default SecondaryHeader;