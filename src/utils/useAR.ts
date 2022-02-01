import * as THREE from "three";
import { Object3D } from "three";
import { XREstimatedLight } from 'three/examples/jsm/webxr/XREstimatedLight';


export const useAR = (() => {
  // let arSupported;
  let renderer: any = undefined;
  let scene: THREE.Scene | undefined = undefined;
  let arContainer: any = undefined;
  let reticle: any;
  let hitTestSource: any = null;
  let hitTestSourceRequested = false;
  let rotationValue = 0;
  let modelPlaced: boolean = false;
  let currentModel: any;
  let reticleEnabled: boolean = false;
  let defaultEnvironment: any;
  let plane: any;
  let light: THREE.SpotLight;
  // let testCone: any;
  let camera: THREE.PerspectiveCamera;
  let dark: THREE.Mesh;
  let darkMode: boolean;
  // let secondDark: THREE.Mesh;
  let defaultLight: THREE.AmbientLight;
  let hemispehereLight: THREE.HemisphereLight;
  // let bulbLight: any;
  // let bulbMat: any;

  const initLights = (scene: THREE.Scene) => {
    // TEST 1
    hemispehereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    hemispehereLight.position.set(0.5, 0, 0.25);
    scene.add(hemispehereLight);

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
      currentModel = undefined;
      scene.children.forEach((child: any) => {
        if (child.name !== 'reticle') {
					scene!.remove(child)
				}
      });

      scene.getObjectByName("model")?.removeFromParent();

      initLights(scene);
    }
  };

  const updateMovement = () => {
    if (reticleEnabled === true){
      reticleEnabled = false;
      scene?.getObjectByName("reticle")?.removeFromParent();

    } else {
      let x = scene?.getObjectByName("model");
      x!.visible = false;
      scene?.add(reticle);
      reticleEnabled = true;
      modelPlaced = false;
    }
  }

  const updateRotation = () => {
    rotationValue = rotationValue + 0.01;
  }

  function updateEnvironment( envMap:any ) {
    scene!.traverse( function ( object:any ) {
      if ( object.isMesh ) object.material.envMap = envMap;
    } );

  }

  const onSelect = () => {
    if (reticle.visible) {
      if (modelPlaced === false) {
        currentModel.position.setFromMatrixPosition(reticle.matrix);
        currentModel.quaternion.setFromRotationMatrix(reticle.matrix);
        //testCone.position.setFromMatrixPosition(reticle.matrix);
        if(!scene?.getObjectByName("model")) {
          if (reticle.visible) {
            //light.position.set(reticle.matrix.x)
            scene?.getObjectByName("plane")?.removeFromParent();
            addPlaneToSceneThatReceivesShadows(reticle.position);
            scene!.add(currentModel);
            scene?.getObjectByName("reticle")?.removeFromParent();
          }
        } else {
          let x = scene!.getObjectByName("model");
          x?.updateMatrixWorld()
          x?.updateMatrix()
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
      currentModel.rotateY(0.1);
    }
  }

  // Rotate object to left
  const rotateLeft = () => {
    
    if(currentModel){
      currentModel.rotateY(-0.1);
    }
  }

  // Change the model
  const changeModel = (model: THREE.Object3D, darkModeState: boolean) => {
    darkMode = darkModeState;

    if (darkModeState === true) {
      scene?.getObjectByName("mainLight")?.removeFromParent();
      defaultLight.intensity = 0.4;
      hemispehereLight.intensity = 0.4;
    } else {
      defaultLight.intensity = 1;
      hemispehereLight.intensity = 1;
      scene?.add(light);
    }
    
    let x = scene?.getObjectByName("model");
    x?.removeFromParent();
    x?.remove();

    model.traverse( function( node ) {
      node.castShadow = true;
    });
    
    if (reticle.visible) {
      scene?.add(model);
      model.position.setFromMatrixPosition(currentModel.matrixWorld)
      model.quaternion.setFromRotationMatrix(currentModel.matrixWorld);
    }

    model.name = "model";
    currentModel = model;
  }

  // Shadows
  const addPlaneToSceneThatReceivesShadows = (position:any) => {
    const geometry = new THREE.PlaneGeometry(80,80);
    geometry.rotateX(-Math.PI / 2);
    const material = new THREE.ShadowMaterial();
    material.opacity = 0.5;
    
    plane = new THREE.Mesh(geometry, material);
    plane.position.set(position);
    plane.name = "plane";
    plane.receiveShadow = true;
    plane.visible = false;
    plane.matrixAutoUpdate = false;
    scene?.add(plane);
  }

  const initScene = (model: Object3D) => {
    const container = document.createElement("div");
    arContainer = container;
    container.classList.toggle("hidden");
    document.body.appendChild(container);
    let sc = new THREE.Scene();

    // == BASICS == 
    // Camera
    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      40
    );

    // Lighting
    defaultLight = new THREE.AmbientLight( 0xffffff );
    sc.add( defaultLight );

    darkMode = false;

    initLights(sc);

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

    dark = new THREE.Mesh(
      new THREE.TorusGeometry(20, 30, 16, 100).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({color: 0x000000, opacity:0.6})
    );
    dark.matrixAutoUpdate = true;
    dark.visible = false;
    dark.name = "dark";
    dark.position.set(0, 0, -2);
    sc.add(dark);

    // secondDark = new THREE.Mesh(
    //   new THREE.PlaneGeometry(window.innerWidth, window.innerHeight),
    //   new THREE.MeshBasicMaterial({color: 0x000000, opacity:0.6})
    // );
    // secondDark.matrixAutoUpdate = true;
    // secondDark.visible = false;
    // secondDark.name = "seconddark";
    // secondDark.position.set(0, 0, 2);
    // sc.add(secondDark);

    // Reticle
    reticle = new THREE.Mesh(
      new THREE.RingBufferGeometry(0.10, 0.15, 32).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial()
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    reticle.name = "reticle";
    sc.add(reticle);

    addPlaneToSceneThatReceivesShadows(model.position);


    // const testLight = () => {
    //   const geometry = new THREE.ConeGeometry( 5, 2, 3 );
    //   const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    //   testCone = new THREE.Mesh( geometry, material );

    //   sc.add(testCone);
    // }

    //testLight();

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
        updateEnvironment( xrLight.environment );
      }

    } );

    xrLight.addEventListener( 'estimationend', () => {
      // Swap the lights back when we stop receiving estimated values.
      sc.add( defaultLight );
      sc.remove( xrLight );
      // Revert back to the default environment.
      updateEnvironment( defaultEnvironment );
    } );
    
    // Model
    model.name = "model";
    model.rotateY(rotationValue);
    modelPlaced = false;
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
    light = new THREE.SpotLight( 0xffffff, 1, 1000 );
    light.name = "mainLight";
    light.position.set(0,1,0)
    light.distance = 200;
    light.castShadow = true; // default false
    sc.add( light );

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 1000;
    light.shadow.focus = 1; // default

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
    scene = sc;

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
            
            setTimeout(function () {
              if ( !darkMode) {
                plane.visible = true;
                plane.matrix.fromArray(hit.getPose(referenceSpace!)!.transform.matrix);
                //planeCreated = true;
              }
            }, 500);

          } else {
            reticle.visible = false;
          }
        }
      }

      //light.position.set(- xrLight.directionalLight.position.x, xrLight.directionalLight.position.y, xrLight.directionalLight.position.z);
      //console.log(light.position)
      if (darkMode) {
        dark.visible = true;
        dark.position.set(camera.position.x, camera.position.y, camera.position.z);
        dark.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
      } else {
        dark.visible = false;
      }


      x.render(scene!, camera);
    }); 
    renderer = x;



    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      x.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);
    return x;
  };

  const createSessionIfSupported = (
    model: THREE.Object3D
  ): Promise<THREE.WebGLRenderer> => {
    return new Promise(async (resolve, reject) => {
      try {
        clearChildren();
        const renderer = initScene(model);
        resolve(renderer);
      } catch (e) {
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
    createSessionIfSupported,
    getRenderer,
    clearChildren,
    updateRotation,
    updateMovement,
    rotateRight,
    rotateLeft,
    changeModel,
    onSelect,
    initScene
  };
})();