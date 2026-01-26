# SAMU Infusões

Calculadora de infusões de drogas vasoativas para uso médico (SAMU 192).
Desenvolvido com foco em UX para situações de emergência ("Medical Dark Mode").

## Funcionalidades

- **Cálculo Rápido**: Conversão automática de dose (mcg/kg/min) para vazão (mL/h).
- **Protocolos SAMU**: Diluições padronizadas conforme planilha oficial.
- **Interface Otimizada**:
  - Dark Mode para evitar ofuscamento noturno.
  - Teclados numéricos otimizados.
  - Peso global para agilizar múltiplos cálculos.
- **Offline First**: PWA instalável que funciona sem internet.

## Drogas Incluídas

- Adrenalina
- Dobutamina
- Noradrenalina
- Fentanila
- Midazolam
- Nitroglicerina

## Execução sem Instalação (Standalone)

Como alternativa para ambientes restritos (onde não é possível instalar Node.js), incluímos uma versão **Standalone** que funciona apenas com um arquivo HTML.

1. Navegue até a pasta do projeto.
2. Abra o arquivo **`standalone.html`** diretamente no seu navegador (Chrome, Edge).
3. A aplicação funcionará offline com todas as funcionalidades.

## Instalação (Desenvolvimento Completo)

1. Instale [Node.js](https://nodejs.org/)
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

## Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite + PWA

