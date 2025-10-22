
async function loadWeeks(){
  const res = await fetch('weeks.json');
  const data = await res.json();
  const mount = document.getElementById('weeks');
  mount.innerHTML = '';

  const q = (document.getElementById('search').value || '').toLowerCase();

  data.forEach((w,i)=>{
    const hay = JSON.stringify(w).toLowerCase();
    if(q && !hay.includes(q)) return;

    const card = document.createElement('article');
    card.className = 'week';

    const head = document.createElement('header');
    head.innerHTML = `
      <h3>${w.title}</h3>
      <div class="badges">
        ${w.date ? `<span class="badge">${w.date}</span>`:''}
        ${w.exam ? `<span class="badge">Exam</span>`:''}
        ${w.midterm ? `<span class="badge">Midterm</span>`:''}
        ${w.final ? `<span class="badge">Final</span>`:''}
      </div>
    `;
    card.appendChild(head);

    const details = document.createElement('div');
    details.className = 'details';

    const groups = [];

    if(w.topics?.length){
      groups.push(`<div class="group"><h4>Topics</h4><ul>${w.topics.map(t=>`<li>${t}</li>`).join('')}</ul></div>`);
    }
    if(w.readings?.length){
      groups.push(`<div class="group"><h4>Readings</h4><ul>${w.readings.map(t=>`<li>${t}</li>`).join('')}</ul></div>`);
    }
    if(w.assignments?.length){
      groups.push(`<div class="group"><h4>Assignments & Due Dates</h4><ul>${w.assignments.map(t=>`<li>${t}</li>`).join('')}</ul></div>`);
    }
    if(w.notes?.length){
      groups.push(`<div class="group"><h4>Notes</h4><ul>${w.notes.map(t=>`<li>${t}</li>`).join('')}</ul></div>`);
    }
    if(w.resources?.length){
      groups.push(`<div class="group"><h4>Resources</h4><ul>${w.resources.map(r=>`<li><a target="_blank" rel="noopener" href="${r.url}">${r.title}</a></li>`).join('')}</ul><a class="button" href="README.html#add-links">How to add links</a></div>`);
    } else {
      groups.push(`<div class="group"><h4>Resources</h4><p>No files linked yet. <a class="button" href="README.html#add-links">Add links</a></p></div>`);
    }

    details.innerHTML = groups.join('');
    card.appendChild(details);

    head.addEventListener('click', ()=>{
      details.classList.toggle('open');
    });

    mount.appendChild(card);
  });
}

document.getElementById('search').addEventListener('input', loadWeeks);
document.getElementById('expandAll').addEventListener('click', ()=>{
  document.querySelectorAll('.details').forEach(d=>d.classList.add('open'));
});
document.getElementById('collapseAll').addEventListener('click', ()=>{
  document.querySelectorAll('.details').forEach(d=>d.classList.remove('open'));
});

loadWeeks();
