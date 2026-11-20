import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
// Phase 1: hand-placed landmark; no streaming or external assets yet.
export function createWorld(scene) {
 const solids=[],anchors=[];
 const stone=new THREE.MeshStandardMaterial({color:0x555769,roughness:0.95});
 function box(x,y,z,w,h,d,mat=stone){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);scene.add(m);m.updateMatrixWorld();solids.push(m);return m;}
 function anchor(x,y,z){const m=new THREE.Mesh(new THREE.SphereGeometry(.36,12,8),new THREE.MeshStandardMaterial({color:0xbca674,emissive:0x674715,emissiveIntensity:.65}));m.position.set(x,y,z);m.userData.tag='grapple_point';scene.add(m);anchors.push(m);}
 box(0,-1,3,22,2,20); // starting stone terrace, top at zero
 const oak=new THREE.MeshStandardMaterial({color:0x594b41,roughness:1});
 box(0,.08,7,12,.16,8,oak); // wooden training deck from the zone bible
 box(0,-7,-15,54,2,48); // lower aqueduct court, top at -6
 box(-16,-1,-12,9,10,10); // west terrace top 4
 box(15,1,-19,10,14,10); // east terrace top 8
 box(0,4,-32,12,20,8); // summit top 14
 for(let i=0;i<12;i++)box(-8,.125+i*.25,3-i*.8,3,.25+i*.5,.82);
 box(-8,2,-7,5,2,4);
 for(const [x,z,h] of [[-7,-17,8],[3,-20,12],[8,-29,17]]){box(x,-6+h/2,z,2.5,h,2.5);anchor(x,-6+h+.6,z);}
 box(-13,5,-12,2,2,2);anchor(-13,6.6,-12);
 box(12,9,-19,2,2,2);anchor(12,10.6,-19);
 box(0,15,-32,2,2,2);anchor(0,16.6,-32);
 box(-16,6,-16,7,1,1);anchor(-16,6.9,-16);
 box(15,11,-23,8,1,1);anchor(15,11.9,-23);
 anchor(-8,3.6,-7);anchor(7,1,0);
 // Broken struts and canyon silhouettes.
 box(-18,8,-15,1,6,1);box(-15,10,-15,7,1,1);
 for(let i=0;i<18;i++)box(Math.sin(i*7)*65,-20,(i-10)*10,7+(i%4)*4,18+(i%5)*6,9);
 scene.background=new THREE.Color(0x080b20);scene.fog=new THREE.FogExp2(0x171831,.018);
 scene.add(new THREE.HemisphereLight(0x8884ca,0x181124,2));
 const moon=new THREE.DirectionalLight(0xa9baff,2);moon.position.set(-20,40,12);scene.add(moon);
 for(const [x,y,z] of [[-6,2,8],[6,2,0],[-16,6,-10],[15,10,-18],[0,16,-30]]){
 const light=new THREE.PointLight(0xffb65b,55,15,2);light.position.set(x,y,z);scene.add(light);
 const bulb=new THREE.Mesh(new THREE.BoxGeometry(.22,.5,.22),new THREE.MeshBasicMaterial({color:0xffcc77}));bulb.position.copy(light.position);scene.add(bulb);
 }
 scene.updateMatrixWorld(true);
 return {solids,anchors,bounds:solids.map(m=>new THREE.Box3().setFromObject(m))};
}
