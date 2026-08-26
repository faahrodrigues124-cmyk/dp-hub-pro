
/**
 * Aplicação Principal — Roteador SPA, Renderizadores e Eventos
 */

function switchView(viewName) {
    const workbenchEl = document.getElementById('view-workbench');
    const docsEl = document.getElementById('view-docs');
    const btnWb = document.getElementById('btn-nav-workbench');
    const btnDocs = document.getElementById('btn-nav-docs');

    if (viewName === 'workbench') {
        workbenchEl.classList.remove('hidden');
        docsEl.classList.add('hidden');
        btnWb.classList.add('active');
        btnDocs.classList.remove('active');
    } else {
        workbenchEl.classList.add('hidden');
        docsEl.classList.remove('hidden');
        btnWb.classList.remove('active');
        btnDocs.classList.add('active');
    }
}

function switchWorkbenchTab(tabId) {
    document.querySelectorAll('.workbench-subtab').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.wb-tab-btn').forEach(el => el.classList.remove('active'));

    if (tabId === 'tab-folha') {
        document.getElementById('subtab-folha').classList.remove('hidden');
        document.getElementById('wb-tab-folha').classList.add('active');
    } else if (tabId === 'tab-ponto') {
        document.getElementById('subtab-ponto').classList.remove('hidden');
        document.getElementById('wb-tab-ponto').classList.add('active');
    } else if (tabId === 'tab-ferias') {
        document.getElementById('subtab-ferias').classList.remove('hidden');
        document.getElementById('wb-tab-ferias').classList.add('active');
    } else if (tabId === 'tab-rescisao') {
        document.getElementById('subtab-rescisao').classList.remove('hidden');
        document.getElementById('wb-tab-rescisao').classList.add('active');
    }
}

function parseCurrency(id) {
    const el = document.getElementById(id);
    if (!el || !el.value) return 0;
    const v = el.value.trim().split('.').join('').replace(',', '.');
    const n = parseFloat(v);
    return isNaN(n) ? 0 : n;
}

function formatBRL(val) {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function runCalculations() {
    const salarioBase = parseCurrency('wb-salario');
    const tipoAdicional = document.getElementById('wb-tipo-adicional').value;

    let adicionalVal = 0;
    if (tipoAdicional === 'periculosidade') {
        adicionalVal = salarioBase * 0.30;
    } else if (tipoAdicional === 'insalubridade_10') {
        adicionalVal = ENGINE_DP.SALARIO_MINIMO_2026 * 0.10;
    } else if (tipoAdicional === 'insalubridade_20') {
        adicionalVal = ENGINE_DP.SALARIO_MINIMO_2026 * 0.20;
    } else if (tipoAdicional === 'insalubridade_40') {
        adicionalVal = ENGINE_DP.SALARIO_MINIMO_2026 * 0.40;
    }

    const vHora = (salarioBase + adicionalVal) > 0 ? (salarioBase + adicionalVal) / 220 : 0;
    const diasUteis = parseInt(document.getElementById('wb-dias-uteis').value) || 25;
    const dsrDias = parseInt(document.getElementById('wb-dsr-dias').value) || 5;

    const qtdHE50 = parseCurrency('wb-qtd-he50');
    const valHE50 = qtdHE50 * (vHora * 1.50);

    const horasNoturnasRelogio = parseCurrency('wb-horas-noturnas-relogio');
    const horasNoturnasReduzidas = horasNoturnasRelogio * (60 / 52.5);
    const valNoturno = horasNoturnasReduzidas * (vHora * 0.20);

    const dsrVariaveis = diasUteis > 0 ? ((valHE50 + valNoturno) / diasUteis) * dsrDias : 0;
    const comissoes = parseCurrency('wb-comissoes');
    const dsrComissao = diasUteis > 0 && comissoes > 0 ? (comissoes / diasUteis) * dsrDias : 0;

    const totalBruto = salarioBase + adicionalVal + valHE50 + valNoturno + dsrVariaveis + comissoes + dsrComissao;

    const faltasDias = parseInt(document.getElementById('wb-faltas-dias').value) || 0;
    const dsrPerdido = parseInt(document.getElementById('wb-dsr-perdido').value) || 0;
    const valDia = (salarioBase + adicionalVal) / 30;
    const descFaltas = (faltasDias + dsrPerdido) * valDia;

    const atrasosHoras = parseCurrency('wb-atrasos-horas');
    const descAtrasos = atrasosHoras * vHora;

    const baseTributavel = Math.max(0, totalBruto - descFaltas - descAtrasos);
    const inss = ENGINE_DP.calcularINSS(baseTributavel);

    const numDeps = parseInt(document.getElementById('wb-num-deps').value) || 0;
    const irrf = ENGINE_DP.calcularIRRF(baseTributavel, inss, numDeps);

    const totalDescontos = descFaltas + descAtrasos + inss + irrf;
    const liquido = Math.max(0, totalBruto - totalDescontos);
    const fgts = baseTributavel * 0.08;

    // Atualização da UI
    document.getElementById('res-bruto').innerText = formatBRL(totalBruto);
    document.getElementById('res-vhora').innerText = formatBRL(vHora);
    document.getElementById('res-noturno').innerText = formatBRL(valNoturno + dsrVariaveis);
    document.getElementById('res-descontos').innerText = formatBRL(totalDescontos);
    document.getElementById('res-inss').innerText = formatBRL(inss);
    document.getElementById('res-irrf').innerText = formatBRL(irrf);
    document.getElementById('res-liquido').innerText = formatBRL(liquido);
    document.getElementById('res-fgts').innerText = formatBRL(fgts);
}

function calcPontoApuracao() {
    const resTexto = document.getElementById('ponto-resultado-texto');
    // Exemplo de apuração comparativa
    resTexto.innerHTML = `✓ Entrada com 6 min adiantado e saída com 8 min a mais.<br><b>Resultado:</b> Variação total de 14 min (estourou teto diário de 10 min). Apura-se <b>14 minutos integrais de Hora Extra 50%</b>.`;
}

function renderDocsSidebar() {
    const navList = document.getElementById('docs-nav-list');
    navList.innerHTML = DATABASE_DOCS.map((doc, idx) => `
        <button onclick="loadDoc(${idx})" class="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-dark-bg hover:text-white flex items-center gap-2.5 transition-all">
            <i data-lucide="${doc.icone}" class="w-4 h-4 text-brand-400"></i>
            <span>${doc.titulo}</span>
        </button>
    `).join('');
    loadDoc(0);
}

function loadDoc(idx) {
    const doc = DATABASE_DOCS[idx];
    document.getElementById('docs-content-area').innerHTML = doc.conteudo;
    lucide.createIcons();
}

function initScratchpad() {
    const sp = document.getElementById('hub-scratchpad');
    sp.value = localStorage.getItem('dphub_scratchpad') || '';
    sp.addEventListener('input', () => localStorage.setItem('dphub_scratchpad', sp.value));
}

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderDocsSidebar();
    initScratchpad();
});
