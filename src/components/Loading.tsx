import { Player } from "@lottiefiles/react-lottie-player";

const Loading = (props: any) => {


    return (
        <div className="h-screen flex justify-center items-center">
            <Player
                autoplay
                loop
                src="https://assets3.lottiefiles.com/packages/lf20_vshlsk9a.json"
                className="w-96"
            >
            </Player>
        </div>
    )
        

};

export default Loading;