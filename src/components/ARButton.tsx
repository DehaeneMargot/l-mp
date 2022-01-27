import React, { useEffect, useRef, useState } from "react";
import { Loader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAR } from "../utils/useAR";
import QRCode from "react-qr-code";

const ARButton = (props: any) => {
  const [arSupported, setArSupported] = useState(false);
  const [sessionInit, setSessionInit] = useState<any>({});
  const [currentSession, setCurrentSession] = useState<any>();
  const [overlayShown, setOverlayShown] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement>();
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer>();
  const [isModelPlaced, setIsModelPlaced] = useState(false);
  const [rotationValue, setRotationValue] = useState(0);
  const [currentLamp, setCurrentLamp] = useState<string>("/models/lamp/LAMP_t6_E.glb");
  const [currentModel, setCurrentModel] = useState<any>();
  const [darkmodeOn, setDarkmodeOn] = useState(false);
  const [QRVisible, setQRVisible] = useState(false);

  const overlay = useRef<HTMLDivElement>(null);
  const {
    createSessionIfSupported,
    getARContainer,
    clearChildren,
    updateRotation,
    updateMovement,
    rotateRight,
    rotateLeft,
    changeModel,
    onSelect
  } = useAR;

  useEffect(() => {
    initLamp()
  }, [])


  const initLamp = () =>{

    if (sessionInit.optionalFeatures === undefined) {
      sessionInit.optionalFeatures = [];
    }
    if (sessionInit.requiredFeatures === undefined) {
      sessionInit.requiredFeatures = [];
    }
    sessionInit.optionalFeatures.push("dom-overlay");
    sessionInit.optionalFeatures.push('light-estimation');
    sessionInit.requiredFeatures.push("hit-test");
    sessionInit.domOverlay = { root: overlay.current! };
    if ("xr" in navigator) {
      (navigator as any).xr
        .isSessionSupported("immersive-ar", {
          // Doesn't do anything
          requiredFeatures: ["depth-sensing"],
          depthSensing: {
            usagePreference: ["cpu-optimized", "gpu-optimized"],
            formatPreference: ["luminance-alpha", "float32"]
          }
        })
        .then((supported: any) => {
          setArSupported(supported);
          const loader = new GLTFLoader();
          loader.load(
            "/models/lamp/LAMP_t1_RED.glb",
            (gltf) => {
              const mesh = gltf.scene;
              mesh.rotateY(rotationValue);

              createSessionIfSupported(mesh).then((renderer) => {
                setRenderer(renderer);
                setContainer(getARContainer());
              });
            }
          );
        });
    }
  }

  const loadModel = (modelLocation: string):Promise<THREE.Object3D> => {
    const loader = new GLTFLoader()
    return new Promise((resolve, reject) => {
        loader.load(modelLocation, (gltf) => {
            const newModel = gltf.scene
            resolve(newModel)
        })
    })
  }

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

  const viewQR = () => {
    setQRVisible(true);
  };

  const handleDarkMode = async () => {
    if (darkmodeOn) {
      setDarkmodeOn(false);
      let mesh = await loadModel("/models/lamp/LAMP_t1_RED.glb")
      changeModel(mesh);
    } else {
      setDarkmodeOn(true);
      let mesh = await loadModel("/models/lamp/LAMP_t1_RED_E_light_spot_tp4.glb")
      changeModel(mesh);
    }
  }

  return (
    <>
      {arSupported ? (
        <div>
          {renderer && (
            <button
              className={`${
                arSupported ? "bg-red-500" : "hidden"
              } bg-transparent border-orange-500 border-2 rounded-lg px-4 py-2 md:mr-0 mr-4 mb-4 text-orange-500 font-semibold`}
              onClick={startSession}
            >
              <p>View in AR</p>
            </button>
          )}

          <div ref={overlay} className="hidden pointer-events-none ">
            <div>
              <div className="flex justify-end">
                <button
                  className="text-black bg-white p-3 rounded-lg absolute m-4 pointer-events-auto w-12 h-12 flex justify-center items-center"
                  onClick={closeSession}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
              
              
              <div className="bottom-0 absolute w-full">
                <div className="">
                  <div className="flex justify-between m-4">
                    <div className="flex space-x-2">
                      <button className="bg-white pointer-events-auto flex justify-center items-center rounded-lg p-3 w-12 h-12" onClick={rotateLeft}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17.358" height="17.768" viewBox="0 0 17.358 17.768">
                          <g id="Icon_feather-corner-down-right" data-name="Icon feather-corner-down-right" transform="translate(1 1)">
                            <path id="Path_57" data-name="Path 57" d="M26.584,15,22.5,19.8l4.084,4.8" transform="translate(-22.5 -9.241)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                            <path id="Path_58" data-name="Path 58" d="M21.358,6v6.719a3.84,3.84,0,0,1-3.84,3.84H6" transform="translate(-6 -6)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          </g>
                        </svg>
                      </button>
                      <button className="bg-white pointer-events-auto flex justify-center items-center rounded-lg p-3 w-12 h-12"  onClick={rotateRight}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17.358" height="17.772" viewBox="0 0 17.358 17.772">
                          <g id="Icon_feather-corner-down-right" data-name="Icon feather-corner-down-right" transform="translate(1 1)">
                            <path id="Path_57" data-name="Path 57" d="M22.5,15l4.8,4.8-4.8,4.8" transform="translate(-11.941 -9.241)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                            <path id="Path_58" data-name="Path 58" d="M6,6v6.719a3.84,3.84,0,0,0,3.84,3.84H21.358" transform="translate(-6 -6)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          </g>
                        </svg>
                      </button>
                    </div>
                    {!darkmodeOn ? (
                      <button className="bg-white pointer-events-auto flex justify-center items-center rounded-lg p-3 w-12 h-12" onClick={handleDarkMode}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                          <g id="Group_31" data-name="Group 31" transform="translate(-3679 -1122)">
                            <rect id="Rectangle_67" data-name="Rectangle 67" width="30" height="30" transform="translate(3679 1122)" fill="rgba(255,255,255,0)"/>
                            <path id="Path_55" data-name="Path 55" d="M11.891,21.681h6.236M15.01,3V4.334M23.5,6.517l-.943.943m4.461,7.549H25.685m-21.35,0H3M7.461,7.461l-.943-.943m3.774,13.21a6.672,6.672,0,1,1,9.437,0l-.731.73a4.5,4.5,0,0,0-1.318,3.184v.709a2.669,2.669,0,0,1-5.338,0v-.709a4.5,4.5,0,0,0-1.318-3.184l-.731-.73Z" transform="translate(3679 1122.282)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          </g>
                        </svg>

                      </button>
                    ) : (
                      <button className="bg-white pointer-events-auto flex justify-center items-center rounded-lg p-3 w-12 h-12" onClick={handleDarkMode}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <g id="Group_32" data-name="Group 32" transform="translate(-3679 -1157)">
                          <rect id="Rectangle_66" data-name="Rectangle 66" width="30" height="30" transform="translate(3679 1157)" fill="rgba(255,255,255,0)"/>
                          <path id="Path_56" data-name="Path 56" d="M11.891,21.681h6.236m-7.836-1.954a6.672,6.672,0,1,1,9.437,0l-.731.73a4.5,4.5,0,0,0-1.318,3.184v.709a2.669,2.669,0,0,1-5.338,0v-.709a4.5,4.5,0,0,0-1.318-3.184l-.731-.73Z" transform="translate(3678.99 1157.282)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </g>
                      </svg>

                    </button>
                    )}

                  </div>
                  <div className="flex space-between m-4 space-x-4 font-semibold">
                    <div className="bg-white pointer-events-auto rounded-lg p-3 text-center w-full" onClick={updateMovement}>
                      Move lamp
                    </div>
                    <div className="bg-white pointer-events-auto rounded-lg p-3 text-center w-full" onClick={onSelect}>
                      Place lamp
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      ) : (
        <button
          className="bg-transparent border-orange-500 border-2 rounded-lg px-4 py-2 md:mr-0 mr-4 mb-4 text-orange-500 font-semibold"
          onClick={viewQR}
        >
          <p>View in AR</p>
        </button>
      )}
      {QRVisible && (
        <div className="fixed
          inset-0
          w-full
          h-full
          m-0
          flex
          items-center
          justify-center
          bg-semi-60
          z-90
          bg-black bg-opacity-50 z-50">
          <div className=" relative w-2/6 md:h-auto h-full bg-white shadow-lg md:rounded-lg rounded-none p-8 overflow-y-auto overflow-x-hidden grid grid-cols-2">
            <QRCode value={window.location.href} className="w-full"/>
            <div>
              <h3 className="font-semibold text-3xl pb-2">Scan QR code</h3>
              <p className="border-t-2 pt-4 text-lg">Scan this QR code with your phone to view this lamp in <span className="text-orange-500">Augmented Reality</span>.</p>
            </div>
            <div className="absolute right-4 top-4 cursor-pointer" onClick={() => {setQRVisible(false)}}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ARButton;