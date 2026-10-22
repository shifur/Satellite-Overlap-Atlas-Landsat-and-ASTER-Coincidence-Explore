(() => {
  const tabs = [...document.querySelectorAll('.sat-tab')];
  const panels = [...document.querySelectorAll('.sat-panel')];
  function resizeFrame(frame){
    try{
      const doc=frame.contentDocument;
      if(!doc) return;
      const h=Math.max(doc.documentElement.scrollHeight,doc.body?.scrollHeight||0);
      frame.style.height=Math.max(1200,h+8)+'px';
    }catch(e){ frame.style.height='1700px'; }
  }
  function activate(sat,push=true){
    tabs.forEach(t=>{const on=t.dataset.sat===sat;t.classList.toggle('active',on);t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1});
    panels.forEach(p=>{const on=p.id===`panel-${sat}`;p.hidden=!on;p.classList.toggle('active',on)});
    const frame=document.getElementById(`frame-${sat}`);
    if(frame && !frame.src && frame.dataset.src) frame.src=frame.dataset.src;
    if(frame){setTimeout(()=>resizeFrame(frame),50);setTimeout(()=>resizeFrame(frame),700)}
    if(push) history.replaceState(null,'',`#${sat}`);
  }
  tabs.forEach((t,i)=>{
    t.addEventListener('click',()=>activate(t.dataset.sat));
    t.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const j=(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[j].focus();activate(tabs[j].dataset.sat)});
  });
  document.querySelectorAll('iframe').forEach(f=>f.addEventListener('load',()=>{resizeFrame(f);setTimeout(()=>resizeFrame(f),500)}));
  window.addEventListener('resize',()=>document.querySelectorAll('iframe').forEach(resizeFrame));
  const initial=['landsat','aster'].includes(location.hash.slice(1))?location.hash.slice(1):'landsat';
  activate(initial,false);
})();
