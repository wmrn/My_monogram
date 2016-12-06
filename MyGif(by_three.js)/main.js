var scene, renderer;
var light, camera;
var radians = (Math.PI / 180);
var center = new THREE.Object3D();
var video, canvas, context, texture;

window.onload = init;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.add(camera);
    light = new THREE.SpotLight(0xFFFFFF);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    setup();
    render();
    window.addEventListener("resize", resize, false);
}

function setup() {
    renderer.setClearColor(0xffffff, 1); //背景色
    renderer.shadowMap.enabled = true;
    /*camera.position.x=300;
    camera.position.y=320;
    camera.position.z=-300;*/
    camera.position.x = 0;
    camera.position.y = 160;
    camera.position.z = -300;

    light.position.set(0, 400, -160);
    light.distance = 800;
    light.castShadow = true;
    //light.shadowDarkness = 0.5;
    //light.shadowMapWidth = 1024;
    //light.shadowMapHeight = 1024;
    light.intensity = 0;

    // model
    var onProgress = function(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function(xhr) {};
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('data/');
    mtlLoader.load('M.mtl', function(materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('data/');
        objLoader.load('M.obj', function(object) {
            object.position.set(13, 0, 46);
            object.scale.set(30, 30, 30);
            object.rotation.y = (-180 + 14) * radians;
            object.castShadow = true; //影を作るオブジェクト
            scene.add(object);
        }, onProgress, onError);
    });

    //床
    video = document.createElement('video');
    video.src = "data/W.mp4";
    video.load();
    video.loop = true;
    video.play();

    canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 320;

    context = canvas.getContext('2d');
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    //生成したcanvasをtextureとしてTHREE.Textureオブジェクトを生成
    texture = new THREE.Texture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    //生成したvideo textureをmapに指定し、overdrawをtureにしてマテリアルを生成
    var material = new THREE.MeshBasicMaterial({
        map: texture,
        overdraw: true,
        side: THREE.DoubleSide
    });
    var geometry = new THREE.PlaneGeometry(320, 320);
    var plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = 90 * radians;
    plane.rotation.z = -15 * radians;
    plane.receiveShadow = true; //影を受ける

    scene.add(plane);

}

function render() {
    requestAnimationFrame(render);
    //light.position.=1;

    camera.lookAt(center.position);
    renderer.render(scene, camera);
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        context.drawImage(video, 0, 0, 320, 320);
        if (texture) {
            texture.needsUpdate = true;
        }
    }
}

function resize(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
