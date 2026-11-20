import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
// Bible 03: 100% -> Breach, +20%; bible 09/06: exactly 4s.
// 07 has NO Training Construct entry or starting weapon/base stats.
// Generic 06 light profile is used, NOT an invented class weapon.
export const RULES=Object.freeze({breachSeconds:4,breachMultiplier:1.2,lightHP:1,lightStagger:.5,
 // Every undocumented balance choice is deliberately named PLACEHOLDER.
 PLACEHOLDER_constructHP:200,PLACEHOLDER_playerHP:100,PLACEHOLDER_baseDamage:20,
 PLACEHOLDER_maxStagger:100,PLACEHOLDER_constructDamage:15,
 PLACEHOLDER_attackRange:3,PLACEHOLDER_executeRange:3,PLACEHOLDER_aimDot:.72,
 PLACEHOLDER_recovery:.45,PLACEHOLDER_hitDelay:.12,PLACEHOLDER_swingSeconds:.32,
 PLACEHOLDER_aggroRange:8,PLACEHOLDER_meleeRange:2.6,PLACEHOLDER_windup:1,
 PLACEHOLDER_enemySwing:.25,PLACEHOLDER_enemyRecovery:1.3,PLACEHOLDER_respawn:4,
 PLACEHOLDER_spawnX:0,PLACEHOLDER_spawnY:.16,PLACEHOLDER_spawnZ:3.8,
 PLACEHOLDER_hitFlash:.16,PLACEHOLDER_executeSeconds:.65});
