/**
 * Motor DP Pro Training Station - Layout Original Preservado + Calculadora Corrigida + Demonstrativo Limpo
 */

const ENGINE_DP = {
    SALARIO_MINIMO_2026: 1518.00,
    
    calcularINSS(base) {
        if (base <= 1518.00) return base * 0.075;
        if (base <= 2793.88) return (1518.00 * 0.075) + ((base - 1518.00) * 0.09);
        if (base <= 4190.83) return (1518.00 * 0.075) + ((2793.88 - 1518.00) * 0.09) + ((base - 2793.88) * 0.12);
        if (base <= 8157.41) return (1518.00 * 0.075) + ((2793.88 - 1518.00) * 0.09) + ((4190.83 - 2793.88) * 0.12) + ((base - 4190.83) * 0.14);
        return 951.63;
    },

    calcularIRRF(base, inss, dependentes) {
        let deducaoDep = dependentes * 189.59;
        let baseCalculo = base - inss - deducaoDep;
        if (baseCalculo <= 2259.20) return 0;
        if (baseCalculo <= 2826.65) return (baseCalculo * 0.075) - 169.44;
        if (baseCalculo <= 3751.05) return (baseCalculo * 0.15) - 381.44;
        if (baseCalculo <= 4664.68) return (baseCalculo * 0.225) - 662.77;
        return (baseCalculo * 0.275) - 896.00;
    }
};

