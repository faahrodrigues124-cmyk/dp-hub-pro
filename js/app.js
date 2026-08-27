/**
 * Aplicação Central DP Pro: Gestor da Trilha, Bancada Manual, Casos Integrados e Auditoria
 */

let abaAtivaAtual = 'folha';
let modulosConcluidos = JSON.parse(localStorage.getItem('dp_modulos_concluidos')) || [];

// ROTEADOR SPA GLOBAL (Corrigido para alternar entre todas as telas)
function switchView(viewName) {
    const telas = ['view-trilha', 'view-workbench', 'view-casos', 'view-docs'];
    telas.forEach(t => {
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
        carregarCasoIntegrado(1);
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

    // HE noturna: as horas de HE realizadas no período noturno também passam pela
    // redução para 52,5 minutos. O adicional noturno é calculado separadamente,
    // evitando tratar HE noturna como uma simples HE diurna.
    const qtdHE50 = parseVal('wb-qtd-he50');
    const qtdHE50Noturna = Math.min(qtdHE50, parseVal('wb-qtd-he50-noturna'));
    const qtdHE50Normal = Math.max(0, qtdHE50 - qtdHE50Noturna);
    const heNoturnaReduzida = qtdHE50Noturna * (60 / 52.5);
    const heNoturnaTotal = heNoturnaReduzida * vHE50Unit;
    const heNormalTotal = qtdHE50Normal * vHE50Unit;
    const totHE50 = heNormalTotal + heNoturnaTotal;
    const adnNoturnoNormal = noturnoReduzido * vAdcNoturnoHora;
    const adnHENoturna = heNoturnaReduzida * vAdcNoturnoHora;
    const totAdn = adnNoturnoNormal + adnHENoturna;
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

    const ferSalario = parseVal('fer-salario');
    const ferMedia = parseVal('fer-media');
    const ferRemunera = ferSalario + ferMedia;
    const ferDiasGozo = parseInt(document.getElementById('fer-dias-gozo').value) || 30;
    const ferDiasAbono = Math.min(10, Math.max(0, parseInt(document.getElementById('fer-dias-abono').value) || 0));
    const ferValGozo = (ferRemunera / 30) * ferDiasGozo;
    const ferValTerco = ferValGozo / 3;
    const ferValAbono = (ferRemunera / 30) * ferDiasAbono;
    const ferTercoAbono = ferValAbono / 3;
    const ferTotBruto = ferValGozo + ferValTerco + ferValAbono + ferTercoAbono;
    const ferINSS = ENGINE_DP.calcularINSS(ferTotBruto);
    const ferIRRF = ENGINE_DP.calcularIRRF(ferTotBruto, ferINSS, 0);
    const ferLiquido = Math.max(0, ferTotBruto - ferINSS - ferIRRF);

    const rescSalario = parseVal('resc-salario');
    const rescAnos = parseInt(document.getElementById('resc-anos').value) || 0;
    const rescDiasSaldo = parseInt(document.getElementById('resc-dias-saldo').value) || 0;
    const rescTipo = document.getElementById('resc-tipo')?.value || 'sem_justa';
    const rescAvos13 = Math.min(12, Math.max(0, parseInt(document.getElementById('resc-avos-13')?.value) || 0));
    const rescAvosFerias = Math.min(12, Math.max(0, parseInt(document.getElementById('resc-avos-ferias')?.value) || 0));
    const rescValSaldo = (rescSalario / 30) * rescDiasSaldo;
    const diasAvisoLegal = Math.min(90, 30 + (rescAnos * 3));
    const diasAviso = rescTipo === 'acordo' ? Math.ceil(diasAvisoLegal / 2) : (rescTipo === 'sem_justa' ? diasAvisoLegal : 0);
    const rescValAviso = (rescSalario / 30) * diasAviso;
    const rescVal13 = rescTipo === 'justa' ? 0 : (rescSalario / 12) * rescAvos13;
    const baseFeriasProp = (rescSalario / 12) * rescAvosFerias;
    const rescValFerias = rescTipo === 'justa' ? 0 : baseFeriasProp + (baseFeriasProp / 3);
    const rescSaldoFGTS = parseVal('resc-saldo-fgts');
    const rescValMultaFGTS = rescTipo === 'sem_justa' ? rescSaldoFGTS * 0.40 : (rescTipo === 'acordo' ? rescSaldoFGTS * 0.20 : 0);
    const rescTotBruto = rescValSaldo + rescValAviso + rescVal13 + rescValFerias + rescValMultaFGTS;
    const inssSaldo = ENGINE_DP.calcularINSS(rescValSaldo);
    const inss13 = ENGINE_DP.calcularINSS(rescVal13);
    const rescINSS = inssSaldo + inss13;
    const rescLiquido = Math.max(0, rescTotBruto - rescINSS);

    return {
        valAdicional, vHora, vHE50Unit, noturnoReduzido, heNoturnaReduzida, adnHENoturna, totHE50, totAdn, totDsr, totProventos, descINSS, descIRRF, totDescontos, totLiquido,
        ferValGozo, ferValTerco, ferValAbono, ferTotBruto, ferINSS, ferIRRF, ferLiquido,
        rescValSaldo, rescValAviso, rescVal13, rescValFerias, rescValMultaFGTS, rescTotBruto, rescINSS, rescLiquido
    };
}

function validarCampos() {
    const mapaCampos = [
        { id: 'wb-val-adicional', key: 'valAdicional' }, { id: 'wb-val-hora', key: 'vHora' },
        { id: 'wb-val-he50-unit', key: 'vHE50Unit' }, { id: 'wb-noturno-reduzido', key: 'noturnoReduzido' },
        { id: 'wb-tot-he50', key: 'totHE50' }, { id: 'wb-tot-adn-he50', key: 'adnHENoturna' }, { id: 'wb-tot-adn', key: 'totAdn' },
        { id: 'wb-tot-dsr', key: 'totDsr' }, { id: 'wb-tot-proventos', key: 'totProventos' },
        { id: 'wb-desc-inss', key: 'descINSS' }, { id: 'wb-desc-irrf', key: 'descIRRF' },
        { id: 'wb-tot-descontos', key: 'totDescontos' }, { id: 'wb-tot-liquido', key: 'totLiquido' },
        { id: 'fer-val-gozo', key: 'ferValGozo' }, { id: 'fer-val-terco', key: 'ferValTerco' }, { id: 'fer-val-abono', key: 'ferValAbono' },
        { id: 'fer-tot-bruto', key: 'ferTotBruto' }, { id: 'fer-inss', key: 'ferINSS' },
        { id: 'fer-irrf', key: 'ferIRRF' }, { id: 'fer-liquido', key: 'ferLiquido' },
        { id: 'resc-val-saldo', key: 'rescValSaldo' }, { id: 'resc-val-aviso', key: 'rescValAviso' },
        { id: 'resc-val-13', key: 'rescVal13' }, { id: 'resc-val-ferias', key: 'rescValFerias' },
        { id: 'resc-val-multa-fgts', key: 'rescValMultaFGTS' }, { id: 'resc-tot-bruto', key: 'rescTotBruto' },
        { id: 'resc-inss', key: 'rescINSS' }, { id: 'resc-liquido', key: 'rescLiquido' }
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
            if (hintEl) hintEl.innerText = `Valor correto: R$ ${formatBRL(correto)}`;
        }
    });
}

