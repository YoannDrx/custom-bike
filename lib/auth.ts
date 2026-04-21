import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, emailOTP, lastLoginMethod } from "better-auth/plugins";

import { env } from "./env";
import { sendEmail } from "./mail";
import { prisma } from "./prisma";

type SocialProvidersType = Parameters<typeof betterAuth>[0]["socialProviders"];

const SocialProviders: SocialProvidersType = {};
if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
  SocialProviders.google = {
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  };
}

const renderEmail = (title: string, body: string, cta?: { label: string; url: string }) => `
<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;background:#050709;font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#f3f4f6">
  <div style="max-width:560px;margin:0 auto;background:#0b0d12;border:1px solid rgba(255,30,110,0.25);border-radius:16px;padding:32px">
    <div style="font-family:'Bebas Neue',Impact,sans-serif;letter-spacing:0.15em;color:#ff1e6e;font-size:14px;margin-bottom:8px">CUSTOM BIKE</div>
    <h1 style="margin:0 0 16px;font-size:22px;color:#00d4ff">${title}</h1>
    <div style="font-size:15px;line-height:1.6;color:#d1d5db">${body}</div>
    ${cta ? `<div style="margin-top:28px"><a href="${cta.url}" style="display:inline-block;padding:12px 24px;background:#ff1e6e;color:#fff;text-decoration:none;border-radius:999px;font-weight:700;letter-spacing:0.05em">${cta.label}</a></div>` : ""}
    <div style="margin-top:32px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.06);font-size:12px;color:#6b7280">
      Custom Bike · 17 rue Voltaire, 93100 Montreuil · 01 48 37 66 37
    </div>
  </div>
</body></html>`;

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  trustedOrigins: [env.BETTER_AUTH_URL, env.NEXT_PUBLIC_APP_URL],
  advanced: {
    cookiePrefix: "custombike",
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    async sendResetPassword({ user, url }) {
      await sendEmail({
        to: user.email,
        subject: "Réinitialise ton mot de passe Custom Bike",
        html: renderEmail(
          "Nouveau mot de passe",
          `<p>Salut ${user.name ?? ""}, on a reçu une demande de réinitialisation. Clique sur le bouton pour en créer un nouveau.</p><p style="color:#6b7280;font-size:13px">Ignore ce message si tu n'es pas à l'origine de la demande.</p>`,
          { label: "Réinitialiser", url },
        ),
      });
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ newEmail, url }: { newEmail: string; url: string }) => {
        await sendEmail({
          to: newEmail,
          subject: "Confirme ton changement d'email",
          html: renderEmail(
            "Confirmer l'email",
            "<p>Valide ce changement d'adresse pour finaliser la mise à jour.</p>",
            { label: "Confirmer", url },
          ),
        });
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await sendEmail({
          to: user.email,
          subject: "Confirmation de suppression de compte",
          html: renderEmail(
            "Suppression de compte",
            "<p>Confirme la suppression de ton compte Custom Bike.</p>",
            { label: "Supprimer mon compte", url },
          ),
        });
      },
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Vérifie ton adresse email",
        html: renderEmail(
          "Vérifie ton email",
          `<p>Bienvenue ${user.name ?? ""} 👋</p><p>Confirme ton adresse pour activer ton compte.</p>`,
          { label: "Vérifier", url },
        ),
      });
    },
  },
  socialProviders: SocialProviders,
  plugins: [
    emailOTP({
      sendVerificationOTP: async ({ email, otp }) => {
        const { getClientIp, rateLimit } = await import("./rate-limit");
        const ip = await getClientIp();
        const ipLimit = rateLimit(`otp:ip:${ip}`, 10, 600);
        if (!ipLimit.ok) {
          throw new Error("Trop de demandes de code. Réessaie plus tard.");
        }
        const emailLimit = rateLimit(`otp:email:${email}`, 5, 600);
        if (!emailLimit.ok) {
          throw new Error("Trop de codes envoyés à cette adresse. Patiente quelques minutes.");
        }
        await sendEmail({
          to: email,
          subject: `Ton code Custom Bike : ${otp}`,
          html: renderEmail(
            "Code de connexion",
            `<p>Entre ce code pour te connecter. Il expire dans 10 minutes.</p><p style="font-family:monospace;font-size:28px;letter-spacing:0.3em;color:#00d4ff;font-weight:700">${otp}</p>`,
          ),
        });
      },
    }),
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
    lastLoginMethod({}),
    nextCookies(),
  ],
});
