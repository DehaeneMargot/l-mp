import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAR } from "../utils/useAR";
import QRCode from "react-qr-code";

const ARButton = (props: any) => {
  const [arSupported, setArSupported] = useState(false);
  const [sessionInit] = useState<any>({});
  const [currentSession, setCurrentSession] = useState<any>();
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer>();
  const [rotationValue] = useState(0);
  const [darkmodeOn, setDarkmodeOn] = useState(false);
  const [QRVisible, setQRVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const overlay = useRef<HTMLDivElement>(null);
  const {
    createSessionIfSupported,
    clearChildren,
    updateMovement,
    rotateRight,
    rotateLeft,
    changeModel,
    onSelect,
    initScene
  } = useAR;

  useEffect(() => {
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
        .isSessionSupported("immersive-ar")
        .then((supported: any) => {
          setArSupported(supported);

          const loader = new GLTFLoader();
          loader.load(
            "/models/"+props.lamp.name+"/"+props.color+"_OFF.glb",
            (gltf) => {
              const mesh = gltf.scene;
              mesh.rotateY(rotationValue);
              mesh.traverse( function( node ) {
                node.castShadow = true;
              });

              createSessionIfSupported(mesh).then((renderer) => {
                setRenderer(renderer);
              });
            }
          );
        });
    }
  }, [])

  const loadModel = (modelLocation: string):Promise<THREE.Object3D> => {
    const loader = new GLTFLoader()
    return new Promise((resolve, reject) => {
        loader.load(modelLocation, (gltf) => {
            const newModel = gltf.scene

            resolve(newModel)
        })
    })
  }

  const startSession = async () => {
    setLoading(true);
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

          setCurrentSession(session);

          const loader = new GLTFLoader();
          loader.load(
            "/models/"+props.lamp.name+"/"+props.color+"_OFF.glb",
            (gltf) => {
              const mesh = gltf.scene;
              mesh.rotateY(rotationValue);
              mesh.traverse( function( node ) {
                node.castShadow = true;
              });
              initScene(mesh);
            })

          await renderer!.xr.setSession(session);
          setLoading(false);
        });
    }
  };

  const closeSession = () => {
    clearChildren();
    currentSession.end();
    setCurrentSession(undefined);
    // overlay.current!.classList.toggle("hidden");
  };

  const viewQR = () => {
    setQRVisible(true);
  };

  const handleDarkMode = async (currentColor: string) => {
    if (darkmodeOn) {
      setDarkmodeOn(false);
      let selectedColor = props.lamp.colors.find((i:any) => i.name === currentColor);
      let selectedModel = selectedColor.modelLink;
      let mesh = await loadModel(selectedModel);
      changeModel(mesh, false);
    } else {
      setDarkmodeOn(true);
      let selectedColor = props.lamp.colors.find((i:any) => i.name === currentColor);
      let selectedModel = selectedColor.darkModelLink;
      let mesh = await loadModel(selectedModel);
      changeModel(mesh, true);
    }
  }

  const changeColor = async (selectedColor:any) => {
    if (darkmodeOn) {
      let selectedModel = selectedColor.darkModelLink;
      let mesh = await loadModel(selectedModel);
      changeModel(mesh, true);
    } else {
      let selectedModel = selectedColor.modelLink;
      let mesh = await loadModel(selectedModel);
      changeModel(mesh, false);
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
              } flex space-x-2 bg-transparent border-orange-500 hover:bg-orange-500 border-2 hover:text-white items-center justify-center rounded-lg w-full h-full md:mr-0 mr-4 text-orange-500 font-semibold`}
              onClick={startSession}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
              <p>View in AR</p>
            </button>
          )}
            <div ref={overlay} className="hidden pointer-events-none ">
            {loading ? (
            <div>Loading</div>
          ): (
            <div>
              <div className="flex justify-between">
                <button
                  className="text-black bg-white bg-opacity-80 p-3 rounded-lg m-4 pointer-events-auto w-12 h-12 flex justify-center items-center"
                  onClick={closeSession}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <div className="m-4 bg-white p-2 rounded-lg bg-opacity-80">
                  {props.lamp.colors.length > 1 && props.lamp.colors.map((item:any, index:number) => (
                    <div>
                      <input className="peer hidden pointer-events-none" type="radio" name="color" radioGroup={item.name} id={item.name} value={item.name} checked={props.color === item.name} onChange={() => {}}/>
                      <label onClick={() => {changeColor(item)}} className=" cursor-pointer dark:border-transparent border-white inline-block w-8 h-8 pointer-events-auto rounded-full peer-checked:ring-2 ring-orange-500 peer-checked:border-4 border-transparent" htmlFor={item.name}><span className="block rounded-full w-full h-full" style={{backgroundColor: item.colorCode}}></span></label>
                    </div>
                  ))}
                </div>
              </div>
              
              
              <div className="bottom-0 absolute w-full">
                <div className="">
                  <div className="flex justify-between m-4">
                    <div className="flex space-x-2">
                      <button className="bg-white bg-opacity-80 pointer-events-auto flex justify-center items-center rounded-lg p-3 w-12 h-12" onClick={rotateLeft}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17.358" height="17.768" viewBox="0 0 17.358 17.768">
                          <g id="Icon_feather-corner-down-right" data-name="Icon feather-corner-down-right" transform="translate(1 1)">
                            <path id="Path_57" data-name="Path 57" d="M26.584,15,22.5,19.8l4.084,4.8" transform="translate(-22.5 -9.241)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                            <path id="Path_58" data-name="Path 58" d="M21.358,6v6.719a3.84,3.84,0,0,1-3.84,3.84H6" transform="translate(-6 -6)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          </g>
                        </svg>
                      </button>
                      <button className="bg-white bg-opacity-80 pointer-events-auto flex justify-center items-center rounded-lg p-3 w-12 h-12"  onClick={rotateRight}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17.358" height="17.772" viewBox="0 0 17.358 17.772">
                          <g id="Icon_feather-corner-down-right" data-name="Icon feather-corner-down-right" transform="translate(1 1)">
                            <path id="Path_57" data-name="Path 57" d="M22.5,15l4.8,4.8-4.8,4.8" transform="translate(-11.941 -9.241)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                            <path id="Path_58" data-name="Path 58" d="M6,6v6.719a3.84,3.84,0,0,0,3.84,3.84H21.358" transform="translate(-6 -6)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          </g>
                        </svg>
                      </button>
                    </div>
                    {!darkmodeOn ? (
                      <button className="bg-white bg-opacity-80 pointer-events-auto flex justify-center items-center rounded-lg p-3 w-12 h-12" onClick={() => handleDarkMode(props.color)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                          <g id="Group_31" data-name="Group 31" transform="translate(-3679 -1122)">
                            <rect id="Rectangle_67" data-name="Rectangle 67" width="30" height="30" transform="translate(3679 1122)" fill="rgba(255,255,255,0)"/>
                            <path id="Path_55" data-name="Path 55" d="M11.891,21.681h6.236M15.01,3V4.334M23.5,6.517l-.943.943m4.461,7.549H25.685m-21.35,0H3M7.461,7.461l-.943-.943m3.774,13.21a6.672,6.672,0,1,1,9.437,0l-.731.73a4.5,4.5,0,0,0-1.318,3.184v.709a2.669,2.669,0,0,1-5.338,0v-.709a4.5,4.5,0,0,0-1.318-3.184l-.731-.73Z" transform="translate(3679 1122.282)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          </g>
                        </svg>

                      </button>
                    ) : (
                      <button className="bg-white bg-opacity-80 pointer-events-auto flex justify-center items-center rounded-lg p-3 w-12 h-12" onClick={() => handleDarkMode(props.color)}>
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
                    <div className="bg-white pointer-events-auto rounded-lg p-3 text-center w-full bg-opacity-80" onClick={updateMovement}>
                      Move lamp
                    </div>
                    <div className="bg-white pointer-events-auto rounded-lg p-3 text-center w-full bg-opacity-80" onClick={onSelect}>
                      Place lamp
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

          )}
        </div>
 
        </div>
      ) : (
        <button
          className="flex space-x-2 bg-transparent border-orange-500 hover:bg-orange-500 border-2 hover:text-white items-center justify-center rounded-lg md:w-40 md:h-12 w-full h-full md:mr-0 mr-4 text-orange-500 font-semibold"
          onClick={viewQR}
          >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
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
          bg-black bg-opacity-50 z-50
          ">
          <div className=" relative w-auto md:h-auto h-full bg-white shadow-lg md:rounded-lg rounded-none p-8 overflow-y-auto overflow-x-hidden flex justify-center items-center flex-col">
            <h3 className="font-semibold text-3xl pb-2">Scan QR code</h3>
            <p className="py-4 text-lg md:w-4/6 text-center">Scan this QR code with an AR supported phone to view this lamp in <span className="text-orange-500">Augmented Reality</span>.</p>
            <QRCode value={window.location.href}/>
            <div className="absolute right-8 md:top-4 top-16 cursor-pointer" onClick={() => {setQRVisible(false)}}>
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