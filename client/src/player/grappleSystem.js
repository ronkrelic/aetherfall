import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
export class GrappleSystem {
 constructor(scene,camera,player,world){Object.assign(this,{camera,player,world,target:null,active:null,cooldown:0});this.ray=new THREE.Raycaster();this.line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()]),new THREE.LineBasicMaterial({color:0xe5b661}));this.line.frustumCulled=false;this.line.visible=false;scene.add(this.line);
 document.addEventListener('keydown',e=>{if(e.code==='KeyF'&&!e.repeat&&player.locked&&this.target&&this.cooldown<=0){this.active=this.target;this.line.visible=true;}});
 document.addEventListener('keyup',e=>{if(e.code==='KeyF')this.release();});
 document.addEventListener('pointerlockchange',()=>{if(!player.locked)this.release();});window.addEventListener('blur',()=>this.release());
 }
 release(){if(this.active)this.cooldown=1.3;this.active=null;this.line.visible=false;}
 aim(){this.camera.updateMatrixWorld();this.ray.setFromCamera(new THREE.Vector2(),this.camera);this.ray.far=100;const hits=this.ray.intersectObjects([...this.world.anchors,...this.world.solids],false);const hit=hits[0];this.aimed=hit?.object.userData.tag==='grapple_point'?hit.object:null;this.distance=this.aimed?this.camera.position.distanceTo(this.aimed.position):Infinity;this.target=this.distance<=35?this.aimed:null;for(const a of this.world.anchors)a.material.emissive.setHex(a===this.target?0x44ffe1:0x674715);}
 update(dt){this.cooldown=Math.max(0,this.cooldown-dt);if(!this.active)return;
 const delta=this.active.position.clone().sub(this.player.camera.position),distance=delta.length();if(distance<1.25||distance>55){this.release();return;}
 const dir=delta.normalize(); // spring acceleration, radial damping; tangential velocity survives
 const radial=this.player.velocity.dot(dir);const force=THREE.MathUtils.clamp(distance*5-radial*1.1,0,85);this.player.velocity.addScaledVector(dir,force*dt);this.player.velocity.clampLength(0,30);
 // Release if a wall intervenes, rather than towing through geometry.
 this.ray.set(this.player.camera.position,dir);this.ray.far=Math.max(0,distance-.55);if(this.ray.intersectObjects(this.world.solids,false).length)this.release();
 }
 draw(){if(!this.active)return;const start=new THREE.Vector3(.28,-.24,-.55).applyMatrix4(this.camera.matrixWorld);const a=this.line.geometry.attributes.position;a.setXYZ(0,start.x,start.y,start.z);a.setXYZ(1,this.active.position.x,this.active.position.y,this.active.position.z);a.needsUpdate=true;}
}
