import * as THREE from "three";
import { Color, LightProbe, MeshStandardMaterial, Object3D, Vector3 } from "three";
import { SessionLightProbe, XREstimatedLight } from 'three/examples/jsm/webxr/XREstimatedLight';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

export const useAR = (() => {
  let arSupported;
  let renderer: any = undefined;
  let scene: THREE.Scene | undefined = undefined;
  let arContainer: any = undefined;
  let reticle: any;
  let hitTestSource: any = null;
  let hitTestSourceRequested = false;
  let rotationValue = 0;
  let modelPlaced: boolean = false;
  let currentModel: Object3D;
  let reticleEnabled: boolean = false;
  let defaultEnvironment: any;
  let plane: any;
  let planeCreated: boolean;
  // let bulbLight: any;
  // let bulbMat: any;
  let spotLight, lightHelper, shadowCameraHelper;

  const isARSupported = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if ("xr" in navigator) {
        let supported = (navigator as any).xr
          .isSessionSupported("immersive-ar")
          .then((supported: any) => {
            console.log(supported);

            arSupported = supported;
            return supported;
          });
        resolve(supported);
      }
      reject(false);
    });
  };

  const initLights = (scene: THREE.Scene) => {
    // TEST 1
    const light = new THREE.PointLight(0xffffbb, 0x080820, 1);
    light.position.set(0.5, 0, 0.25);
    scene.add(light);

    //TEST 2
    // const color = 0xFFFFFF;
    // const intensity = 1;
    // const secondLight = new THREE.PointLight(color, intensity);
    // light.position.set(0, 10, 0);
    // scene.add(secondLight);

    // TEST 3
    // spotLight = new THREE.SpotLight( 0xffffff, 1, 15, 0.2 );
    // spotLight.position.set(0.5, 0, 0.25);
    // spotLight.angle = Math.PI / 4;
    // spotLight.penumbra = 0.1;
    // spotLight.decay = 2;
    // spotLight.distance = 200;

    // spotLight.castShadow = true;
    // spotLight.shadow.mapSize.width = 512;
    // spotLight.shadow.mapSize.height = 512;
    // spotLight.shadow.camera.near = 10;
    // spotLight.shadow.camera.far = 200;
    // spotLight.shadow.focus = 1;
    // scene.add( spotLight );

    // shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
    // scene.add( shadowCameraHelper );

    // TEST 4
    // const spotLight = new THREE.SpotLight( 0xffffff );
    // spotLight.position.set( 10, 10, 10 );
    // scene.add( spotLight );

    // const spotLightHelper = new THREE.SpotLightHelper( spotLight );
    // scene.add( spotLightHelper );
  };

  const clearChildren = async () => {
    if (scene) {
      scene?.children.forEach((child: any) => {
        console.log(child);
        scene!.remove(child);
      });
      console.log(scene?.children)

      initLights(scene);
    }
  };

  const updateMovement = () => {
    if (reticleEnabled === true){
      reticleEnabled = false;
      scene?.getObjectByName("reticle")?.removeFromParent();

    } else {
      console.log("help")
      let x = scene?.getObjectByName("model");
      x!.visible = false;
      scene?.add(reticle);
      reticleEnabled = true;
      modelPlaced = false;
    }
  }

  const updateRotation = () => {
    rotationValue = rotationValue + 1;
  }

  const initScene = (model: Object3D) => {
    const container = document.createElement("div");
    arContainer = container;
    container.classList.toggle("hidden");
    document.body.appendChild(container);
    let sc = new THREE.Scene();

    // == BASICS == 
    // Camera
    let camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      40
    );

    // Lighting
    const defaultLight = new THREE.AmbientLight( 0xffffff );
    sc.add( defaultLight );

    initLights(sc);

    const addPlaneToSceneThatReceivesShadows = () => {
      const geometry = new THREE.PlaneGeometry(80,80);
      geometry.rotateX(-Math.PI / 2);
      const material = new THREE.ShadowMaterial();
      material.opacity = 0.5;
  
      plane = new THREE.Mesh(geometry, material);
      plane.receiveShadow = true;
      plane.visible = false;
      plane.matrixAutoUpdate = false;
      sc.add(plane);
    }
  
    addPlaneToSceneThatReceivesShadows();

    // Renderer
    let x = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    x.setPixelRatio(window.devicePixelRatio);
    x.setSize(window.innerWidth, window.innerHeight);
    x.shadowMap.enabled = true;
    x.shadowMap.type = THREE.PCFSoftShadowMap;
    x.outputEncoding = THREE.sRGBEncoding;
    x.physicallyCorrectLights = true;
    x.xr.enabled = true;
    container.appendChild( x.domElement );

    reticle = new THREE.Mesh(
      new THREE.RingBufferGeometry(0.10, 0.15, 32).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial()
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    reticle.name = "reticle";
    sc.add(reticle);

    // Light estimation
    const xrLight = new XREstimatedLight( x );
    // const xrShadowLight = xrLight.directionalLight;
    // xrShadowLight.castShadow = true;
    // console.log(xrShadowLight.position)

    // xrShadowLight.shadow.mapSize.width = 512; // default
    // xrShadowLight.shadow.mapSize.height = 512; // default
    // xrShadowLight.shadow.camera.near = 0.5; // default
    // xrShadowLight.shadow.camera.far = 500; // default
    //let lightProbe = new LightProbe(xrLight, x, unknown, , estimationStartCallback: () => void)

    xrLight.addEventListener( 'estimationstart', () => {
      // Swap the default light out for the estimated one one we start getting some estimated values.
      sc.add( xrLight );
      sc.remove( defaultLight );
      // The estimated lighting also provides an environment cubemap, which we can apply here.
      
      if ( xrLight.environment ) {
        console.log(xrLight);
        updateEnvironment( xrLight.environment );
        console.log(xrLight.environment)
      }

    } );

    xrLight.addEventListener( 'estimationend', () => {
      // Swap the lights back when we stop receiving estimated values.
      sc.add( defaultLight );
      sc.remove( xrLight );
      // Revert back to the default environment.
      updateEnvironment( defaultEnvironment );
    } );

    model.name = "model";
    model.rotateY(rotationValue);
    currentModel = model;


    // // TEST SHADOWS
    // spotLight = new THREE.SpotLight( 0xffffff, 1 );
    // spotLight.position.set(0.5, 0, 0.25);
    // spotLight.angle = Math.PI / 4;
    // spotLight.penumbra = 0.1;
    // spotLight.decay = 2;
    // spotLight.distance = 200;
    // spotLight.castShadow = true;
    // spotLight.shadow.mapSize.width = 512; // default
    // spotLight.shadow.mapSize.height = 512; // default
    // spotLight.shadow.camera.near = 0.5; // default
    // spotLight.shadow.camera.far = 500; // default
    // spotLight.shadow.focus = 1;
    // sc.add( spotLight );

    // lightHelper = new THREE.SpotLightHelper( spotLight );
    // sc.add( lightHelper );

    // shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
    // sc.add( shadowCameraHelper );

    //Create a SpotLight and turn on shadows for the light
    // THIS TURNS SHADOWS ON
    const light = new THREE.SpotLight( 0xffffff );
    light.castShadow = true; // default false
    sc.add( light );

    //Set up shadow properties for the light
    // light.shadow.mapSize.width = 512; // default
    // light.shadow.mapSize.height = 512; // default
    // light.shadow.camera.near = 0.5; // default
    // light.shadow.camera.far = 500; // default
    // light.shadow.focus = 1; // default

    //Create a sphere that cast shadows (but does not receive them)
    // const sphereGeometry = new THREE.SphereGeometry( 5, 32, 32 );
    // const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
    // const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    // sphere.castShadow = true; //default is false
    // sphere.receiveShadow = false; //default
    // sc.add( sphere );

    //Create a plane that receives shadows (but does not cast them)


    //Create a helper for the shadow camera (optional)
    // const helper = new THREE.CameraHelper( light.shadow.camera );
    // sc.add( helper );


    //TEST - point light in lamp
    // const color = 0xFFFFFF;
    // const intensity = 100;
    // const testPoint = new THREE.PointLight(color, intensity);
    // testPoint.position.set(model.position.x, model.position.y + 20, model.position.z);
    // sc.add(testPoint);

    // let test = new THREE.Mesh(
    //   new THREE.PlaneGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
    //   new THREE.MeshStandardMaterial()
    // )
    // test.position.set(model.position.x, model.position.y, model.position.z)
    // sc.add(test)

    // let controller = x.xr.getController(0);
    // controller.addEventListener("select", onSelect);
    // sc.add(controller);

    x.setAnimationLoop((timestamp, frame) => {
      if (frame) {
        const referenceSpace = x.xr.getReferenceSpace();
        const session = x.xr.getSession();

        if (hitTestSourceRequested === false) {
          session!
            .requestReferenceSpace("viewer")
            .then(function (referenceSpace) {
              session!
                .requestHitTestSource({ space: referenceSpace })
                .then(function (source) {
                  hitTestSource = source;
                });
            });

          session!.addEventListener("end", function () {
            hitTestSourceRequested = false;
            hitTestSource = null;
          });

          hitTestSourceRequested = true;
        }

        if (hitTestSource) {
          const hitTestResults = frame.getHitTestResults(hitTestSource);

          if (hitTestResults.length > 0) {
            const hit = hitTestResults[0];

            reticle.visible = true;
            reticle.matrix.fromArray(
              hit.getPose(referenceSpace!)!.transform.matrix
            );

            plane.visible = true;
            //if (!planeCreated) {
              plane.matrix.fromArray(hit.getPose(referenceSpace!)!.transform.matrix);
              planeCreated = true;
            //}
          } else {
            reticle.visible = false;
          }
        }
      }

      //light.position.set(- xrLight.directionalLight.position.x, xrLight.directionalLight.position.y, xrLight.directionalLight.position.z);
      //console.log(light.position)
      x.render(scene!, camera);
    }); 
    renderer = x;



    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      x.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);
    scene = sc;
    return x;
  };

  function updateEnvironment( envMap:any ) {
    scene!.traverse( function ( object:any ) {
      if ( object.isMesh ) object.material.envMap = envMap;
    } );

  }

  const onSelect = () => {
    if (reticle.visible) {
      if (modelPlaced == false) {
        currentModel.position.setFromMatrixPosition(reticle.matrix);
        plane.position.setFromMatrixPosition(reticle.matrix);
        currentModel.quaternion.setFromRotationMatrix(reticle.matrix);
        //.add(new Vector3(0, 0.5, 0));
        if(!scene?.getObjectByName("model")) {
          if (reticle.visible) {
            scene!.add(currentModel);
            console.log("placed");
            scene?.getObjectByName("reticle")?.removeFromParent();
          }
        } else {
          let x = scene?.getObjectByName("model");
          x!.visible = true;
          reticleEnabled = false;
        }
        modelPlaced = true;
        scene?.getObjectByName("reticle")?.removeFromParent();
      }
    }
  };


  // Rotate object to right
  const rotateRight = () => {
    if(currentModel){
      currentModel.rotateY(10);
    }
  }

  // Rotate object to left
  const rotateLeft = () => {
    if(currentModel){
      currentModel.rotateY(-10);
    }
  }

  // Change the model
  const changeModel = (model: THREE.Object3D) => {
    let lastLocation:Vector3 = currentModel.position;
    let x = scene?.getObjectByName("model");
    x?.removeFromParent();

    model.traverse( function( node ) {
      node.castShadow = true;
    });

    model.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        if (node.name === "BULB") {
          node.castShadow = false;
        }
      } 
    });
    
    scene?.add(model);

    model.position.setFromMatrixPosition(currentModel.matrixWorld)
    model.quaternion.setFromRotationMatrix(currentModel.matrixWorld);
    //model.position.set(lastLocation);
    model.name = "model";
    currentModel = model;
  }

  const createSessionIfSupported = (
    model: THREE.Object3D
  ): Promise<THREE.WebGLRenderer> => {
    return new Promise(async (resolve, reject) => {
      try {
        clearChildren();
        let supported = await isARSupported();
        if (supported) {
          const renderer = initScene(model);
          resolve(renderer);
        }
      } catch (e) {
        console.log(e);

        reject();
      }
    });
  };

  const getRenderer = () => {
    return renderer;
  };

  const getARContainer = () => {
    return arContainer;
  };

  return {
    getARContainer,
    isARSupported,
    createSessionIfSupported,
    getRenderer,
    clearChildren,
    updateRotation,
    updateMovement,
    rotateRight,
    rotateLeft,
    changeModel,
    onSelect
  };
})();