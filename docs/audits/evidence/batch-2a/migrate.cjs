// Presentation-only JSX edits, retained for review. No text/data/handler rewrite.
const fs=require('node:fs');const path=require('node:path');const ts=require('../../../../node_modules/typescript');
const groups={group1:['Products','Contact','Careers','Downloads'],group2:['Home','About','Mission','Sustainability','Quality','Certificates','Gallery'],group3:['News','NewsDetail','Blog','BlogDetail','FAQ','Privacy','Terms','NotFound']};
const group=process.argv[2];
for(const name of groups[group]){
 const file=path.join('src/pages',name+'.tsx');let source=fs.readFileSync(file,'utf8');const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),edits=[];
 function visit(n){
  if(ts.isJsxOpeningElement(n)||ts.isJsxSelfClosingElement(n)){
   const tag=n.tagName.getText(ast).split('.').pop(),attrs=n.attributes.properties;
   const attr=attrs.find(a=>ts.isJsxAttribute(a)&&a.name.getText(ast)==='className');
   if(attr&&attr.initializer&&ts.isStringLiteral(attr.initializer)){
    let cls=attr.initializer.text;const add=x=>{if(!cls.split(' ').includes(x))cls+=' '+x;};
    if(cls.includes('min-h-screen'))add('public-page');
    if(tag==='h1'){
     add(name==='Home'?'public-home-title':['NewsDetail','BlogDetail','NotFound'].includes(name)?'public-article-title':'public-hero-title');
     if(name!=='Home'){
      cls=cls.replace(/(?:^|\s)(?:(?:sm|md|lg|xl):)?text-(?:[2-9]xl|\[[^\]]+\])/g,'');
      const style=attrs.find(a=>ts.isJsxAttribute(a)&&a.name.getText(ast)==='style');
      if(style&&/fontSize/.test(style.getText(ast)))edits.push({start:style.getStart(ast),end:style.end,text:''});
     }
    }
    if(tag==='h2') {add(['Privacy','Terms'].includes(name)&&/text-xl/.test(cls)?'public-card-title':'public-section-title');const style=attrs.find(a=>ts.isJsxAttribute(a)&&a.name.getText(ast)==='style');if(style&&/^style=\{\{\s*fontSize:/.test(style.getText(ast)))edits.push({start:style.getStart(ast),end:style.end,text:''});}
    if(tag==='h3'){add('public-card-title');const style=attrs.find(a=>ts.isJsxAttribute(a)&&a.name.getText(ast)==='style');if(style&&/^style=\{\{\s*fontSize:/.test(style.getText(ast)))edits.push({start:style.getStart(ast),end:style.end,text:''});}
    if(tag==='h3'&&name==='Products')add('public-product-name');
    if(tag==='p'&&!/font-display.*font-(?:bold|black|extrabold)/.test(cls)&&!/text-\[(?:[3-9]\d|1\d\d|2\d\d)px\]|text-[4-9]xl|text-\[clamp\(/.test(cls)){
     add(/uppercase|tracking-widest|font-mono/.test(cls)?'public-meta':name==='Products'||/line-clamp/.test(cls)?'public-copy':'public-body');
    }
    if(tag==='p'&&!/font-display/.test(cls)){const style=attrs.find(a=>ts.isJsxAttribute(a)&&a.name.getText(ast)==='style');if(style&&/^style=\{\{\s*fontSize:/.test(style.getText(ast)))edits.push({start:style.getStart(ast),end:style.end,text:''});}
    if(tag==='p'){const style=attrs.find(a=>ts.isJsxAttribute(a)&&a.name.getText(ast)==='style');if(style&&/opacity: (?:yearOpacity|stepOpacity)/.test(style.getText(ast)))edits.push({start:style.getStart(ast),end:style.end,text:''});}
    if(tag==='label')add('public-meta');
    if(tag==='span'&&/text-xs|text-\[(?:10|11|12|13)px\]/.test(cls))add('public-meta');
    if(tag==='section'&&/py-(?:20|24) lg:py-(?:28|32)/.test(cls))cls=cls.replace(/py-(?:20|24) lg:py-(?:28|32)/,'public-section');
    if(/(?:^|\s)bg-modina-heading(?:\s|$)/.test(cls))add('public-dark');
    if(tag==='div'&&/justify-center mb-10|mb-10 text-sm/.test(cls)&&!cls.includes('min-h-screen'))add('public-breadcrumb');
    cls=cls.replace(/container mx-auto px-6 md:px-12 lg:px-24/g,'container-premium').replace(/shadow-design-xl/g,'shadow-design-lg');
    if(tag==='h3'&&name==='Products')cls=cls.replace('line-clamp-2','');
    if(cls!==attr.initializer.text)edits.push({start:attr.initializer.getStart(ast),end:attr.initializer.end,text:JSON.stringify(cls.trim())});
   }
  }ts.forEachChild(n,visit);
 }visit(ast);edits.sort((a,b)=>b.start-a.start).forEach(e=>source=source.slice(0,e.start)+e.text+source.slice(e.end));
 fs.writeFileSync(file,source);console.log(file,edits.length,'presentation edits');
}
