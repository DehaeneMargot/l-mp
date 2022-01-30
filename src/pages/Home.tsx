import Header from "../components/Header"

const Home = () => {

    return (
        <div>
            <Header/>
            <main className="">
                <div className="bg-[#F2EEE8]">
                <div className="max-w-8xl w-full mx-auto">
                <section className=" min-h-screen">
                    <div className="grid grid-cols-2 pt-20">
                        <div className="mt-44">
                            <h1 className="lg:text-7xl md:text-4xl  font-semibold"><span className="font-bold">Homemade lamps</span> that brighten up your day</h1>
                            <p className="mt-10 text-xl">Modern high quality and customizable or premade lamps.</p>
                            <button className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-md mt-16 font-semibold" >Discover lamps</button>
                        </div>
                        <div><svg className="absolute -top-10 lg:-top-28 lg:right-20 ml-auto mr-auto left-0 lg:left-auto right-0 lg:w-lamp w-72" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 675.971 1190.601">
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
                <section className="bg-white">
                    <div className="max-w-7xl w-full mx-auto">
                        <div className="flex justify-center pt-14">
                            <h2 className="font-semibold text-3xl pb-2">How it works</h2>
                        </div>

                        <div className="w-32 border-t-2 border-orange-400 mx-auto pt-2"></div>


                        <div className="grid md:grid-cols-4 gap-10 pt-8 pb-14">
                            <div>
                                <div className="w-full h-72 bg-gray-50 rounded-lg hover:scale-110 transition-all"></div>
                                <div className="flex justify-center font-semibold pt-6 pb-2 text-xl text-orange-400">
                                    Choose Lämp
                                </div>
                                <p className="text-center ">
                                    Choose your favorite Lämp for your room from all of our products on the webshop.
                                </p>
                            </div>
                            <div>
                            <div className="w-full h-72 bg-gray-50 rounded-lg hover:scale-110 transition-all"></div>
                                <div className="flex justify-center font-semibold pt-6 pb-2 text-xl text-orange-400">
                                    View in AR
                                </div>
                                <p className="text-center ">
                                    Place the Lämp in your environment with the Augmented Reality functionality and watch it come alive.
                                </p>
                            </div>
                            <div>
                            <div className="w-full h-72 bg-gray-50 rounded-lg hover:scale-110 transition-all"></div>
                                <div className="flex justify-center font-semibold pt-6 pb-2 text-xl text-orange-400">
                                    Add to cart
                                </div>
                                <p className="text-center ">
                                    Found what you were looking for? Add it to your cart and finish your payment.
                                </p>
                            </div>
                            <div>
                            <div className="w-full h-72 bg-gray-50 rounded-lg hover:scale-110 transition-all"></div>
                                <div className="flex justify-center font-semibold pt-6 pb-2 text-xl text-orange-400">
                                    Enjoy fast shipping
                                </div>
                                <p className="text-center ">
                                    Thanks to our fast shipping, your own Lämp will be delivered to your doorstep as quick as possible.
                                </p>
                            </div>

                        </div>
                        
                        <div className="w-full bg-[#F2EEE8] rounded-lg py-16 px-56 ">
                            <h2 className="text-3xl flex justify-center font-semibold pb-2">
                                What our customers say
                            </h2>
                            <div className="w-60 border-t-2 border-orange-400 mx-auto pt-2"></div>

                            <p className="flex justify-center text-lg">See what our customers have to say about Lämp</p>

                            <div className="grid lg:grid-cols-2 gap-20 pt-12">
                                <img className="h-80 rounded-lg ml-auto" src="/images/customers/Customer1.jpg" alt="" />
                                <div>
                                    <h4>Name</h4>
                                    <p>Description</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2>
                                Subscribe to our Newsletter
                            </h2>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    )

}

export default Home