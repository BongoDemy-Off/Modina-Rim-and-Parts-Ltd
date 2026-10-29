const fs=require('node:fs');const path=require('node:path');const crypto=require('node:crypto');const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'../../../..');const baseline=JSON.parse(fs.readFileSync(path.join(__dirname,'baseline.json'),'utf8'));
const git=(...args)=>execFileSync('git',args,{cwd:root,encoding:'utf8',windowsHide:true}).trimEnd();
const changed=[],missing=[];for(const file of baseline.files){const filename=path.join(root,file.path);if(!fs.existsSync(filename)){missing.push(file.path);continue;}const hash=crypto.createHash('sha256').update(fs.readFileSync(filename)).digest('hex').toUpperCase();if(hash!==file.sha256.toUpperCase())changed.push(file.path);}
const untracked=git('ls-files','--others','--exclude-standard').split(/\r?\n/).filter(Boolean);const added=untracked.filter(p=>!baseline.untracked.includes(p));
const unexpected=added.filter(p=>!['vercel.json','public/_redirects','docs/audits/BATCH-1A-ROUTING-FIX-REPORT.md'].includes(p)&&!p.startsWith('docs/audits/evidence/batch-1a-routing/'));
fs.writeFileSync(path.join(__dirname,'git-status-final.txt'),git('status','--short','--branch','--untracked-files=all')+'\n');
const result={branch:git('branch','--show-current'),commit:git('rev-parse','HEAD'),baselineFiles:baseline.files.length,originalUntracked:baseline.untracked.length,currentUntracked:untracked.length,changed,missing,added,unexpected,passed:changed.length===0&&missing.length===0&&unexpected.length===0};
fs.writeFileSync(path.join(__dirname,'preservation-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({...result,added:added.length},null,2));if(!result.passed)process.exitCode=1;
