import SecondaryHeader from "../components/SecondaryHeader";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import lamps from '../data/lamps.json';

const Home = () => {

    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState<string>();
    const [categoryDisplayed, setCategoryDisplayed] = useState<string>();
    const location = useLocation();
    const [allFilteredLamps, setAllFilteredLamps] = useState<Array<any>>([]);
    const [allLamps, setAllLamps] = useState<Array<any>>([]);
    const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>();

    let allFilteredLampsTest:any = [];
    let filteredLamps:Array<any> = [];

    const getCurrentCategory = async () => {
        console.log("now this code")
		const urlParams = new URLSearchParams(location.search)
		let currentCategory = await urlParams.get("type")!
        console.log(currentCategory)
		setCategory(currentCategory);
        getProducts(currentCategory);
        let cased = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
        let fullname = cased.split("_").join(" ");
        setCategoryDisplayed(fullname);
	}

    useEffect(() => {
        async function start() {
            await getCurrentCategory();
            setLoading(false);
        }
        start()
	}, [location])
    
    const getProducts = (currentCategory: string) => {
        const lampsArray = lamps.lamps;
        setAllLamps(lampsArray);

        lampsArray.forEach(lamp => {
            if(lamp.category == currentCategory) {
                filteredLamps.push(lamp)
            }
        });
        setAllFilteredLamps(filteredLamps);
    }

    


    return (
        <div id="main">
            {loading ? (
                <div>
                    Loading
                </div>
            ) : (
                <>
                    <SecondaryHeader/>
                    <div className="h-screen bg-white dark:bg-zinc-900">
                        <div className="max-w-8xl w-full mx-auto p-4">
                            <div className="pt-20">
                                
                                    {category == "all_lamps" ? (
                                        <>
                                        <div className="flex items-center space-x-2 pb-4">
                                            <h1 className="text-2xl md:text-3xl font-semibold dark:text-white">Lamps</h1>
                                        </div>

                                        <form className="flex items-center space-x-4 mb-8">
                                            <input type="text" placeholder={"Search for Lämps..."} className="bg-neutral-200 dark:bg-zinc-800 w-full h-full pl-12  rounded-md p-3 border dark:border-zinc-800 border-neutral-100 focus:outline-none hover:border hover:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-40"/>
                                        </form>

                                        <div className="grid grid-cols-5 gap-8 mb-4">
                                            <Link replace to="/lamps?type=table_lamps" className="dark:bg-zinc-800 bg-neutral-100 hover:bg-neutral-200 p-4 rounded-md relative overflow-hidden h-24">
                                                <p className="font-semibold text-lg dark:text-white">Table lamps</p>
                                                <img draggable="false" className="select-none h-20 w-20 absolute right-4 bottom-0" src="/images/categories/tablelamp.svg" alt="" />
                                            </Link>
                                            <Link replace to="/lamps?type=desk_lamps" className="dark:bg-zinc-800 bg-neutral-100 hover:bg-neutral-200 p-4 rounded-md relative overflow-hidden h-24">
                                                <p className="font-semibold text-lg dark:text-white">Desk lamps</p>
                                                <img draggable="false" className="select-none h-20 w-20 absolute right-4 bottom-0" src="/images/categories/desklamp.svg" alt="" />
                                            </Link>
                                            <Link replace to="/lamps?type=standing_lamps" className="dark:bg-zinc-800 bg-neutral-100 hover:bg-neutral-200 p-4 rounded-md relative overflow-hidden h-24">
                                                <p className="font-semibold text-lg dark:text-white">Standing lamps</p>
                                                <img draggable="false" className="select-none h-20 w-20 absolute right-4 bottom-0" src="/images/categories/standinglamp.svg" alt="" />
                                            </Link>
                                            <Link replace to="/lamps?type=ceiling_lamps" className="dark:bg-zinc-800 bg-neutral-100 hover:bg-neutral-200 p-4 rounded-md relative overflow-hidden h-24">
                                                <p className="font-semibold text-lg dark:text-white">Ceiling lamps</p>
                                                <img draggable="false" className="select-none h-20 w-20 absolute right-4 top-0" src="/images/categories/ceilinglamp.svg" alt="" />
                                            </Link>
                                            <Link replace to="/lamps?type=wall_lamps" className="dark:bg-zinc-800 bg-neutral-100 hover:bg-neutral-200 p-4 rounded-md relative overflow-hidden h-24">
                                                <p className="font-semibold text-lg dark:text-white">Wall lamps</p>
                                                <img draggable="false" className="select-none h-20 w-20 absolute right-4 top-0 " src="/images/categories/walllamp.svg" alt="" />
                                            </Link>
                                        </div>

                                        <h2 className="text-lg md:text-xl font-semibold pb-2 pt-6 dark:text-white">All lamps</h2>
                                        
                                        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:gap-8 gap-4" >
                                            {allLamps.map((item: any) => (
                                                <button className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg">
                                                    <div className="dark:bg-black bg-neutral-50 rounded-lg flex justify-center items-center overflow-hidden cursor-pointer -mb-2" onClick={() => navigate(`detail?id=${item.id}`)}>
                                                        <img className="h-full hidden dark:block" src={item.imageDark} />
                                                        <img className="h-full dark:hidden block" src={item.image} />
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
                                            <Link replace to="/lamps?type=all_lamps" className="text-2xl md:text-3xl font-semibold">Lamps</Link>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                            {category != null && (
                                                <p className="text-2xl md:text-3xl text-orange-500 font-semibold">{categoryDisplayed}</p>
                                            )}
                                        </div>

                                        <form className="flex items-center space-x-4 mb-4">
                                            <input type="text" placeholder={"Search for Lämps..."} className="bg-neutral-200 searchbar w-full h-full pl-12  rounded-md p-3 border border-neutral-100 focus:outline-none hover:border hover:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-40"/>
                                        </form>
                                        
                                        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:gap-8 gap-4" >
                                            {allFilteredLamps.map((item: any) => (
                                                <button className="bg-white rounded-lg shadow-lg">
                                                    <div className="bg-neutral-50 rounded-lg flex justify-center items-center overflow-hidden cursor-pointer -mb-2" onClick={() => navigate(`detail?id=${item.id}`)}>
                                                        <img className="h-full" src={item.image} />
                                                    </div>
                                                    <div className="p-2 md:p-4">
                                                        <h3 className="text-black text-lg text-left">
                                                            {item.name}
                                                        </h3>
                                                        <div className="flex justify-between items-center">
                                                            <p className="font-bold text-2xl" >
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
                </>
            )}  
        </div>
    )

}

export default Home