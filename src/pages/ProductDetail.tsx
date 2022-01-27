import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import ARButton from "../components/ARButton"
import SecondaryHeader from "../components/SecondaryHeader"
import lamps from '../data/lamps.json';
import Rating from '@mui/material/Rating';



const ProductDetail = (props:any) => {

    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState<string>();
    const [allLamps, setAllLamps] = useState<Array<any>>([]);
    const [currentLamp, setCurrentLamp] = useState<any>();
    const [specificationsOpen, setSpecificationsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const getCurrentLamp = async () => {
        console.log("now this code")
		const urlParams = new URLSearchParams(location.search)
		let currentId = await urlParams.get("id")!
        getProductById(currentId);
	}

    const getProductById = (currentId: string) => {
        const lampsArray = lamps.lamps;
        setAllLamps(lampsArray);

        let item = lampsArray.find(i => i.id === currentId);
        setCurrentLamp(item);
        console.log(item)
    }

    const handleSpecifications = () => {
        //var element = document.getElementById(chevron);
        if(!specificationsOpen) {
            setSpecificationsOpen(true);
            
        } else {
            setSpecificationsOpen(false);
        }
    }


    useEffect(() => {
        async function start() {
            await getCurrentLamp();
            setLoading(false);
        }
        start()
	}, [])

    return (
        <div>
            {loading ? (
                <div>
                    Loading
                </div>
            ) : (
                <div>
                    <div className="md:px-8 px-4 py-4 justify-between flex items-center bg-white fixed top-0 w-full z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => navigate(-1)}>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                        <div className="flex justify-center items-center space-x-4">
                            <div className="">
                            
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
                    </div>
                    <div className="bg-white h-screen">
                        <div className="max-w-8xl w-full mx-auto">
                            <div className="pt-24 grid md:grid-cols-detail gap-6 h-screen px-4 pb-8">
                                <div className="relative h-80 lg:h-full bg-gray-100 w-full rounded-3xl p-4 flex justify-center items-center">
                                    
                                    Image
                                </div>
                                <div className="space-y-4">
                                    <h1 className="text-2xl lg:text-6xl font-semibold">{currentLamp.name}</h1>
                                    <div className="flex space-x-2 items-center">
                                        <p className="font-semibold">{currentLamp.rating}</p>
                                        <Rating readOnly name="size-medium" defaultValue={currentLamp.rating} precision={0.5} />
                                    </div>
                                    <div>
                                        <div className="border-l-4 border-orange-500 px-4 p-2">
                                            {currentLamp.description}
                                        </div>
                                    </div>
                                    <div className="mt-4 border-t-2 border-b-2 border-neutral-100 p-4">
                                        <div className="flex justify-between" onClick={handleSpecifications}>
                                            <p>Specifications</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" id="chevron" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        
                                        {specificationsOpen && (
                                            <div className="grid grid-cols-3">
                                                <div>
                                                    <p>Material</p>
                                                    <p>{currentLamp.material}</p>
                                                </div>
                                                <div>
                                                    <p>Size</p>
                                                    <p>{currentLamp.size}</p>
                                                </div>
                                                <div>
                                                    <p>Watt</p>
                                                    <p>{currentLamp.watt}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="sticky bottom-0 right-0 left-0 md:relative w-full md:bg-transparent bg-white">
                                        <p className="text-gray-400 text-md pt-4">Price</p>
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-3xl ">$ 80</p>
                                            <div className="md:space-x-2 spaxe-x-1 flex">
                                                <ARButton/>
                                                <button className="bg-orange-500 rounded-lg border-orange-500 border-2 px-4 py-2 mb-4 text-white font-semibold hover:bg-orange-400">
                                                    Add to Cart
                                                </button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    )

}

export default ProductDetail