# SAMU Infusões (v1.3)

Calculadora de infusões de drogas vasoativas para uso médico (SAMU 192).
Desenvolvido com foco em UX para situações de emergência.

## Novidades da Versão 1.3 (Protocolo V27)
- **Base de Dados Expandida**: Suporte para 94 configurações de diluição (adulto e pediátrico).
- **Novas Unidades**: Cálculos complexos incluindo `g/h`, `mg/dose`, `mg/kg`.
- **Soft Alerts**: Alertas visuais (laranja) para doses altas, sem bloquear o uso.
- **Segurança no Preparo**: Instruções visuais claras mostrando "mL de Droga + mL de Diluente" para evitar erros com ampolas de tamanhos variados.

## Funcionalidades
- **Cálculo Rápido**: Conversão automática de dose para vazão (mL/h).
- **Interface Otimizada**:
  - Busca rápida por droga ou classe.
  - Peso global persistente.
  - Alternancia rápida entre serigas de 20ml e 50ml.
- **Offline First**:
  - `standalone.html`: Arquivo único que roda em qualquer browser sem instalação.
  - PWA: Versão React instalável.

## Drogas Suportadas (Amostra)
- Adrenalina (Padrão/Conc)
- Noradrenalina (Padrão/Conc/Ped)
- Dobutamina
- Fentanila / Midazolam
- Sulfato de Magnésio (Eclâmpsia/Bronco)
- Nitroglicerina / Nitroprussiato
- Amiodarona / Atropina

## Como Usar (Standalone)
Basta abrir o arquivo `standalone.html` em qualquer navegador (Chrome, Safari, Firefox). Não requer internet.

