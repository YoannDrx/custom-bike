import { Resend } from "resend";
import { env, isDev } from "./env";

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

type SendEmailParams = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export const sendEmail = async (params: SendEmailParams) => {
  const subject = isDev ? `[DEV] ${params.subject}` : params.subject;

  if (!resend) {
    console.info("[mail] Resend not configured — email not sent:", {
      to: params.to,
      subject,
    });
    return { ok: true, skipped: true };
  }

  const { error, data } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: params.to,
    subject,
    html: params.html,
    text: params.text,
    replyTo: params.replyTo ?? env.EMAIL_CONTACT,
  });

  if (error) {
    console.error("[mail] send error", error);
    return { ok: false, error };
  }

  return { ok: true, id: data?.id };
};