function limparCampos() {
    document.querySelectorAll('input').forEach(i => {
        if (i.id === 'wb-dias-uteis') i.value = '24';
        else if (i.id === 'wb-dsr-dias') i.value = '6';
        else if (i.id === 'wb-num-deps' || i.id === 'fer-dias-gozo' || i.id === 'fer-dias-abono') i.value = i.id === 'fer-dias-gozo' ? '30' : '0';
        else if (i.id === 'resc-anos') i.value = '2';
        else if (i.id === 'resc-dias-saldo') i.value = '18';
        else if (i.id === 'resc-avos-13') i.value = '6';
        else if (i.id === 'resc-avos-ferias') i.value = '8';
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
• Salário Base: ${v('wb-salario')} | Adicional: ${v('wb-val-adicional')}
• Total Proventos (Bruto): R$ ${v('wb-tot-proventos')}
• Total Descontos: R$ ${v('wb-tot-descontos')}
• Salário Líquido Final: R$ ${v('wb-tot-liquido')}
====================================================================`;
    } else if (abaAtivaAtual === 'ferias') {
        texto = `====================================================================
                    RECIBO DE FÉRIAS (DEMONSTRATIVO)
====================================================================
• Total Bruto de Férias: R$ ${v('fer-tot-bruto')}
• Líquido de Férias: R$ ${v('fer-liquido')}
====================================================================`;
    } else if (abaAtivaAtual === 'rescisao') {
        texto = `====================================================================
                    TERMO DE RESCISÃO CONTRATUAL (DEMONSTRATIVO)
====================================================================
• Total Bruto Rescisório: R$ ${v('resc-tot-bruto')}
• Líquido Rescisório: R$ ${v('resc-liquido')}
====================================================================`;
    }
    navigator.clipboard.writeText(texto).then(() => showToast('Demonstrativo copiado para o chat!'));
}

function showToast(msg) {
    const toast = document.getElementById('toast-notify');
    const msgEl = document.getElementById('toast-message');
    if (!toast || !msgEl) return;
    msgEl.innerText = msg;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => toast.classList.add('opacity-0', 'pointer-events-none'), 2800);
}

// Gerador Estocástico de Casos Integrados Dinâmicos (Níveis 1 a 4)
let casoAtualAtivo = { nivel: 1, salario: 0, he: 0, noturno: 0, comissao: 0, faltas: 0, gabaritoResumo: {} };

function gerarNumeroAleatorio(min, max, decimais = 0) {
    const num = Math.random() * (max - min) + min;
    return Number(num.toFixed(decimais));
}

function carregarCasoIntegrado(nivel) {
    casoAtualAtivo.nivel = nivel;
    
    document.querySelectorAll('[id^="btn-caso-lvl"]').forEach(b => b.className = 'px-3 py-1 rounded-lg text-xs font-bold bg-dark-base text-slate-400 border border-dark-border');
    document.getElementById(`btn-caso-lvl${nivel}`).className = `px-3 py-1 rounded-lg text-xs font-bold bg-dark-base ${nivel === 1 ? 'text-emerald-400 border-emerald-500/40' : nivel === 2 ? 'text-cyan-400 border-cyan-500/40' : nivel === 3 ? 'text-amber-400 border-amber-500/40' : 'text-rose-400 border-rose-500/40'} border`;

    const salarioSorteado = gerarNumeroAleatorio(2200, 5800, 2);
    const diasUteis = 24;
    const dsrDias = 6;
    
    let heSorteada = 0;
    let noturnoSorteado = 0;
    let comissaoSorteada = 0;
    let faltasSorteadas = 0;

    if (nivel >= 1) {
        heSorteada = gerarNumeroAleatorio(5, 18, 0);
        noturnoSorteado = gerarNumeroAleatorio(10, 35, 0);
    }
    if (nivel >= 2) {
        comissaoSorteada = gerarNumeroAleatorio(0, 2500, 2);
        faltasSorteadas = gerarNumeroAleatorio(0, 2, 0);
    }

    casoAtualAtivo.salario = salarioSorteado;
    casoAtualAtivo.he = heSorteada;
    casoAtualAtivo.noturno = noturnoSorteado;
    casoAtualAtivo.comissao = comissaoSorteada;
    casoAtualAtivo.faltas = faltasSorteadas;

    const vHora = salarioSorteado / 220;
    const vHE50 = heSorteada * (vHora * 1.50);
    const noturnoReduzido = noturnoSorteado * (60 / 52.5);
    const vNoturno = noturnoReduzido * (vHora * 0.20);
    const dsrVariáveis = ((vHE50 + vNoturno) / diasUteis) * dsrDias;
    const valDia = salarioSorteado / 30;
    const descFaltas = faltasSorteadas * valDia * 2;
    const bruto = salarioSorteado + vHE50 + vNoturno + dsrVariáveis + comissaoSorteada - descFaltas;
    const inss = ENGINE_DP.calcularINSS(bruto);
    const irrf = ENGINE_DP.calcularIRRF(bruto, inss, 0);
    const liquido = bruto - inss - irrf;

    casoAtualAtivo.gabaritoResumo = { vHora, vHE50, vNoturno, dsrVariáveis, bruto, inss, irrf, liquido };

    let descricaoHTML = `<b>Nível ${nivel} — Simulação Dinâmica Gerada</b><br><br>
    Funcionário mensalista com <b>Salário Base de R$ ${formatBRL(salarioSorteado)}</b> (jornada de 220h mensais, 24 dias úteis e 6 DSR).<br>
    • Horas Extras 50% realizadas: <b>${heSorteada}h</b>.<br>
    • Horas Noturnas em relógio: <b>${noturnoSorteado}h</b>.<br>`;

    if (nivel >= 2) {
        descricaoHTML += `• Comissões recebidas no mês: <b>R$ ${formatBRL(comissaoSorteada)}</b>.<br>
        • Faltas injustificadas: <b>${faltasSorteadas} dia(s)</b> (com perda de DSR correspondente).<br>`;
    }

    descricaoHTML += `<br><i>Analise as rubricas necessárias, calcule os reflexos e preencha a sua linha de raciocínio antes de conferir.</i>`;

    document.getElementById('caso-descricao').innerHTML = descricaoHTML;
    document.getElementById('caso-resposta-usuario').value = '';
    document.getElementById('caso-gabarito').innerHTML = '<span class="text-slate-500">Clique em "Ver Gabarito & Raciocínio" após registrar sua análise.</span>';
}

function verificarAnaliseCaso() {
    const g = casoAtualAtivo.gabaritoResumo;
    document.getElementById('caso-gabarito').innerHTML = `
        <div class="text-emerald-400 font-bold">✓ Gabarito Oficial Calculado para este Cenário:</div>
        <div class="pt-2 space-y-1 text-slate-300">
            • Valor da Hora Normal: <b>R$ ${formatBRL(g.vHora)}</b><br>
            • Total HE 50%: <b>R$ ${formatBRL(g.vHE50)}</b><br>
            • Total Adicional Noturno: <b>R$ ${formatBRL(g.vNoturno)}</b><br>
            • DSR sobre Variáveis: <b>R$ ${formatBRL(g.dsrVariáveis)}</b><br>
            • Salário Bruto Estimado: <b>R$ ${formatBRL(g.bruto)}</b><br>
            • INSS Progressivo: <b>R$ ${formatBRL(g.inss)}</b><br>
            • Salário Líquido Final: <b class="text-emerald-400">R$ ${formatBRL(g.liquido)}</b>
        </div>
    `;
    showToast('Gabarito gerado com base nos números sorteados!');
}

function mudarModoCaso(modo) {
    document.getElementById('submodo-simulador').classList.add('hidden');
    document.getElementById('submodo-auditoria').classList.add('hidden');
    document.getElementById('btn-modo-simulador').className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-dark-base text-slate-400 border border-dark-border';
    document.getElementById('btn-modo-auditoria').className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-dark-base text-slate-400 border border-dark-border';

    if (modo === 'simulador') {
        document.getElementById('submodo-simulador').classList.remove('hidden');
        document.getElementById('btn-modo-simulador').className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-brand-600 text-white shadow-lg shadow-brand-600/20';
    } else {
        document.getElementById('submodo-auditoria').classList.remove('hidden');
        document.getElementById('btn-modo-auditoria').className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-600 text-white shadow-lg shadow-rose-600/20';
        carregarNovaAuditoria();
    }
}

const AUDITORIAS_BANCO = [
    {
        cenario: "Folha de Pagamento de João (Salário R$ 3.000,00 + Adicional Noturno R$ 150,00).<br>O analista calculou o INSS somando o salário e o adicional noturno, chegando a R$ 3.150,00, e aplicou a alíquota única de 12% sobre o total, sem dedução, descontando R$ 378,00 de INSS.",
        erro: "1. O INSS não é calculado por alíquota fixa linear sobre o total, e sim de forma <b>progressiva por faixas</b> aplicando a parcela a deduzir.<br>2. O valor de R$ 3.150,00 na 3ª faixa (12%) tem dedução oficial de R$ 111,40: (3.150 × 0,12) - 111,40 = R$ 266,60 (e não R$ 378,00)."
    },
    {
        cenario: "Funcionário mensalista faltou 2 dias na semana sem justificativa. No fechamento da folha, a empresa descontou apenas os 2 dias de salário correspondentes, mantendo o DSR da semana integralmente pago.",
        erro: "Incorreção em relação ao <b>Art. 6º da Lei nº 605/1949</b>. A falta injustificada gera a perda do DSR da respectiva semana, devendo a empresa descontar o dia da falta <b>mais o DSR correspondente</b>."
    }
];

function carregarNovaAuditoria() {
    const item = AUDITORIAS_BANCO[Math.floor(Math.random() * AUDITORIAS_BANCO.length)];
    document.getElementById('auditoria-cenario').innerHTML = item.cenario;
    document.getElementById('auditoria-resposta').value = '';
    document.getElementById('auditoria-feedback').innerHTML = '';
    window.auditoriaGabaritoAtual = item.erro;
}

function verificarAuditoria() {
    const feedback = document.getElementById('auditoria-feedback');
    feedback.innerHTML = `
        <div class="p-3 bg-dark-base rounded-xl border border-rose-500/30 text-rose-300 space-y-1">
            <b>Auditoria Realizada — Gabarito Oficial:</b><br>
            ${window.auditoriaGabaritoAtual}
        </div>
    `;
    showToast('Auditoria verificada!');
}

// Calculadora de Apoio — motor próprio para porcentagens e teclado
let calcDisplay = document.getElementById('calc-display');
let calcExpr = '';
let calcHist = JSON.parse(localStorage.getItem('dphub_calc_hist')) || [];

function atualizarDisplayCalc(valor = calcExpr || '0') {
    if (calcDisplay) {
        calcDisplay.innerText = valor;
        calcDisplay.scrollLeft = calcDisplay.scrollWidth;
    }
}

function calcNum(n) {
    if (calcDisplay?.innerText === 'Erro' || calcExpr === '') calcExpr = '';
    calcExpr += n;
    atualizarDisplayCalc();
}

function calcOp(op) {
    if (!calcExpr && op !== '-') return;
    if (/[+\-*/.]$/.test(calcExpr) && op !== '-') {
        calcExpr = calcExpr.slice(0, -1);
    }
    calcExpr += op;
    atualizarDisplayCalc();
}

function calcClear() {
    calcExpr = '';
    atualizarDisplayCalc();
}

function calcBack() {
    calcExpr = calcExpr.slice(0, -1);
    atualizarDisplayCalc();
}

function calcPercent() {
    if (!calcExpr || /[%+\-*/.]$/.test(calcExpr)) return;
    calcExpr += '%';
    atualizarDisplayCalc();
}

// Parser matemático seguro.
// Regra principal: 100 + 50% = 150; 100 - 50% = 50.
// Em multiplicação/divisão, 50% representa 0,50: 100 * 50% = 50.
function avaliarExpressaoCalc(expr) {
    const tokens = [];
    let i = 0;

    while (i < expr.length) {
        const ch = expr[i];
        if (ch === ' ' || ch === ',') { i++; continue; }

        if (/[0-9.]/.test(ch)) {
            let num = '';
            let dots = 0;
            while (i < expr.length && /[0-9.]/.test(expr[i])) {
                if (expr[i] === '.') dots++;
                num += expr[i++];
            }
            if (!num || dots > 1 || Number.isNaN(Number(num))) throw new Error('Número inválido');
            tokens.push({ type: 'number', value: Number(num) });
            if (expr[i] === '%') {
                tokens.push({ type: 'percent' });
                i++;
            }
            continue;
        }

        if ('+-*/()'.includes(ch)) {
            tokens.push({ type: ch });
            i++;
            continue;
        }

        if (ch === '%') {
            if (!tokens.length || tokens[tokens.length - 1].type !== 'number') throw new Error('Percentual inválido');
            tokens.push({ type: 'percent' });
            i++;
            continue;
        }

        throw new Error('Caractere inválido');
    }

    let pos = 0;

    function parseExpression() {
        let left = parseTerm();
        while (pos < tokens.length && (tokens[pos].type === '+' || tokens[pos].type === '-')) {
            const op = tokens[pos++].type;
            const rightTokenStart = pos;
            const right = parseTerm();
            const rightWasSimplePercent = tokens[rightTokenStart]?.type === 'number' &&
                tokens[rightTokenStart + 1]?.type === 'percent' &&
                (tokens[rightTokenStart + 2] == null || [')', '+', '-'].includes(tokens[rightTokenStart + 2].type));

            if (rightWasSimplePercent) {
                left = op === '+' ? left + (left * right) : left - (left * right);
            } else {
                left = op === '+' ? left + right : left - right;
            }
        }
        return left;
    }

    function parseTerm() {
        let left = parseFactor();
        while (pos < tokens.length && (tokens[pos].type === '*' || tokens[pos].type === '/')) {
            const op = tokens[pos++].type;
            const right = parseFactor();
            if (op === '*') left *= right;
            else {
                if (right === 0) throw new Error('Divisão por zero');
                left /= right;
            }
        }
        return left;
    }

    function parseFactor() {
        if (pos >= tokens.length) throw new Error('Expressão incompleta');

        if (tokens[pos].type === '-') {
            pos++;
            return -parseFactor();
        }

        if (tokens[pos].type === '+') {
            pos++;
            return parseFactor();
        }

        if (tokens[pos].type === '(') {
            pos++;
            const value = parseExpression();
            if (tokens[pos]?.type !== ')') throw new Error('Parênteses incompletos');
            pos++;
            if (tokens[pos]?.type === 'percent') {
                pos++;
                return value / 100;
            }
            return value;
        }

        if (tokens[pos].type !== 'number') throw new Error('Número esperado');

        let value = tokens[pos++].value;
        if (tokens[pos]?.type === 'percent') {
            pos++;
            value /= 100;
        }
        return value;
    }

    const result = parseExpression();
    if (pos !== tokens.length) throw new Error('Expressão inválida');
    if (!Number.isFinite(result)) throw new Error('Resultado inválido');
    return result;
}

function calcEquals() {
    try {
        if (!calcExpr) return;

        const raw = calcExpr;
        const res = avaliarExpressaoCalc(raw);
        const formatted = res.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        atualizarDisplayCalc(formatted);
        calcHist.unshift({ expr: raw, res: formatted });
        if (calcHist.length > 8) calcHist.pop();
        localStorage.setItem('dphub_calc_hist', JSON.stringify(calcHist));
        renderCalcHist();
        calcExpr = String(res);
    } catch (e) {
        atualizarDisplayCalc('Erro');
        calcExpr = '';
    }
}

function tratarTecladoCalculadora(event) {
    const alvo = event.target;
    const digitandoOutroCampo = alvo && (
        alvo.tagName === 'INPUT' ||
        alvo.tagName === 'TEXTAREA' ||
        alvo.tagName === 'SELECT'
    ) && alvo.id !== 'calc-display';

    if (digitandoOutroCampo) return;

    const key = event.key;
    if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        calcNum(key);
    } else if (key === ',' || key === '.') {
        event.preventDefault();
        calcNum('.');
    } else if (['+', '-', '*', '/'].includes(key)) {
        event.preventDefault();
        calcOp(key);
    } else if (key === '%') {
        event.preventDefault();
        calcPercent();
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calcEquals();
    } else if (key === 'Backspace') {
        event.preventDefault();
        calcBack();
    } else if (key === 'Escape' || key === 'Delete') {
        event.preventDefault();
        calcClear();
    } else if (key === '(' || key === ')') {
        event.preventDefault();
        calcExpr += key;
        atualizarDisplayCalc();
    }
}

function renderCalcHist() {
    const el = document.getElementById('calc-history-list');
    if (!el) return;
    if (calcHist.length === 0) {
        el.innerHTML = '<span class="text-slate-600 text-[10px]">Nenhuma conta feita.</span>';
        return;
    }
    el.innerHTML = calcHist.map(h =>
        `<div class="flex justify-between items-center text-slate-400 gap-3">
            <span class="truncate">${h.expr}</span>
            <span class="font-bold text-white shrink-0">${h.res}</span>
        </div>`
    ).join('');
}

function limparHistoricoCalc() {
    calcHist = [];
    localStorage.removeItem('dphub_calc_hist');
    renderCalcHist();
}

// Exercícios da Bancada — ficam na mesma tela da calculadora
const WB_EXERCICIOS = {
    folha: [
        {
            titulo: 'Folha + Hora Extra 50%',
            dados: (r) => {
                const salario = r(2600, 5200, 2);
                const he = r(4, 16, 0);
                const adicional = r(0, 1);
                return {
                    texto: `Funcionário mensalista recebe R$ ${formatBRL(salario)} e possui jornada de 220 horas mensais. Neste mês realizou ${he} horas extras com adicional de 50%. ${adicional ? 'Também recebe adicional de periculosidade de 30% sobre o salário-base.' : 'Não possui adicional especial.'} Considere 24 dias úteis e 6 DSR. Calcule o valor da hora normal, da hora extra, o total de horas extras e o DSR sobre as parcelas variáveis.`,
                    resposta: { salario, he, adicional }
                };
            }
        },
        {
            titulo: 'Folha + Adicional Noturno',
            dados: (r) => {
                const salario = r(2400, 4800, 2);
                const he = r(0, 10, 0);
                const noturno = r(12, 36, 0);
                return {
                    texto: `Funcionário mensalista recebe R$ ${formatBRL(salario)} por 220 horas mensais. Trabalhou ${noturno} horas noturnas no relógio, considerando a hora noturna reduzida de 52min30s, com adicional noturno de 20%. ${he > 0 ? `Além disso, realizou ${he} horas extras com adicional de 50%.` : 'Não realizou horas extras.'} Considere 24 dias úteis e 6 DSR. Calcule as verbas variáveis e o DSR.`,
                    resposta: { salario, he, noturno }
                };
            }
        },
        {
            titulo: 'Folha + Comissão + DSR',
            dados: (r) => {
                const salario = r(2500, 4500, 2);
                const comissao = r(400, 2200, 2);
                const he = r(3, 12, 0);
                return {
                    texto: `Funcionário mensalista recebe R$ ${formatBRL(salario)}. No mês recebeu R$ ${formatBRL(comissao)} de comissões e realizou ${he} horas extras a 50%. Considere divisor 220, 24 dias úteis e 6 DSR. Apure a hora normal, as horas extras, o DSR sobre as parcelas variáveis e o total bruto antes dos descontos.`,
                    resposta: { salario, comissao, he }
                };
            }
        }
    ],
    ferias: [
        {
            titulo: 'Férias integrais',
            dados: (r) => {
                const salario = r(2400, 5200, 2);
                const media = r(0, 700, 2);
                return {
                    texto: `Empregado possui remuneração mensal de R$ ${formatBRL(salario)} e médias de verbas variáveis de R$ ${formatBRL(media)}. Vai usufruir 30 dias de férias. Calcule a remuneração das férias, o adicional constitucional de 1/3 e o total bruto.`,
                    resposta: { salario, media, dias: 30 }
                };
            }
        },
        {
            titulo: 'Férias proporcionais',
            dados: (r) => {
                const salario = r(2200, 4800, 2);
                const media = r(0, 500, 2);
                const dias = [10, 15, 20][r(0, 2)];
                return {
                    texto: `Empregado possui remuneração de R$ ${formatBRL(salario)} e médias de R$ ${formatBRL(media)}. Para este exercício, considere ${dias} dias de férias a serem gozados. Calcule o valor dos dias de gozo, o terço constitucional e o total bruto.`,
                    resposta: { salario, media, dias }
                };
            }
        }
    ],
    rescisao: [
        {
            titulo: 'Rescisão + saldo + aviso + 13º + férias',
            dados: (r) => {
                const salario = r(2500, 5500, 2);
                const anos = r(0, 8, 0);
                const saldo = r(5, 25, 0);
                const fgts = r(4000, 30000, 2);
                return {
                    texto: `Empregado recebe R$ ${formatBRL(salario)}. Possui ${anos} ano(s) completos de vínculo para fins deste exercício, ${saldo} dias de saldo de salário e saldo de FGTS de R$ ${formatBRL(fgts)}. Para simplificação do exercício, considere 6/12 de 13º e 8/12 de férias proporcionais. Calcule saldo de salário, aviso-prévio proporcional, 13º proporcional, férias proporcionais + 1/3 e multa de 40% do FGTS.`,
                    resposta: { salario, anos, saldo, fgts }
                };
            }
        }
    ]
};

function escolherAleatorio(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function gerarExercicioBancada() {
    const grupo = WB_EXERCICIOS[abaAtivaAtual] || WB_EXERCICIOS.folha;
    const modelo = escolherAleatorio(grupo);
    const exercicio = modelo.dados((min, max, casas = 0) => {
        if (casas === 0) return Math.floor(Math.random() * (max - min + 1)) + min;
        return Number((Math.random() * (max - min) + min).toFixed(casas));
    });

    window.exercicioBancadaAtual = { ...exercicio.resposta, tipo: abaAtivaAtual };
    const area = document.getElementById('wb-exercicio');
    const titulo = document.getElementById('wb-exercicio-titulo');
    const gabarito = document.getElementById('wb-exercicio-gabarito');

    if (area) area.value = `【${modelo.titulo}】\n\n${exercicio.texto}`;
    if (titulo) titulo.innerText = 'Exercício aleatório gerado';
    if (gabarito) gabarito.innerHTML = '<span class="text-slate-500">Resolva na bancada e clique em “Conferir gabarito” quando terminar.</span>';
    localStorage.setItem('dphub_wb_exercicio', area?.value || '');
}

function conferirExercicioBancada() {
    const g = window.exercicioBancadaAtual;
    const out = document.getElementById('wb-exercicio-gabarito');
    if (!g || !out) {
        out.innerHTML = '<span class="text-amber-400">Gere um exercício aleatório para liberar o gabarito.</span>';
        return;
    }

    let html = '<div class="space-y-1">';
    if (abaAtivaAtual === 'folha') {
        const adicional = g.adicional ? g.salario * 0.30 : 0;
        const hora = (g.salario + adicional) / 220;
        const heUnit = hora * 1.50;
        const heTotal = g.he * heUnit;
        const noturno = g.noturno || 0;
        const noturnoRed = noturno * (60 / 52.5);
        const adn = noturnoRed * hora * 0.20;
        const comissao = g.comissao || 0;
        const dsr = ((heTotal + adn) / 24) * 6;
        html += `• Hora normal: <b>R$ ${formatBRL(hora)}</b><br>`;
        if (g.he != null) html += `• Hora extra 50%: <b>R$ ${formatBRL(heUnit)}</b><br>• Total HE: <b>R$ ${formatBRL(heTotal)}</b><br>`;
        if (g.noturno != null) html += `• Adicional noturno: <b>R$ ${formatBRL(adn)}</b><br>`;
        if (g.comissao != null) html += `• Comissão: <b>R$ ${formatBRL(comissao)}</b><br>`;
        html += `• DSR sobre variáveis: <b>R$ ${formatBRL(dsr)}</b>`;
    } else if (abaAtivaAtual === 'ferias') {
        const remuneracao = g.salario + g.media;
        const gozo = remuneracao / 30 * g.dias;
        const terco = gozo / 3;
        html += `• Remuneração-base: <b>R$ ${formatBRL(remuneracao)}</b><br>• Dias de gozo: <b>R$ ${formatBRL(gozo)}</b><br>• 1/3 constitucional: <b>R$ ${formatBRL(terco)}</b><br>• Total bruto: <b>R$ ${formatBRL(gozo + terco)}</b>`;
    } else if (abaAtivaAtual === 'rescisao') {
        const saldo = g.salario / 30 * g.saldo;
        const avisoDias = Math.min(90, 30 + g.anos * 3);
        const aviso = g.salario / 30 * avisoDias;
        const dec13 = g.salario / 12 * 6;
        const ferProp = g.salario / 12 * 8;
        const ferias = ferProp + ferProp / 3;
        const multa = g.fgts * 0.40;
        html += `• Saldo de salário: <b>R$ ${formatBRL(saldo)}</b><br>• Aviso-prévio (${avisoDias} dias): <b>R$ ${formatBRL(aviso)}</b><br>• 13º proporcional: <b>R$ ${formatBRL(dec13)}</b><br>• Férias + 1/3: <b>R$ ${formatBRL(ferias)}</b><br>• Multa de FGTS: <b>R$ ${formatBRL(multa)}</b>`;
    }
    html += '</div>';
    out.innerHTML = html;
    showToast('Gabarito do exercício liberado.');
}

function limparExercicioBancada() {
    const area = document.getElementById('wb-exercicio');
    if (area) area.value = '';
    const out = document.getElementById('wb-exercicio-gabarito');
    if (out) out.innerHTML = '<span class="text-slate-500">Cole um exercício do chat ou gere um novo exercício aleatório.</span>';
    window.exercicioBancadaAtual = null;
    localStorage.removeItem('dphub_wb_exercicio');
}

document.addEventListener('keydown', tratarTecladoCalculadora);

// Trilha e Docs
const MODULOS_ATUAIS = new Set(['mod1','mod2','mod3','mod4','mod5','mod6','mod7']);
const MODULOS_FUTUROS = new Set(['mod8','mod9','mod10','mod11','mod12']);

function renderTrilhaGrid() {
    const grid = document.getElementById('trilha-modulos-grid');
    if (!grid) return;
    grid.innerHTML = DATABASE_DOCS.map((doc) => {
        const isFuture = MODULOS_FUTUROS.has(doc.id);
        const isDone = modulosConcluidos.includes(doc.id);
        const status = isFuture ? 'FUTURO' : (isDone ? 'CONCLUÍDO' : 'EM ESTUDO');
        const statusClass = isFuture ? 'text-slate-500' : (isDone ? 'text-emerald-400' : 'text-brand-400');
        return `
            <div class="p-5 bg-dark-panel ${isFuture ? 'opacity-75' : 'hover:bg-dark-card'} border ${isDone ? 'border-emerald-500/40' : 'border-dark-border'} rounded-2xl space-y-3 transition-all flex flex-col justify-between shadow-lg">
                <div class="space-y-2">
                    <div class="flex justify-between items-start">
                        <span class="text-[10px] font-mono font-bold uppercase tracking-wider ${statusClass}">${doc.nivel}</span>
                        ${isFuture ? '<span class="text-[9px] font-bold text-slate-500 border border-dark-border px-2 py-0.5 rounded-md">FUTURO</span>' : `<button onclick="toggleConclusaoModulo('${doc.id}')" class="text-xs p-1 rounded-lg ${isDone ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 hover:text-slate-300'}"><i data-lucide="${isDone ? 'check-circle' : 'circle'}" class="w-4 h-4"></i></button>`}
                    </div>
                    <h4 class="font-bold text-white text-sm tracking-tight">${doc.titulo}</h4>
                    <p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">${doc.descricao}</p>
                    <span class="inline-flex text-[9px] font-bold ${isFuture ? 'text-slate-500 bg-slate-500/5' : 'text-brand-300 bg-brand-500/5'} px-2 py-1 rounded-md">${status}</span>
                </div>
                <div class="pt-3 border-t border-dark-border flex items-center justify-between">
                    <span class="text-[10px] text-slate-500 font-mono">${doc.cargo}</span>
                    <button onclick="abrirDocPorId('${doc.id}')" class="text-xs font-bold ${isFuture ? 'text-slate-400' : 'text-brand-400 hover:text-brand-300'} flex items-center gap-1">${isFuture ? 'Consultar' : 'Estudar'} <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></button>
                </div>
            </div>
        `;
    }).join('');
    atualizarProgressoTrilha();
    lucide.createIcons();
}

function toggleConclusaoModulo(id) {
    if (modulosConcluidos.includes(id)) modulosConcluidos = modulosConcluidos.filter(m => m !== id);
    else modulosConcluidos.push(id);
    localStorage.setItem('dp_modulos_concluidos', JSON.stringify(modulosConcluidos));
    renderTrilhaGrid();
}

function atualizarProgressoTrilha() {
    const concluidosAtuais = modulosConcluidos.filter(id => MODULOS_ATUAIS.has(id));
    const pct = Math.round((concluidosAtuais.length / MODULOS_ATUAIS.size) * 100);
    document.getElementById('trilha-progresso-txt').innerText = `${pct}%`;
    document.getElementById('trilha-progresso-bar').style.width = `${pct}%`;
    document.getElementById('trilha-modulos-concluidos').innerText = `${concluidosAtuais.length}/7`;
}

function abrirDocPorId(id) { switchView('docs'); const idx = DATABASE_DOCS.findIndex(d => d.id === id); if (idx !== -1) loadDoc(idx); }

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

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderTrilhaGrid();
    renderDocsMenu();
    renderCalcHist();
    calcDisplay = document.getElementById('calc-display');
    if (calcDisplay) calcDisplay.setAttribute('tabindex', '0');
    const ex = document.getElementById('wb-exercicio');
    if (ex) {
        ex.value = localStorage.getItem('dphub_wb_exercicio') || '';
        ex.addEventListener('input', () => localStorage.setItem('dphub_wb_exercicio', ex.value));
    }
    const sp = document.getElementById('hub-scratchpad');
    if (sp) {
        sp.value = localStorage.getItem('dphub_scratchpad') || '';
        sp.addEventListener('input', () => localStorage.setItem('dphub_scratchpad', sp.value));
    }
});
