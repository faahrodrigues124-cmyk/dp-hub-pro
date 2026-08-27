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

                <div class="p-4 bg-dark-base rounded-2xl border border-brand-500/30 space-y-2">
                    <span class="font-bold text-brand-300">🔗 Conexões deste Assunto na Folha:</span>
                    <p class="text-slate-400">A admissão alimenta o <b>eSocial (S-2200)</b>, define a base salarial que impactará o <b>INSS, IRRF, FGTS, Férias, 13º e Rescisão</b>, e estabelece a jornada inicial para o <b>Espelho de Ponto</b>.</p>
                </div>

                <h3 class="text-sm font-bold text-amber-400">1. Prazos Obrigatórios de Eventos do eSocial</h3>
                <ul class="list-disc pl-4 space-y-2">
                    <li><b>Evento S-2200 (Admissão):</b> Transmitir até o <i>dia imediatamente anterior</i> ao início.</li>
                    <li><b>ASO Admissional (S-2220):</b> Obrigatoriamente antes do início das atividades.</li>
                    <li><b>Anotação CTPS Digital (Art. 29 CLT):</b> Até 5 dias úteis.</li>
                </ul>
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

                <div class="p-4 bg-dark-base rounded-2xl border border-cyan-500/30 space-y-2">
                    <span class="font-bold text-cyan-300">🔗 Mapa de Relacionamento das Verbas:</span>
                    <div class="font-mono text-[11px] text-slate-300 bg-dark-panel p-3 rounded-xl border border-dark-border space-y-1">
                        <p>JORNADA / PONTO</p>
                        <p class="pl-4">↳ geram ➔ <b>Horas Extras</b> ou <b>Atrasos / Faltas</b></p>
                        <p class="pl-8">↳ impactam ➔ <b>DSR sobre HE</b> e <b>Base do INSS / IRRF / FGTS</b></p>
                    </div>
                </div>

                <h3 class="text-sm font-bold text-cyan-400">1. A Regra da Trava Dupla (Art. 58, § 1º CLT e Súmula 366 TST)</h3>
                <p>Tolerância máxima de <b>5 minutos por batida</b> e <b>10 minutos no total diário</b>. Ultrapassado, apura-se o tempo integral.</p>
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

                <div class="p-4 bg-dark-base rounded-2xl border border-purple-500/30 space-y-2">
                    <span class="font-bold text-purple-300">🔗 Conexões do Adicional Noturno:</span>
                    <div class="font-mono text-[11px] text-slate-300 bg-dark-panel p-3 rounded-xl border border-dark-border space-y-1">
                        <p>ADICIONAL NOTURNO (20%)</p>
                        <p class="pl-4">↳ exige ➔ <b>Hora Noturna Reduzida</b> (fator 1,142857)</p>
                        <p class="pl-4">↳ cumula com ➔ <b>Hora Extra Noturna</b> (Súmula 60 I)</p>
                        <p class="pl-4">↳ estende-se a ➔ <b>Prorrogação Noturna</b> após 05h (Súmula 60 II)</p>
                        <p class="pl-4">↳ gera ➔ <b>DSR sobre Noturno</b> e integra <b>Férias, 13º e Rescisão</b></p>
                    </div>
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
                <p>• <b>Periculosidade:</b> 30% sobre o Salário Base. <br>• <b>Insalubridade:</b> 10%, 20% ou 40% sobre o Salário Mínimo (R$ 1.621,00).</p>
            </div>
        `
    },
    {
        id: 'mod5',
        nivel: 'Nível 2 — Proventos & Adicionais',
        cargo: 'Assistente Pleno',
        titulo: '5. DSR (Lei 605/49) & Faltas',
        icone: 'calendar-days',
        descricao: 'Reflexo de DSR sobre variáveis (incluindo comissões) e regra de perda por falta injustificada.',
        conteudo: `
            <div class="space-y-5 text-xs leading-relaxed text-slate-300">
                <div class="flex items-center justify-between border-b border-dark-border pb-3">
                    <div>
                        <span class="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">Módulo 05</span>
                        <h2 class="text-lg font-black text-white">Descanso Semanal Remunerado e Faltas Injustificadas</h2>
                    </div>
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">Assistente Pleno</span>
                </div>
                <p>• <b>Fórmula didática de DSR sobre variáveis:</b> $(\text{HE + adicional noturno + comissões} \div \text{Dias Úteis}) \times \text{Domingos e Feriados}$. <br>• <b>Comissões:</b> o empregado comissionista tem direito à remuneração do repouso semanal e dos feriados. <br>• <b>Falta:</b> Desconta o dia e o DSR da semana correspondente (Art. 6º Lei 605/49).</p>
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
                <p>Alíquotas de 7,5%, 9%, 12% e 14% com aplicação sobre a base bruta tributável (proventos menos faltas e atrasos).</p>
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
                <p>Confronto entre Desconto Simplificado (R$ 607,20) e Deduções Legais, com aplicação da redução progressiva até R$ 7.350,00 e isenção até R$ 5.000,00.</p>
            </div>
        `
    },
    {
        id: 'mod8',
        nivel: 'Nível 3 — Encargos & Tributos',
        cargo: 'Analista Pleno',
        titulo: '8. Encargos Patronais, RAT, FAP & Simples',
        icone: 'building-2',
        descricao: 'Custo empresa: INSS Patronal (20%), FAP, Terceiros e Anexos do Simples.',
        conteudo: `
            <div class="space-y-5 text-xs leading-relaxed text-slate-300">
                <div class="flex items-center justify-between border-b border-dark-border pb-3">
                    <div>
                        <span class="text-[10px] font-mono text-brand-400 uppercase tracking-widest font-bold">Módulo 08</span>
                        <h2 class="text-lg font-black text-white">Encargos Patronais, Custo Empresa e Tributação</h2>
                    </div>
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-brand-500/10 text-brand-300 border border-brand-500/20">Analista Pleno</span>
                </div>
                <p>Composição do custo empregador: CPP (20%), RAT Ajustado (1% a 3% × FAP) e Terceiros (Sistema S), além da regra do Simples Nacional (Anexo IV vs Anexos I a III).</p>
            </div>
        `
    },
    {
        id: 'mod9',
        nivel: 'Nível 4 — Afastamentos & Previdência',
        cargo: 'Analista Pleno',
        titulo: '9. Afastamentos, Atestados & CAT (SST)',
        icone: 'heart-pulse',
        descricao: 'Regra dos 15 dias de atestado, auxílio por incapacidade e eventos S-2210/S-2240.',
        conteudo: `
            <div class="space-y-5 text-xs leading-relaxed text-slate-300">
                <div class="flex items-center justify-between border-b border-dark-border pb-3">
                    <div>
                        <span class="text-[10px] font-mono text-rose-400 uppercase tracking-widest font-bold">Módulo 09</span>
                        <h2 class="text-lg font-black text-white">Afastamentos Previdenciários, Atestados e Segurança do Trabalho</h2>
                    </div>
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20">Analista Pleno</span>
                </div>
                <p>Primeiros 15 dias pagos pela empresa, encaminhamento ao INSS a partir do 16º dia e envio de CAT (S-2210) e SST (S-2240).</p>
            </div>
        `
    },
    {
        id: 'mod10',
        nivel: 'Nível 4 — Férias & 13º Salário',
        cargo: 'Analista Pleno',
        titulo: '10. Férias CLT & Abono Pecuniário',
        icone: 'palmtree',
        descricao: 'Art. 130 CLT (proporção por faltas), 1/3 constitucional, abono isento e prazo de 2 dias.',
        conteudo: `
            <div class="space-y-5 text-xs leading-relaxed text-slate-300">
                <div class="flex items-center justify-between border-b border-dark-border pb-3">
                    <div>
                        <span class="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Módulo 10</span>
                        <h2 class="text-lg font-black text-white">Cálculo de Férias e Abono Pecuniário</h2>
                    </div>
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">Analista Pleno</span>
                </div>
                <p>Proporção de dias por faltas (Art. 130), adição de 1/3 constitucional, abono pecuniário 100% isento e pagamento até 2 dias antes do gozo.</p>
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
                <p>Demissão sem justa causa, pedido de demissão, acordo Art. 484-A, aviso proporcional e apuração isolada de INSS sobre saldo e 13º rescisório.</p>
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
                <p>Ciclo final de fechamento: envio S-1200/S-1210/S-1299, apuração na DCTFWeb, emissão do DARF Previdenciário e quitação de guias no FGTS Digital até o dia 20.</p>
            </div>
        `
    }
];
