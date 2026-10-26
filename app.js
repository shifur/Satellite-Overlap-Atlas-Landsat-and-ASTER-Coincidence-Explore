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

  function clarifyAster(frame){
    if(!frame || frame.id!=='frame-aster') return;
    try{
      const doc=frame.contentDocument;
      if(!doc) return;

      const lede=doc.getElementById('lede');
      if(lede) lede.textContent='Modeled ASTER orbit opportunities with MODIS and VIIRS. Counts are screening opportunities, not confirmed acquisitions or validation-ready scenes.';

      const satSub=doc.getElementById('sat-sub');
      if(satSub) satSub.textContent='ASTER is a targeted instrument aboard Terra. Same-platform Terra MODIS timing is modeled as coincident, but actual ASTER acquisition, native timing, usable geometry, and reference suitability must be verified separately. VIIRS timing is independent and is not implied to be zero.';

      const explore=doc.getElementById('explore');
      if(explore && !doc.getElementById('aster-inner-caveat')){
        const note=doc.createElement('div');
        note.id='aster-inner-caveat';
        note.className='preview-note';
        note.style.borderLeftColor='#9a5b00';
        note.style.background='#fff8ea';
        note.style.color='#6f4d12';
        note.innerHTML='<b>Interpretation:</b> ASTER counts shown here are <b>modeled orbit opportunities</b>. A Terra MODIS gap of 0 s is a same-platform modeling relationship, not proof that ASTER imagery was acquired or usable. It also does <b>not</b> mean ASTER–VIIRS has a 0 s gap. Confirm actual acquisition, native timing, geometry, and ASTER reference capability before treating any row as validation-ready.';
        explore.insertBefore(note, explore.firstChild);
      }

      const cards=[...doc.querySelectorAll('#cards .card')];
      cards.forEach(card=>{
        const title=card.querySelector('h3')?.textContent?.trim();
        const status=card.querySelector('.st');
        if(title==='ASTER' && status){
          status.textContent='Targeted acquisition: modeled opportunity only until an actual ASTER scene and usable bands are verified.';
        }
        if(title==='Terra MODIS' && status){
          status.textContent='Same-platform timing is modeled as coincident; actual ASTER acquisition and native geometry still require verification.';
        }
        if(title==='S-NPP VIIRS' && status){
          status.textContent='Independent platform; its timing gap must be evaluated separately and is not implied by Terra MODIS timing.';
        }
      });

      const common=doc.getElementById('common');
      if(common){
        common.innerHTML='<div><b>Atlas period</b><br>2012–2026</div><div><b>What counts mean</b><br>Modeled orbit opportunities, not confirmed ASTER acquisitions</div><div><b>Terra MODIS 0 s</b><br>Same-platform model assumption only; not ASTER–VIIRS timing</div><div><b>Validation gate</b><br>Verify acquisition, native timing, geometry, usable ASTER bands and reference method</div>';
      }

      const method=doc.getElementById('method-copy');
      if(method){
        method.innerHTML='<p><b>Scenes.</b> ASTER opportunities are modeled along Terra\'s daytime descending track over land. ASTER is a targeted instrument, so a modeled scene opportunity does not mean an ASTER acquisition actually occurred.</p><p><b>Terra MODIS.</b> ASTER and MODIS share the Terra platform. The atlas therefore represents their platform-level timing as coincident. This is a geometric/orbit-model relationship, not proof of an acquired, usable ASTER scene and not a verified native-pixel timing result.</p><p><b>VIIRS.</b> VIIRS is on an independent platform. Its timing relationship must be evaluated separately. A displayed Terra MODIS 0 s gap does <b>not</b> imply ASTER–VIIRS simultaneity.</p><p><b>Validation readiness.</b> Before using an opportunity scientifically, verify an actual ASTER acquisition, exact/native timing where required, native-footprint geometry, usable ASTER pixels, QA, and a defensible reference method.</p><p><b>ASTER fire-reference limitation.</b> ASTER SWIR became unusable in 2008. The historical SWIR-based binary FIRE/NONFIRE method therefore does not directly apply to VIIRS-era ASTER scenes; post-2008 TIR information is useful for thermal context but has not been established here as an equivalent binary reference method.</p><p class="flag"><b>Interpret carefully.</b> Atlas counts are candidate-discovery statistics, not counts of observed, reference-ready, or validated cases.</p>';
      }

      const candNote=doc.querySelector('#cands .preview-note');
      if(candNote){
        candNote.innerHTML='<b>Web preview of modeled candidates.</b> Rows are representative orbit/timing opportunities for responsive loading. They are not confirmed ASTER acquisitions or validation-ready cases. Verify archive availability, native timing, geometry, usable ASTER bands and reference method before scientific use.';
      }

      [...doc.querySelectorAll('#summary .l')].forEach((el,i)=>{
        if(i===0 && !el.textContent.toLowerCase().includes('modeled')) el.textContent='modeled '+el.textContent;
        if(i===1) el.textContent=el.textContent.replace('reference opportunities','modeled reference opportunities');
      });

      resizeFrame(frame);
    }catch(e){ /* same-origin iframe expected; leave original atlas if unavailable */ }
  }

  function refreshAster(frame){
    [50,250,700,1400].forEach(ms=>setTimeout(()=>{clarifyAster(frame);resizeFrame(frame)},ms));
  }

  function activate(sat,push=true){
    tabs.forEach(t=>{const on=t.dataset.sat===sat;t.classList.toggle('active',on);t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1});
    panels.forEach(p=>{const on=p.id===`panel-${sat}`;p.hidden=!on;p.classList.toggle('active',on)});
    const frame=document.getElementById(`frame-${sat}`);
    if(frame && !frame.src && frame.dataset.src) frame.src=frame.dataset.src;
    if(frame){
      setTimeout(()=>resizeFrame(frame),50);
      setTimeout(()=>resizeFrame(frame),700);
      if(sat==='aster') refreshAster(frame);
    }
    if(push) history.replaceState(null,'',`#${sat}`);
  }

  tabs.forEach((t,i)=>{
    t.addEventListener('click',()=>activate(t.dataset.sat));
    t.addEventListener('keydown',e=>{
      if(!['ArrowLeft','ArrowRight'].includes(e.key)) return;
      e.preventDefault();
      const j=(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
      tabs[j].focus();
      activate(tabs[j].dataset.sat);
    });
  });

  document.querySelectorAll('iframe').forEach(f=>f.addEventListener('load',()=>{
    resizeFrame(f);
    if(f.id==='frame-aster') refreshAster(f);
    setTimeout(()=>resizeFrame(f),500);
  }));

  window.addEventListener('resize',()=>document.querySelectorAll('iframe').forEach(resizeFrame));
  const initial=['landsat','aster'].includes(location.hash.slice(1))?location.hash.slice(1):'landsat';
  activate(initial,false);
})();
