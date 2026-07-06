## Objetivo
Fazer com que cada mensagem submetida no formulário da secção **Contactos** chegue automaticamente à caixa de e-mail **nairomoniques@gmail.com**, em vez de apenas mostrar "Mensagem Enviada ✓" sem gravar nada.

## Como vai funcionar (visão do utilizador)
1. Visitante preenche Nome, E-mail, Telefone (opcional), Área de Interesse e Mensagem.
2. Ao clicar em "Enviar Mensagem Segura":
   - O sistema valida os campos (e-mail correto, tamanhos mínimos/máximos, sem campos vazios).
   - Envia um e-mail formatado ao escritório com todos os dados da consulta.
   - Mostra confirmação "Mensagem Enviada ✓" e limpa o formulário.
3. Se algo falhar (rede, serviço indisponível), aparece uma mensagem de erro clara com pedido para tentar novamente ou usar o e-mail direto.

## Pré-requisitos técnicos
- **Ativar Lovable Cloud** no projeto (necessário para executar código de servidor que envia e-mails de forma segura, sem expor chaves no browser).
- **Ligar o conector Resend** (serviço de envio de e-mails transacionais confiável, com boa entregabilidade). Requer conta Resend gratuita — o utilizador autoriza pelo assistente do Lovable, sem colar chaves manualmente.
- Enquanto o domínio próprio do escritório não estiver verificado no Resend, o remetente será `onboarding@resend.dev` (padrão de teste do Resend) e o destinatário `nairomoniques@gmail.com`. Depois pode-se configurar um domínio próprio (ex: `contacto@nairomoniques.co.mz`) para o remetente ser da marca.

## O que vou implementar
1. **Server function `sendContactMessage`** (`src/lib/contact.functions.ts`)
   - Valida entrada com Zod: nome (2–100), e-mail válido (máx 255), telefone opcional (máx 30), área (uma das opções válidas), mensagem (10–2000).
   - Chama a API do Resend através do gateway do Lovable Cloud, usando `LOVABLE_API_KEY` + `RESEND_API_KEY` (injetadas automaticamente ao ligar o conector).
   - Corpo do e-mail em HTML sóbrio, com identidade da marca (dourado sobre fundo escuro), contendo todos os campos + IP/timestamp para rastreio.
   - Assunto: `[Site] Nova consulta – {Área} – {Nome}`.
   - Campo `reply_to` definido para o e-mail do visitante (basta responder para falar com ele).
   - Devolve `{ ok: true }` ou lança erro tratado.

2. **Ligar ao formulário existente** em `src/routes/index.tsx`
   - Converter os `FormField` para componentes controlados (guardar estado nome/email/telefone/area/mensagem).
   - No `onSubmit`: `useServerFn(sendContactMessage)` → toast de sucesso (via `sonner`) + estado `sent`; em caso de erro, toast de erro com sugestão de contactar por `mailto:`.
   - Adicionar estado `loading` (botão desativado + texto "A enviar…").

3. **Nada mais muda visualmente** — layout, cores, tipografia e animações permanecem exatamente como estão.

## Passos sequenciais que vou executar
1. Ativar Lovable Cloud.
2. Ligar o conector Resend (o utilizador confirmará numa janela do Lovable).
3. Criar `src/lib/contact.functions.ts` com a server function.
4. Editar `src/routes/index.tsx` (secção `Contactos` + `FormField`) para tornar o formulário controlado e ligado à server function.
5. Testar o envio real e confirmar chegada do e-mail.

## Fora do âmbito (posso fazer depois se quiser)
- Guardar histórico das mensagens numa base de dados / painel administrativo.
- Verificar domínio próprio no Resend para remetente com marca.
- Envio de e-mail automático de confirmação ao visitante.
- Proteção anti-spam (honeypot / rate-limit / captcha).
