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
                            <div className="pt-20 md:pt-24 grid md:grid-cols-2 gap-6 px-4 pb-8">
                                <div className="relatives overflow-hidden bg-neutral-50 w-full rounded-3xl flex justify-center items-center">
                                    <img className="" src={currentLamp.image} />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-2xl lg:text-6xl font-semibold">{currentLamp.name}</h1>
                                        <p className="md:hidden text-2xl font-semibold">€ {currentLamp.price }</p>
                                    </div>
                                    <div className="flex space-x-2 items-center">
                                        <p className="font-semibold">{currentLamp.rating}</p>
                                        <Rating readOnly name="size-medium" defaultValue={currentLamp.rating} precision={0.5} />
                                    </div>
                                    <div>
                                        <div className="border-l-4 border-orange-500 pl-4">
                                            {currentLamp.description}
                                        </div>
                                    </div>
                                    <div className="mt-4 border-t-2 border-b-2 border-neutral-100 p-4">
                                        <button className="flex w-full justify-between" onClick={handleSpecifications}>
                                            <p className="font-semibold">Specifications</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" id="chevron" className={`${
                                                specificationsOpen ? "rotate-180" : "rotate-0"} transition-all h-6 w-6 cursor-pointer select-none`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        
                                        {specificationsOpen && (
                                            <div className="flex space-x-4 mt-4 w-full">
                                                <div>
                                                    <div className="bg-neutral-100 h-14 w-14 rounded-md flex justify-center items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 18 20">
                                                            <path id="Path_59" data-name="Path 59" d="M13,10V3L4,14h7v7l9-11Z" transform="translate(-3 -2)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                                        </svg>

                                                    </div>
                                                    <p className="mt-2 flex justify-center font-semibold text-sm">{currentLamp.cord}</p>
                                                </div>
                                                <div>
                                                    <div className="bg-neutral-100 h-14 w-14 rounded-md flex justify-center items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                        </svg>
                                                    </div>
                                                    <p className="mt-2 flex justify-center font-semibold text-sm">{currentLamp.watt}</p>
                                                </div>
                                                <div>
                                                    <div className="bg-neutral-100 h-14 w-14 rounded-md flex justify-center items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24.25 20">
                                                            <line id="Line_11" data-name="Line 11" x2="7" transform="translate(16.5 18.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="1.5"/>
                                                            <g id="Ellipse_150" data-name="Ellipse 150" fill="#fff" stroke="#000" stroke-width="1.5">
                                                                <circle cx="10" cy="10" r="10" stroke="none"/>
                                                                <circle cx="10" cy="10" r="9.25" fill="none"/>
                                                            </g>
                                                            <g id="Ellipse_146" data-name="Ellipse 146" transform="translate(3)" fill="#fff" stroke="#000" stroke-width="1.5">
                                                                <circle cx="10" cy="10" r="10" stroke="none"/>
                                                                <circle cx="10" cy="10" r="9.25" fill="none"/>
                                                            </g>
                                                            <g id="Ellipse_147" data-name="Ellipse 147" transform="translate(5 2)" fill="#fff" stroke="#000" stroke-width="1.5">
                                                                <circle cx="8" cy="8" r="8" stroke="none"/>
                                                                <circle cx="8" cy="8" r="7.25" fill="none"/>
                                                            </g>
                                                            <g id="Ellipse_148" data-name="Ellipse 148" transform="translate(7 4)" fill="#fff" stroke="#000" stroke-width="1.5">
                                                                <circle cx="6" cy="6" r="6" stroke="none"/>
                                                                <circle cx="6" cy="6" r="5.25" fill="none"/>
                                                            </g>
                                                            <g id="Ellipse_149" data-name="Ellipse 149" transform="translate(10 7)" stroke="#000" stroke-width="1.5">
                                                                <circle cx="3" cy="3" r="3" stroke="none"/>
                                                                <circle cx="3" cy="3" r="2.25" fill="none"/>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <p className="mt-2 flex justify-center font-semibold text-sm">{currentLamp.material}</p>
                                                </div>
                                                <div>
                                                    <div className="bg-neutral-100 h-14 w-14 rounded-md flex justify-center items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                                        </svg>
                                                    </div>
                                                    <p className="mt-2 flex justify-center font-semibold text-sm">{currentLamp.numberOfColors} colors</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="sticky bottom-0 right-0 left-0 md:relative w-full md:bg-transparent bg-white">
                                        <div className="md:space-x-2 spaxe-x-1 flex items-center justify-center md:justify-between pt-4">
                                            <p className="text-4xl font-semibold hidden md:block">€ {currentLamp.price }</p>
                                            <div className="flex md:space-x-4">   
                                                <ARButton lamp={currentLamp}/>
                                                <button className="bg-orange-500 rounded-lg border-orange-500 border-2 px-4 py-2 text-white font-semibold hover:bg-orange-400 hover:border-orange-400">
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