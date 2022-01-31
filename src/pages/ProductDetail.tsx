import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import ARButton from "../components/ARButton"
import SecondaryHeader from "../components/SecondaryHeader"
import lamps from '../data/lamps.json';
import Rating from '@mui/material/Rating';
import { setGlobalState } from "../utils/globalState";

const ProductDetail = (props:any) => {

    const [loading, setLoading] = useState(true);
    const [currentLamp, setCurrentLamp] = useState<any>();
    const [currentColor, setCurrentColor] = useState<any>();
    const [specificationsOpen, setSpecificationsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedDarkImage, setSelectedDarkImage] = useState('');
    const location = useLocation();
    

    useEffect(() => {
		setGlobalState("activePage", "productdetail");
	}, [])

    const getProductById = (currentId: string, currentColor: string) => {
        const lampsArray = lamps.lamps;

        let item = lampsArray.find(i => i.id === currentId);
        setCurrentLamp(item);

        let color = item!.colors.find((i:any) => i.name === currentColor);
        setSelectedImage(color!.image);
        setSelectedDarkImage(color!.imageDark);
    }


    const handleSpecifications = () => {
        if(!specificationsOpen) {
            setSpecificationsOpen(true);
            
        } else {
            setSpecificationsOpen(false);
        }
    }

    const handleColorOptions = (color:any) => {
        setCurrentColor(color.name)
        setSelectedImage(color.image)
        setSelectedDarkImage(color.imageDark);
    }


    useEffect(() => {
        async function start() {
            const urlParams = new URLSearchParams(location.search)
            let currentId = urlParams.get("id")!
            let currentColor = urlParams.get("color")!
            setCurrentColor(currentColor);
            getProductById(currentId, currentColor);
            setLoading(false);
        }
        start()
	}, [])

    return (
        <div id="main">
            {loading ? (
                <div>
                    Loading
                </div>
            ) : (
                <div>
                    <SecondaryHeader/>
                    <div className="h-screen dark:bg-zinc-900 bg-white">
                        <div className="dark:bg-zinc-900 bg-white ">
                            <div className="  grid md:grid-cols-2 gap-6 px-4 mb-4 max-w-8xl w-full mx-auto pt-20 md:pt-24">
                                <div className="relatives overflow-hidden dark:bg-zinc-800 bg-neutral-50 w-full h-full rounded-3xl flex justify-center items-center">
                                    <img alt="Darkmode image" className="h-full hidden dark:block" src={selectedDarkImage}/>
                                    <img alt="Image" className="h-full dark:hidden block" src={selectedImage} />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-2xl lg:text-6xl font-semibold dark:text-white">{currentLamp.name}</h1>
                                        <p className="md:hidden text-2xl font-semibold dark:text-white">€ {currentLamp.price }</p>
                                    </div>
                                    <div className="flex space-x-2 items-center">
                                        <p className="font-semibold dark:text-white">{currentLamp.rating}</p>
                                        <Rating readOnly name="size-medium" defaultValue={currentLamp.rating} precision={0.5} />
                                    </div>
                                    <div>
                                        <div className="border-l-4 border-orange-500 pl-4 dark:text-white">
                                            {currentLamp.description}
                                        </div>
                                    </div>
                                    <div className="mt-4 border-t-2 border-b-2 border-neutral-100 dark:border-zinc-800 p-4">
                                        <button className="flex w-full justify-between" onClick={handleSpecifications}>
                                            <p className="font-semibold dark:text-white">Specifications</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" id="chevron" className={`${
                                                specificationsOpen ? "rotate-180" : "rotate-0"} transition-all h-6 w-6 cursor-pointer select-none dark:stroke-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        
                                        {specificationsOpen && (
                                            <div className="flex space-x-4 mt-4 w-full">
                                                <div>
                                                    <div className="dark:bg-zinc-700 bg-neutral-100 h-14 w-14 rounded-md flex justify-center items-center ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:stroke-white" viewBox="0 0 18 20" stroke="currentColor">
                                                            <path id="Path_59" data-name="Path 59" d="M13,10V3L4,14h7v7l9-11Z" transform="translate(-3 -2)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                                        </svg>

                                                    </div>
                                                    <p className="mt-2 flex justify-center font-semibold text-sm dark:text-white">{currentLamp.cord}</p>
                                                </div>
                                                <div>
                                                    <div className="dark:bg-zinc-700 bg-neutral-100 h-14 w-14 rounded-md flex justify-center items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 dark:stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                        </svg>
                                                    </div>
                                                    <p className="mt-2 flex justify-center font-semibold text-sm dark:text-white">{currentLamp.watt}</p>
                                                </div>
                                                <div>
                                                    <div className="dark:bg-zinc-700 bg-neutral-100 h-14 w-14 rounded-md flex justify-center items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-white dark:fill-transparent dark:stroke-white" stroke="currentColor" viewBox="0 0 24.25 20">
                                                            <line id="Line_11" data-name="Line 11" x2="7" transform="translate(16.5 18.5)" stroke-linecap="round" stroke-width="1.5"/>
                                                            <g id="Ellipse_150" data-name="Ellipse 150" stroke-width="1.5">
                                                                <circle cx="10" cy="10" r="10" stroke="none"/>
                                                                <circle cx="10" cy="10" r="9.25" fill="none"/>
                                                            </g>
                                                            <g id="Ellipse_146" data-name="Ellipse 146" transform="translate(3)" stroke-width="1.5">
                                                                <circle cx="10" cy="10" r="10" stroke="none"/>
                                                                <circle cx="10" cy="10" r="9.25" fill="none"/>
                                                            </g>
                                                            <g id="Ellipse_147" data-name="Ellipse 147" transform="translate(5 2)" stroke-width="1.5">
                                                                <circle cx="8" cy="8" r="8" stroke="none"/>
                                                                <circle cx="8" cy="8" r="7.25" fill="none"/>
                                                            </g>
                                                            <g id="Ellipse_148" data-name="Ellipse 148" transform="translate(7 4)" stroke-width="1.5">
                                                                <circle cx="6" cy="6" r="6" stroke="none"/>
                                                                <circle cx="6" cy="6" r="5.25" fill="none"/>
                                                            </g>
                                                            <g id="Ellipse_149" data-name="Ellipse 149" transform="translate(10 7)" stroke-width="1.5">
                                                                <circle cx="3" cy="3" r="3" stroke="none"/>
                                                                <circle cx="3" cy="3" r="2.25" fill="none"/>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <p className="mt-2 flex justify-center font-semibold text-sm dark:text-white">{currentLamp.material}</p>
                                                </div>
                                                <div>
                                                    <div className="dark:bg-zinc-700 bg-neutral-100 h-14 w-14 rounded-md flex justify-center items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                                        </svg>
                                                    </div>
                                                    <p className="mt-2 flex justify-center font-semibold text-sm dark:text-white">{currentLamp.colors.length} colors</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                    {currentLamp.colors.map((color: any) => (
                                        <div>
                                            <input type="radio" radioGroup={color.name} defaultChecked={color.name === currentColor} name="colors" id={color.name} className=" pointer-events-auto peer hidden h-6 w-6 rounded-full" style={{backgroundColor: color.colorCode}} onChange={() => {handleColorOptions(color)}}/>
                                            <label className="cursor-pointer dark:border-transparent border-white inline-block w-8 h-8 mr-3 rounded-full peer-checked:ring-2 ring-orange-500 peer-checked:border-4 border-transparent" htmlFor={color.name}><span className="block rounded-full w-full h-full" style={{backgroundColor: color.colorCode}}></span></label>
                                        </div>
                                            
                                    ))}
                                    </div>

                                    {/* <div className=" hidden md:block sticky bottom-0 right-0 left-0 md:relative w-full md:bg-transparent bg-white">
                                        <div className="md:space-x-2 spaxe-x-1 flex items-center justify-center md:justify-between pt-4">
                                            <p className="text-4xl font-semibold hidden md:block dark:text-white">€ {currentLamp.price }</p>
                                            <div className="flex md:space-x-4">   
                                                <ARButton lamp={currentLamp} color={currentColor}/>
                                                <button className="bg-orange-500 rounded-lg border-orange-500 border-2 px-4 py-2 text-white font-semibold hover:bg-orange-400 hover:border-orange-400">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>     
                                    </div> */}


                                    <div className=" sticky md:block bottom-0 right-0 left-0 md:relative w-full md:bg-transparent md:dark:bg-transparent dark:bg-zinc-900 bg-white">
                                        <div className=" w-full py-4 md:space-x-2 spaxe-x-1 md:flex items-center justify-center md:justify-between pt-4">
                                            <p className="text-4xl font-semibold hidden md:block dark:text-white">€ {currentLamp.price }</p>
                                            <div className="md:flex md:space-x-4 grid grid-cols-2 gap-4">   
                                                <ARButton lamp={currentLamp} color={currentColor}/>
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