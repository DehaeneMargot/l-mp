import Header from "../components/Header";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import lamps from '../data/lamps.json';
import { setGlobalState } from "../utils/globalState";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const Products = () => {

    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState<string>();
    const [categoryDisplayed, setCategoryDisplayed] = useState<string>();
    const location = useLocation();
    const [allFilteredLamps, setAllFilteredLamps] = useState<Array<any>>([]);
    const [allLamps, setAllLamps] = useState<Array<any>>([]);
    const [search, setSearch] = useState<string>('');

    let filteredLamps:Array<any> = [];

    useEffect(() => {
		setGlobalState("activePage", "products");
	}, [])

    useEffect(() => {
        let allProducts = lamps.lamps;
        if (category === "all_lamps") {
            let filter = allProducts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
            setAllLamps(filter);
        } else {
            let filter = allProducts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) && p.category === category);
            setAllFilteredLamps(filter);
        }
    }, [search])

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        let currentCategory = urlParams.get("type")!
        
        setCategory(currentCategory);
        getProducts(currentCategory);

        let cased = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
        let fullname = cased.split("_").join(" ");
        setCategoryDisplayed(fullname);
        setLoading(false);

	}, [location])
    
    const getProducts = (currentCategory: string) => {
        const lampsArray = lamps.lamps;
        setAllLamps(lampsArray);

        lampsArray.forEach(lamp => {
            if(lamp.category === currentCategory) {
                filteredLamps.push(lamp)
            }
        });
        setAllFilteredLamps(filteredLamps);
    }


    return (
        <div id="main" className="">
            {loading ? (
                <div>
                    <Loading/>
                </div>
            ) : (
                <>
                    <Header/>
                    <div className=" bg-white dark:bg-zinc-900">
                        <div className="max-w-8xl w-full mx-auto p-4 min-h-screen">
                            <div className="md:pt-20 pt-16">
                                
                                    {category === "all_lamps" ? (
                                        <>
                                        <div className="flex items-center space-x-2 pb-4">
                                            <h1 className="text-2xl md:text-3xl font-semibold dark:text-white">Lamps</h1>
                                        </div>

                                        <div className="flex items-center space-x-4 mb-8">

                                            <input type="text" onChange={(e) => {setSearch(e.target.value)}} placeholder={"Search for Lämps..."} className="relative dark:text-white bg-neutral-100 dark:bg-zinc-800 w-full h-full pl-12  rounded-md p-3 border dark:border-zinc-800 dark:hover:border-orange-500 border-neutral-100 focus:outline-none hover:border hover:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-40"/>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute h-6 w-6 dark:stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>

                                        <div className="relative">
                                            <div className="overflow-x-auto flex md:grid md:grid-cols-5 md:gap-8 mb-4 snap-x scroll space-x-4 scrollbar-hide">
                                            <Link replace to="/lamps?type=table_lamps" className="min-w-min snap-start dark:bg-zinc-800 bg-neutral-100 dark:hover:bg-zinc-700 hover:bg-neutral-200 p-4 rounded-md relative overflow-hidden md:h-24">
                                                <p className="font-semibold md:text-lg dark:text-white whitespace-nowrap">Table lamps</p>
                                                <img draggable="false" className="hidden md:block select-none h-20 w-20 md:absolute right-4 bottom-0" src="/images/categories/tablelamp.svg" alt="" />
                                            </Link>
                                            <Link replace to="/lamps?type=desk_lamps" className="min-w-min snap-start dark:bg-zinc-800 bg-neutral-100 dark:hover:bg-zinc-700 hover:bg-neutral-200 p-4 rounded-md relative overflow-hidden md:h-24">
                                                <p className="font-semibold md:text-lg dark:text-white whitespace-nowrap">Desk lamps</p>
                                                <img draggable="false" className="hidden md:block select-none h-20 w-20 absolute right-4 bottom-0" src="/images/categories/desklamp.svg" alt="" />
                                            </Link>
                                            <Link replace to="/lamps?type=standing_lamps" className="min-w-min snap-start dark:bg-zinc-800 bg-neutral-100 dark:hover:bg-zinc-700 hover:bg-neutral-200 p-4 rounded-md relative overflow-hidden md:h-24">
                                                <p className="font-semibold md:text-lg dark:text-white whitespace-nowrap">Standing lamps</p>
                                                <img draggable="false" className="hidden md:block select-none h-20 w-20 absolute right-4 bottom-0" src="/images/categories/standinglamp.svg" alt="" />
                                            </Link>
                                            <Link replace to="/lamps?type=ceiling_lamps" className="min-w-min snap-start dark:bg-zinc-800 bg-neutral-100 dark:hover:bg-zinc-700 hover:bg-neutral-200 p-4 rounded-md relative overflow-hidden md:h-24">
                                                <p className="font-semibold md:text-lg dark:text-white whitespace-nowrap">Ceiling lamps</p>
                                                <img draggable="false" className="hidden md:block select-none h-20 w-20 absolute right-4 top-0" src="/images/categories/ceilinglamp.svg" alt="" />
                                            </Link>
                                            <Link replace to="/lamps?type=wall_lamps" className="min-w-min snap-start dark:bg-zinc-800 bg-neutral-100 dark:hover:bg-zinc-700 hover:bg-neutral-200 p-4 rounded-md relative overflow-hidden md:h-24">
                                                <p className="font-semibold md:text-lg dark:text-white whitespace-nowrap">Wall lamps</p>
                                                <img draggable="false" className="hidden md:block select-none h-20 w-20 absolute right-4 top-0 " src="/images/categories/walllamp.svg" alt="" />
                                            </Link>
                                        </div>
                                        </div>
                                        

                                        <h2 className="text-lg md:text-xl font-semibold pb-2 md:pt-6 dark:text-white">All lamps</h2>
                                        
                                        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:gap-8 gap-4" >
                                            {allLamps.map((item: any) => (
                                                <button className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg">
                                                    <div className="relative dark:bg-black bg-neutral-50 rounded-lg flex justify-center items-center overflow-hidden cursor-pointer -mb-2" onClick={() => navigate(`detail?id=${item.id}&color=${item.colors[0].name}`)}>
                                                        <div className="absolute top-2 right-2 flex space-x-1 text-white font-semibold text-lg items-center">
                                                            <p>{item.colors.length}</p>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                                            </svg>
                                                        </div>
                                                        <img alt="Dark image" className="h-full hidden dark:block" src={item.colors[0].imageDark} />
                                                        <img alt="Image" className="h-full dark:hidden block" src={item.colors[0].image} />
                                                    </div>
                                                    <div className="p-2 md:p-4">
                                                        <h3 className="dark:text-white text-black text-lg text-left">
                                                            {item.name}
                                                        </h3>
                                                        <div className="flex justify-between items-center">
                                                            <p className="font-bold text-2xl dark:text-white" >
                                                            € {item.price}
                                                            </p>
                                                            <button className="rounded-full bg-orange-500 p-3 flex justify-center items-center hover:bg-orange-400">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18.915" height="18.915" viewBox="0 0 18.915 18.915" >
                                                                    <g id="Icon_feather-plus" data-name="Icon feather-plus" transform="translate(1.5 1.5)">
                                                                        <path id="Path_19" data-name="Path 19" d="M18,7.5V23.415" transform="translate(-10.042 -7.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                                                        <path id="Path_20" data-name="Path 20" d="M7.5,18H23.415" transform="translate(-7.5 -10.042)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                        </>
                                    ) : (
                                        <>
                                        <div className="flex items-center space-x-2 pb-4">
                                            <Link replace to="/lamps?type=all_lamps" className="text-2xl md:text-3xl font-semibold dark:text-white">Lamps</Link>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                            {category != null && (
                                                <p className="text-2xl md:text-3xl text-orange-500 font-semibold">{categoryDisplayed}</p>
                                            )}
                                        </div>

                                        <form className="flex items-center space-x-4 mb-8">
                                            <input type="text" onChange={(e) => {setSearch(e.target.value)}} placeholder={"Search for Lämps..."} className="dark:text-white relative bg-neutral-100 dark:bg-zinc-800 w-full h-full pl-12  rounded-md p-3 border dark:border-zinc-800 dark:hover:border-orange-500 border-neutral-100 focus:outline-none hover:border hover:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-40"/>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute h-6 w-6 dark:stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </form>
                                        
                                        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:gap-8 gap-4" >
                                            {allFilteredLamps.map((item: any) => (
                                                <button className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg">
                                                    <div className="relative dark:bg-black bg-neutral-50 rounded-lg flex justify-center items-center overflow-hidden cursor-pointer -mb-2" onClick={() => navigate(`detail?id=${item.id}&color=${item.colors[0].name}`)}>
                                                        <div className="absolute top-2 right-2 flex space-x-1 text-white font-semibold text-lg items-center">
                                                            <p>{item.colors.length}</p>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                                            </svg>
                                                        </div>
                                                        <img alt="Dark image" className="h-full hidden dark:block" src={item.colors[0].imageDark} />
                                                        <img alt="Image" className="h-full dark:hidden block" src={item.colors[0].image} />
                                                    </div>
                                                    <div className="p-2 md:p-4">
                                                        <h3 className="dark:text-white text-black text-lg text-left">
                                                            {item.name}
                                                        </h3>
                                                        <div className="flex justify-between items-center">
                                                            <p className="font-bold text-2xl dark:text-white" >
                                                            € {item.price}
                                                            </p>
                                                            <button className="rounded-full bg-orange-500 p-3 flex justify-center items-center hover:bg-orange-400">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18.915" height="18.915" viewBox="0 0 18.915 18.915" >
                                                                    <g id="Icon_feather-plus" data-name="Icon feather-plus" transform="translate(1.5 1.5)">
                                                                        <path id="Path_19" data-name="Path 19" d="M18,7.5V23.415" transform="translate(-10.042 -7.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                                                        <path id="Path_20" data-name="Path 20" d="M7.5,18H23.415" transform="translate(-7.5 -10.042)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                            </div>
                                        </>
                                    )}
                            </div>
                        </div>
                    </div>
                    <footer className="dark:bg-zinc-1000 bg-neutral-100 h-auto">
                        <Footer />
                    </footer>
                </>
            )}  
        </div>
    )

}

export default Products