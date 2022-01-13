import { useEffect, useRef, useState } from "react";

const ARButton = (props: any) => {
    const [ARSupported, setARSupported] = useState(Boolean);
    const [currentSession, setCurrentSession] = useState<any>();
    const [sessionInit, setSessionInit] = useState<any>({});
    const [overlayShown, setOverlayShown] = useState(false);
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer>();
    // let overlay: any = undefined;
    const overlay = useRef<HTMLDivElement>(null);
    let scene: THREE.Scene | undefined = undefined;

    const clearChildren = () => {
        if (scene) {
            scene.children.forEach((child: any) => {
            console.log(child);

            if (child.name !== "reticle") {
                scene!.remove(child);
            }
            });
        }
    };

    useEffect(() => {
        console.log(props.renderer);

        if (sessionInit.optionalFeatures === undefined) {
            sessionInit.optionalFeatures = [];
        }
        if (sessionInit.requiredFeatures === undefined) {
            sessionInit.requiredFeatures = [];
        }
        sessionInit.optionalFeatures.push("dom-overlay");
        sessionInit.requiredFeatures.push("hit-test");
        sessionInit.domOverlay = { root: overlay.current! };
        if ("xr" in navigator) {
            (navigator as any).xr
            .isSessionSupported("immersive-ar")
            .then(setARSupported);
        }
    }, []);
    useEffect(() => {
    setRenderer(props.renderer);
    }, [props.renderer]);

    const startSession = () => {
        if (ARSupported && currentSession === undefined) {
        sessionInit.domOverlay = { root: overlay.current! };

        (navigator as any).xr
            .requestSession("immersive-ar", sessionInit)
            .then(async (session: any) => {
            session.addEventListener("end", () => {
                clearChildren();
                session.removeEventListener("end", () => {});
                setCurrentSession(undefined);
                overlay.current!.classList.toggle("hidden");
            });
            renderer!.xr.setReferenceSpaceType("local");
            overlay.current!.classList.toggle("hidden");

            setOverlayShown(true);
            setCurrentSession(session);

            await renderer!.xr.setSession(session);
            });
        }
    };

    const closeSession = () => {
        currentSession.end();
        setOverlayShown(false);
    };

    return (
        <>
        {ARSupported && (
            <div>
                <button
                className={`${
                    ARSupported ? "bg-blue-400" : "hidden"
                } p-2 rounded-full w-12 h-12 shadow-md font-bold text-white flex items-center justify-center`}
                onClick={startSession}
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                </button>


            <div ref={overlay} className="hidden pointer-events-none">
                <button
                className="text-white absolute right-8 top-8 pointer-events-auto"
                onClick={closeSession}
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    />
                </svg>
                </button>
                {/* <div className="absolute bottom-0 right-0 w-20 h-20 bg-red-500"></div> */}
            </div>
            </div>
        )}
        </>
    )
}

export default ARButton;