function switchView(viewName) {
    ['view-trilha', 'view-workbench', 'view-casos', 'view-docs'].forEach(t => {
        const el = document.getElementById(t);
        if (el) el.classList.add('hidden');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    if (viewName === 'trilha') {
        document.getElementById('view-trilha').classList.remove('hidden');
        document.getElementById('btn-nav-trilha').classList.add('active');
    } else if (viewName === 'workbench') {
        document.getElementById('view-workbench').classList.remove('hidden');
        document.getElementById('btn-nav-workbench').classList.add('active');
    } else if (viewName === 'casos') {
        document.getElementById('view-casos').classList.remove('hidden');
        document.getElementById('btn-nav-casos').classList.add('active');
    } else if (viewName === 'docs') {
        document.getElementById('view-docs').classList.remove('hidden');
        document.getElementById('btn-nav-docs').classList.add('active');
    }
}

function switchWorkbenchTab(tabId) {
    document.querySelectorAll('.workbench-subtab').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.wb-tab-btn').forEach(el => el.classList.remove('active'));

    if (tabId === 'tab-folha') {
        document.getElementById('subtab-folha').classList.remove('hidden');
        document.getElementById('wb-tab-folha').classList.add('active');
    } else if (tabId === 'tab-ferias') {
        document.getElementById('subtab-ferias').classList.remove('hidden');
        document.getElementById('wb-tab-ferias').classList.add('active');
    } else if (tabId === 'tab-rescisao') {
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

function calcularEngineGabarito() {
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

    return {
        valAdicional, vHora, vHE50Unit, noturnoReduzido, totHE50, totAdn, totDsr, totProventos, descINSS, descIRRF, totDescontos, totLiquido
    };
}

function validarCampos() {
    const mapaCampos = [
        { id: 'wb-val-adicional', key: 'valAdicional' }, { id: 'wb-val-hora', key: 'vHora' },
        { id: 'wb-val-he50-unit', key: 'vHE50Unit' }, { id: 'wb-noturno-reduzido', key: 'noturnoReduzido' },
        { id: 'wb-tot-he50', key: 'totHE50' }, { id: 'wb-tot-adn', key: 'totAdn' },
        { id: 'wb-tot-dsr', key: 'totDsr' }, { id: 'wb-tot-proventos', key: 'totProventos' },
        { id: 'wb-desc-inss', key: 'descINSS' }, { id: 'wb-desc-irrf', key: 'descIRRF' },
        { id: 'wb-tot-descontos', key: 'totDescontos' }, { id: 'wb-tot-liquido', key: 'totLiquido' }
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
        if (Math.abs(digitado - correto) <= 0.08) {
            el.classList.add('valid-correct');
            el.classList.remove('valid-wrong');
            if (hintEl) hintEl.innerText = '✓ Correto!';
        } else {
            el.classList.add('valid-wrong');
            el.classList.remove('valid-correct');
            if (hintEl) hintEl.innerText = `Correto: R$ ${formatBRL(correto)}`;
        }
    });
}

function limparCampos() {
    document.querySelectorAll('input').forEach(i => {
        if (i.id === 'wb-dias-uteis') i.value = '24';
        else if (i.id === 'wb-dsr-dias') i.value = '6';
        else if (i.id === 'wb-num-deps') i.value = '0';
        else if (i.type !== 'checkbox') i.value = '';
        i.classList.remove('valid-correct', 'valid-wrong');
    });
    document.querySelectorAll('.feedback-hint').forEach(h => h.innerText = '');
    showToast('Campos limpos!');
}

// DEMONSTRATIVO LIMPO E PROFISSIONAL
function copiarDemonstrativoLimpo() {
    const v = (id) => { const el = document.getElementById(id); return el && el.value ? el.value : '0,00'; };
    let texto = 
`========================================
       DEMONSTRATIVO DE FOLHA - DP
========================================
• Salário Base: R$ ${v('wb-salario')}
• Total de Proventos (Bruto): R$ ${v('wb-tot-proventos')}
• Total de Descontos: R$ ${v('wb-tot-descontos')}
• Salário Líquido Final: R$ ${v('wb-tot-liquido')}
========================================`;
    navigator.clipboard.writeText(texto).then(() => showToast('Demonstrativo limpo copiado!'));
}

function showToast(msg) {
    const toast = document.getElementById('toast-notify');
    const msgEl = document.getElementById('toast-message');
    if (!toast || !msgEl) return;
    msgEl.innerText = msg;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => toast.classList.add('opacity-0', 'pointer-events-none'), 2800);
}

// CALCULADORA COM HISTÓRICO E % CORRIGIDO
let calcDisplay = document.getElementById('calc-display');
let calcExpr = '';
let calcHistorico = JSON.parse(localStorage.getItem('dp_calc_hist')) || [];

function renderHistoricoCalc() {
    const histEl = document.getElementById('calc-history');
    if (!histEl) return;
    histEl.innerHTML = calcHistorico.map(h => `<div class="truncate"><span class="text-slate-500">${h.expr} =</span> <b class="text-brand-300">${h.res}</b></div>`).join('');
}

function addHistoricoCalc(expr, res) {
    calcHistorico.unshift({ expr, res });
    if (calcHistorico.length > 5) calcHistorico.pop();
    localStorage.setItem('dp_calc_hist', JSON.stringify(calcHistorico));
    renderHistoricoCalc();
}

function limparHistoricoCalc() {
    calcHistorico = [];
    localStorage.removeItem('dp_calc_hist');
    renderHistoricoCalc();
}

function calcNum(n) { if (calcDisplay.innerText === '0' || calcDisplay.innerText === 'Erro') calcExpr = ''; calcExpr += n; calcDisplay.innerText = calcExpr; }
function calcOp(op) { calcExpr += ' ' + op + ' '; calcDisplay.innerText = calcExpr; }
function calcClear() { calcExpr = ''; calcDisplay.innerText = '0'; }
function calcBack() { calcExpr = calcExpr.trim().slice(0, -1); calcDisplay.innerText = calcExpr || '0'; }

function calcPercent() {
    try {
        let parts = calcExpr.trim().split(' ');
        if (parts.length >= 3) {
            let base = parseFloat(parts[0].replace(',', '.'));
            let op = parts[1];
            let pct = parseFloat(parts[2].replace(',', '.')) / 100;
            let res = 0;
            if (op === '*') res = base * pct;
            else if (op === '+') res = base + (base * pct);
            else if (op === '-') res = base - (base * pct);
            let formatted = res.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            addHistoricoCalc(calcExpr, formatted);
            calcDisplay.innerText = formatted;
            calcExpr = res.toString();
        }
    } catch(e) { calcDisplay.innerText = 'Erro'; calcExpr = ''; }
}

function calcEquals() {
    try {
        let clean = calcExpr.replace(/,/g, '.');
        let res = eval(clean);
        let formatted = res.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        addHistoricoCalc(calcExpr, formatted);
        calcDisplay.innerText = formatted;
        calcExpr = res.toString();
    } catch(e) { calcDisplay.innerText = 'Erro'; calcExpr = ''; }
}

document.addEventListener('keydown', (e) => {
    if (document.getElementById('view-workbench').classList.contains('hidden')) return;
    if (e.key >= '0' && e.key <= '9') calcNum(e.key);
    else if (e.key === '.' || e.key === ',') calcNum('.');
    else if (e.key === '+') calcOp('+');
    else if (e.key === '-') calcOp('-');
    else if (e.key === '*') calcOp('*');
    else if (e.key === '/') calcOp('/');
    else if (e.key === 'Enter' || e.key === '=') calcEquals();
    else if (e.key === 'Backspace') calcBack();
    else if (e.key.toLowerCase() === 'c') calcClear();
});

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderHistoricoCalc();
    const sp = document.getElementById('hub-scratchpad');
    if (sp) {
        sp.value = localStorage.getItem('dphub_scratchpad') || '';
        sp.addEventListener('input', () => localStorage.setItem('dphub_scratchpad', sp.value));
    }
});
