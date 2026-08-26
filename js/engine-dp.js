
/**
 * Motor Central de Cálculos de Departamento Pessoal (2026)
 * Regras atualizadas: INSS Progressivo, IRRF Lei 15.270/2025, Férias, Ponto e Rescisão.
 */

const ENGINE_DP = {
    SALARIO_MINIMO_2026: 1621.00,
    DEDUCAO_SIMPLIFICADA_IRRF: 607.20,
    DEDUCAO_POR_DEPENDENTE_IRRF: 189.59,

    // Tabela INSS 2026
    calcularINSS(baseBruta) {
        if (baseBruta <= 0) return 0;
        let inss = 0;
        if (baseBruta <= 1621.00) {
            inss = baseBruta * 0.075;
        } else if (baseBruta <= 2902.84) {
            inss = (baseBruta * 0.09) - 24.32;
        } else if (baseBruta <= 4354.27) {
            inss = (baseBruta * 0.12) - 111.40;
        } else if (baseBruta <= 8475.55) {
            inss = (baseBruta * 0.14) - 198.49;
        } else {
            inss = 988.08; // Teto Máximo
        }
        return Math.max(0, Number(inss.toFixed(2)));
    },

    // Tabela IRRF 2026 com Redução Lei 15.270/2025
    calcularIRRF(rendimentoTributavel, inssDescontado, numDependentes = 0, outrasDeducoes = 0) {
        if (rendimentoTributavel <= 0) return 0;

        const deducoesLegais = inssDescontado + (numDependentes * this.DEDUCAO_POR_DEPENDENTE_IRRF) + outrasDeducoes;
        const deducaoEscolhida = Math.max(deducoesLegais, this.DEDUCAO_SIMPLIFICADA_IRRF);
        const baseCalculo = Math.max(0, rendimentoTributavel - deducaoEscolhida);

        let aliquota = 0, parcelaDeduzir = 0;
        if (baseCalculo <= 2428.80) {
            aliquota = 0; parcelaDeduzir = 0;
        } else if (baseCalculo <= 2826.65) {
            aliquota = 0.075; parcelaDeduzir = 182.16;
        } else if (baseCalculo <= 3751.05) {
            aliquota = 0.15; parcelaDeduzir = 394.16;
        } else if (baseCalculo <= 4664.68) {
            aliquota = 0.225; parcelaDeduzir = 675.49;
        } else {
            aliquota = 0.275; parcelaDeduzir = 908.73;
        }

        const impostoBruto = Math.max(0, (baseCalculo * aliquota) - parcelaDeduzir);

        // Regra de Redução 2026
        let reducao2026 = 0;
        if (rendimentoTributavel <= 5000.00) {
            reducao2026 = impostoBruto; // Isenção total
        } else if (rendimentoTributavel <= 7350.00) {
            const redCalculada = 978.62 - (0.133145 * rendimentoTributavel);
            reducao2026 = Math.max(0, Math.min(impostoBruto, redCalculada));
        }

        return Math.max(0, Number((impostoBruto - reducao2026).toFixed(2)));
    },

    // Conversão de Horas Sexagesimais (Relógio) para Centesimais (Decimais)
    converterParaDecimal(horas, minutos) {
        return Number((horas + (minutos / 60)).toFixed(4));
    },

    // Validador do Artigo 58, § 1º da CLT (Tolerância de Ponto)
    analisarToleranciaDiaria(variacoesMinutos) {
        const estourouBatida = variacoesMinutos.some(v => Math.abs(v) > 5);
        const somaTotal = variacoesMinutos.reduce((acc, curr) => acc + Math.abs(curr), 0);
        const estourouTotal = somaTotal > 10;

        return {
            tolerado: !estourouBatida && !estourouTotal,
            motivo: estourouBatida ? 'Batida individual ultrapassou 5 minutos.' : (estourouTotal ? 'Soma diária ultrapassou 10 minutos.' : 'Dentro da tolerância legal.'),
            minutosTotais: somaTotal
        };
    }
};
