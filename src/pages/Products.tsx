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
        console.log(filteredLamps)
    }

    


    return (
        <div>
            {loading ? (
                <div>
                    Loading
                </div>
            ) : (
                <>
                    <SecondaryHeader/>
                    <div className="h-screen bg-neutral-100">
                        <div className="max-w-8xl w-full mx-auto p-4">
                            <div className="pt-20">
                                
                                    {category == "all_lamps" ? (
                                        <>
                                        <div className="flex items-center space-x-2 pb-4">
                                            <h1 className="text-2xl font-semibold">Lamps</h1>
                                        </div>
                                        
                                        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:gap-6 gap-4" >
                                            {allLamps.map((item: any) => (
                                                <button className="bg-white rounded-lg shadow-lg">
                                                    <div className="h-44 md:h-56 flex justify-center items-center p-4 cursor-pointer border-b" onClick={() => navigate(`detail?id=${item.id}`)}>
                                                        image
                                                    </div>
                                                    <div className="p-2 md:p-4">
                                                        <h3 className="text-black text-lg text-left">
                                                            {item.name}
                                                        </h3>
                                                        <div className="flex justify-between items-center">
                                                            <p className="font-bold text-2xl" >
                                                            $ {item.price}
                                                            </p>
                                                            <button className="rounded-full bg-orange-500 p-3 flex justify-center items-center hover:bg-orange-400">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18.915" height="18.915" viewBox="0 0 18.915 18.915">
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
                                            <Link replace to="/lamps?type=all_lamps" className="text-2xl font-semibold">Lamps</Link>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                            {category != null && (
                                                <p className="text-2xl text-orange-500 font-semibold">{categoryDisplayed}</p>
                                            )}
                                        </div>
                                        
                                        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-6" >
                                            {allFilteredLamps.map((item: any) => (
                                                <button className="bg-white rounded-lg shadow-md">
                                                    <div className="rounded-lg h-56 flex justify-center items-center p-4 cursor-pointer" onClick={() => navigate(`detail?id=${item.id}`)}>
                                                        
                                                    </div>
                                                    <div className="p-4">
                                                        <h3 className="text-black text-lg text-left">
                                                            {item.name}
                                                        </h3>
                                                        <div className="flex justify-between items-center">
                                                            <p className="font-bold text-xl" >
                                                            {item.price}
                                                            </p>
                                                            <button className="rounded-full bg-orange-500 p-3 flex justify-center items-center hover:bg-orange-400">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18.915" height="18.915" viewBox="0 0 18.915 18.915">
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