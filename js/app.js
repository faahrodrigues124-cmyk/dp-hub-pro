/**
 * Aplicação Central DP Pro: Gestor da Trilha, Bancada Manual e Busca Global
 */

let abaAtivaAtual = 'folha';
let modulosConcluidos = JSON.parse(localStorage.getItem('dp_modulos_concluidos')) || [];

function switchView(viewName) {
    document.getElementById('view-trilha').classList.add('hidden');
    document.getElementById('view-workbench').classList.add('hidden');
    document.getElementById('view-docs').classList.add('hidden');
    
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    if (viewName === 'trilha') {
        document.getElementById('view-trilha').classList.remove('hidden');
        document.getElementById('btn-nav-trilha').classList.add('active');
    } else if (viewName === 'workbench') {
        document.getElementById('view-workbench').classList.remove('hidden');
        document.getElementById('btn-nav-workbench').classList.add('active');
    } else if (viewName === 'docs') {
        document.getElementById('view-docs').classList.remove('hidden');
        document.getElementById('btn-nav-docs').classList.add('active');
    }
}

function switchWorkbenchTab(tabId) {
    document.querySelectorAll('.workbench-subtab').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.wb-tab-btn').forEach(el => el.classList.remove('active'));

    if (tabId === 'tab-folha') {
        abaAtivaAtual = 'folha';
        document.getElementById('subtab-folha').classList.remove('hidden');
        document.getElementById('wb-tab-folha').classList.add('active');
    } else if (tabId === 'tab-ferias') {
        abaAtivaAtual = 'ferias';
        document.getElementById('subtab-ferias').classList.remove('hidden');
        document.getElementById('wb-tab-ferias').classList.add('active');
    } else if (tabId === 'tab-rescisao') {
        abaAtivaAtual = 'rescisao';
        document.getElementById('subtab-rescisao').classList.remove('hidden');
        document.getElementById('wb-tab-rescisao').classList.add('active');
    }
    validarCampos();
}

function parseVal(id) {
    const el = document.getElementById(id);
    if (!el || !el.value) return 0;
    const v = el.value.trim().split('.').join('').replace(',', '.');
    const num = parseFloat(v);
    return isNaN(num) ? 0 : num;
}

