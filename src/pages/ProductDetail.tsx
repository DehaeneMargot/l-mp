import ARButton from "../components/ARButton"
import SecondaryHeader from "../components/SecondaryHeader"

const ProductDetail = () => {

    return (
        <div>
            <SecondaryHeader/>
            <div className="bg-white h-screen">
                <div className="max-w-8xl w-full mx-auto">
                    <div className="pt-24 grid md:grid-cols-detail gap-6 h-screen px-4 pb-8">
                        <div className="relative lg:h-full bg-gray-100 w-full rounded-3xl p-4 flex justify-center items-center">
                            <ARButton/>
                            Image
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-2xl lg:text-6xl font-semibold">Lamp name</h1>
                            <div>
                                Stars
                            </div>
                            <div>
                                <div className="border-l-4 border-orange-500 px-4 bg-orange-50 rounded-md p-2">
                                    hey this is a description about a lamp on the left side of this page yes yes soooooo does this work
                                </div>
                            </div>
                            <div className="mt-4">
                                Specifications
                            </div>
                            <div className="fixed bottom-0 right-0 left-0 md:relative w-full md:bg-transparent bg-white">
                                <p className="text-gray-400 text-md pl-4 md:pl-0 mt-2">Price</p>
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-3xl pl-4 md:pl-0 ">$ 80</p>
                                    <button className="bg-orange-500 rounded-lg px-6 py-3 md:mr-0 mr-4 mb-4 text-white font-semibold hover:bg-orange-400">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProductDetail