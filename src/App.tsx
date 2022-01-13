import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { WEBGL } from './WebGL';
import ARButton from './components/ARButton';

function App() {
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer>();
  let camera:any, scene:any
  let controller:any;
  let reticle:any;
  let hitTestSource:any = null;
  let hitTestSourceRequested:any = false;

  const init = () => {
    const container = document.createElement( 'div' );
    container.classList.toggle("hidden");
    document.body.appendChild( container );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 0, 0.25);
    scene.add(light);

    let newRenderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    newRenderer.setPixelRatio( window.devicePixelRatio );
    newRenderer.setSize( window.innerWidth, window.innerHeight );
    newRenderer.xr.enabled = true;
    container.appendChild( newRenderer.domElement );

    const geometry = new THREE.CylinderGeometry(
      0.1,
      0.1,
      0.2,
      32
    ).translate(0, 0.1, 0);
    
    
    const onSelect = () => {
      if (reticle.visible) {
        const material = new THREE.MeshPhongMaterial({
          color: 0xffffff * Math.random()
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.setFromMatrixPosition(reticle.matrix);
        mesh.scale.y = Math.random() * 2 + 1;
        scene.add(mesh);
      }
    }

    controller = newRenderer.xr.getController( 0 );
    controller.addEventListener( 'select', onSelect );
    scene.add( controller );

    reticle = new THREE.Mesh(
      new THREE.RingGeometry( 0.15, 0.2, 32 ).rotateX( - Math.PI / 2 ),
      new THREE.MeshBasicMaterial()
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add( reticle );

    newRenderer.setAnimationLoop((timestamp, frame:any) => {
      if (frame) {
        const referenceSpace = newRenderer.xr.getReferenceSpace();
        const session = newRenderer.xr.getSession();

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

          if (hitTestResults.length) {
            const hit = hitTestResults[0];

            reticle.visible = true;
            reticle.matrix.fromArray(
              hit.getPose(referenceSpace!)!.transform.matrix
            );
          } else {
            reticle.visible = false;
          }
        }
      }

      newRenderer.render(scene, camera);
    })

    setRenderer(newRenderer);

    const onWindowResize = () => {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
  
      newRenderer.setSize( window.innerWidth, window.innerHeight );
  
    } 
    window.addEventListener( 'resize', onWindowResize );
  }


  useEffect(() => {
    init();
  }, [])



  return (
    <div className="App">
      <h1 className='text-lg text-red-400'>hey</h1>
      <header className="App-header">
        <ARButton renderer={renderer}/>
      </header>
    </div>
  );
}

export default App;
