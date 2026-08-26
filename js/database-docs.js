/**
 * Base de Conhecimento e Guias Operacionais de Departamento Pessoal (2026)
 * 9 Módulos Práticos do Assistente ao Analista
 */

const DATABASE_DOCS = [
    {
        id: 'admissao',
        titulo: '1. Admissão, Contratos & eSocial',
        icone: 'user-plus',
        conteudo: `
            <div class="space-y-4 text-xs leading-relaxed text-slate-300">
                <h2 class="text-base font-bold text-white border-b border-dark-border pb-2">Módulo 1 — Rotinas de Admissão, Modalidades de Contrato e eSocial</h2>
                
                <h3 class="text-sm font-bold text-amber-400">1. Prazos Críticos do eSocial (Eventos Não Periódicos)</h3>
                <ul class="list-disc pl-4 space-y-1.5">
                    <li><b>Evento S-2200 (Cadastramento Inicial e Admissão):</b> Deve ser enviado até o <b>dia imediatamente anterior ao início da prestação de serviços</b> (ou via S-2190 Admissão Preliminar).</li>
                    <li><b>Exame Médico Admissional (ASO - S-2220):</b> Deve ser realizado <i>antes</i> que o empregado assuma as atividades.</li>
                    <li><b>Anotação na CTPS Digital (Art. 29 da CLT):</b> O empregador tem até <b>5 dias úteis</b> a partir da admissão para prestar as informações.</li>
                </ul>

                <h3 class="text-sm font-bold text-amber-400 pt-2">2. Modalidades de Contrato de Trabalho</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div class="p-3 bg-dark-bg rounded-xl border border-dark-border space-y-1.5">
                        <span class="font-bold text-brand-300">Contrato de Experiência (Art. 445 e 451 CLT)</span>
                        <p>• Prazo máximo total: <b>90 dias</b>.</p>
                        <p>• Pode ser prorrogado <b>apenas uma única vez</b> dentro desse limite (ex: 45+45 dias ou 30+60 dias).</p>
                        <p>• Se ultrapassar 90 dias ou houver 2ª prorrogação, transforma-se automaticamente em prazo indeterminado.</p>
                    </div>
                    <div class="p-3 bg-dark-bg rounded-xl border border-dark-border space-y-1.5">
                        <span class="font-bold text-brand-300">Trabalho Intermitente (Art. 452-A CLT)</span>
                        <p>• Convocação com antecedência mínima de <b>3 dias corridos</b>.</p>
                        <p>• O empregado tem 1 dia útil para responder (o silêncio presume recusa).</p>
                        <p>• Pagamento imediato ao final de cada período de prestação: Salário + Férias proporcionais + 1/3 + 13º proporcional + DSR.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'ponto',
        titulo: '2. Jornada, Folha de Ponto & Intervalos',
        icone: 'clock',
        conteudo: `
            <div class="space-y-4 text-xs leading-relaxed text-slate-300">
                <h2 class="text-base font-bold text-white border-b border-dark-border pb-2">Módulo 2 — Gestão de Ponto, Tolerância e Intervalos CLT</h2>

                <h3 class="text-sm font-bold text-cyan-400">1. A Regra da "Trava Dupla" (Art. 58, § 1º CLT e Súmula 366 TST)</h3>
                <p>As variações de horário no registro de ponto não serão descontadas nem computadas como jornada extraordinária desde que respeitem <b>dois limites simultâneos</b>:</p>
                <div class="p-3 bg-dark-bg rounded-xl border border-cyan-500/30 text-cyan-300 space-y-1">
                    <p>• <b>Limite Individual:</b> Não exceder <b>5 minutos</b> em cada batida.</p>
                    <p>• <b>Limite Diário Total:</b> A soma das variações no dia não pode passar de <b>10 minutos</b>.</p>
                    <p class="text-rose-300 pt-1"><b>Regra de Ouro:</b> Ultrapassado qualquer um desses limites, a tolerância perde o efeito e apura-se o <b>tempo integral</b>!</p>
                </div>

                <h3 class="text-sm font-bold text-cyan-400 pt-2">2. Intervalo Intrajornada (Art. 71 CLT)</h3>
                <ul class="list-disc pl-4 space-y-1">
                    <li><b>Jornada de até 4 horas:</b> Sem intervalo obrigatório.</li>
                    <li><b>Jornada de 4 a 6 horas:</b> Intervalo obrigatório de <b>15 minutos</b>.</li>
                    <li><b>Jornada superior a 6 horas:</b> Intervalo de no mínimo <b>1 hora</b> e no máximo 2 horas.</li>
                    <li><b>Supressão parcial (§ 4º):</b> A não concessão integral acarreta o pagamento de indenização de <b>50% sobre apenas o período suprimido</b> (natureza indenizatória, sem INSS/FGTS).</li>
                </ul>

                <h3 class="text-sm font-bold text-cyan-400 pt-2">3. Intervalo Interjornada (Art. 66 CLT)</h3>
                <p>Entre duas jornadas diárias de trabalho deve haver um período mínimo de <b>11 horas consecutivas de descanso</b>.</p>
            </div>
        `
    },
    {
        id: 'noturno',
        titulo: '3. Adicional Noturno & Prorrogação',
        icone: 'moon',
        conteudo: `
            <div class="space-y-4 text-xs leading-relaxed text-slate-300">
                <h2 class="text-base font-bold text-white border-b border-dark-border pb-2">Módulo 3 — Trabalho Noturno Urbano e Súmula 60 do TST</h2>

                <h3 class="text-sm font-bold text-purple-400">1. Parâmetros Legais (Art. 73 da CLT)</h3>
                <ul class="list-disc pl-4 space-y-1.5">
                    <li><b>Horário Noturno Urbano:</b> Das <b>22h de um dia às 05h do dia seguinte</b>.</li>
                    <li><b>Percentual Legal Mínimo:</b> <b>+20%</b> sobre a hora diurna normal integrada.</li>
                    <li><b>Hora Noturna Reduzida (Ficção Legal):</b> 1 hora noturna equivale a <b>52 minutos e 30 segundos</b> ($52,5\text{ min}$).</li>
                    <li><b>Fator Multiplicador Decimal:</b> $60 \div 52,5 = \mathbf{1,142857}$. Para converter horas relógio em reduzidas: $\text{Horas Relógio} \times 1,142857$.</li>
                </ul>

                <h3 class="text-sm font-bold text-purple-400 pt-2">2. Prorrogação da Jornada Noturna (Súmula 60, II do TST)</h3>
                <div class="p-3 bg-dark-bg rounded-xl border border-purple-500/30 text-purple-300">
                    <p>Quando o trabalhador cumpre a jornada normal integralmente no período noturno (das 22h às 05h) e <b>continua trabalhando após as 05h da manhã</b>:</p>
                    <p class="font-bold pt-1">• As horas prorrogadas mantêm o direito ao adicional noturno de 20% e à contagem da hora reduzida!</p>
                </div>
            </div>
        `
    },
    {
        id: 'adicionais',
        titulo: '4. Periculosidade vs. Insalubridade',
        icone: 'zap',
        conteudo: `
            <div class="space-y-4 text-xs leading-relaxed text-slate-300">
                <h2 class="text-base font-bold text-white border-b border-dark-border pb-2">Módulo 4 — Adicionais de Periculosidade e Insalubridade</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-4 bg-dark-bg rounded-xl border border-rose-500/30 space-y-2">
                        <span class="font-bold text-rose-400 text-sm">Periculosidade (Art. 193 CLT)</span>
                        <p>• <b>Fato Gerador:</b> Contato com inflamáveis, explosivos, energia elétrica, segurança patrimonial/pessoal armada ou motocicleta.</p>
                        <p>• <b>Percentual:</b> Fixo em <b>30%</b> (não há graduação).</p>
                        <p>• <b>Base de Cálculo:</b> <b>Salário Base Contratual</b> (Súmula 191 TST).</p>
                    </div>

                    <div class="p-4 bg-dark-bg rounded-xl border border-amber-500/30 space-y-2">
                        <span class="font-bold text-amber-400 text-sm">Insalubridade (Art. 192 CLT)</span>
                        <p>• <b>Fato Gerador:</b> Exposição a agentes nocivos à saúde acima dos limites de tolerância (ruído, calor, químicos, biológicos).</p>
                        <p>• <b>Percentuais:</b> 10% (mínimo), 20% (médio) ou 40% (máximo).</p>
                        <p>• <b>Base de Cálculo:</b> <b>Salário Mínimo Federal</b> (R$ 1.621,00 em 2026).</p>
                        <p>• Valores 2026: 10% = R$ 162,10 | 20% = R$ 324,20 | 40% = R$ 648,40.</p>
                    </div>
                </div>

                <h3 class="text-sm font-bold text-brand-300 pt-2">Integração na Remuneração Horária</h3>
                <p>Tanto a insalubridade quanto a periculosidade integram o cálculo da hora normal para fins de Horas Extras e Adicional Noturno: $\text{Hora Integrada} = (\text{Salário Base} + \text{Adicional}) \div 220$.</p>
            </div>
        `
    },
    {
        id: 'dsr',
        titulo: '5. DSR (Lei 605/49) & Faltas',
        icone: 'calendar-days',
        conteudo: `
            <div class="space-y-4 text-xs leading-relaxed text-slate-300">
                <h2 class="text-base font-bold text-white border-b border-dark-border pb-2">Módulo 5 — Descanso Semanal Remunerado e Faltas Injustificadas</h2>

                <h3 class="text-sm font-bold text-amber-400">1. Fórmula do DSR sobre Horas Extras e Noturno</h3>
                <div class="p-3 bg-dark-bg rounded-xl border border-amber-500/30 font-mono text-amber-300 text-center">
                    DSR = (Total de Horas Extras e Noturno no Mês ÷ Dias Úteis) × Domingos e Feriados
                </div>
                <p class="text-[11px] text-slate-400">• Para fins de DSR, o sábado é considerado <b>dia útil</b> (segunda a sábado = úteis).</p>

                <h3 class="text-sm font-bold text-amber-400 pt-2">2. Desconto de Faltas e Perda do DSR (Art. 6º da Lei 605/49)</h3>
                <p>O trabalhador mensalista que tiver falta injustificada na semana sofre:</p>
                <ul class="list-disc pl-4 space-y-1">
                    <li>Desconto do <b>dia da falta</b> ($(\text{Salário} + \text{Adicionais}) \div 30$).</li>
                    <li>Desconto do <b>DSR da respectiva semana</b> (1 dia de descanso).</li>
                </ul>
            </div>
        `
    },
    {
        id: 'beneficios',
        titulo: '6. Benefícios & Encargos (VT e FGTS)',
        icone: 'bus',
        conteudo: `
            <div class="space-y-4 text-xs leading-relaxed text-slate-300">
                <h2 class="text-base font-bold text-white border-b border-dark-border pb-2">Módulo 6 — Vale-Transporte, Salário-Família e FGTS Digital</h2>

                <h3 class="text-sm font-bold text-emerald-400">1. Regra de Desconto do Vale-Transporte (Lei 7.418/85)</h3>
                <p>O empregador desconta <b>6% sobre o Salário Base</b> contratual, limitado ao <b>custo real das passagens</b> fornecidas no mês:</p>
                <div class="p-3 bg-dark-bg rounded-xl border border-emerald-500/30 text-emerald-300">
                    $$\text{Desconto VT} = \text{Menor valor entre } (6\% \text{ do Salário Base}) \text{ e } (\text{Custo Real das Passagens})$$
                </div>

                <h3 class="text-sm font-bold text-emerald-400 pt-2">2. FGTS Digital (8% Encargo Patronal)</h3>
                <p>• O FGTS é uma obrigação exclusiva da empresa e <b>não pode ser descontado do empregado</b>.</p>
                <p>• Alíquota geral: <b>8%</b> sobre a remuneração bruta tributável (Aprendiz: 2%).</p>
                <p>• Vencimento via FGTS Digital: até o <b>dia 20 do mês seguinte</b>.</p>
            </div>
        `
    },
    {
        id: 'inss',
        titulo: '7. Tabela & Encargos de INSS (2026)',
        icone: 'shield-alert',
        conteudo: `
            <div class="space-y-4 text-xs leading-relaxed text-slate-300">
                <h2 class="text-base font-bold text-white border-b border-dark-border pb-2">Módulo 7 — Previdência Social e Tabela Progressiva 2026</h2>
                
                <table class="w-full text-left border-collapse border border-dark-border my-2 text-xs">
                    <tr class="bg-dark-bg text-slate-400 font-semibold"><th class="p-2 border border-dark-border">Faixa Salarial (R$)</th><th class="p-2 border border-dark-border">Alíquota</th><th class="p-2 border border-dark-border">Parcela a Deduzir</th></tr>
                    <tr><td class="p-2 border border-dark-border">Até 1.621,00</td><td class="p-2 border border-dark-border text-emerald-400 font-bold">7,5%</td><td class="p-2 border border-dark-border">R$ 0,00</td></tr>
                    <tr><td class="p-2 border border-dark-border">1.621,01 a 2.902,84</td><td class="p-2 border border-dark-border text-emerald-400 font-bold">9,0%</td><td class="p-2 border border-dark-border">R$ 24,32</td></tr>
                    <tr><td class="p-2 border border-dark-border">2.902,85 a 4.354,27</td><td class="p-2 border border-dark-border text-emerald-400 font-bold">12,0%</td><td class="p-2 border border-dark-border">R$ 111,40</td></tr>
                    <tr><td class="p-2 border border-dark-border">4.354,28 a 8.475,55</td><td class="p-2 border border-dark-border text-emerald-400 font-bold">14,0%</td><td class="p-2 border border-dark-border">R$ 198,49</td></tr>
                </table>
                <p class="text-[11px] text-slate-400">• Teto Máximo de Contribuição do Empregado: <b>R$ 988,08</b>.</p>
            </div>
        `
    },
    {
        id: 'irrf',
        titulo: '8. Imposto de Renda (IRRF Lei 15.270/25)',
        icone: 'receipt',
        conteudo: `
            <div class="space-y-4 text-xs leading-relaxed text-slate-300">
                <h2 class="text-base font-bold text-white border-b border-dark-border pb-2">Módulo 8 — Apuração e Redução Progressiva do IRRF 2026</h2>

                <h3 class="text-sm font-bold text-emerald-400">1. Dedução Escolhida</h3>
                <p>Aplica-se o maior valor entre o <b>Desconto Simplificado Mensal (R$ 607,20)</b> e as <b>Deduções Legais (INSS + R$ 189,59/dependente + pensão)</b>.</p>

                <table class="w-full text-left border-collapse border border-dark-border my-2 text-xs">
                    <tr class="bg-dark-bg text-slate-400 font-semibold"><th class="p-2 border border-dark-border">Base de Cálculo (R$)</th><th class="p-2 border border-dark-border">Alíquota</th><th class="p-2 border border-dark-border">Dedução</th></tr>
                    <tr><td class="p-2 border border-dark-border">Até 2.428,80</td><td class="p-2 border border-dark-border text-emerald-400">Isento</td><td class="p-2 border border-dark-border">R$ 0,00</td></tr>
                    <tr><td class="p-2 border border-dark-border">2.428,81 a 2.826,65</td><td class="p-2 border border-dark-border text-emerald-400">7,5%</td><td class="p-2 border border-dark-border">R$ 182,16</td></tr>
                    <tr><td class="p-2 border border-dark-border">2.826,66 a 3.751,05</td><td class="p-2 border border-dark-border text-emerald-400">15,0%</td><td class="p-2 border border-dark-border">R$ 394,16</td></tr>
                    <tr><td class="p-2 border border-dark-border">3.751,06 a 4.664,68</td><td class="p-2 border border-dark-border text-emerald-400">22,5%</td><td class="p-2 border border-dark-border">R$ 675,49</td></tr>
                    <tr><td class="p-2 border border-dark-border">Acima de 4.664,68</td><td class="p-2 border border-dark-border text-emerald-400">27,5%</td><td class="p-2 border border-dark-border">R$ 908,73</td></tr>
                </table>

                <h3 class="text-sm font-bold text-emerald-400 pt-2">2. Redução Especial (Lei 15.270/2025)</h3>
                <ul class="list-disc pl-4 space-y-1">
                    <li><b>Até R$ 5.000,00 de Rendimento:</b> Isenção integral (redução anula o imposto).</li>
                    <li><b>De R$ 5.000,01 a R$ 7.350,00:</b> $\text{Redução} = 978,62 - (0,133145 \times \text{Rendimento Tributável})$.</li>
                </ul>
            </div>
        `
    },
    {
        id: 'ferias-rescisao',
        titulo: '9. Férias & Rescisão Contratual',
        icone: 'briefcase',
        conteudo: `
            <div class="space-y-4 text-xs leading-relaxed text-slate-300">
                <h2 class="text-base font-bold text-white border-b border-dark-border pb-2">Módulo 9 — Férias CLT e Fechamento de Rescisão</h2>

                <h3 class="text-sm font-bold text-cyan-400">1. Férias & Abono Pecuniário</h3>
                <p>• <b>Tabela de Proporção por Faltas (Art. 130 CLT):</b> Até 5 faltas = 30 dias | 6 a 14 faltas = 24 dias | 15 a 23 faltas = 18 dias | 24 a 32 faltas = 12 dias.</p>
                <p>• <b>Abono Pecuniário (Art. 143):</b> Conversão de até 1/3 das férias em dinheiro. <b>100% isento de INSS e IRRF!</b></p>
                <p>• <b>Prazo de Pagamento (Art. 145):</b> Até <b>2 dias antes</b> do início do gozo.</p>

                <h3 class="text-sm font-bold text-rose-400 pt-2">2. Aviso Prévio Proporcional (Lei 12.506/2011)</h3>
                <p>• Contrato inicial: <b>30 dias</b>.</p>
                <p>• Acréscimo: <b>+3 dias por cada ano completo de trabalho</b> na empresa (Teto: 90 dias com 20 anos).</p>
                <p>• <b>Tributação do 13º Rescisório:</b> O 13º salário na rescisão sofre INSS e IRRF de forma <b>isolada</b> do saldo de salário!</p>
            </div>
        `
    }
];
