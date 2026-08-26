/**
 * Base de Conhecimento e Formação em Departamento Pessoal (2026)
 * 12 Módulos Oficiais do Nível Auxiliar ao Nível Analista Sênior
 */

const DATABASE_DOCS = [
    {
        id: 'mod1',
        nivel: 'Nível 1 — Fundamentos',
        cargo: 'Auxiliar / Assistente Jr',
        titulo: '1. Admissão, Contratos & eSocial',
        icone: 'user-plus',
        descricao: 'Prazos de S-2200, Contrato de Experiência (Art. 445), Aprendiz e Trabalho Intermitente.',
        conteudo: `
            <div class="space-y-5 text-xs leading-relaxed text-slate-300">
                <div class="flex items-center justify-between border-b border-dark-border pb-3">
                    <div>
                        <span class="text-[10px] font-mono text-brand-400 uppercase tracking-widest font-bold">Módulo 01</span>
                        <h2 class="text-lg font-black text-white">Rotinas de Admissão, Tipos de Contrato e eSocial</h2>
                    </div>
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-brand-500/10 text-brand-300 border border-brand-500/20">Auxiliar de DP</span>
                </div>

                <h3 class="text-sm font-bold text-amber-400">1. Prazos Obrigatórios de Eventos do eSocial</h3>
                <ul class="list-disc pl-4 space-y-2">
                    <li><b>Evento S-2200 (Cadastramento Inicial e Admissão):</b> Deve ser transmitido <b>até o dia imediatamente anterior ao início do trabalho</b>. Caso faltem documentos, pode-se enviar o evento simplificado <b>S-2190 (Admissão Preliminar)</b>.</li>
                    <li><b>ASO Admissional (Evento S-2220):</b> Deve ser realizado <i>obrigatoriamente antes</i> do início efetivo das atividades laborais.</li>
                    <li><b>Anotação na Carteira de Trabalho Digital (Art. 29 da CLT):</b> A empresa tem o prazo improrrogável de até <b>5 dias úteis</b> após a admissão para efetuar os registros no sistema.</li>
                </ul>

                <h3 class="text-sm font-bold text-amber-400 pt-2">2. Modalidades Contratuais (CLT)</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div class="p-4 bg-dark-base rounded-2xl border border-dark-border space-y-1.5">
                        <span class="font-bold text-brand-300 text-sm">Contrato de Experiência (Art. 445 e 451)</span>
                        <p>• Prazo legal máximo: <b>90 dias</b>.</p>
                        <p>• Permite <b>uma única prorrogação</b> dentro dos 90 dias (ex: 45+45 ou 30+60 dias).</p>
                        <p>• Uma segunda prorrogação ou ultrapassar 90 dias torna o contrato por prazo indeterminado.</p>
                    </div>
                    <div class="p-4 bg-dark-base rounded-2xl border border-dark-border space-y-1.5">
                        <span class="font-bold text-brand-300 text-sm">Trabalho Intermitente (Art. 452-A)</span>
                        <p>• Convocação com no mínimo <b>3 dias corridos de antecedência</b>.</p>
                        <p>• Prazo de resposta pelo empregado: 1 dia útil.</p>
                        <p>• Ao final de cada período trabalhado, recebe de imediato: Salário + Férias proporcionais + 1/3 + 13º proporcional + DSR.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'mod2',
        nivel: 'Nível 1 — Fundamentos',
        cargo: 'Auxiliar / Assistente Jr',
        titulo: '2. Jornada, Espelho de Ponto & Art. 58',
        icone: 'clock',
        descricao: 'Conversão centesimal, tolerância legal do Art. 58 §1º da CLT e Súmula 366 do TST.',
        conteudo: `
            <div class="space-y-5 text-xs leading-relaxed text-slate-300">
                <div class="flex items-center justify-between border-b border-dark-border pb-3">
                    <div>
                        <span class="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Módulo 02</span>
                        <h2 class="text-lg font-black text-white">Apuração de Ponto, Tolerância e Conversão Centesimal</h2>
                    </div>
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">Auxiliar de DP</span>
                </div>

                <h3 class="text-sm font-bold text-cyan-400">1. A Regra da "Trava Dupla" (Art. 58, § 1º CLT e Súmula 366 TST)</h3>
                <p>As variações de horário no registro de ponto não serão descontadas nem computadas como jornada extraordinária desde que respeitem <b>dois limites simultâneos</b>:</p>
                <div class="p-4 bg-dark-base rounded-2xl border border-cyan-500/30 text-cyan-300 space-y-1.5">
                    <p>• <b>Limite Individual:</b> Não exceder <b>5 minutos</b> em cada batida isolada.</p>
                    <p>• <b>Limite Diário Somado:</b> A soma das variações no dia não pode passar de <b>10 minutos</b>.</p>
                    <p class="text-rose-300 pt-1 font-bold">⚠️ Se ultrapassar qualquer um dos dois limites, a tolerância inteira cai e apura-se o tempo integral (horas extras ou atraso)!</p>
                </div>

                <h3 class="text-sm font-bold text-cyan-400 pt-2">2. Conversão Sexagesimal (Base 60) para Centesimal (Base 100)</h3>
                <p>Para calcular folha de pagamento, minutos de relógio precisam ser convertidos em fração decimal de hora:</p>
                <div class="p-3 bg-dark-base rounded-xl font-mono text-center text-slate-200 border border-dark-border">
                    Horas Decimais = Horas Inteiras + (Minutos ÷ 60)
                </div>
            </div>
        `
    },
    {
        id: 'mod3',
        nivel: 'Nível 1 — Fundamentos',
        cargo: 'Auxiliar / Assistente Jr',
        titulo: '3. Adicional Noturno & Súmula 60 TST',
        icone: 'moon',
        descricao: 'Horário 22h-05h, hora noturna reduzida (fator 1,142857) e prorrogação noturna.',
        conteudo: `
            <div class="space-y-5 text-xs leading-relaxed text-slate-300">
                <div class="flex items-center justify-between border-b border-dark-border pb-3">
                    <div>
                        <span class="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">Módulo 03</span>
                        <h2 class="text-lg font-black text-white">Adicional Noturno Urbano e Prorrogação</h2>
                    </div>
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">Assistente de DP</span>
                </div>

                <h3 class="text-sm font-bold text-purple-400">1. Parâmetros Legais (Art. 73 da CLT)</h3>
                <ul class="list-disc pl-4 space-y-1.5">
                    <li><b>Período Noturno Urbano:</b> Das <b>22h às 05h</b> do dia seguinte.</li>
                    <li><b>Percentual Mínimo:</b> <b>+20%</b> sobre o valor da hora normal integrada.</li>
                    <li><b>Hora Reduzida (Ficção Legal):</b> 1 hora noturna equivale a <b>52 minutos e 30 segundos</b> ($52,5\text{ min}$).</li>
                    <li><b>Fator Multiplicador Decimal:</b> $60 \div 52,5 = \mathbf{1,142857}$.</li>
                </ul>

                <h3 class="text-sm font-bold text-purple-400 pt-2">2. Prorrogação da Jornada Noturna (Súmula 60, II do TST)</h3>
                <div class="p-4 bg-dark-base rounded-2xl border border-purple-500/30 text-purple-300 space-y-1">
                    <p>Quando a jornada noturna é cumprida integralmente (das 22h às 05h) e o empregado <b>estende o trabalho após as 05h da manhã</b>:</p>
                    <p class="font-bold pt-1">• As horas prorrogadas mantêm o adicional de 20% e a aplicação da hora reduzida!</p>
                </div>
            </div>
        `
    },
    {
        id: 'mod4',
        nivel: 'Nível 2 — Proventos & Adicionais',
        cargo: 'Assistente Pleno',
        titulo: '4. Periculosidade vs. Insalubridade',
        icone: 'zap',
        descricao: 'Art. 192 vs Art. 193 da CLT, bases de cálculo e integração de hora.',
        conteudo: `
            <div class="space-y-5 text-xs leading-relaxed text-slate-300">
                <div class="flex items-center justify-between border-b border-dark-border pb-3">
                    <div>
                        <span class="text-[10px] font-mono text-rose-400 uppercase tracking-widest font-bold">Módulo 04</span>
                        <h2 class="text-lg font-black text-white">Adicionais de Periculosidade e Insalubridade</h2>
                    </div>
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20">Assistente Pleno</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-4 bg-dark-base rounded-2xl border border-rose-500/30 space-y-2">
                        <span class="font-bold text-rose-400 text-sm">Periculosidade (Art. 193 CLT)</span>
                        <p>• <b>Percentual:</b> <b>30% Fixo</b> (não há graus).</p>
                        <p>• <b>Base de Cálculo:</b> <b>Salário Base Contratual</b> (sem gratificações ou prêmios).</p>
                        <p>• <b>Fato Gerador:</b> Inflamáveis, explosivos, eletricidade, vigilância armada e motocicletas.</p>
                    </div>

                    <div class="p-4 bg-dark-base rounded-2xl border border-amber-500/30 space-y-2">
                        <span class="font-bold text-amber-400 text-sm">Insalubridade (Art. 192 CLT)</span>
                        <p>• <b>Percentuais:</b> 10% (mínimo), 20% (médio) ou 40% (máximo).</p>
                        <p>• <b>Base de Cálculo:</b> <b>Salário Mínimo Federal</b> (R$ 1.621,00 em 2026).</p>
                        <p>• <b>Valores 2026:</b> 10% = R$ 162,10 | 20% = R$ 324,20 | 40% = R$ 648,40.</p>
                    </div>
                </div>

                <h3 class="text-sm font-bold text-brand-300 pt-2">Integração na Remuneração Horária</h3>
                <p>Ambos os adicionais integram a base da hora normal para fins de horas extras e adicional noturno: $\text{Hora Integrada} = (\text{Salário Base} + \text{Adicional}) \div 220$.</p>
            </div>
        `
    },
    {
        id: 'mod5',
        nivel: 'Nível 2 — Proventos & Adicionais',
        cargo: 'Assistente Pleno',
        titulo: '5. DSR (Lei 605/49) & Faltas',
        icone: 'calendar-days',
        descricao: 'Reflexo de DSR sobre variáveis e regra de perda por falta injustificada.',
        conteudo: `
            <div class="space-y-5 text-xs leading-relaxed text-slate-300">
                <div class="flex items-center justify-between border-b border-dark-border pb-3">
                    <div>
                        <span class="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">Módulo 05</span>
                        <h2 class="text-lg font-black text-white">Descanso Semanal Remunerado e Faltas Injustificadas</h2>
                    </div>
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">Assistente Pleno</span>
                </div>

                <h3 class="text-sm font-bold text-amber-400">1. Fórmula do DSR sobre Variáveis (HE, Noturno e Comissões)</h3>
                <div class="p-3 bg-dark-base rounded-xl font-mono text-center text-amber-300 border border-amber-500/30">
                    DSR = (Total das Variáveis no Mês ÷ Dias Úteis) × Domingos e Feriados
                </div>
                <p class="text-[11px] text-slate-400">• Para fins de DSR, a semana comercial considera de segunda a sábado como <b>dias úteis</b>.</p>

                <h3 class="text-sm font-bold text-amber-400 pt-2">2. Desconto de Falta e DSR Perdido (Art. 6º Lei 605/49)</h3>
                <ul class="list-disc pl-4 space-y-1.5">
                    <li>O trabalhador mensalista que tiver 1 falta injustificada na semana perde o <b>dia trabalhado</b> e também o <b>DSR da semana</b> (total de 2 dias descontados).</li>
                    <li>Faltas e atrasos <b>subtraem da base de cálculo do INSS, IRRF e FGTS</b>.</li>
                </ul>
            </div>
        `
    },
    {
        id: 'mod6',
        nivel: 'Nível 3 — Encargos & Tributos',
        cargo: 'Analista de DP Jr',
        titulo: '6. Tabela Progressiva INSS 2026',
        icone: 'shield-alert',
        descricao: 'Faixas progressivas, parcelas a deduzir, cotas e teto previdenciário.',
        conteudo: `
            <div class="space-y-5 text-xs leading-relaxed text-slate-300">
                <div class="flex items-center justify-between border-b border-dark-border pb-3">
                    <div>
                        <span class="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Módulo 06</span>
                        <h2 class="text-lg font-black text-white">Previdência Social — Tabela Progressiva de INSS 2026</h2>
                    </div>
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Analista Jr</span>
                </div>

                <table class="w-full text-left border-collapse border border-dark-border my-2 text-xs">
                    <tr class="bg-dark-base text-slate-400 font-semibold"><th class="p-2.5 border border-dark-border">Faixa Salarial (R$)</th><th class="p-2.5 border border-dark-border">Alíquota</th><th class="p-2.5 border border-dark-border">Parcela a Deduzir</th></tr>
                    <tr><td class="p-2.5 border border-dark-border">Até 1.621,00</td><td class="p-2.5 border border-dark-border text-emerald-400 font-bold">7,5%</td><td class="p-2.5 border border-dark-border font-mono">R$ 0,00</td></tr>
                    <tr><td class="p-2.5 border border-dark-border">1.621,01 a 2.902,84</td><td class="p-2.5 border border-dark-border text-emerald-400 font-bold">9,0%</td><td class="p-2.5 border border-dark-border font-mono">R$ 24,32</td></tr>
                    <tr><td class="p-2.5 border border-dark-border">2.902,85 a 4.354,27</td><td class="p-2.5 border border-dark-border text-emerald-400 font-bold">12,0%</td><td class="p-2.5 border border-dark-border font-mono">R$ 111,40</td></tr>
                    <tr><td class="p-2.5 border border-dark-border">4.354,28 a 8.475,55</td><td class="p-2.5 border border-dark-border text-emerald-400 font-bold">14,0%</td><td class="p-2.5 border border-dark-border font-mono">R$ 198,49</td></tr>
                </table>
                <p class="text-[11px] text-slate-400 font-mono">• Teto Máximo de Retenção Previdenciária: <b>R$ 988,08</b>.</p>
            </div>
        `
    },
    {
        id: 'mod7',
        nivel: 'Nível 3 — Encargos & Tributos',
        cargo: 'Analista de DP Jr',
        titulo: '7. IRRF 2026 & Redução Lei 15.270',
        icone: 'receipt',
        descricao: 'Comparativo simplificado vs deduções legais e cálculo da redução 2026.',
        conteudo: `
            <div class="space-y-5 text-xs leading-relaxed text-slate-300">
                <div class="flex items-center justify-between border-b border-dark-border pb-3">
                    <div>
                        <span class="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Módulo 07</span>
                        <h2 class="text-lg font-black text-white">Imposto de Renda Retido na Fonte (IRRF 2026)</h2>
                    </div>
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Analista Jr</span>
                </div>

                <h3 class="text-sm font-bold text-emerald-400">1. Dedução Escolhida (Mais Vantajosa)</h3>
                <p>Compara-se o <b>Desconto Simplificado Mensal (R$ 607,20)</b> com as <b>Deduções Legais (INSS + R$ 189,59/dependente + Pensão)</b>.</p>

                <h3 class="text-sm font-bold text-emerald-400 pt-2">2. Redução Progressiva (Lei 15.270/2025)</h3>
                <ul class="list-disc pl-4 space-y-1.5">
                    <li><b>Rendimentos até R$ 5.000,00:</b> Isenção total do imposto.</li>
                    <li><b>Rendimentos de R$ 5.000,01 a R$ 7.350,00:</b> Aplica-se a dedução extra: <br><code class="text-emerald-400 font-bold font-mono">Redução = R$ 978,62 − (0,133145 × Rendimento Tributável)</code></li>
                </ul>
            </div>
        `
    },
    {
        id: 'mod8',
        nivel: 'Nível 3 — Encargos & Tributos',
        cargo: 'Analista Pleno',
        titulo: '8. Encargos Patronais, RAT, FAP & Simples',
        icone: 'building-2',
        descricao: 'Custo empresa: INSS Patronal (20%), FAP ($1\% \text{ a } 3\% \times \text{FAP}$), Terceiros e Anexos do Simples.',
        conteudo: `
            <div class="space-y-5 text-xs leading-relaxed text-slate-300">
                <div class="flex items-center justify-between border-b border-dark-border pb-3">
                    <div>
                        <span class="text-[10px] font-mono text-brand-400 uppercase tracking-widest font-bold">Módulo 08</span>
                        <h2 class="text-lg font-black text-white">Encargos Patronais, Custo Empresa e Tributação</h2>
                    </div>
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-brand-500/10 text-brand-300 border border-brand-500/20">Analista Pleno</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div class="p-4 bg-dark-base rounded-2xl border border-dark-border space-y-1.5">
                        <span class="font-bold text-white">CPP Patronal</span>
                        <p class="text-brand-400 font-mono font-bold text-base">20,0%</p>
                        <p class="text-slate-400">Sobre a folha de pagamento bruta de empresas no Lucro Presumido/Real e Simples Anexo IV.</p>
                    </div>
                    <div class="p-4 bg-dark-base rounded-2xl border border-dark-border space-y-1.5">
                        <span class="font-bold text-white">RAT Ajustado</span>
                        <p class="text-amber-400 font-mono font-bold text-base">1% a 3% × FAP</p>
                        <p class="text-slate-400">Risco Ambiental do Trabalho multiplicado pelo Fator Acidentário de Prevenção (0.5000 a 2.0000).</p>
                    </div>
                    <div class="p-4 bg-dark-base rounded-2xl border border-dark-border space-y-1.5">
                        <span class="font-bold text-white">Terceiros (Sistema S)</span>
                        <p class="text-emerald-400 font-mono font-bold text-base">Até 5,8%</p>
                        <p class="text-slate-400">Recolhimento destinado a SESI/SENAI, SESC/SENAC, INCRA e SEBRAE conforme o código FPAS.</p>
                    </div>
                </div>

                <h3 class="text-sm font-bold text-brand-300 pt-2">Simples Nacional na Prática</h3>
                <p>• <b>Anexos I, II, III e V:</b> Isentos da cota patronal de 20% e Terceiros na folha (já recolhidos no DAS mensal).</p>
                <p>• <b>Anexo IV (Construção Civil, Limpeza, Vigilância, Advocacia):</b> Recolhe normalmente o INSS Patronal de 20% e RAT via DCTFWeb!</p>
            </div>
        `
    },
    {
        id: 'mod9',
        nivel: 'Nível 4 — Afastamentos & Previdência',
        cargo: 'Analista Pleno',
        titulo: '9. Afastamentos, Atestados & CAT (SST)',
        icone: 'heart-pulse',
        descricao: 'Regra dos 15 dias de atestado, auxílio por incapacidade, estabilidade e eventos S-2210/S-2240.',
        conteudo: `
            <div class="space-y-5 text-xs leading-relaxed text-slate-300">
                <div class="flex items-center justify-between border-b border-dark-border pb-3">
                    <div>
                        <span class="text-[10px] font-mono text-rose-400 uppercase tracking-widest font-bold">Módulo 09</span>
                        <h2 class="text-lg font-black text-white">Afastamentos Previdenciários, Atestados e Segurança do Trabalho</h2>
                    </div>
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20">Analista Pleno</span>
                </div>

                <h3 class="text-sm font-bold text-rose-400">1. Atestados Médicos e Encaminhamento ao INSS</h3>
                <ul class="list-disc pl-4 space-y-2">
                    <li><b>Primeiros 15 Dias de Afastamento:</b> Pagos integralmente pela empresa (com incidência normal de INSS e FGTS).</li>
                    <li><b>Do 16º Dia em Diante:</b> Suspensão do contrato para fins de salário e encaminhamento ao INSS (Auxílio por Incapacidade Temporária).</li>
                    <li><b>Soma de Atestados Fracionados (Art. 75 Decreto 3.048/99):</b> Atestados apresentados dentro de um período de <b>60 dias pelo mesmo motivo/CID</b> somam-se para fins do encaminhamento previdenciário.</li>
                </ul>

                <h3 class="text-sm font-bold text-rose-400 pt-2">2. Eventos de SST no eSocial</h3>
                <p>• <b>S-2210 (CAT - Comunicação de Acidente de Trabalho):</b> Emissão até o 1º dia útil seguinte ao acidente (ou imediatamente em caso de morte).</p>
                <p>• <b>S-2240 (Condições Ambientais do Trabalho):</b> Registro de agentes nocivos com base no LTCAT para fins de aposentadoria especial.</p>
            </div>
        `
    },
    {
        id: 'mod10',
        nivel: 'Nível 4 — Férias & 13º Salário',
        cargo: 'Analista Pleno',
        titulo: '10. Férias CLT & Abono Pecuniário',
        icone: 'palmtree',
        descricao: 'Art. 130 CLT (proporção por faltas), 1/3 constitucional, abono isento e prazo de 2 dias (Art. 145).',
        conteudo: `
            <div class="space-y-5 text-xs leading-relaxed text-slate-300">
                <div class="flex items-center justify-between border-b border-dark-border pb-3">
                    <div>
                        <span class="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Módulo 10</span>
                        <h2 class="text-lg font-black text-white">Cálculo de Férias e Abono Pecuniário</h2>
                    </div>
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">Analista Pleno</span>
                </div>

                <h3 class="text-sm font-bold text-cyan-400">1. Tabela de Proporção de Férias por Faltas (Art. 130 CLT)</h3>
                <table class="w-full text-left border-collapse border border-dark-border my-2 text-xs">
                    <tr class="bg-dark-base text-slate-400 font-semibold"><th class="p-2 border border-dark-border">Faltas Injustificadas no Período</th><th class="p-2 border border-dark-border">Dias de Férias com Direito</th></tr>
                    <tr><td class="p-2 border border-dark-border">Até 5 faltas</td><td class="p-2 border border-dark-border text-emerald-400 font-bold">30 dias</td></tr>
                    <tr><td class="p-2 border border-dark-border">6 a 14 faltas</td><td class="p-2 border border-dark-border text-emerald-400 font-bold">24 dias</td></tr>
                    <tr><td class="p-2 border border-dark-border">15 a 23 faltas</td><td class="p-2 border border-dark-border text-emerald-400 font-bold">18 dias</td></tr>
                    <tr><td class="p-2 border border-dark-border">24 a 32 faltas</td><td class="p-2 border border-dark-border text-emerald-400 font-bold">12 dias</td></tr>
                </table>

                <h3 class="text-sm font-bold text-cyan-400 pt-2">2. Regra de Isenção do Abono Pecuniário</h3>
                <p>O Abono Pecuniário (venda de 1/3 das férias) e seu respectivo $1/3$ constitucional são <b>100% isentos de encargos de INSS e IRRF</b>.</p>
            </div>
        `
    },
    {
        id: 'mod11',
        nivel: 'Nível 5 — Rescisão & Fechamento',
        cargo: 'Analista Sênior',
        titulo: '11. Rescisão Contratual & Aviso Lei 12.506',
        icone: 'door-open',
        descricao: 'Modalidades de desligamento, aviso prévio proporcional de 30 a 90 dias e tributação isolada.',
        conteudo: `
            <div class="space-y-5 text-xs leading-relaxed text-slate-300">
                <div class="flex items-center justify-between border-b border-dark-border pb-3">
                    <div>
                        <span class="text-[10px] font-mono text-rose-400 uppercase tracking-widest font-bold">Módulo 11</span>
                        <h2 class="text-lg font-black text-white">Rescisão Contratual, Projeção de Aviso e Tributação Isolada</h2>
                    </div>
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20">Analista Sênior</span>
                </div>

                <h3 class="text-sm font-bold text-rose-400">1. Aviso Prévio Proporcional (Lei 12.506/2011)</h3>
                <p>• Mínimo de <b>30 dias</b> $+ 3\text{ dias}$ por ano completo trabalhado na empresa (Teto: <b>90 dias</b>).</p>
                <p>• O aviso prévio indenizado <b>projeta a data final do contrato de trabalho</b> para a contagem de avos adicionais de $13^\circ$ e férias proporcionais.</p>

                <h3 class="text-sm font-bold text-rose-400 pt-2">2. Tributação Rescisória Isolada (Lei 8.212/91)</h3>
                <p>O <b>Saldo de Salário</b> e o <b>$13^\circ$ Salário Rescisório</b> sofrem retenção de INSS e IRRF em <b>faixas separadas</b>, sem aglutinação de bases de cálculo!</p>
            </div>
        `
    },
    {
        id: 'mod12',
        nivel: 'Nível 5 — Rescisão & Fechamento',
        cargo: 'Analista Sênior',
        titulo: '12. DCTFWeb, Fechamento & FGTS Digital',
        icone: 'check-circle-2',
        descricao: 'Fechamento do evento S-1299, transmissão da DCTFWeb, DARF Previdenciário e quitação do FGTS.',
        conteudo: `
            <div class="space-y-5 text-xs leading-relaxed text-slate-300">
                <div class="flex items-center justify-between border-b border-dark-border pb-3">
                    <div>
                        <span class="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Módulo 12</span>
                        <h2 class="text-lg font-black text-white">Fechamento Mensal, DCTFWeb e FGTS Digital</h2>
                    </div>
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Analista Sênior</span>
                </div>

                <h3 class="text-sm font-bold text-emerald-400">1. Fluxo de Fechamento Operacional de DP</h3>
                <ol class="list-decimal pl-4 space-y-2">
                    <li><b>Transmissão do Evento S-1200 (Remuneração)</b> e <b>S-1210 (Pagamentos)</b> no eSocial.</li>
                    <li><b>Transmissão do Evento S-1299 (Fechamento da Folha)</b> até o dia 15 do mês seguinte.</li>
                    <li><b>Transmissão da EFD-Reinf</b> (retenções sobre notas fiscais de serviços tomados).</li>
                    <li><b>Geração e Transmissão da DCTFWeb</b> com emissão do DARF Previdenciário Unificado (vencimento dia 20).</li>
                    <li><b>Geração da Guia do FGTS Digital</b> no portal oficial com pagamento via PIX (vencimento dia 20).</li>
                </ol>
            </div>
        `
    }
];
