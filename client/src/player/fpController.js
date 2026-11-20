import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
export class FPController {
 constructor(camera,canvas,bounds){Object.assign(this,{camera,canvas,bounds,position:new THREE.Vector3(0,.17,7),velocity:new THREE.Vector3(),keys:new Set(),grounded:false,yaw:0,pitch:0,locked:false,jumpQueued:false});
 document.addEventListener('keydown',e=>{if(!this.locked)return;if(['Space','KeyW','KeyA','KeyS','KeyD','ShiftLeft','ShiftRight'].includes(e.code))e.preventDefault();this.keys.add(e.code);if(e.code==='Space'&&!e.repeat)this.jumpQueued=true;if(e.code==='KeyR')this.reset();});
 document.addEventListener('keyup',e=>this.keys.delete(e.code));
 document.addEventListener('mousemove',e=>{if(!this.locked)return;this.yaw-=e.movementX*.002;this.pitch=THREE.MathUtils.clamp(this.pitch-e.movementY*.002,-1.5,1.5);this.look();});
 document.addEventListener('pointerlockchange',()=>{this.locked=document.pointerLockElement===canvas;if(!this.locked){this.keys.clear();this.jumpQueued=false;}document.getElementById('enter').hidden=this.locked;});
 window.addEventListener('blur',()=>{this.keys.clear();this.jumpQueued=false;});this.look();this.sync();}
 look(){this.camera.rotation.set(this.pitch,this.yaw,0,'YXZ');}
 reset(){this.position.set(0,.17,7);this.velocity.set(0,0,0);this.jumpQueued=false;}
 sync(){this.camera.position.copy(this.position).add(new THREE.Vector3(0,1.65,0));}
 overlaps(b){const p=this.position,r=.32;return p.x+r>b.min.x&&p.x-r<b.max.x&&p.y+1.8>b.min.y&&p.y<b.max.y&&p.z+r>b.min.z&&p.z-r<b.max.z;}
 update(dt,grappling=false){const k=this.keys,p=this.position,v=this.velocity,ground=this.grounded;
 const move=new THREE.Vector3(Number(k.has('KeyD'))-Number(k.has('KeyA')),0,Number(k.has('KeyS'))-Number(k.has('KeyW')));if(move.lengthSq())move.normalize().applyAxisAngle(new THREE.Vector3(0,1,0),this.yaw);
 const speed=k.has('ShiftLeft')||k.has('ShiftRight')?10:6;
 if(ground&&!grappling){const blend=1-Math.exp(-20*dt);v.x+=(move.x*speed-v.x)*blend;v.z+=(move.z*speed-v.z)*blend;}
 else if(move.lengthSq()){const along=v.x*move.x+v.z*move.z;const a=Math.max(0,Math.min(12*dt,speed-along));v.x+=move.x*a;v.z+=move.z*a;}
 if(this.jumpQueued&&ground){v.y=9;this.grounded=false;}this.jumpQueued=false;v.y-=22*dt;
 // Fixed 120 Hz steps plus axis separation prevent tunnelling at grapple speed.
 for(const axis of ['x','z','y']){const old=p[axis];p[axis]+=v[axis]*dt;if(axis==='y')this.grounded=false;
 for(const b of this.bounds){if(!this.overlaps(b))continue;
 if(axis!=='y'&&ground&&b.max.y-p.y<=.31&&b.max.y>=p.y){const y=p.y;p.y=b.max.y+.001;if(this.bounds.some(c=>this.overlaps(c)))p.y=y;else continue;}
 if(axis==='y'){if(v.y<=0){p.y=b.max.y+.001;this.grounded=true;}else p.y=b.min.y-1.801;}else p[axis]=old;v[axis]=0;
 }}if(p.y< -32)this.reset();this.sync();}
}
