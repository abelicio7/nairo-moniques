import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const AREAS = [
  "Direito Civil",
  "Direito Comercial e Societário",
  "Direito do Trabalho",
  "Direito Criminal",
  "Direito Administrativo",
  "Direito Fiscal",
  "Direito Imobiliário",
  "Direito Bancário",
  "Direito das Tecnologias",
  "Arbitragem e Mediação",
  "Outro",
] as const;

const ContactSchema = z.object({
  nome: z.string().trim().min(2, "Nome demasiado curto").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().max(30).optional().or(z.literal("")),
  area: z.enum(AREAS),
  mensagem: z.string().trim().min(10, "Mensagem demasiado curta").max(2000),
});

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ContactSchema.parse(data))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      throw new Error("Serviço de e-mail não configurado.");
    }

    const timestamp = new Date().toLocaleString("pt-PT", {
      timeZone: "Africa/Maputo",
    });

    const html = `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0F172A;font-family:Inter,Arial,sans-serif;color:#E2E8F0;">
    <div style="max-width:640px;margin:0 auto;padding:32px 24px;">
      <div style="border:1px solid rgba(212,175,55,0.35);border-radius:16px;padding:32px;background:#111827;">
        <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#D4AF37;">
          Nova consulta — Site institucional
        </div>
        <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:26px;margin:12px 0 24px;color:#F8FAFC;">
          ${escapeHtml(data.nome)}
        </h1>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#94A3B8;width:120px;">E-mail</td><td style="padding:8px 0;color:#F8FAFC;"><a href="mailto:${escapeHtml(data.email)}" style="color:#D4AF37;text-decoration:none;">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#94A3B8;">Telefone</td><td style="padding:8px 0;color:#F8FAFC;">${escapeHtml(data.telefone || "—")}</td></tr>
          <tr><td style="padding:8px 0;color:#94A3B8;">Área</td><td style="padding:8px 0;color:#F8FAFC;">${escapeHtml(data.area)}</td></tr>
          <tr><td style="padding:8px 0;color:#94A3B8;vertical-align:top;">Recebido</td><td style="padding:8px 0;color:#F8FAFC;">${escapeHtml(timestamp)} (Maputo)</td></tr>
        </table>
        <div style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(212,175,55,0.2);">
          <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#D4AF37;margin-bottom:10px;">Mensagem</div>
          <div style="white-space:pre-wrap;line-height:1.6;color:#F1F5F9;">${escapeHtml(data.mensagem)}</div>
        </div>
        <p style="margin-top:28px;font-size:11px;color:#64748B;">
          Para responder, basta usar o botão "Responder" — o destinatário será ${escapeHtml(data.email)}.
        </p>
      </div>
      <p style="text-align:center;font-size:11px;color:#475569;margin-top:16px;">
        Nairo Moniques — Advogados e Consultores · Maputo, Moçambique
      </p>
    </div>
  </body>
</html>`.trim();

    const text = [
      `Nova consulta — Site institucional`,
      `Nome: ${data.nome}`,
      `E-mail: ${data.email}`,
      `Telefone: ${data.telefone || "—"}`,
      `Área: ${data.area}`,
      `Recebido: ${timestamp} (Maputo)`,
      ``,
      `Mensagem:`,
      data.mensagem,
    ].join("\n");

    const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "Nairo Moniques – Site <onboarding@resend.dev>",
        to: ["nairomoniques@gmail.com"],
        reply_to: data.email,
        subject: `[Site] Nova consulta – ${data.area} – ${data.nome}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Resend send failed [${res.status}]: ${body}`);
      throw new Error("Falha no envio. Tente novamente em instantes.");
    }

    return { ok: true };
  });
