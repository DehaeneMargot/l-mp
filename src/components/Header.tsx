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
                        <img src="/images/logo/lamp_logo.png" className="h-5 " alt="" />
                        <svg onClick={handleMenuOpender} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <ul className="font-semibold">
                        <li> <Link to="/">Home</Link> </li>
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
                } px-6 py-4 fixed top-0 w-full z-30`}>
                    <div className="max-w-8xl md:px-4 mx-auto justify-between flex items-center ">
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
                                <Link replace to="/"><svg className="h-5 hidden sm:block dark:stroke-white dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.15 53.77"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M0,9.44H7v38H18.43v6.34H0Z"/><path d="M27.42,9.44h9.44l7.22,44.33h-7L35.84,45v.13H27.93l-1.27,8.68H20.2ZM24.19,0H30.4V6.46H24.19ZM35,39.07l-3.1-21.91h-.13l-3,21.91ZM33.94,0h6.21V6.46H33.94Z"/><path d="M47.43,9.44h9.94l4.44,31.72h.12L66.37,9.44h9.94V53.77H69.72V20.2H69.6L64.53,53.77H58.7L53.64,20.2h-.13V53.77H47.43Z"/><path d="M81.5,9.44H91.76q5.19,0,7.79,2.78t2.6,8.17v4.37q0,5.39-2.6,8.17t-7.79,2.79H88.47V53.77h-7ZM91.76,29.38a3.24,3.24,0,0,0,2.56-.95,4.81,4.81,0,0,0,.86-3.23V20a4.81,4.81,0,0,0-.86-3.23,3.28,3.28,0,0,0-2.56-.95H88.47V29.38Z"/></g></g></svg></Link>
                            </div>
                        )}
                    </div>
                    <ul className=" space-x-4 font-semibold sm:flex hidden">
                        <li> <Link className="dark:text-white" to="/">Home</Link> </li>
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
                            <div className="bgcolor bg-orange-400 w-12 h-7 rounded-full flex justify-between items-center px-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 17.353 17.353">
                                    <path id="Icon_feather-moon" data-name="Icon feather-moon" d="M19.909,12.868A7.692,7.692,0,1,1,11.542,4.5a5.983,5.983,0,0,0,8.367,8.368Z" transform="translate(-3.557 -3.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 19.763 19.763">
                                    <path id="Icon_metro-sun" data-name="Icon metro-sun" d="M15.344,9.381A5.321,5.321,0,1,0,20.665,14.7a5.327,5.327,0,0,0-5.321-5.321Zm0,9.122a3.8,3.8,0,1,1,3.8-3.8A3.8,3.8,0,0,1,15.344,18.5Zm0-10.642a.76.76,0,0,0,.76-.76V5.58a.76.76,0,1,0-1.52,0V7.1A.76.76,0,0,0,15.344,7.861Zm0,13.682a.76.76,0,0,0-.76.76v1.52a.76.76,0,1,0,1.52,0V22.3A.76.76,0,0,0,15.344,21.543ZM21.256,9.864l1.075-1.075a.76.76,0,1,0-1.075-1.075L20.181,8.789a.76.76,0,1,0,1.075,1.075ZM9.433,19.54,8.358,20.615a.76.76,0,0,0,1.075,1.075l1.075-1.075A.76.76,0,0,0,9.433,19.54ZM8.5,14.7a.76.76,0,0,0-.76-.76H6.223a.76.76,0,1,0,0,1.52h1.52A.76.76,0,0,0,8.5,14.7Zm15.963-.76h-1.52a.76.76,0,0,0,0,1.52h1.52a.76.76,0,0,0,0-1.52ZM9.432,9.864a.76.76,0,1,0,1.075-1.075L9.432,7.714A.76.76,0,0,0,8.357,8.789Zm11.826,9.675a.76.76,0,0,0-1.075,1.075l1.075,1.075a.76.76,0,1,0,1.075-1.075Z" transform="translate(-5.463 -4.82)" fill="#fff"/>
                                </svg>
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
                    </div>
                
                
            </header>
        </div>
        
    );
};

export default SecondaryHeader;