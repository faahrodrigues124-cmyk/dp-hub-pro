
/**
 * Base de Conhecimento e Guias Operacionais de DP (Wiki 2026)
 */

const DATABASE_DOCS = [
    {
        id: 'inss',
        titulo: 'Tabela & Encargos de INSS (2026)',
        icone: 'shield-alert',
        conteudo: `
            <div class="space-y-4 text-xs leading-relaxed text-slate-300">
                <h2 class="text-base font-bold text-white border-b border-dark-border pb-2">Previdência Social — Tabela Progressiva 2026</h2>
                <p>O cálculo do INSS é progressivo: cada fatia do salário é tributada na respectiva faixa, aplicando-se a parcela a deduzir correspondente.</p>
                
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse border border-dark-border my-2">
                        <tr class="bg-dark-bg text-slate-400 font-semibold"><th class="p-2 border border-dark-border">Faixa Salarial</th><th class="p-2 border border-dark-border">Alíquota</th><th class="p-2 border border-dark-border">Parcela a Deduzir</th></tr>
                        <tr><td class="p-2 border border-dark-border">Até R$ 1.621,00</td><td class="p-2 border border-dark-border text-emerald-400 font-bold">7,5%</td><td class="p-2 border border-dark-border">R$ 0,00</td></tr>
                        <tr><td class="p-2 border border-dark-border">R$ 1.621,01 a R$ 2.902,84</td><td class="p-2 border border-dark-border text-emerald-400 font-bold">9,0%</td><td class="p-2 border border-dark-border">R$ 24,32</td></tr>
                        <tr><td class="p-2 border border-dark-border">R$ 2.902,85 a R$ 4.354,27</td><td class="p-2 border border-dark-border text-emerald-400 font-bold">12,0%</td><td class="p-2 border border-dark-border">R$ 111,40</td></tr>
                        <tr><td class="p-2 border border-dark-border">R$ 4.354,28 a R$ 8.475,55</td><td class="p-2 border border-dark-border text-emerald-400 font-bold">14,0%</td><td class="p-2 border border-dark-border">R$ 198,49</td></tr>
                    </table>
                </div>

                <div class="p-3 bg-dark-bg rounded-xl border border-brand-500/30 text-brand-300 font-mono">
                    Fórmula Direta: INSS = (Base de Cálculo × Alíquota da Faixa) − Parcela a Deduzir
                </div>
            </div>
        `
    },
    {
        id: 'irrf',
        titulo: 'Imposto de Renda (IRRF Lei 15.270/2025)',
        icone: 'receipt',
        conteudo: `
            <div class="space-y-4 text-xs leading-relaxed text-slate-300">
                <h2 class="text-base font-bold text-white border-b border-dark-border pb-2">Regras Oficiais do IRRF Vigentes em 2026</h2>
                
                <h3 class="font-bold text-amber-400">1. Escolha da Maior Dedução</h3>
                <p>Compara-se o <b>Desconto Simplificado Mensal (R$ 607,20)</b> com as <b>Deduções Legais (INSS + R$ 189,59 por Dependente + Pensão)</b>. Utiliza-se sempre o valor mais favorável ao trabalhador.</p>

                <h3 class="font-bold text-amber-400">2. Redução Progressiva (Lei 15.270)</h3>
                <ul class="list-disc pl-4 space-y-1 text-slate-300">
                    <li><b>Rendimentos até R$ 5.000,00:</b> Isenção integral (a redução zera o imposto apurado).</li>
                    <li><b>Rendimentos de R$ 5.000,01 a R$ 7.350,00:</b> Aplica-se a fórmula de alívio fiscal: <br><code class="text-emerald-400 font-bold">Redução = R$ 978,62 − (0,133145 × Rendimento Tributável)</code></li>
                </ul>
            </div>
        `
    },
    {
        id: 'adicionais',
        titulo: 'Periculosidade, Insalubridade & Noturno',
        icone: 'zap',
        conteudo: `
            <div class="space-y-4 text-xs leading-relaxed text-slate-300">
                <h2 class="text-base font-bold text-white border-b border-dark-border pb-2">Guia Prático de Adicionais Trabalhistas</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-3 bg-dark-bg rounded-xl border border-dark-border space-y-2">
                        <span class="font-bold text-rose-400">Periculosidade (Art. 193 CLT)</span>
                        <p>• <b>30% Fixo</b> sobre o Salário Base Contratual.</p>
                        <p>• Não possui graus.</p>
                        <p>• Integra a hora normal para fins de horas extras e noturno.</p>
                    </div>
                    <div class="p-3 bg-dark-bg rounded-xl border border-dark-border space-y-2">
                        <span class="font-bold text-amber-400">Insalubridade (Art. 192 CLT)</span>
                        <p>• <b>10%, 20% ou 40%</b> sobre o Salário Mínimo Federal (R$ 1.621,00).</p>
                        <p>• Mínimo: R$ 162,10 | Médio: R$ 324,20 | Máximo: R$ 648,40.</p>
                    </div>
                </div>

                <h3 class="font-bold text-purple-400 pt-2">Súmula 60 do TST — Prorrogação Noturna</h3>
                <p>Cumprida integralmente a jornada das 22h às 05h, as horas trabalhadas em prorrogação após as 05h da manhã continuam recebendo o adicional de 20% e a contagem da hora reduzida (fator 1,142857).</p>
            </div>
        `
    },
    {
        id: 'ponto',
        titulo: 'Folha de Ponto & Art. 58 CLT',
        icone: 'clock',
        conteudo: `
            <div class="space-y-4 text-xs leading-relaxed text-slate-300">
                <h2 class="text-base font-bold text-white border-b border-dark-border pb-2">Apuração de Ponto & Súmula 366 do TST</h2>
                <p>A lei estabelece uma <b>trava dupla</b> para a tolerância de batidas:</p>
                <ul class="list-disc pl-4 space-y-1">
                    <li><b>Limite por Batida:</b> Variação máxima de até 5 minutos.</li>
                    <li><b>Limite Diário Somado:</b> Variação máxima de até 10 minutos no total do dia.</li>
                </ul>
                <div class="p-3 bg-rose-950/20 border border-rose-500/30 rounded-xl text-rose-300">
                    <b>Atenção:</b> Se ultrapassar qualquer um dos dois limites, a tolerância inteira cai e apura-se o tempo integral (horas extras ou atraso).
                </div>
            </div>
        `
    }
];
