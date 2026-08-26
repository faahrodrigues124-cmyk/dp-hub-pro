// GERADOR DINÂMICO DE CASOS INTEGRADOS (NÍVEIS 1 A 4)
let casoAtualAtivo = { nivel: 1, salario: 0, he: 0, noturno: 0, comissao: 0, faltas: 0, gabaritoTexto: '', gabaritoResumo: {} };

function gerarNumeroAleatorio(min, max, decimais = 0) {
    const num = Math.random() * (max - min) + min;
    return Number(num.toFixed(decimais));
}

function carregarCasoIntegrado(nivel) {
    casoAtualAtivo.nivel = nivel;
    
    // Atualiza botões visuais
    document.querySelectorAll('[id^="btn-caso-lvl"]').forEach(b => b.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-dark-base text-slate-400 border border-dark-border');
    document.getElementById(`btn-caso-lvl${nivel}`).className = `px-3.5 py-1.5 rounded-xl text-xs font-bold bg-dark-base ${nivel === 1 ? 'text-emerald-400 border-emerald-500/40' : nivel === 2 ? 'text-cyan-400 border-cyan-500/40' : nivel === 3 ? 'text-amber-400 border-amber-500/40' : 'text-rose-400 border-rose-500/40'} border`;

    // Sorteio inteligente de parâmetros conforme o nível
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
    if (nivel >= 3) {
        // Insalubridade ou Periculosidade extra no Nível 3
    }

    // Salva no objeto ativo
    casoAtualAtivo.salario = salarioSorteado;
    casoAtualAtivo.he = heSorteada;
    casoAtualAtivo.noturno = noturnoSorteado;
    casoAtualAtivo.comissao = comissaoSorteada;
    casoAtualAtivo.faltas = faltasSorteadas;

    // Cálculo matemático do gabarito em tempo real
    const vHora = salarioSorteado / 220;
    const vHE50 = heSorteada * (vHora * 1.50);
    const noturnoReduzido = noturnoSorteado * (60 / 52.5);
    const vNoturno = noturnoReduzido * (vHora * 0.20);
    const dsrVariáveis = ((vHE50 + vNoturno) / diasUteis) * dsrDias;
    const valDia = salarioSorteado / 30;
    const descFaltas = faltasSorteadas * valDia * 2; // Falta + DSR
    const bruto = salarioSorteado + vHE50 + vNoturno + dsrVariáveis + comissaoSorteada - descFaltas;
    const inss = ENGINE_DP.calcularINSS(bruto);
    const irrf = ENGINE_DP.calcularIRRF(bruto, inss, 0);
    const liquido = bruto - inss - irrf;

    casoAtualAtivo.gabaritoResumo = { vHora, vHE50, vNoturno, dsrVariáveis, bruto, inss, irrf, liquido };

    // Monta o enunciado dinâmico
    let descricaoHTML = `<b>Nível ${nivel} — Simulação Dinâmica Gerada</b><br><br>
    Funcionário mensalista com <b>Salário Base de R$ ${formatBRL(salarioSorteado)}</b> (jornada de 220h mensais, 24 dias úteis e 6 DSR).<br>
    • Horas Extras 50% realizadas: <b>${heSorteada}h</b>.<br>
    • Horas Noturnas em relógio: <b>${noturnoSorteado}h</b>.<br>`;

    if (nivel >= 2) {
        descricaoHTML += `• Comissões recebidas no mês: <b>R$ ${formatBRL(comissaoSorteada)}</b>.<br>
        • Faltas injustificadas: <b>${faltasSorteadas} dia(s)</b> (com perda de DSR correspondente).<br>`;
    }

    descricaoHTML += `<br><i>Analise as rubricas necessárias, calcule os reflexos e preencha a sua linha de raciocínio abaixo antes de conferir.</i>`;

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
        <div class="pt-2 text-[11px] text-slate-400">Dica: Você pode copiar estes valores base e testá-los diretamente na aba de <b>Bancada de Cálculos</b> para treinar o preenchimento!</div>
    `;
    showToast('Gabarito gerado com base nos números sorteados!');
}
