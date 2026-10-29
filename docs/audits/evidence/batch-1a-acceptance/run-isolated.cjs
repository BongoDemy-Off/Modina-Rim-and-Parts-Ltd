const {spawn}=require('node:child_process');const fs=require('node:fs');const path=require('node:path');
const mode=process.argv[2];if(!['lifecycle','touch','race','a11y'].includes(mode))throw Error('Expected lifecycle, touch, race or a11y');
const dev=['lifecycle','race'].includes(mode),port=dev?'4193':'4191',root=path.resolve(__dirname,'../../../..');
const log=fs.openSync(path.join(__dirname,mode+'-server.txt'),'a');
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js',...(dev?[]:['preview']),'--host','127.0.0.1','--port',port,'--strictPort'],{cwd:root,env:{...process.env,DISABLE_HMR:'true'},stdio:['ignore',log,log],windowsHide:true});
const state={serverPid:server.pid,runtime:process.version,start:new Date().toISOString(),hmrDisabled:dev};
(async()=>{try{
 let ready=false;for(let i=0;i<100;i++){
  if(server.exitCode!==null)throw Error('Owned server exited');
  try{const r=await fetch('http://127.0.0.1:'+port+(dev?'/docs/audits/evidence/batch-1a-acceptance/lifecycle-harness.html':'/products'));if(r.status===200){ready=true;break;}}catch{}
  await new Promise(r=>setTimeout(r,100));
 }if(!ready)throw Error('Server not ready');state.ready=true;
 const child=spawn(process.execPath,[path.join(__dirname,mode+'.cjs')],{cwd:root,stdio:'inherit',windowsHide:true});state.testPid=child.pid;
 state.exitCode=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',resolve);});process.exitCode=state.exitCode??1;
}catch(e){state.error=e.stack;process.exitCode=1;console.error(e);}finally{server.kill();await new Promise(r=>server.exitCode!==null?r():server.once('exit',r));fs.closeSync(log);state.serverStopped=true;state.finished=new Date().toISOString();fs.writeFileSync(path.join(__dirname,mode+'-ownership.json'),JSON.stringify(state,null,2));}})();
