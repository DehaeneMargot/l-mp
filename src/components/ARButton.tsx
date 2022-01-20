import React, { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAR } from "../utils/useAR";

const ARButton = (props: any) => {
  const [arSupported, setArSupported] = useState(false);
  const [sessionInit, setSessionInit] = useState<any>({});
  const [currentSession, setCurrentSession] = useState<any>();
  const [overlayShown, setOverlayShown] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement>();
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer>();

  const overlay = useRef<HTMLDivElement>(null);
  const {
    createSessionIfSupported,
    getARContainer,
    clearChildren,
  } = useAR;
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
        .then((supported: any) => {
          setArSupported(supported);
          const loader = new GLTFLoader();
          loader.load(
            '/models/lamp3/scene.gltf',
            (gltf) => {
              const mesh = gltf.scene.children[0];
              console.log(gltf.scene.children[0]);

              createSessionIfSupported(mesh).then((renderer) => {
                setRenderer(renderer);
                setContainer(getARContainer());
              });
            }
          );
        });
    }
  }, []);
  const startSession = () => {
    if (arSupported && currentSession === undefined) {
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
      {arSupported && (
        <div>
          {renderer && (
            <button
              className={`${
                arSupported ? "bg-red-500" : "hidden"
              } absolute top-0 left-0 bg-white w-32 space-x-2 rounded-lg p-2 lg:hidden flex items-center justify-center`}
              onClick={startSession}
            >
              <p>View in AR</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="14.113" height="14.113" viewBox="0 0 14.113 14.113">
                  <g id="Icon_ionic-md-cube" data-name="Icon ionic-md-cube" transform="translate(0 0)">
                      <path id="Path_16" data-name="Path 16" d="M25.278,11.82a.4.4,0,0,0-.161.032l-5.595,2.9h0a.794.794,0,0,0-.394.674v5.856a.38.38,0,0,0,.4.362.431.431,0,0,0,.192-.044.069.069,0,0,0,.016-.009l5.5-2.92.009,0a.8.8,0,0,0,.432-.7v-5.79A.382.382,0,0,0,25.278,11.82Z" transform="translate(-11.564 -7.532)"/>
                      <path id="Path_17" data-name="Path 17" d="M16.237,4.975,10.513,2.4A1.808,1.808,0,0,0,9.99,2.25a1.777,1.777,0,0,0-.52.151L3.74,4.975s-.252.1-.252.3.261.362.261.362L9.593,8.718a.993.993,0,0,0,.8,0L16.23,5.63a.457.457,0,0,0,.236-.362C16.47,5.07,16.237,4.975,16.237,4.975Z" transform="translate(-2.933 -2.25)"/>
                      <path id="Path_18" data-name="Path 18" d="M8.409,14.749l-5.6-2.9a.442.442,0,0,0-.161-.032.382.382,0,0,0-.4.362v5.79a.8.8,0,0,0,.432.7l.006,0,5.5,2.92a.417.417,0,0,0,.208.054.384.384,0,0,0,.4-.362V15.423A.787.787,0,0,0,8.409,14.749Z" transform="translate(-2.25 -7.528)"/>
                  </g>
              </svg>
            </button>
          )}

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
          </div>
        </div>
      )}
    </>
  );
};

export default ARButton;