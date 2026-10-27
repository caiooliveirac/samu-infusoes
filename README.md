# 🚑 SAMU Infusões

![Status](https://img.shields.io/badge/Status-Active-success)
![Version](https://img.shields.io/badge/Version-1.4.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Tech](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Tailwind-bfdbfe)

> **Ferramenta de Apoio à Decisão Clínica** desenvolvida para profissionais do SAMU 192.
> Otimizada para situações críticas, permitindo cálculos precisos de vazão de drogas vasoativas em segundos.
>
> **No ar:** https://infusoes.mnrs.com.br (espelho: GitHub Pages).

---

## 🎯 Objetivo
Em situações de emergência, cada segundo conta. O **SAMU Infusões** elimina a necessidade de cálculos mentais complexos sob pressão, reduzindo drasticamente a carga cognitiva e o risco de erros de medicação durante o atendimento pré-hospitalar e transporte inter-hospitalar.

A interface foi desenhada com **UX de Alta Confiabilidade**: botões grandes, contraste otimizado para ambientes noturnos (Dark Mode nativo) e feedback visual imediato.

## ✨ Funcionalidades Principais

### 🧠 Inteligência Clínica
- **Cálculos Automáticos**: Converte instantaneamente a dose desejada (mcg/kg/min, mg/min, etc.) em vazão da bomba (mL/h).
- **Múltiplas Unidades**: Suporte nativo para lógicas complexas de infusão:
    - ⚖️ Peso-dependentes: `mcg/kg/min`, `mcg/kg/h`, `mg/kg`.
    - ⏱️ Tempo-dependentes: `mg/min`, `mcg/min` (ex: Amiodarona).
    - 💉 Dose fixa: `g/h`, `mg/dose`.
- **Validação de Segurança**:
    - Alertas visuais (bordas laranjas) quando a dose sai dos parâmetros terapêuticos seguros.
    - Badges interativos de "Min" e "Max" que preenchem automaticamente doses seguras.
    - Sem peso padrão: drogas por kg só calculam depois que o peso é informado.
    - Duração da seringa na vazão escolhida (em destaque quando acaba em menos de 1 h) e total de droga na seringa.
    - Tabela de diluições conferida por teste: concentração, ampolas e volume precisam fechar a conta.

### 📱 Experiência do Usuário (UX)
- **Busca Híbrida Inteligente**: Encontre drogas pelo nome, classe (sedativo, inotrópico) ou apelido clínico ("Tridil", "Nipride").
- **Seletor de Seringas**: Alterne rapidamente entre diluições padrão de **20mL** e **50mL** com recálculo automático.
- **Modo Frascos/Bolsas**: Cálculos separados para volumes finais de **100mL, 250mL, 500mL e 1.000mL**. A tela informa volume de estoque, volume de diluente a retirar, diluente restante e volume final; nos regimes com faixa cadastrada, a dose começa no mínimo de referência e pode ser ajustada pelo profissional.
- **Faixa e vazão basal**: Nos regimes contínuos, o modo de bolsas reaproveita faixas de referência já cadastradas para seringas, exceto onde a planilha V27 traz esquema próprio (adrenalina na bradicardia 2–10mcg/min, amiodarona 150mg/10min e manutenção 6h/18h separadas, magnésio no broncoespasmo 1,2–2g/20min); a manutenção do magnésio na eclâmpsia usa a faixa de 1–2g/h do protocolo citado. A dose começa no mínimo e a vazão basal aparece no cartão resumido quando há peso suficiente. Regimes sem faixa de referência, como a dose de ataque de fenitoína, não recebem faixa inventada.
- **Preparo de magnésio**: Manutenção em bolsa de **250mL** baseada no Manual de Gestação de Alto Risco do Ministério da Saúde (2022). O ataque de 4g/20mL permanece em seringas; não há manutenção em bolsa de 100mL, nem preparação em bolsas acima de 250mL.
- **Apresentações específicas**: Atropina permanece somente na seringa de 20mL; propofol permanece sem diluição nas seringas da referência; fentanila em bolsa mostra os volumes calculados para cada apresentação; noradrenalina em bolsa considera 4mg por ampola de 4mL a 1mg/mL.
- **Peso Global**: Defina o peso do paciente uma vez e todas as doses são ajustadas instantaneamente.
- **Instruções de Preparo Claras**: Exibe exatamente como montar a solução ("X mL de Droga + Y mL de Diluente"), evitando erros matemáticos.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as melhores práticas modernas de desenvolvimento web:

- **Core**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (Segurança de tipagem total).
- **Build Tool**: [Vite](https://vitejs.dev/) (Performance extrema).
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) (Design system consistente e responsivo).
- **Testes**: [Vitest](https://vitest.dev/) (Testes unitários robustos para lógica de cálculo).
- **PWA**: [Vite PWA](https://vite-pwa-org.netlify.app/) (Funciona 100% offline e instalável como app nativo).

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v18+)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/caiooliveirac/samu-infusoes.git

# Entre na pasta
cd samu-infusoes

# Instale as dependências
npm install
```

### Desenvolvimento
```bash
npm run dev
# O app será iniciado em http://localhost:5173
```

### Rodando os Testes
A segurança do paciente é a prioridade. Toda a lógica de cálculo é coberta por testes automatizados.
```bash
npm test
```

### Build de Produção
```bash
npm run build
# Os arquivos otimizados serão gerados na pasta /dist
```

### Publicar em produção (infusoes.mnrs.com.br)
Só de commit publicado na `main`, árvore limpa:
```bash
deploy/publish.sh
```
Builda o commit num clone limpo, envia para o magalu e troca o symlink `/var/www/infusoes/current`
(com conferência pelo `/healthz` e volta automática). Rollback: `ssh magalu bash /var/www/infusoes/rollback.sh`.

---

## 🧪 Processo de Validação
Cada alteração no código passa por validação rigorosa:
1.  **Testes de Unidade**: Verificam se a fórmula matemática `(Dose * Peso * 60) / Concentração` está exata.
2.  **Casos de Borda**: Validação de pesos nulos, doses zero e unidades especiais (`mg/min`).
3.  **Revisão Clínica**: As doses padrão e diluições seguem protocolos farmacológicos de referência.

---

## ⚠️ Aviso de segurança
**ESTE APLICATIVO É SUPORTE À DECISÃO.**
O modo Frascos/Bolsas calcula quantidades a partir da concentração selecionada e da dose prescrita pelo profissional; não escolhe indicação nem prescreve dose. Confirme apresentação, diluente, compatibilidade, volume final e protocolo institucional antes do preparo e da administração. O modo de seringas mantém os parâmetros já cadastrados e também requer conferência profissional. A referência de magnésio é o Manual de Gestação de Alto Risco do Ministério da Saúde (2022); a opção em bolsa é limitada a 250mL.

---

<p align="center">
  Feito com ❤️ para quem salva vidas.
</p>
