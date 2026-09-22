/* Emprega-se Aqui — busca de vagas com compatibilidade de perfil */
(() => {
  'use strict';

  // ---------- Estado em memória (durante a visita)
  const mem = {};
  const store = {
    get: (k, d) => (k in mem ? mem[k] : d),
    set: (k, v) => { mem[k] = v; }
  };

  // ---------- Dados
  const SKILLS = {
    'Front-end': ['HTML e CSS', 'JavaScript', 'TypeScript', 'React', 'Vue', 'Figma'],
    'Back-end': ['Node.js', 'Python', 'Java', 'PHP', 'SQL', 'APIs REST', 'Docker'],
    'Dados e IA': ['Excel', 'Power BI', 'Estatística', 'Pandas', 'Machine Learning'],
    'Infra e Segurança': ['Linux', 'Redes', 'Cloud (AWS)', 'Segurança da informação'],
    'Geral': ['Git', 'Inglês', 'Comunicação', 'Trabalho em equipe', 'Atendimento ao cliente', 'Scrum']
  };
  const AREAS = ['Front-end', 'Back-end', 'Dados', 'IA', 'Suporte', 'Segurança', 'Design', 'Mobile'];
  const MODES = ['Remoto', 'Híbrido', 'Presencial'];
  const LEVELS = ['Estágio', 'Júnior', 'Pleno'];
  const COLORS = ['#1f6c91', '#123b52', '#20b486', '#3a5a8c', '#c2553d', '#7a4bb5', '#d08a1c', '#2a8a9e'];

  const JOBS = [
    { t: 'Desenvolvedor(a) Front-end Jr.', c: 'Nuvem Verde', city: 'Campina Grande', uf: 'PB', m: 'Híbrido', l: 'Júnior', a: 'Front-end', s: [2800, 3600], d: 1, req: ['JavaScript', 'HTML e CSS', 'React', 'Git', 'TypeScript'], desc: 'Você vai construir interfaces para um app de gestão agrícola, trabalhando com designers e o time de back-end.' },
    { t: 'Estágio em Desenvolvimento Web', c: 'Borborema Tech', city: 'Campina Grande', uf: 'PB', m: 'Presencial', l: 'Estágio', a: 'Front-end', s: [1200, 1200], d: 0, req: ['HTML e CSS', 'JavaScript', 'Git', 'Trabalho em equipe'], desc: 'Estágio de 6h para estudantes de TI a partir do 3º período. Mentoria semanal e plano de carreira.' },
    { t: 'Analista de Dados Jr.', c: 'Mandacaru Analytics', city: 'João Pessoa', uf: 'PB', m: 'Híbrido', l: 'Júnior', a: 'Dados', s: [3200, 4200], d: 3, req: ['SQL', 'Power BI', 'Excel', 'Estatística', 'Python'], desc: 'Criação de dashboards e relatórios para clientes do varejo nordestino.' },
    { t: 'Suporte Técnico N1', c: 'Conecta PB', city: 'Campina Grande', uf: 'PB', m: 'Presencial', l: 'Júnior', a: 'Suporte', s: [1900, 2300], d: 2, req: ['Atendimento ao cliente', 'Redes', 'Linux', 'Comunicação'], desc: 'Atendimento a clientes de internet fibra, diagnóstico de conexão e abertura de chamados.' },
    { t: 'Desenvolvedor(a) Back-end Node.js', c: 'Sertão Code', city: 'Recife', uf: 'PE', m: 'Remoto', l: 'Júnior', a: 'Back-end', s: [3500, 4500], d: 4, req: ['Node.js', 'JavaScript', 'SQL', 'APIs REST', 'Git', 'Docker'], desc: 'Desenvolvimento de APIs para uma plataforma de pagamentos. Time 100% remoto.' },
    { t: 'Estágio em Ciência de Dados', c: 'Atlântico Labs', city: 'Recife', uf: 'PE', m: 'Híbrido', l: 'Estágio', a: 'IA', s: [1500, 1800], d: 1, req: ['Python', 'Pandas', 'Estatística', 'Inglês'], desc: 'Participe de projetos de modelos preditivos com dados públicos de saúde.' },
    { t: 'Analista de Segurança da Informação Jr.', c: 'Escudo Digital', city: 'João Pessoa', uf: 'PB', m: 'Híbrido', l: 'Júnior', a: 'Segurança', s: [3800, 4800], d: 5, req: ['Segurança da informação', 'Linux', 'Redes', 'Inglês'], desc: 'Monitoramento de alertas no SOC, análise de logs e resposta a incidentes.' },
    { t: 'UI Designer Jr.', c: 'Cactus Studio', city: 'Natal', uf: 'RN', m: 'Remoto', l: 'Júnior', a: 'Design', s: [2600, 3400], d: 6, req: ['Figma', 'HTML e CSS', 'Comunicação'], desc: 'Criação de telas e design system para produtos digitais de clientes de todo o Brasil.' },
    { t: 'Desenvolvedor(a) Mobile React Native', c: 'Rota App', city: 'Fortaleza', uf: 'CE', m: 'Remoto', l: 'Júnior', a: 'Mobile', s: [3300, 4300], d: 2, req: ['React', 'JavaScript', 'TypeScript', 'APIs REST', 'Git'], desc: 'Evolução do app de mobilidade urbana usado em 12 cidades do Nordeste.' },
    { t: 'Desenvolvedor(a) Python Pleno', c: 'Mandacaru Analytics', city: 'João Pessoa', uf: 'PB', m: 'Remoto', l: 'Pleno', a: 'Back-end', s: [6000, 8000], d: 8, req: ['Python', 'SQL', 'APIs REST', 'Docker', 'Cloud (AWS)', 'Git'], desc: 'Construção de pipelines de dados e serviços em Python para clientes corporativos.' },
    { t: 'Estágio em Suporte e Infraestrutura', c: 'UniRede', city: 'Campina Grande', uf: 'PB', m: 'Presencial', l: 'Estágio', a: 'Suporte', s: [1100, 1100], d: 3, req: ['Linux', 'Redes', 'Trabalho em equipe'], desc: 'Apoio na manutenção de laboratórios, servidores e rede interna da instituição.' },
    { t: 'Desenvolvedor(a) Front-end Vue', c: 'Feira Digital', city: 'Caruaru', uf: 'PE', m: 'Híbrido', l: 'Júnior', a: 'Front-end', s: [2700, 3300], d: 7, req: ['Vue', 'JavaScript', 'HTML e CSS', 'Git'], desc: 'Marketplace para pequenos comerciantes. Foco em performance e acessibilidade.' },
    { t: 'Assistente de IA e Automação', c: 'Atlântico Labs', city: 'Recife', uf: 'PE', m: 'Remoto', l: 'Júnior', a: 'IA', s: [3000, 3800], d: 0, req: ['Python', 'Machine Learning', 'APIs REST', 'Inglês'], desc: 'Integração de modelos de linguagem em ferramentas internas e automação de processos.' },
    { t: 'Desenvolvedor(a) PHP Jr.', c: 'Borborema Tech', city: 'Campina Grande', uf: 'PB', m: 'Híbrido', l: 'Júnior', a: 'Back-end', s: [2500, 3200], d: 9, req: ['PHP', 'SQL', 'HTML e CSS', 'Git'], desc: 'Manutenção e evolução de sistemas web para prefeituras e órgãos públicos.' },
    { t: 'Analista de BI Pleno', c: 'Grupo Maré', city: 'Salvador', uf: 'BA', m: 'Presencial', l: 'Pleno', a: 'Dados', s: [5500, 7000], d: 4, req: ['Power BI', 'SQL', 'Excel', 'Estatística', 'Comunicação'], desc: 'Responsável pelos indicadores comerciais de uma rede com 40 lojas.' },
    { t: 'Estágio em Segurança Cibernética', c: 'Escudo Digital', city: 'João Pessoa', uf: 'PB', m: 'Remoto', l: 'Estágio', a: 'Segurança', s: [1400, 1600], d: 1, req: ['Linux', 'Redes', 'Segurança da informação'], desc: 'Aprenda na prática: laboratórios, análise de vulnerabilidades e documentação.' },
    { t: 'Desenvolvedor(a) Java Jr.', c: 'Banco do Agreste', city: 'Campina Grande', uf: 'PB', m: 'Presencial', l: 'Júnior', a: 'Back-end', s: [3400, 4200], d: 5, req: ['Java', 'SQL', 'APIs REST', 'Git', 'Scrum'], desc: 'Sistemas internos de crédito para cooperativas da região.' },
    { t: 'Product Designer Pleno', c: 'Rota App', city: 'Fortaleza', uf: 'CE', m: 'Remoto', l: 'Pleno', a: 'Design', s: [6500, 8500], d: 10, req: ['Figma', 'Comunicação', 'Inglês', 'Scrum'], desc: 'Liderar pesquisas com usuários e desenhar a próxima versão do app.' },
    { t: 'Desenvolvedor(a) Full Stack Jr.', c: 'Sertão Code', city: 'Recife', uf: 'PE', m: 'Remoto', l: 'Júnior', a: 'Front-end', s: [3600, 4600], d: 2, req: ['React', 'Node.js', 'JavaScript', 'SQL', 'Git'], desc: 'Do banco de dados à interface: participe de todo o ciclo de desenvolvimento.' },
    { t: 'Técnico(a) de Redes', c: 'Conecta PB', city: 'João Pessoa', uf: 'PB', m: 'Presencial', l: 'Júnior', a: 'Suporte', s: [2200, 2800], d: 6, req: ['Redes', 'Linux', 'Atendimento ao cliente'], desc: 'Instalação e configuração de equipamentos em clientes empresariais.' },
    { t: 'Desenvolvedor(a) Android Jr.', c: 'Feira Digital', city: 'Caruaru', uf: 'PE', m: 'Híbrido', l: 'Júnior', a: 'Mobile', s: [3000, 3700], d: 11, req: ['Java', 'APIs REST', 'Git', 'Inglês'], desc: 'App para vendedores do marketplace acompanharem pedidos em tempo real.' },
    { t: 'Engenheiro(a) de Machine Learning Pleno', c: 'Nuvem Verde', city: 'Campina Grande', uf: 'PB', m: 'Remoto', l: 'Pleno', a: 'IA', s: [8000, 11000], d: 3, req: ['Python', 'Machine Learning', 'Pandas', 'Cloud (AWS)', 'Docker', 'Inglês'], desc: 'Modelos de visão computacional para monitorar lavouras via imagens de drone.' }
  ].map((j, i) => ({ ...j, id: i + 1, logo: j.c.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase(), color: COLORS[i % COLORS.length] }));

  const CITIES = [...new Set(JOBS.map(j => `${j.city}`))].sort((a, b) => a.localeCompare(b, 'pt-BR'));

  const DEFAULT_COMMENTS = [
    { n: 'Ana Souza', r: 'Analista de Dados Jr.', t: 'Consegui minha primeira vaga na área de dados usando a plataforma. Recomendo!' },
    { n: 'Lucas Mendes', r: 'Estudante de ADS', t: 'A comparação de habilidades me ajudou a entender o que eu precisava estudar.' },
    { n: 'Beatriz Lima', r: 'Designer', t: 'Interface simples e fácil de usar. Só senti falta de mais filtros de busca.' },
    { n: 'Rafael Costa', r: 'Estagiário de TI', t: 'Muito bom para quem está começando na área de tecnologia.' },
    { n: 'Juliana Alves', r: 'Dev Front-end', t: 'Gostei bastante do passo a passo, ficou tudo bem explicado.' },
    { n: 'Marcos Vieira', r: 'Suporte Técnico', t: 'Encontrei uma vaga compatível com meu perfil em poucos dias.' }
  ];

  // ---------- Estado
  const state = {
    q: '', areas: new Set(), modes: new Set(), levels: new Set(), city: '', onlySaved: false, sort: 'match',
    profile: store.get('esa_profile', { name: '', area: '', edu: '', skills: [], file: '' }),
    saved: new Set(store.get('esa_saved', [])),
    applied: new Set(store.get('esa_applied', []))
  };

  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const brl = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  const ago = d => d === 0 ? 'Hoje' : d === 1 ? 'Ontem' : `Há ${d} dias`;

  function match(job) {
    const have = job.req.filter(r => state.profile.skills.includes(r));
    return { have, miss: job.req.filter(r => !have.includes(r)), pct: Math.round(have.length / job.req.length * 100) };
  }
  const hasProfile = () => state.profile.skills.length > 0;
  const ringColor = p => p >= 75 ? 'var(--green)' : p >= 45 ? '#1f6c91' : '#e0a33a';

  // ---------- Toast
  let toastT;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2800);
  }

  // ---------- Tema
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  const sun = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const moon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  const themeBtn = $('#themeToggle');
  const paintTheme = () => { themeBtn.innerHTML = theme === 'dark' ? sun : moon; };
  paintTheme();
  themeBtn.addEventListener('click', () => { theme = theme === 'dark' ? 'light' : 'dark'; root.setAttribute('data-theme', theme); paintTheme(); });

  // ---------- Menu mobile
  const menuBtn = $('#menuBtn'), nav = $('#nav');
  menuBtn.addEventListener('click', () => { const o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o); });
  nav.addEventListener('click', e => { if (e.target.tagName === 'A') { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); } });

  // ---------- Filtros
  const count = (key, val) => JOBS.filter(j => j[key] === val).length;

  function buildFilters() {
    $('#fArea').innerHTML = AREAS.map(a => `<button type="button" class="chip" data-area="${a}" aria-pressed="${state.areas.has(a)}">${a}</button>`).join('');
    $('#fMode').innerHTML = MODES.map(m => `<label><input type="checkbox" value="${m}" ${state.modes.has(m) ? 'checked' : ''}> ${m}<span class="n">${count('m', m)}</span></label>`).join('');
    $('#fLevel').innerHTML = LEVELS.map(l => `<label><input type="checkbox" value="${l}" ${state.levels.has(l) ? 'checked' : ''}> ${l}<span class="n">${count('l', l)}</span></label>`).join('');
    const opts = CITIES.map(c => `<option value="${c}">${c}</option>`).join('');
    $('#fCity').insertAdjacentHTML('beforeend', opts);
    $('#heroCity').insertAdjacentHTML('beforeend', opts);
    $('#pArea').insertAdjacentHTML('beforeend', AREAS.map(a => `<option>${a}</option>`).join(''));
  }

  $('#fArea').addEventListener('click', e => {
    const b = e.target.closest('[data-area]'); if (!b) return;
    const a = b.dataset.area; state.areas.has(a) ? state.areas.delete(a) : state.areas.add(a);
    b.setAttribute('aria-pressed', state.areas.has(a)); render();
  });
  $('#fMode').addEventListener('change', e => { e.target.checked ? state.modes.add(e.target.value) : state.modes.delete(e.target.value); render(); });
  $('#fLevel').addEventListener('change', e => { e.target.checked ? state.levels.add(e.target.value) : state.levels.delete(e.target.value); render(); });
  $('#fCity').addEventListener('change', e => { state.city = e.target.value; render(); });
  $('#fQ').addEventListener('input', e => { state.q = e.target.value; render(); });
  $('#fSaved').addEventListener('change', e => { state.onlySaved = e.target.checked; render(); });
  $('#sort').addEventListener('change', e => { state.sort = e.target.value; render(); });

  function clearFilters() {
    Object.assign(state, { q: '', city: '', onlySaved: false });
    state.areas.clear(); state.modes.clear(); state.levels.clear();
    $('#fQ').value = ''; $('#fCity').value = ''; $('#fSaved').checked = false;
    document.querySelectorAll('#filters input[type=checkbox]').forEach(c => c.checked = false);
    document.querySelectorAll('#fArea .chip').forEach(c => c.setAttribute('aria-pressed', false));
    render();
  }
  $('#clearFilters').addEventListener('click', clearFilters);
  $('#emptyClear').addEventListener('click', clearFilters);

  const filtersEl = $('#filters'), fToggle = $('#filterToggle');
  fToggle.addEventListener('click', e => { e.stopPropagation(); const o = filtersEl.classList.toggle('open'); fToggle.setAttribute('aria-expanded', o); });
  document.addEventListener('click', e => { if (filtersEl.classList.contains('open') && !filtersEl.contains(e.target)) { filtersEl.classList.remove('open'); fToggle.setAttribute('aria-expanded', false); } });

  // Busca do hero
  function applyQuick(q) {
    clearFilters();
    const hit = [...MODES, ...LEVELS, ...AREAS].find(x => norm(x) === norm(q));
    if (MODES.includes(hit)) state.modes.add(hit);
    else if (LEVELS.includes(hit)) state.levels.add(hit);
    else if (AREAS.includes(hit)) state.areas.add(hit);
    else { state.q = q; $('#fQ').value = q; }
    buildSync(); render();
    $('#vagas').scrollIntoView({ behavior: 'smooth' });
  }
  function buildSync() {
    document.querySelectorAll('#fMode input').forEach(i => i.checked = state.modes.has(i.value));
    document.querySelectorAll('#fLevel input').forEach(i => i.checked = state.levels.has(i.value));
    document.querySelectorAll('#fArea .chip').forEach(c => c.setAttribute('aria-pressed', state.areas.has(c.dataset.area)));
  }
  $('#heroSearch').addEventListener('submit', e => {
    e.preventDefault();
    const q = $('#heroQ').value.trim(), city = $('#heroCity').value;
    clearFilters();
    state.q = q; $('#fQ').value = q; state.city = city; $('#fCity').value = city;
    render(); $('#vagas').scrollIntoView({ behavior: 'smooth' });
  });
  document.querySelectorAll('.quick-tags [data-q]').forEach(b => b.addEventListener('click', () => applyQuick(b.dataset.q)));

  // ---------- Lista de vagas
  function filtered() {
    const q = norm(state.q.trim());
    let list = JOBS.filter(j => {
      if (state.areas.size && !state.areas.has(j.a)) return false;
      if (state.modes.size && !state.modes.has(j.m)) return false;
      if (state.levels.size && !state.levels.has(j.l)) return false;
      if (state.city && j.city !== state.city) return false;
      if (state.onlySaved && !state.saved.has(j.id)) return false;
      if (q) {
        const hay = norm([j.t, j.c, j.city, j.a, j.m, j.l, ...j.req].join(' '));
        if (!q.split(/\s+/).every(w => hay.includes(w))) return false;
      }
      return true;
    });
    const by = {
      match: (a, b) => (match(b).pct - match(a).pct) || a.d - b.d,
      recent: (a, b) => a.d - b.d,
      salary: (a, b) => b.s[1] - a.s[1]
    };
    return list.sort(hasProfile() || state.sort !== 'match' ? by[state.sort] : by.recent);
  }

  const bookmark = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 3h12v18l-6-4-6 4z"/></svg>';

  function jobCard(j) {
    const m = match(j), p = hasProfile();
    const tags = j.req.slice(0, 5).map(r => `<span class="tag ${p && m.have.includes(r) ? 'have' : ''}">${r}</span>`).join('');
    const sal = j.s[0] === j.s[1] ? brl(j.s[0]) : `${brl(j.s[0])} – ${brl(j.s[1])}`;
    return `<li class="job" data-id="${j.id}" tabindex="0" role="button" aria-label="Ver detalhes: ${esc(j.t)} na ${esc(j.c)}">
      <div class="logo-chip" style="--c:${j.color}">${j.logo}</div>
      <div>
        <h3>${j.t}</h3>
        <div class="job-meta"><span>${j.c}</span><span>${j.city} — ${j.uf}</span><span>${j.m}</span><span>${j.l}</span><span>${ago(j.d)}</span></div>
        <div class="job-tags">${j.d <= 1 ? '<span class="tag new">Nova</span>' : ''}${tags}</div>
      </div>
      <div class="job-side">
        ${p ? `<div class="ring" style="--p:${m.pct};--ring:${ringColor(m.pct)}" title="Compatibilidade"><span>${m.pct}%</span></div>` : `<div class="ring none" style="--p:0"><span>—</span></div>`}
        <span class="salary">${sal}</span>
        ${state.applied.has(j.id) ? '<span class="applied-flag">✓ Candidatado</span>' : ''}
      </div>
    </li>`;
  }

  const PAGE = 8; let shown = PAGE;
  $('#moreBtn').addEventListener('click', () => { shown += PAGE; render(true); });
  function render(keep) {
    if (!keep) shown = PAGE;
    const list = filtered();
    $('#jobList').innerHTML = list.slice(0, shown).map(jobCard).join('');
    const rest = list.length - shown;
    $('#moreWrap').hidden = rest <= 0;
    $('#moreBtn').textContent = `Ver mais vagas (${rest})`;
    $('#emptyState').hidden = list.length > 0;
    $('#resultCount').innerHTML = `<b>${list.length}</b> ${list.length === 1 ? 'vaga encontrada' : 'vagas encontradas'}`;
    $('#profileHint').innerHTML = hasProfile()
      ? `Mostrando compatibilidade com base nas suas <b>${state.profile.skills.length}</b> habilidades. <a href="#perfil">Editar perfil</a>`
      : 'Monte seu <a href="#perfil">perfil</a> para ver a compatibilidade com cada vaga.';
  }

  $('#jobList').addEventListener('click', e => { const li = e.target.closest('.job'); if (li) openJob(+li.dataset.id); });
  $('#jobList').addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('job')) { e.preventDefault(); openJob(+e.target.dataset.id); } });

  // ---------- Modal
  const modal = $('#jobModal');
  function openJob(id) {
    const j = JOBS.find(x => x.id === id), m = match(j), p = hasProfile();
    const applied = state.applied.has(id), saved = state.saved.has(id);
    const sal = j.s[0] === j.s[1] ? brl(j.s[0]) : `${brl(j.s[0])} – ${brl(j.s[1])}`;
    let tip;
    if (!p) tip = `<strong>Descubra sua compatibilidade</strong><p>Marque suas habilidades no <a href="#perfil" data-close>seu perfil</a> para ver quanto você combina com esta vaga.</p>`;
    else if (!m.miss.length) tip = `<strong>Você tem todos os requisitos</strong><p>Perfil 100% compatível. Adapte seu currículo destacando essas habilidades e candidate-se.</p>`;
    else tip = `<strong>Você tem ${m.have.length} de ${j.req.length} requisitos</strong><p>Para chegar a 100%, vale estudar: <b>${m.miss.join(', ')}</b>.</p>`;

    $('#modalContent').innerHTML = `
      <div class="modal-top">
        <div class="logo-chip" style="--c:${j.color}">${j.logo}</div>
        <div>
          <h2 id="mTitle">${j.t}</h2>
          <div class="job-meta" style="margin-top:.4rem"><span>${j.c}</span><span>${j.city} — ${j.uf}</span><span>${j.m}</span><span>${j.l}</span><span>${sal}</span></div>
        </div>
        <button class="icon-btn modal-close" data-close aria-label="Fechar">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </button>
      </div>
      <div class="modal-match">
        <div class="ring" style="--p:${p ? m.pct : 0};--ring:${ringColor(m.pct)}"><span>${p ? m.pct + '%' : '—'}</span></div>
        <div>${tip}</div>
      </div>
      <div>
        <h4>Sobre a vaga</h4>
        <p class="desc">${j.desc}</p>
      </div>
      <div>
        <h4>Requisitos</h4>
        <ul class="req-list">${j.req.map(r => `<li class="${p && m.have.includes(r) ? 'ok' : 'miss'}">${r}</li>`).join('')}</ul>
      </div>
      <div class="modal-actions">
        <button class="btn btn-green" id="applyBtn" ${applied ? 'disabled' : ''}>${applied ? '✓ Candidatura simulada' : 'Simular candidatura'}</button>
        <button class="btn btn-ghost" id="saveBtn" aria-pressed="${saved}">${bookmark.replace('width="20"', 'width="18"')} ${saved ? 'Salva' : 'Salvar vaga'}</button>
      </div>`;

    $('#applyBtn').onclick = () => {
      if (!state.profile.name) { toast('Preencha seu nome no perfil antes de se candidatar.'); modal.close(); $('#perfil').scrollIntoView({ behavior: 'smooth' }); setTimeout(() => $('#pName').focus(), 600); return; }
      state.applied.add(id); store.set('esa_applied', [...state.applied]);
      toast(`Simulação concluída, ${state.profile.name.split(' ')[0]}. Nenhum dado foi enviado à empresa.`);
      render(true); openJob(id);
    };
    $('#saveBtn').onclick = () => {
      state.saved.has(id) ? state.saved.delete(id) : state.saved.add(id);
      store.set('esa_saved', [...state.saved]);
      toast(state.saved.has(id) ? 'Vaga salva.' : 'Vaga removida das salvas.');
      render(true); openJob(id);
    };
    if (!modal.open) modal.showModal();
  }
  modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('[data-close]')) modal.close(); });

  // ---------- Perfil
  function buildSkills() {
    $('#pSkills').innerHTML = Object.entries(SKILLS).map(([g, list]) => `
      <div class="skill-group"><h4>${g}</h4><div class="chips">
        ${list.map(s => `<button type="button" class="chip" data-skill="${s}" aria-pressed="${state.profile.skills.includes(s)}">${s}</button>`).join('')}
      </div></div>`).join('');
  }
  function fillProfile() {
    const pr = state.profile;
    $('#pName').value = pr.name; $('#pArea').value = pr.area; $('#pEdu').value = pr.edu;
    if (pr.file) { $('#uploadText').innerHTML = `<b>${esc(pr.file)}</b> anexado`; $('#uploadBox').classList.add('has'); }
    updateSummary();
  }
  function updateSummary() {
    const n = state.profile.skills.length;
    $('#skillCount').textContent = `(${n} ${n === 1 ? 'marcada' : 'marcadas'})`;
    const scored = JOBS.map(match);
    const good = scored.filter(m => m.pct >= 60).length;
    const best = n ? Math.max(...scored.map(m => m.pct)) : 0;
    const ring = $('#summaryRing');
    ring.style.setProperty('--p', Math.round(good / JOBS.length * 100));
    ring.querySelector('span').textContent = good;
    $('#summaryTitle').textContent = n ? `${good} ${good === 1 ? 'vaga combina' : 'vagas combinam'} com você` : 'Nenhuma habilidade marcada';
    $('#summaryText').textContent = n ? `Vagas com 60% ou mais de compatibilidade. Sua melhor combinação: ${best}%.` : 'Comece escolhendo sua área e suas habilidades.';
  }
  $('#pSkills').addEventListener('click', e => {
    const b = e.target.closest('[data-skill]'); if (!b) return;
    const s = b.dataset.skill, arr = state.profile.skills, i = arr.indexOf(s);
    i >= 0 ? arr.splice(i, 1) : arr.push(s);
    b.setAttribute('aria-pressed', i < 0);
    store.set('esa_profile', state.profile);
    updateSummary(); render();
  });
  $('#pFile').addEventListener('change', e => {
    const f = e.target.files[0]; if (!f) return;
    state.profile.file = f.name;
    $('#uploadText').innerHTML = `<b>${esc(f.name)}</b> anexado`; $('#uploadBox').classList.add('has');
  });
  $('#profileForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#pName').value.trim();
    if (!name) { toast('Informe seu nome para salvar o perfil.'); $('#pName').focus(); return; }
    Object.assign(state.profile, { name, area: $('#pArea').value, edu: $('#pEdu').value.trim() });
    store.set('esa_profile', state.profile);
    if (state.profile.area && !state.areas.size) { state.areas.add(state.profile.area); buildSync(); }
    state.sort = 'match'; $('#sort').value = 'match';
    render(); updateSummary();
    toast(`Perfil salvo nesta visita, ${name.split(' ')[0]}. Veja as vagas mais compatíveis.`);
    setTimeout(() => $('#vagas').scrollIntoView({ behavior: 'smooth' }), 400);
  });
  $('#resetProfile').addEventListener('click', () => {
    state.profile = { name: '', area: '', edu: '', skills: [], file: '' };
    store.set('esa_profile', state.profile);
    $('#profileForm').reset(); $('#uploadText').innerHTML = '<b>Anexe seu currículo</b> (PDF ou Word)'; $('#uploadBox').classList.remove('has');
    buildSkills(); updateSummary(); render();
  });

  // ---------- Carrossel de dicas
  const track = $('#track'), slides = track.children.length, dots = $('#dots');
  let idx = 0, timer;
  dots.innerHTML = Array.from({ length: slides }, (_, i) => `<button role="tab" aria-label="Arte ${i + 1} de ${slides}" aria-selected="${i === 0}"></button>`).join('');
  function go(i) {
    idx = (i + slides) % slides;
    track.style.transform = `translateX(-${idx * 100}%)`;
    [...dots.children].forEach((d, k) => d.setAttribute('aria-selected', k === idx));
  }
  const auto = () => {
    clearInterval(timer);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !car.matches(':focus-within')) {
      timer = setInterval(() => go(idx + 1), 6000);
    }
  };
  $('#prevSlide').onclick = () => { go(idx - 1); auto(); };
  $('#nextSlide').onclick = () => { go(idx + 1); auto(); };
  dots.addEventListener('click', e => { const i = [...dots.children].indexOf(e.target); if (i >= 0) { go(i); auto(); } });
  const car = $('#carousel');
  car.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { go(idx + 1); auto(); } if (e.key === 'ArrowLeft') { go(idx - 1); auto(); } });
  let sx = null;
  car.addEventListener('pointerdown', e => { sx = e.clientX; });
  car.addEventListener('pointerup', e => { if (sx === null) return; const dx = e.clientX - sx; if (Math.abs(dx) > 40) { go(idx + (dx < 0 ? 1 : -1)); auto(); } sx = null; });
  car.addEventListener('focusin', () => clearInterval(timer));
  car.addEventListener('focusout', () => setTimeout(auto, 0));
  car.addEventListener('mouseenter', () => clearInterval(timer));
  car.addEventListener('mouseleave', auto);
  auto();

  // ---------- Comentários
  let comments = store.get('esa_comments', DEFAULT_COMMENTS);
  const initials = n => n.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  function renderComments() {
    $('#comments').innerHTML = comments.slice(0, 6).map((c, i) => `
      <article class="comment">
        <div><div class="stars" aria-label="5 estrelas">★★★★★</div><p style="margin-top:.6rem">“${esc(c.t)}”</p></div>
        <footer><span class="avatar" style="--c:${COLORS[i % COLORS.length]}">${esc(initials(c.n))}</span><div><strong>${esc(c.n)}</strong><small>${esc(c.r || 'Usuário da plataforma')}</small></div></footer>
      </article>`).join('');
  }
  $('#commentForm').addEventListener('submit', e => {
    e.preventDefault();
    const n = $('#cName').value.trim(), t = $('#cText').value.trim();
    if (!n || !t) return;
    comments = [{ n, t, r: 'Novo comentário' }, ...comments];
    store.set('esa_comments', comments);
    e.target.reset(); renderComments(); toast('Obrigado pelo seu comentário.');
  });

  // ---------- Contadores
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target, end = +el.dataset.count, t0 = performance.now();
    const step = t => { const k = Math.min(1, (t - t0) / 1200); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))).toLocaleString('pt-BR'); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step); io.unobserve(el);
  }), { threshold: .6 });
  document.querySelectorAll('[data-count]').forEach(el => io.observe(el));

  // ---------- Link ativo no menu
  const links = [...nav.querySelectorAll('a')];
  const secIO = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) secIO.observe(s); });

  // ---------- Início
  buildFilters(); buildSkills(); fillProfile(); render(); renderComments();
})();
