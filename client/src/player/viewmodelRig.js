import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
// Dedicated near-clip pass: procedural placeholders, not final hands or animation.
export function createRig(){const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.01,10),rig=new THREE.Group();scene.add(rig);scene.add(new THREE.HemisphereLight(0xb2b4ff,0x31221b,3));
 const brass=new THREE.MeshStandardMaterial({color:0xb58b48,metalness:.65,roughness:.35}),oak=new THREE.MeshStandardMaterial({color:0x654a35});
 function part(w,h,d,x,y,z,mat){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);rig.add(m);return m;}
 part(.15,.16,.5,.3,-.3,-.5,oak);part(.19,.18,.22,.3,-.28,-.67,brass);part(.065,.065,.22,.3,-.21,-.79,brass);
 part(.13,.16,.42,-.32,-.35,-.5,oak);part(.17,.27,.17,-.32,-.28,-.76,brass);part(.12,.19,.12,-.32,-.28,-.76,new THREE.MeshBasicMaterial({color:0xffcb77}));
 return {scene,camera,update(time,speed,active){rig.position.y=Math.sin(time*9)*Math.min(speed*.0008,.012);rig.rotation.z=THREE.MathUtils.lerp(rig.rotation.z,active?-.08:0,.12);}};
                           }
