

let scene, camera, renderer, cube;

function parentWidth(elem) {
  return elem.parentElement.clientWidth;
}

function parentHeight(elem) {
  return elem.parentElement.clientHeight;
}

function init3D(){
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  camera = new THREE.PerspectiveCamera(75, parentWidth(document.getElementById("3Dcube")) / parentHeight(document.getElementById("3Dcube")), 0.1, 1000);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(parentWidth(document.getElementById("3Dcube")), parentHeight(document.getElementById("3Dcube")));

  document.getElementById('3Dcube').appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(5, 1, 4);


  const cubeMaterials = [
    new THREE.MeshBasicMaterial({color:0x03045e}),
    new THREE.MeshBasicMaterial({color:0x023e8a}),
    new THREE.MeshBasicMaterial({color:0x0077b6}),
    new THREE.MeshBasicMaterial({color:0x03045e}),
    new THREE.MeshBasicMaterial({color:0x023e8a}),
    new THREE.MeshBasicMaterial({color:0x0077b6}),
  ];

  const material = cubeMaterials;

  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;
  renderer.render(scene, camera);
}

function onWindowResize(){
  camera.aspect = parentWidth(document.getElementById("3Dcube")) / parentHeight(document.getElementById("3Dcube"));
  camera.updateProjectionMatrix();
  renderer.setSize(parentWidth(document.getElementById("3Dcube")), parentHeight(document.getElementById("3Dcube")));
}

async function updateCubeRotation() {
  try {
    const response = await fetch('http://your_system_ip:your_port/angles');
    const data = await response.json();
    
    cube.rotation.x = data.pitch; 
    cube.rotation.y = data.yaw; 
    cube.rotation.z = data.roll;  
    
    renderer.render(scene, camera);
    
    document.getElementById("gyroX").innerHTML = data.roll.toFixed(2);
    document.getElementById("gyroY").innerHTML = data.pitch.toFixed(2);
    document.getElementById("gyroZ").innerHTML = data.yaw.toFixed(2);
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

window.addEventListener('resize', onWindowResize, false);

init3D();

setInterval(updateCubeRotation, 100);
