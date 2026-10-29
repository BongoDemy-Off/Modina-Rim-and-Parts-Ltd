const checkMode=process.argv[2];if(!['query'].includes(checkMode))throw Error('Expected query');
const {spawn}=require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'../../../..');
const serverLog=fs.openSync(path.join(__dirname,'preview-server.txt'),'a');
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview',...(process.env.BATCH2A_DIST?['--outDir',process.env.BATCH2A_DIST]:[]),'--host','127.0.0.1','--port','4191','--strictPort'],{cwd:root,stdio:['ignore',serverLog,serverLog],windowsHide:true});
const state={serverPid:server.pid,node:process.version,start:new Date().toISOString()};
(async()=>{
 try {
  let ready=false;
  for(let i=0;i<80;i++){
   if(server.exitCode!==null)throw Error('Owned preview exited before readiness');
   try{const r=await fetch('http://127.0.0.1:4191/products');if(r.status===200){ready=true;break;}}catch{}
   await new Promise(r=>setTimeout(r,100));
  }
  if(!ready)throw Error('Preview readiness failed; suite not started');
  state.ready=true;
  const child=spawn(process.execPath,[path.join(__dirname,'checks.cjs'),checkMode],{cwd:root,stdio:'inherit',windowsHide:true});
  state.testPid=child.pid;
  state.exitCode=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('exit',resolve);});
  process.exitCode=state.exitCode??1;
 }catch(e){state.error=e.stack;process.exitCode=1;console.error(e);}
 finally {
  server.kill(); await new Promise(r=>server.exitCode!==null?r():server.once('exit',r));fs.closeSync(serverLog);
  state.serverStopped=true;setTimeout(()=>process.exit(process.exitCode||0),100).unref();state.finished=new Date().toISOString();fs.writeFileSync(path.join(__dirname,(process.env.ACCEPTANCE_RUN_NAME||'owned-run')+'.json'),JSON.stringify(state,null,2));
 }
})();
