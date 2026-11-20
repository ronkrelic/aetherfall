import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
import {createWorld} from './world/chunkManager.js';
import {FPController} from './player/fpController.js';
import {GrappleSystem} from './player/grappleSystem.js';
import {createRig} from './player/viewmodelRig.js';
const canvas=document.getElementById('game'),status=document.getElementById('status'),enter=document.getElementById('enter');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.autoClear=false;
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,.05,250),world=createWorld(scene),player=new FPController(camera,canvas,world.bounds),grapple=new GrappleSystem(scene,camera,player,world),rig=createRig();
function resize(){renderer.setSize(innerWidth,innerHeight);for(const c of [camera,rig.camera]){c.aspect=innerWidth/innerHeight;c.updateProjectionMatrix();}}resize();addEventListener('resize',resize);
enter.disabled=false;enter.textContent='Click to enter Warden’s Overlook';
enter.addEventListener('click',async()=>{try{await canvas.requestPointerLock();}catch(e){status.textContent='Pointer lock unavailable: '+e.message;}});
canvas.addEventListener('click',()=>{if(!player.locked)enter.click();});
document.addEventListener('keydown',e=>{if(e.code==='KeyR')grapple.release();});
document.addEventListener('visibilitychange',()=>{last=performance.now();accumulator=0;});
let last=performance.now(),accumulator=0,frames=0;
function frame(now){requestAnimationFrame(frame);const elapsed=Math.min((now-last)/1000,.05);last=now;
 if(player.locked){accumulator+=elapsed;while(accumulator>=1/120){grapple.aim();grapple.update(1/120);player.update(1/120,!!grapple.active);accumulator-=1/120;}}else accumulator=0;
 player.sync();camera.updateMatrixWorld();grapple.aim();grapple.draw();rig.update(now/1000,player.velocity.length(),!!grapple.active);
 status.textContent=grapple.active?'Cable engaged • release F to slingshot':grapple.cooldown>0?'Winch cooling • '+grapple.cooldown.toFixed(1)+'s':grapple.target?'Anchor in range • '+grapple.distance.toFixed(1)+'m • hold F':grapple.aimed?'Anchor out of range • '+grapple.distance.toFixed(1)+'m / 35m':'Aim at a brass anchor • range 35m';
 document.getElementById('reticle').style.color=grapple.target?'#70ffe1':'#e5d6b4';
 renderer.clear();renderer.render(scene,camera);renderer.clearDepth();renderer.render(rig.scene,rig.camera);frames++;
}
requestAnimationFrame(frame);
// Read-only diagnostic getters for headless smoke checks and PC playtest reports.
window.aetherfall={get snapshot(){return {three:THREE.REVISION,frames,drawCalls:renderer.info.render.calls,locked:player.locked,position:player.position.toArray(),velocity:player.velocity.toArray(),anchors:world.anchors.length,active:!!grapple.active,cooldown:grapple.cooldown,target:!!grapple.target};}};
