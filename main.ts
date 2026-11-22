import{mkdirSync as mk,readdirSync as rd,readFileSync as rf,writeFileSync as wf}from"node:fs";
import{join as j}from"node:path";
function vmx(pg,ib){
const n=pg.length,vs=new Int32Array(256),cs=new Int32Array(64),mm=new Int32Array(256),ob=new Uint8Array(65536);
let vp=0,kp=0,wp=0,rp=0,pp=0,ct=0;
const fin=e=>[ob.slice(0,wp),e];
for(;;){
if(ct>=1e6)return fin(10);
if(pp<0||pp>=n)return fin(9);
const op=pg[pp],nx=pp+1+(op===1?1:op===2?4:op>47&&op<52?2:0);
if(!(op<8||op>15&&op<35||op>47&&op<53||op===64||op===65||op>79&&op<84))return fin(5);
if(nx>n)return fin(9);
ct++;
const bo=op>15&&op<35&&op!==23&&op!==27;
const po=op===7?3:op===5||op===6||op===65||bo?2:op===3||op===4||op===23||op===27||op===49||op===50||op===64||op>79&&op!==82?1:0;
const pu=op===6||op===7?3:op===4||op===5?2:op>0&&op<3||bo||op===23||op===27||op===64||op===82?1:0;
if(vp<po)return fin(2);
if(vp-po+pu>256)return fin(3);
pp=nx;
switch(op){
case 0:return fin(0);
case 1:vs[vp++]=pg.readInt8(nx-1);break;
case 2:vs[vp++]=pg.readInt32LE(nx-4);break;
case 3:vp--;break;
case 4:vs[vp]=vs[vp-1];vp++;break;
case 5:{const t=vs[vp-1];vs[vp-1]=vs[vp-2];vs[vp-2]=t;break;}
case 6:vs[vp]=vs[vp-2];vp++;break;
case 7:{const t=vs[vp-3];vs[vp-3]=vs[vp-2];vs[vp-2]=vs[vp-1];vs[vp-1]=t;break;}
case 23:vs[vp-1]=-vs[vp-1]|0;break;
case 27:vs[vp-1]=~vs[vp-1];break;
case 48:case 49:case 50:if(op===48||(op===49)===(vs[--vp]===0))pp=nx+pg.readInt16LE(nx-2);break;
case 51:if(kp>=64)return fin(7);cs[kp++]=nx;pp=pg.readUInt16LE(nx-2);break;
case 52:if(kp===0)return fin(8);pp=cs[--kp];break;
case 64:case 65:{const ad=vs[vp-1];if(ad<0||ad>255)return fin(6);if(op===64)vs[vp-1]=mm[ad];if(op===65){mm[ad]=vs[vp-2];vp-=2;}break;}
case 80:{const tx=String(vs[vp-1]);if(wp+tx.length>65536)return fin(11);for(let k=0;k<tx.length;k++)ob[wp++]=tx.charCodeAt(k);vp--;break;}
case 81:if(wp>=65536)return fin(11);ob[wp++]=vs[--vp]&255;break;
case 82:vs[vp++]=rp<ib.length?ib[rp++]:-1;break;
case 83:return fin(vs[--vp]&255);
default:{const b=vs[vp-1],a=vs[vp-2];if(b===0&&op>18&&op<23)return fin(4);const r=[a+b|0,a-b|0,Math.imul(a,b),a===-2147483648&&b===-1?a:(a/b)|0,b===-1?0:(a%b)|0,Math.floor((a>>>0)/(b>>>0))|0,(a>>>0)%(b>>>0)|0,,a&b,a|b,a^b,,a<<(b&31),a>>(b&31),(a>>>(b&31))|0,,+(a===b),+(a<b),+((a>>>0)<(b>>>0))][op-16];vp--;vs[vp-1]=r;}
}
}
}
const di="/input",du="/output";
for(const id of rd(di)){const p=j(di,id),q=j(du,id),g=vmx(rf(j(p,"program.bin")),rf(j(p,"input.bin")));mk(q,{recursive:true});wf(j(q,"stdout.bin"),g[0]);wf(j(q,"exit.txt"),g[1]+"\n");}