function formatBRL(val) {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Formatação ao sair do campo
document.querySelectorAll('.currency-input').forEach(input => {
    input.addEventListener('blur', function(e) {
        let value = e.target.value.trim();
        if (!value) return;
        value = value.split('.').join('').replace(',', '.');
        let num = parseFloat(value);
        if (!isNaN(num)) {
            e.target.value = num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        validarCampos();
    });
});

// MOTOR INVISÍVEL DE VALIDAÇÃO
function calcularEngineGabarito() {
    // 1. Folha
    const salario = parseVal('wb-salario');
    const tipoAdicional = document.getElementById('wb-tipo-adicional').value;
    let valAdicional = 0;
    if (tipoAdicional === 'periculosidade') valAdicional = salario * 0.30;
    else if (tipoAdicional === 'insalubridade_10') valAdicional = ENGINE_DP.SALARIO_MINIMO_2026 * 0.10;
    else if (tipoAdicional === 'insalubridade_20') valAdicional = ENGINE_DP.SALARIO_MINIMO_2026 * 0.20;
    else if (tipoAdicional === 'insalubridade_40') valAdicional = ENGINE_DP.SALARIO_MINIMO_2026 * 0.40;

    const vHora = (salario + valAdicional) > 0 ? (salario + valAdicional) / 220 : 0;
    const vHE50Unit = vHora * 1.50;
    const diasUteis = parseInt(document.getElementById('wb-dias-uteis').value) || 24;
    const dsrDias = parseInt(document.getElementById('wb-dsr-dias').value) || 6;

    const noturnoRelogio = parseVal('wb-noturno-relogio');
    const noturnoReduzido = noturnoRelogio > 0 ? noturnoRelogio * (60 / 52.5) : 0;
    const vAdcNoturnoHora = vHora * 0.20;
    const totAdn = noturnoReduzido * vAdcNoturnoHora;

    const qtdHE50 = parseVal('wb-qtd-he50');
    const totHE50 = qtdHE50 * vHE50Unit;
    const totDsr = diasUteis > 0 ? ((totHE50 + totAdn) / diasUteis) * dsrDias : 0;
    const comissao = parseVal('wb-comissao');
    const totProventos = salario + valAdicional + totHE50 + totAdn + totDsr + comissao;

    const descFaltas = parseVal('wb-desc-faltas');
    const descAtrasos = parseVal('wb-desc-atrasos');
    const descVT = parseVal('wb-desc-vt');

    const baseINSS = Math.max(0, totProventos - descFaltas - descAtrasos);
    const descINSS = ENGINE_DP.calcularINSS(baseINSS);
    const numDeps = parseInt(document.getElementById('wb-num-deps').value) || 0;
    const descIRRF = ENGINE_DP.calcularIRRF(baseINSS, descINSS, numDeps);
    const totDescontos = descFaltas + descAtrasos + descVT + descINSS + descIRRF;
    const totLiquido = Math.max(0, totProventos - totDescontos);

    // 2. Férias
    const ferSalario = parseVal('fer-salario');
    const ferMedia = parseVal('fer-media');
    const ferRemunera = ferSalario + ferMedia;
    const ferDiasGozo = parseInt(document.getElementById('fer-dias-gozo').value) || 30;
    const ferValGozo = (ferRemunera / 30) * ferDiasGozo;
    const ferValTerco = ferValGozo / 3;
    const ferTotBruto = ferValGozo + ferValTerco;
    const ferINSS = ENGINE_DP.calcularINSS(ferTotBruto);
    const ferIRRF = ENGINE_DP.calcularIRRF(ferTotBruto, ferINSS, 0);
    const ferLiquido = Math.max(0, ferTotBruto - ferINSS - ferIRRF);

    // 3. Rescisão
    const rescSalario = parseVal('resc-salario');
    const rescAnos = parseInt(document.getElementById('resc-anos').value) || 0;
    const rescDiasSaldo = parseInt(document.getElementById('resc-dias-saldo').value) || 0;
    const rescValSaldo = (rescSalario / 30) * rescDiasSaldo;
    const diasAviso = Math.min(90, 30 + (rescAnos * 3));
    const rescValAviso = (rescSalario / 30) * diasAviso;
    const rescVal13 = (rescSalario / 12) * 6;
    const baseFeriasProp = (rescSalario / 12) * 8;
    const rescValFerias = baseFeriasProp + (baseFeriasProp / 3);
    const rescSaldoFGTS = parseVal('resc-saldo-fgts');
    const rescValMultaFGTS = rescSaldoFGTS * 0.40;
    const rescTotBruto = rescValSaldo + rescValAviso + rescVal13 + rescValFerias + rescValMultaFGTS;
    const inssSaldo = ENGINE_DP.calcularINSS(rescValSaldo);
    const inss13 = ENGINE_DP.calcularINSS(rescVal13);
    const rescINSS = inssSaldo + inss13;
    const rescLiquido = Math.max(0, rescTotBruto - rescINSS);

    return {
        valAdicional, vHora, vHE50Unit, noturnoReduzido, totHE50, totAdn, totDsr, totProventos, descINSS, descIRRF, totDescontos, totLiquido,
        ferValGozo, ferValTerco, ferTotBruto, ferINSS, ferIRRF, ferLiquido,
        rescValSaldo, rescValAviso, rescVal13, rescValFerias, rescValMultaFGTS, rescTotBruto, rescINSS, rescLiquido
    };
}

function validarCampos() {
    const mapaCampos = [
        { id: 'wb-val-adicional', key: 'valAdicional' },
        { id: 'wb-val-hora', key: 'vHora' },
        { id: 'wb-val-he50-unit', key: 'vHE50Unit' },
        { id: 'wb-noturno-reduzido', key: 'noturnoReduzido' },
        { id: 'wb-tot-he50', key: 'totHE50' },
        { id: 'wb-tot-adn', key: 'totAdn' },
        { id: 'wb-tot-dsr', key: 'totDsr' },
        { id: 'wb-tot-proventos', key: 'totProventos' },
        { id: 'wb-desc-inss', key: 'descINSS' },
        { id: 'wb-desc-irrf', key: 'descIRRF' },
        { id: 'wb-tot-descontos', key: 'totDescontos' },
        { id: 'wb-tot-liquido', key: 'totLiquido' },
        { id: 'fer-val-gozo', key: 'ferValGozo' },
        { id: 'fer-val-terco', key: 'ferValTerco' },
        { id: 'fer-tot-bruto', key: 'ferTotBruto' },
        { id: 'fer-inss', key: 'ferINSS' },
        { id: 'fer-irrf', key: 'ferIRRF' },
        { id: 'fer-liquido', key: 'ferLiquido' },
        { id: 'resc-val-saldo', key: 'rescValSaldo' },
        { id: 'resc-val-aviso', key: 'rescValAviso' },
        { id: 'resc-val-13', key: 'rescVal13' },
        { id: 'resc-val-ferias', key: 'rescValFerias' },
        { id: 'resc-val-multa-fgts', key: 'rescValMultaFGTS' },
        { id: 'resc-tot-bruto', key: 'rescTotBruto' },
        { id: 'resc-inss', key: 'rescINSS' },
        { id: 'resc-liquido', key: 'rescLiquido' }
    ];

    const gabarito = calcularEngineGabarito();

    mapaCampos.forEach(c => {
        const el = document.getElementById(c.id);
        const hintEl = document.getElementById('hint-' + c.id);
        if (!el) return;

        const digitado = parseVal(c.id);
        const correto = gabarito[c.key];

        if (!el.value || el.value.trim() === '') {
            el.classList.remove('valid-correct', 'valid-wrong');
            if (hintEl) hintEl.innerText = '';
            return;
        }

        const diff = Math.abs(digitado - correto);
        if (diff <= 0.08) {
            el.classList.add('valid-correct');
            el.classList.remove('valid-wrong');
            if (hintEl) hintEl.innerText = '✓ Correto!';
        } else {
            el.classList.add('valid-wrong');
            el.classList.remove('valid-correct');
            if (hintEl) hintEl.innerText = `Valor correto: R$ ${formatBRL(correto)}`;
        }
    });
}

function limparCampos() {
    document.querySelectorAll('input').forEach(i => {
        if (i.id === 'wb-dias-uteis') i.value = '24';
        else if (i.id === 'wb-dsr-dias') i.value = '6';
        else if (i.id === 'wb-num-deps' || i.id === 'fer-dias-gozo') i.value = i.id === 'fer-dias-gozo' ? '30' : '0';
        else if (i.id === 'resc-anos') i.value = '2';
        else if (i.id === 'resc-dias-saldo') i.value = '18';
        else if (i.type !== 'checkbox') i.value = '';
        i.classList.remove('valid-correct', 'valid-wrong');
    });
    document.querySelectorAll('.feedback-hint').forEach(h => h.innerText = '');
    showToast('Campos limpos com sucesso!');
}

function copiarDemonstrativo() {
    const v = (id) => {
        const el = document.getElementById(id);
        return el && el.value ? el.value : '0,00';
    };

    let texto = '';

    if (abaAtivaAtual === 'folha') {
        texto = `====================================================================
                    DEMONSTRATIVO DE PAGAMENTO (HOLERITE)
====================================================================
[ CALENDÁRIO DSR DO MÊS ]
• Dias Úteis: ${v('wb-dias-uteis')} dias  |  • Domingos e Feriados: ${v('wb-dsr-dias')} dias
--------------------------------------------------------------------
[ APURAÇÃO DE HORA NOTURNA & PRORROGAÇÃO ]
• Horas Relógio Noturnas: ${v('wb-noturno-relogio')} h
• Horas Reduzidas Noturnas (1,142857): ${v('wb-noturno-reduzido')} h
--------------------------------------------------------------------
[ PROVENTOS ]                                 [ VALOR (R$) ]
--------------------------------------------------------------------
• Salário Base                              : ${v('wb-salario')}
• Adicional Especial (Peric./Insalub.)      : ${v('wb-val-adicional')}
  - Valor da Hora Integrada                 : ${v('wb-val-hora')}
  - Valor HE 50% (Unitária)                 : ${v('wb-val-he50-unit')}
• Total Horas Extras 50%                    : ${v('wb-tot-he50')}
• Adicional Noturno Total                   : ${v('wb-tot-adn')}
• DSR s/ Variáveis (HE/Noturno)             : ${v('wb-tot-dsr')}
• Comissões                                 : ${v('wb-comissao')}
--------------------------------------------------------------------
TOTAL DE PROVENTOS (Salário Bruto)          : R$ ${v('wb-tot-proventos')}
====================================================================

[ DESCONTOS ]                                 [ VALOR (R$) ]
--------------------------------------------------------------------
• Faltas + DSR Perdido                      : ${v('wb-desc-faltas')}
• Atrasos                                   : ${v('wb-desc-atrasos')}
• Vale-Transporte (6%)                      : ${v('wb-desc-vt')}
• INSS                                      : ${v('wb-desc-inss')}
• IRRF                                      : ${v('wb-desc-irrf')}
--------------------------------------------------------------------
TOTAL DE DESCONTOS                          : R$ ${v('wb-tot-descontos')}
====================================================================

[ RESUMO FINANCEIRO ]
--------------------------------------------------------------------
• SALÁRIO BRUTO                             : R$ ${v('wb-tot-proventos')}
• TOTAL DE DESCONTOS                        : R$ ${v('wb-tot-descontos')}
• SALÁRIO LÍQUIDO A RECEBER                 : R$ ${v('wb-tot-liquido')}
====================================================================`;
    } else if (abaAtivaAtual === 'ferias') {
        texto = `====================================================================
                    RECIBO DE FÉRIAS (DEMONSTRATIVO)
====================================================================
[ PROVENTOS DE FÉRIAS ]                       [ VALOR (R$) ]
--------------------------------------------------------------------
• Salário Base                              : ${v('fer-salario')}
• Média de Horas Extras / Variáveis         : ${v('fer-media')}
• Valor Férias Gozadas                      : ${v('fer-val-gozo')}
• 1/3 Constitucional s/ Gozo                : ${v('fer-val-terco')}
• Abono Pecuniário + 1/3 (Isento)           : ${v('fer-val-abono')}
--------------------------------------------------------------------
TOTAL BRUTO DE FÉRIAS                       : R$ ${v('fer-tot-bruto')}
====================================================================

[ DESCONTOS DE FÉRIAS ]                       [ VALOR (R$) ]
--------------------------------------------------------------------
• INSS sobre Férias                         : ${v('fer-inss')}
• IRRF sobre Férias                         : ${v('fer-irrf')}
--------------------------------------------------------------------
• LÍQUIDO DE FÉRIAS A RECEBER               : R$ ${v('fer-liquido')}
====================================================================`;
    } else if (abaAtivaAtual === 'rescisao') {
        texto = `====================================================================
                    TERMO DE RESCISÃO CONTRATUAL (DEMONSTRATIVO)
====================================================================
[ VERBAS RESCISÓRIAS (PROVENTOS) ]            [ VALOR (R$) ]
--------------------------------------------------------------------
• Saldo de Salário (${v('resc-dias-saldo')} dias)               : ${v('resc-val-saldo')}
• Aviso Prévio Indenizado                   : ${v('resc-val-aviso')}
• 13º Salário Proporcional                  : ${v('resc-val-13')}
• Férias Proporcionais + 1/3                : ${v('resc-val-ferias')}
• Multa Rescisória do FGTS (40%)            : ${v('resc-val-multa-fgts')}
--------------------------------------------------------------------
TOTAL BRUTO RESCISÓRIO                      : R$ ${v('resc-tot-bruto')}
====================================================================

[ DESCONTOS RESCISÓRIOS ]                     [ VALOR (R$) ]
--------------------------------------------------------------------
• INSS Rescisório (Saldo + 13º)             : ${v('resc-inss')}
--------------------------------------------------------------------
• TOTAL LÍQUIDO RESCISÓRIO A RECEBER        : R$ ${v('resc-liquido')}
====================================================================`;
    }

    navigator.clipboard.writeText(texto).then(() => {
        showToast('Demonstrativo copiado para o chat!');
    }).catch(() => {
        showToast('Erro ao copiar.');
    });
}

function showToast(msg) {
    const toast = document.getElementById('toast-notify');
    const msgEl = document.getElementById('toast-message');
    if (!toast || !msgEl) return;
    msgEl.innerText = msg;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => toast.classList.add('opacity-0', 'pointer-events-none'), 2800);
}

// Calculadora
let calcDisplay = document.getElementById('calc-display');
let calcExpr = '';
let calcHist = JSON.parse(localStorage.getItem('dphub_calc_hist')) || [];

function calcNum(n) {
    if (calcDisplay.innerText === '0' || calcDisplay.innerText === 'Erro') calcExpr = '';
    calcExpr += n;
    calcDisplay.innerText = calcExpr;
}
function calcOp(op) { calcExpr += op; calcDisplay.innerText = calcExpr; }
function calcClear() { calcExpr = ''; calcDisplay.innerText = '0'; }
function calcBack() { calcExpr = calcExpr.slice(0, -1); calcDisplay.innerText = calcExpr || '0'; }
function calcPercent() { calcExpr += '%'; calcDisplay.innerText = calcExpr; }

function calcEquals() {
    try {
        let raw = calcExpr;
        let res = eval(calcExpr.replace(/,/g, '.').replace(/%/g, '/100'));
        let formatted = res.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        calcDisplay.innerText = formatted;
        calcHist.unshift({ expr: raw, res: formatted });
        if (calcHist.length > 6) calcHist.pop();
        localStorage.setItem('dphub_calc_hist', JSON.stringify(calcHist));
        renderCalcHist();
        calcExpr = res.toString();
    } catch(e) {
        calcDisplay.innerText = 'Erro';
        calcExpr = '';
    }
}

function renderCalcHist() {
    const el = document.getElementById('calc-history-list');
    if (!el) return;
    if (calcHist.length === 0) {
        el.innerHTML = '<span class="text-slate-600 text-[10px]">Nenhuma conta feita.</span>';
        return;
    }
    el.innerHTML = calcHist.map(h => `
        <div class="flex justify-between items-center text-slate-400">
            <span>${h.expr}</span>
            <span class="font-bold text-white">${h.res}</span>
        </div>
    `).join('');
}

function limparHistoricoCalc() {
    calcHist = [];
    localStorage.removeItem('dphub_calc_hist');
    renderCalcHist();
}

// Renderização da Trilha de Carreira
function renderTrilhaGrid() {
    const grid = document.getElementById('trilha-modulos-grid');
    if (!grid) return;

    grid.innerHTML = DATABASE_DOCS.map((doc, idx) => {
        const isDone = modulosConcluidos.includes(doc.id);
        return `
            <div class="p-5 bg-dark-panel hover:bg-dark-card border ${isDone ? 'border-emerald-500/40' : 'border-dark-border'} rounded-2xl space-y-3 transition-all flex flex-col justify-between shadow-lg">
                <div class="space-y-2">
                    <div class="flex justify-between items-start">
                        <span class="text-[10px] font-mono font-bold uppercase tracking-wider ${isDone ? 'text-emerald-400' : 'text-brand-400'}">${doc.nivel}</span>
                        <button onclick="toggleConclusaoModulo('${doc.id}')" class="text-xs p-1 rounded-lg ${isDone ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 hover:text-slate-300'}">
                            <i data-lucide="${isDone ? 'check-circle' : 'circle'}" class="w-4 h-4"></i>
                        </button>
                    </div>
                    <h4 class="font-bold text-white text-sm tracking-tight">${doc.titulo}</h4>
                    <p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">${doc.descricao}</p>
                </div>
                <div class="pt-3 border-t border-dark-border flex items-center justify-between">
                    <span class="text-[10px] text-slate-500 font-mono">${doc.cargo}</span>
                    <button onclick="abrirDocPorId('${doc.id}')" class="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1">
                        Estudar <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    atualizarProgressoTrilha();
    lucide.createIcons();
}

function toggleConclusaoModulo(id) {
    if (modulosConcluidos.includes(id)) {
        modulosConcluidos = modulosConcluidos.filter(m => m !== id);
    } else {
        modulosConcluidos.push(id);
    }
    localStorage.setItem('dp_modulos_concluidos', JSON.stringify(modulosConcluidos));
    renderTrilhaGrid();
}

function atualizarProgressoTrilha() {
    const pct = Math.round((modulosConcluidos.length / DATABASE_DOCS.length) * 100);
    document.getElementById('trilha-progresso-txt').innerText = `${pct}%`;
    document.getElementById('trilha-progresso-bar').style.width = `${pct}%`;
    document.getElementById('trilha-modulos-concluidos').innerText = modulosConcluidos.length;
}

function abrirDocPorId(id) {
    switchView('docs');
    const idx = DATABASE_DOCS.findIndex(d => d.id === id);
    if (idx !== -1) loadDoc(idx);
}

// Wiki e Docs
function renderDocsMenu() {
    const list = document.getElementById('docs-nav-list');
    if (!list) return;
    list.innerHTML = DATABASE_DOCS.map((d, idx) => `
        <button onclick="loadDoc(${idx})" class="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:bg-dark-base hover:text-white flex items-center gap-2.5 transition-all text-xs">
            <i data-lucide="${d.icone}" class="w-4 h-4 text-brand-400"></i>
            <span class="font-semibold truncate">${d.titulo}</span>
        </button>
    `).join('');
    loadDoc(0);
}

function loadDoc(idx) {
    const d = DATABASE_DOCS[idx];
    document.getElementById('docs-content-area').innerHTML = d.conteudo;
    lucide.createIcons();
}

function filtrarWikiGlobal() {
    const q = document.getElementById('globalDocSearch').value.toLowerCase();
    const list = document.getElementById('docs-nav-list');
    list.innerHTML = DATABASE_DOCS
        .map((d, idx) => ({ ...d, idx }))
        .filter(d => d.titulo.toLowerCase().includes(q) || d.conteudo.toLowerCase().includes(q))
        .map(d => `
            <button onclick="loadDoc(${d.idx})" class="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:bg-dark-base hover:text-white flex items-center gap-2.5 transition-all text-xs">
                <i data-lucide="${d.icone}" class="w-4 h-4 text-brand-400"></i>
                <span class="font-semibold truncate">${d.titulo}</span>
            </button>
        `).join('');
    lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderTrilhaGrid();
    renderDocsMenu();
    renderCalcHist();
    const sp = document.getElementById('hub-scratchpad');
    if (sp) {
        sp.value = localStorage.getItem('dphub_scratchpad') || '';
        sp.addEventListener('input', () => localStorage.setItem('dphub_scratchpad', sp.value));
    }
});
