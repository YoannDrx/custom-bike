const required = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const optional = (key: string): string | undefined => process.env[key] || undefined;

export const env = {
  NODE_ENV: (process.env.NODE_ENV ?? "development") as
    | "development"
    | "production"
    | "test",
  DATABASE_URL: required("DATABASE_URL"),
  NEXT_PUBLIC_APP_URL: required(
    "NEXT_PUBLIC_APP_URL",
    "http://localhost:3000",
  ),
  BETTER_AUTH_SECRET: required("BETTER_AUTH_SECRET"),
  BETTER_AUTH_URL: required(
    "BETTER_AUTH_URL",
    "http://localhost:3000",
  ),
  GOOGLE_CLIENT_ID: optional("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: optional("GOOGLE_CLIENT_SECRET"),
  STRIPE_SECRET_KEY: optional("STRIPE_SECRET_KEY"),
  STRIPE_WEBHOOK_SECRET: optional("STRIPE_WEBHOOK_SECRET"),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: optional(
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  ),
  RESEND_API_KEY: optional("RESEND_API_KEY"),
  EMAIL_FROM: process.env.EMAIL_FROM ?? "Custom Bike <noreply@custombike.fr>",
  EMAIL_CONTACT:
    process.env.EMAIL_CONTACT ?? "custombike.idf@gmail.com",
  BLOB_READ_WRITE_TOKEN: optional("BLOB_READ_WRITE_TOKEN"),
  ADMIN_EMAIL: optional("ADMIN_EMAIL"),
  ADMIN_PASSWORD: optional("ADMIN_PASSWORD"),
};

export const isProd = env.NODE_ENV === "production";
export const isDev = env.NODE_ENV === "development";
