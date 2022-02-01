import { useEffect } from "react"
import Footer from "../components/Footer"
import { setGlobalState } from "../utils/globalState"
import { Player } from '@lottiefiles/react-lottie-player';
import Header from "../components/Header";

const Home = () => {

    useEffect(() => {
		setGlobalState("activePage", "homee");
	}, [])

    return (
        <div id="main">
            <Header/>
            <main className="bg-[#F2EEE8] dark:bg-zinc-900">
                <div className="">
                <div className="max-w-8xl w-full mx-auto bg-[#F2EEE8] dark:bg-zinc-900" >
                <section className="min-h-screen overflow-hidden">
                    <div className=" grid lg:grid-cols-2 md:p-6 h-screen">
                        <div className="p-4 lg:p-0 absolute lg:relative bottom-6 my-auto z-20">
                            <h1 className="md:text-5xl lg:text-7xl text-left text-4xl  dark:text-white text-black font-semibold"><span className="font-bold text-orange-500">Homemade lamps</span> that brighten up your day</h1>
                            <p className="mt-10 text-xl dark:text-white text-black">Modern high quality 3D printed lamps that come to life on your mobile phone with Augmented Reality.</p>
                            <button className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-md mt-16 font-semibold" >Discover lamps</button>
                        </div>
                        <div><svg className="absolute -top-10 lg:-top-64 lg:right-28 ml-auto mr-auto left-0 lg:left-auto right-0 lg:w-lamp w-72 md:w-96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 675.971 1190.601">
                            <defs>
                                <linearGradient id="linear-gradient" x1="0.489" y1="0.569" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                                <stop offset="0" stop-color="#fff"/>
                                <stop offset="1" stop-color="#f2eee8" stop-opacity="0"/>
                                </linearGradient>
                                <linearGradient id="linear-gradient-2" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
                                <stop offset="0" stop-color="#eba885"/>
                                <stop offset="1" stop-color="#be6436"/>
                                </linearGradient>
                            </defs>
                            <path id="Path_42" data-name="Path 42" d="M337-5.91C523.12-5.91,674,150.88,674,337s-1.5,536.914,0,539.5H0c-4.434-2.56,0-472.129,0-539.5C0,150.88,150.88-5.91,337-5.91Z" transform="translate(1.971 314.097)" opacity="0.7" fill="url(#linear-gradient)"/>
                            <g id="Group_19" data-name="Group 19" transform="translate(-1368.881 -131.125)">
                                <path id="Path_39" data-name="Path 39" d="M1610.3,467.819V410.746l38.442-16.037h.56l38.442,16.037v57.074" transform="translate(60.35 108.571)" fill="#171717"/>
                                <path id="Path_40" data-name="Path 40" d="M1663.163,551.325h85.689l-42.845-104.95h-86.25l-42.844,104.95h86.25" transform="translate(46.492 130.015)" fill="#737373"/>
                                <path id="Path_41" data-name="Path 41" d="M1709.655,520.542H1798.1c41.037,0,104.714,67.923,133.015,108.252,16.583,23.631,23.684,31.484,22.641,68.63H1465c-1.043-37.146,6.056-45,22.641-68.63,28.3-40.329,91.978-108.252,133.015-108.252h89" transform="translate(0 157.799)" fill="url(#linear-gradient-2)"/>
                                <rect id="Rectangle_40" data-name="Rectangle 40" width="0.561" height="370.154" transform="translate(1709.094 133.125)" fill="#fff" stroke="#000" stroke-miterlimit="10" stroke-width="4"/>
                            </g>
                            </svg>


                        </div>
                    </div>

                </section>
                
                </div>
                </div>
                <section className="bg-white dark:bg-zinc-800">
                    <div className="max-w-7xl w-full mx-auto pb-24">
                        <div className="flex justify-center pt-20">
                            <h2 className="font-semibold text-3xl pb-2 dark:text-white">How it works</h2>
                        </div>

                        <div className="w-32 border-t-2 border-orange-400 mx-auto pt-2"></div>


                        <div className="grid md:grid-cols-4 gap-10 pt-8 pb-14 p-6">
                            <div>
                                <div className="w-full bg-gray-50 dark:bg-zinc-700 rounded-lg hover:scale-110 transition-all">
                                <Player
                                    autoplay
                                    loop
                                    src="https://assets9.lottiefiles.com/packages/lf20_ooptvpbj.json"
                                >
                                </Player>
                                </div>
                                <div className="flex justify-center font-semibold pt-6 pb-2 text-xl text-orange-400">
                                    Choose Lämp
                                </div>
                                <p className="text-center dark:text-white">
                                    Choose your favorite Lämp for your room and see it turn on in dark mode.
                                </p>
                            </div>
                            <div>
                            <div className="w-full bg-gray-50 dark:bg-zinc-700 rounded-lg hover:scale-110 transition-all">
                                <Player
                                    autoplay
                                    loop
                                    src="https://assets7.lottiefiles.com/packages/lf20_9doq6m11.json"
                                >
                                </Player>
                            </div>
                                <div className="flex justify-center font-semibold pt-6 pb-2 text-xl text-orange-400">
                                    View in AR
                                </div>
                                <p className="text-center dark:text-white">
                                    Place the Lämp in your environment with the Augmented Reality functionality and watch it come alive.
                                </p>
                            </div>
                            <div>
                            <div className="w-full bg-gray-50 dark:bg-zinc-700 rounded-lg hover:scale-110 transition-all">
                                <Player
                                    autoplay
                                    loop
                                    src="https://assets7.lottiefiles.com/packages/lf20_spxc0jak.json"
                                >
                                </Player>
                            </div>
                                <div className="flex justify-center font-semibold pt-6 pb-2 text-xl text-orange-400">
                                    Add to cart
                                </div>
                                <p className="text-center dark:text-white">
                                    Found the Lämp you were looking for? Add it to your cart and finish your payment.
                                </p>
                            </div>
                            <div>
                            <div className="w-full bg-gray-50 dark:bg-zinc-700 rounded-lg hover:scale-110 transition-all">
                                <Player
                                    autoplay
                                    loop
                                    src="https://assets8.lottiefiles.com/packages/lf20_haeunqy4.json"
                                >
                                </Player>
                            </div>
                                <div className="flex justify-center font-semibold pt-6 pb-2 text-xl text-orange-400">
                                    Enjoy fast shipping
                                </div>
                                <p className="text-center dark:text-white">
                                    Thanks to our fast shipping, your own Lämp will be delivered to your doorstep as quick as possible.
                                </p>
                            </div>

                        </div>
                        
                        <div className="overflow-hidden relative w-full bg-[#F2EEE8] dark:bg-zinc-900 lg:rounded-lg py-16 md:px-16 lg:px-64 px-4 mt-20">
                            <h2 className="text-3xl flex justify-center font-semibold pb-2 dark:text-white">
                                What our customers say
                            </h2>
                            <div className="w-60 border-t-2 border-orange-400 mx-auto pt-2"></div>

                            <p className="flex justify-center text-lg dark:text-white text-center">See what our customers have to say about Lämp</p>

                            <div className=" grid md:grid-cols-2 md:gap-14 pt-12">
                                <img className="hidden md:block absolute h-[400px] w-[400px] -top-4 left-0" src="/images/categories/ceilinglamp.svg" alt="" />
                                <img className="h-96 rounded-lg ml-auto w-full object-cover z-10" src="/images/customers/Customer1.jpg" alt="" />
                                <div className="">

                                    <h4 className="pb-8 text-orange-500 text-2xl font-semibold md:pt-0 pt-8">Lamps made with great taste.</h4>
                                    <p className="pb-8 dark:text-white">I was looking for a lamp and came across Lämps. I selected my favorite lamp and was able to view it in AR with my phone. This way I knew that it would fit in my house. </p>
                                    <p className="font-semibold text-lg dark:text-white">Zachery Dohen</p>
                                    <p className="dark:text-gray-300 text-opacity-60">~ Lamp enthusiast</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="dark:bg-zinc-1000 bg-neutral-100 h-auto">
                <Footer />
            </footer>

        </div>
    )

}

export default Home