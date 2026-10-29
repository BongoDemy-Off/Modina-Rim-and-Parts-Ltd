const fs=require('node:fs');const path=require('node:path');const crypto=require('node:crypto');const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'../../../..');const baseline=JSON.parse(fs.readFileSync(path.join(__dirname,'baseline.json'),'utf8'));
const git=(...args)=>execFileSync('git',args,{cwd:root,encoding:'utf8',windowsHide:true}).trimEnd();
const changed=[],missing=[];
for(const item of baseline.files){const p=path.join(root,item.path);if(!fs.existsSync(p)){missing.push(item.path);continue;}const hash=crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex').toUpperCase();if(hash!==item.sha256.toUpperCase())changed.push(item.path);}
const current=git('ls-files','--others','--exclude-standard').split(/\r?\n/).filter(Boolean);
const newPaths=current.filter(p=>!baseline.untracked.includes(p));
const unexpected=newPaths.filter(p=>!p.startsWith('docs/audits/evidence/batch-1a-acceptance/')&&p!=='docs/audits/BATCH-1A-ACCEPTANCE-CHECK.md');
const authorizedChanges=['src/components/PublicModal.tsx'];
const unexpectedChanges=changed.filter(p=>!authorizedChanges.includes(p));
const originalModal=baseline.files.find(f=>f.path==='src/components/PublicModal.tsx');
const backupHash=crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'public-modal-before-acceptance.tsx'))).digest('hex').toUpperCase();
const originalModalBackedUp=backupHash===originalModal.sha256.toUpperCase();
const status=git('status','--short','--branch','--untracked-files=all');fs.writeFileSync(path.join(__dirname,'git-status-final.txt'),status+'\n');
const result={branch:git('branch','--show-current'),commit:git('rev-parse','HEAD'),originalFilesChecked:baseline.files.length,originalUntracked:baseline.untracked.length,changed,unexpectedChanges,originalModalBackedUp,missing,currentUntracked:current.length,newPaths,unexpected,applicationChangesDuringAcceptance:changed.filter(p=>p.startsWith('src/')),preserved:unexpectedChanges.length===0&&originalModalBackedUp&&missing.length===0&&unexpected.length===0};
fs.writeFileSync(path.join(__dirname,'preservation-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({...result,newPaths:result.newPaths.length},null,2));if(!result.preserved)process.exitCode=1;