const P=RULES;
export class CombatClient {
 constructor(scene,camera,player,rig,world,grapple){Object.assign(this,{scene,camera,player,rig,world,grapple});
 this.root=new THREE.Group();scene.add(this.root);this.material=new THREE.MeshStandardMaterial({color:0x626075,emissive:0x000000,roughness:.8});
 const part=(w,h,d,x,y,z,parent=this.root)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),this.material);m.position.set(x,y,z);parent.add(m);return m;};
 part(.9,1,.6,0,1.25,0);part(.55,.5,.5,0,2,0);part(.3,.75,.35,-.27,.4,0);part(.3,.75,.35,.27,.4,0);
 this.arm=new THREE.Group();this.arm.position.set(.65,1.7,0);this.root.add(this.arm);part(.3,.95,.35,0,-.4,0,this.arm);part(.3,.95,.35,-.65,1.25,0);
 this.core=new THREE.Mesh(new THREE.IcosahedronGeometry(.2),new THREE.MeshBasicMaterial({color:0xb28aff}));this.core.position.set(0,1.35,.34);this.root.add(this.core);
 this.reset();
 document.addEventListener('mousedown',e=>{if(e.button===0&&player.locked)this.attack();});
 document.addEventListener('keydown',e=>{if(!player.locked||e.repeat)return;if(e.code==='KeyE')this.execute();if(e.code==='KeyR')this.reset();});
 document.addEventListener('pointerlockchange',()=>{if(!player.locked){this.pending=-1;this.swing=0;}});
 }
 resetEnemy(){this.hp=P.PLACEHOLDER_constructHP;this.stagger=0;this.state='IDLE';this.timer=0;this.breach=0;this.flash=0;this.executed=false;this.root.position.set(P.PLACEHOLDER_spawnX,P.PLACEHOLDER_spawnY,P.PLACEHOLDER_spawnZ);this.root.rotation.set(0,0,0);this.root.scale.setScalar(1);this.arm.rotation.set(0,0,0);}
 reset(){this.resetEnemy();this.playerHP=P.PLACEHOLDER_playerHP;this.dead=false;this.recovery=0;this.pending=-1;this.swing=0;this.lastDamage=0;this.hits=0;this.message='Training Construct ready';}
 distance(){return this.camera.position.distanceTo(this.root.position.clone().add(new THREE.Vector3(0,1.25,0)));}
 aimed(range){if(this.distance()>range)return false;const to=this.root.position.clone().add(new THREE.Vector3(0,1.25,0)).sub(this.camera.position);const dist=to.length();const dir=to.normalize();if(this.camera.getWorldDirection(new THREE.Vector3()).dot(dir)<P.PLACEHOLDER_aimDot)return false;const ray=new THREE.Raycaster(this.camera.position,dir,0,Math.max(0,dist-.55));return ray.intersectObjects(this.world.solids,false).length===0;}
 attack(){if(this.dead||this.recovery>0)return false;this.recovery=P.PLACEHOLDER_recovery;this.swing=P.PLACEHOLDER_swingSeconds;this.pending=P.PLACEHOLDER_hitDelay;return true;}
 hit(){if(this.state==='DEAD'||!this.aimed(P.PLACEHOLDER_attackRange))return false;const breached=this.state==='BREACHED';this.lastDamage=P.PLACEHOLDER_baseDamage*P.lightHP*(breached?P.breachMultiplier:1);this.hp=Math.max(0,this.hp-this.lastDamage);this.hits++;this.flash=P.PLACEHOLDER_hitFlash;this.message='Hit '+this.lastDamage+(breached?' / Breach +20%':'');
 if(this.hp<=0){this.kill(false);return true;}if(!breached){this.stagger=Math.min(P.PLACEHOLDER_maxStagger,this.stagger+P.PLACEHOLDER_baseDamage*P.lightStagger);if(this.stagger>=P.PLACEHOLDER_maxStagger){this.state='BREACHED';this.breach=P.breachSeconds;this.message='BREACH — E EXECUTE';}}return true;}
 kill(executed){this.state='DEAD';this.hp=0;this.stagger=0;this.breach=0;this.timer=P.PLACEHOLDER_respawn;this.executed=executed;this.message=executed?'EXECUTED — core shattered':'Construct down';}
 execute(){if(this.dead||this.state!=='BREACHED'||!this.aimed(P.PLACEHOLDER_executeRange))return false;this.kill(true);this.swing=P.PLACEHOLDER_executeSeconds;return true;}
 hurt(){if(this.dead)return;this.playerHP=Math.max(0,this.playerHP-P.PLACEHOLDER_constructDamage);this.message='Construct hit — '+P.PLACEHOLDER_constructDamage;if(this.playerHP===0){this.dead=true;this.pending=-1;this.grapple.release();this.player.velocity.set(0,0,0);this.player.keys.clear();this.message='YOU FELL — R to return to the deck';}}
 update(dt){this.recovery=Math.max(0,this.recovery-dt);this.swing=Math.max(0,this.swing-dt);this.flash=Math.max(0,this.flash-dt);
 if(this.pending>=0){this.pending-=dt;if(this.pending<=0){this.pending=-1;if(!this.dead)this.hit();}}
 if(this.state==='DEAD'){this.timer-=dt;this.root.rotation.z=THREE.MathUtils.damp(this.root.rotation.z,-1.5,8,dt);this.root.scale.setScalar(this.executed?Math.max(.05,this.timer/P.PLACEHOLDER_respawn):1);if(this.timer<=0)this.resetEnemy();}
 else if(!this.dead){const delta=this.camera.position.clone().sub(this.root.position);this.root.rotation.y=Math.atan2(delta.x,delta.z);const near=this.distance()<=P.PLACEHOLDER_aggroRange;
 if(this.state==='BREACHED'){this.breach=Math.max(0,this.breach-dt);if(this.breach===0){this.stagger=0;this.state='AGGRO';this.timer=P.PLACEHOLDER_enemyRecovery;}}
 else if(this.state==='IDLE'&&near){this.state='AGGRO';this.timer=.5;}
 else if(this.state==='AGGRO'){this.timer-=dt;if(!near)this.state='IDLE';else if(this.timer<=0&&this.distance()<=P.PLACEHOLDER_meleeRange){this.state='WINDUP';this.timer=P.PLACEHOLDER_windup;}}
 else if(this.state==='WINDUP'){this.timer-=dt;if(this.timer<=0){this.state='ATTACK';this.timer=P.PLACEHOLDER_enemySwing;const forward=new THREE.Vector3(Math.sin(this.root.rotation.y),0,Math.cos(this.root.rotation.y));const flat=delta.clone();flat.y=0;const vertical=Math.abs(this.player.position.y-this.root.position.y)<1.8;if(vertical&&this.distance()<=P.PLACEHOLDER_meleeRange&&flat.normalize().dot(forward)>.5&&this.aimEnemyClear())this.hurt();}}
 else if(this.state==='ATTACK'){this.timer-=dt;if(this.timer<=0){this.state='AGGRO';this.timer=P.PLACEHOLDER_enemyRecovery;}}
 }
 this.root.rotation.x=this.state==='BREACHED'?.6:0;this.arm.rotation.x=this.state==='WINDUP'?-2.5:this.state==='ATTACK'?1.4:0;
 const gold=this.state==='BREACHED'||(this.state==='DEAD'&&this.executed);this.core.material.color.setHex(gold?0xffcc55:0xb28aff);this.material.emissive.setHex(this.flash>0?0xffffff:gold?0x705015:this.state==='WINDUP'?0x9f3010:0x000000);
 this.rig.combatSwing=this.swing>0?Math.sin(Math.min(1,this.swing/P.PLACEHOLDER_swingSeconds)*Math.PI):0;
 }
 aimEnemyClear(){const origin=this.root.position.clone().add(new THREE.Vector3(0,1.5,0));const delta=this.camera.position.clone().sub(origin);return new THREE.Raycaster(origin,delta.clone().normalize(),0,delta.length()).intersectObjects(this.world.solids,false).length===0;}
 get snapshot(){return {state:this.state,hp:this.hp,stagger:this.stagger,breach:this.breach,playerHP:this.playerHP,dead:this.dead,hits:this.hits,lastDamage:this.lastDamage,respawn:this.timer,position:this.root.position.toArray()};}
}
