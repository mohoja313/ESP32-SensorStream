
let scene, camera, renderer, cube;
let offset = { pitch: 0, roll: 0, yaw: 0 }; ا

function parentWidth(elem) {
  return elem.parentElement.clientWidth;
}

function parentHeight(elem) {
  return elem.parentElement.clientHeight;
}

function init3D(){
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  camera = new THREE.PerspectiveCamera(
    75,
    parentWidth(document.getElementById("3Dcube")) / parentHeight(document.getElementById("3Dcube")),
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(
    parentWidth(document.getElementById("3Dcube")),
    parentHeight(document.getElementById("3Dcube"))
  );

  document.getElementById('3Dcube').appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(5, 1, 4);

  const cubeMaterials = [
    new THREE.MeshBasicMaterial({ color: 0x03045e }),
    new THREE.MeshBasicMaterial({ color: 0x023e8a }),
    new THREE.MeshBasicMaterial({ color: 0x0077b6 }),
    new THREE.MeshBasicMaterial({ color: 0x03045e }),
    new THREE.MeshBasicMaterial({ color: 0x023e8a }),
    new THREE.MeshBasicMaterial({ color: 0x0077b6 }),
  ];

  cube = new THREE.Mesh(geometry, cubeMaterials);
  scene.add(cube);
  camera.position.z = 5;
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = parentWidth(document.getElementById("3Dcube")) / parentHeight(document.getElementById("3Dcube"));
  camera.updateProjectionMatrix();
  renderer.setSize(
    parentWidth(document.getElementById("3Dcube")),
    parentHeight(document.getElementById("3Dcube"))
  );
}

function resetPosition() {
  fetch('http://your_system_IP:your_port/angles')
    .then(response => response.json())
    .then(data => {
      offset.pitch = data.pitch;
      offset.roll = data.roll;
      offset.yaw = data.yaw;
      console.log("Reset base to:", offset);
    })
    .catch(error => {
      console.error("Reset error:", error);
    });
}

async function updateCubeRotation() {
  try {
    const response = await fetch('http://your_system_IP:your_port/angles');
    const data = await response.json();

    const adjustedPitch = data.pitch - offset.pitch;
    const adjustedRoll = data.roll - offset.roll;
    const adjustedYaw = data.yaw - offset.yaw;

    cube.rotation.x = adjustedPitch;
    cube.rotation.y = adjustedYaw;
    cube.rotation.z = adjustedRoll;

    renderer.render(scene, camera);

    document.getElementById("gyroX").innerHTML = adjustedRoll.toFixed(2);
    document.getElementById("gyroY").innerHTML = adjustedPitch.toFixed(2);
    document.getElementById("gyroZ").innerHTML = adjustedYaw.toFixed(2);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

window.addEventListener('resize', onWindowResize, false);

init3D();
setInterval(updateCubeRotation, 100);
