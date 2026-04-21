# Custom Bike

Site vitrine + boutique en ligne + dashboard admin pour Custom Bike (atelier moto à Montreuil).

**Stack** : Next.js 16 (App Router) · React 19 · Prisma 7 · Better-Auth · Stripe · Resend · Vercel Blob · Tailwind 4 · Motion. Identité visuelle GTA / Miami Vice.

---

## Démarrage

```bash
npm install
cp .env.local.example .env.local   # renseigner les clés
npm run db:push                    # pousse le schéma sur la DB Neon
npm run seed                       # seed catégories/produits/témoignages/FAQ/réalisations
npm run dev
```

App disponible sur [http://localhost:3000](http://localhost:3000).

## Variables d'environnement requises

| Variable                  | Utilité                                  |
| ------------------------- | ---------------------------------------- |
| `DATABASE_URL`            | Neon pooler (runtime)                    |
| `DATABASE_URL_UNPOOLED`   | Neon direct (migrations)                 |
| `BETTER_AUTH_SECRET`      | Clé session Better-Auth                  |
| `NEXT_PUBLIC_APP_URL`     | URL canonique (sitemap, callbacks)       |
| `STRIPE_SECRET_KEY`       | Clé serveur Stripe                       |
| `STRIPE_WEBHOOK_SECRET`   | Vérification webhook Stripe              |
| `RESEND_API_KEY`          | Emails transactionnels                   |
| `EMAIL_FROM`              | Expéditeur (ex: `Custom Bike <no-reply@custombike.fr>`) |
| `EMAIL_CONTACT`           | Destinataire des notifications admin     |
| `BLOB_READ_WRITE_TOKEN`   | Upload images admin (Vercel Blob)        |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Compte admin seed                 |

## Scripts

- `npm run dev` — dev server
- `npm run build` / `npm start` — prod
- `npm run db:push` — sync schema (dev)
- `npm run db:migrate` — crée une migration
- `npm run db:studio` — Prisma Studio
- `npm run seed` — seed DB (+ Stripe si la clé est fournie)
- `npm run lint` — eslint

## Arborescence

- `app/(site)/` — site vitrine + boutique + compte client
- `app/(auth)/` — sign-in / sign-up / forget-password / reset-password / OTP
- `app/admin/` — dashboard admin (protégé via `getRequiredAdmin`)
- `app/api/auth/[...auth]` — Better-Auth handler
- `app/api/webhooks/stripe` — webhook Stripe (création des commandes)
- `app/api/upload` — upload images admin (Vercel Blob)
- `app/actions/` — server actions (panier, checkout, admin CRUD)
- `lib/` — auth, cart, stripe, mail, env, prisma, utils
- `components/admin/` — UI dashboard
- `components/shop/` — cartes produit boutique
- `prisma/schema.prisma` — modèle complet (User, Product, Order, Realization, etc.)
- `scripts/seed.ts` — seed data crédible (LED, covering, crashbars, CarPlay…)

## Admin

1. Seed crée un user admin avec `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
2. Connecte-toi sur `/sign-in`, puis va sur `/admin`.
3. Tu peux gérer : aperçu / commandes / produits + catégories / réalisations / messages / clients / contenu éditorial / réglages.

## Stripe

Webhook à configurer côté Stripe : `POST https://<ton-domaine>/api/webhooks/stripe` (events : `checkout.session.completed`, `charge.refunded`).

En local :
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Déploiement (Vercel)

Ordre recommandé pour une première mise en prod :

### 1. Base de données (Neon)
- Crée un projet Neon, récupère `DATABASE_URL` (pooler) et `DATABASE_URL_UNPOOLED` (direct).
- Depuis un shell local pointant sur la DB prod :
  ```bash
  npx prisma migrate deploy       # applique les migrations
  npm run seed                    # crée admin + catégories + exemples
  ```

### 2. Stripe
- Crée les clés API en live mode (`STRIPE_SECRET_KEY` + `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`).
- Une fois le site déployé, crée un endpoint webhook :
  - URL : `https://<ton-domaine>/api/webhooks/stripe`
  - Events : `checkout.session.completed`, `charge.refunded`, `payment_intent.payment_failed`
  - Copie le signing secret → `STRIPE_WEBHOOK_SECRET`.

### 3. Resend
- Vérifie ton domaine sender (`custombike.fr`) → récupère `RESEND_API_KEY`.
- Renseigne `EMAIL_FROM` (ex. `Custom Bike <no-reply@custombike.fr>`) et `EMAIL_CONTACT` (inbox qui reçoit les messages formulaire).

### 4. Vercel Blob
- Dans Vercel → Storage → Create Blob Store → copier le `BLOB_READ_WRITE_TOKEN`.

### 5. Vercel
1. Pousse sur GitHub, importe le repo sur Vercel.
2. Renseigne toutes les variables d'env (voir tableau ci-dessus) **avant** le premier build.
3. Fixe `NEXT_PUBLIC_APP_URL` sur l'URL canonique (ex. `https://custombike.fr`).
4. Génère un `BETTER_AUTH_SECRET` solide : `openssl rand -base64 32`.
5. Déploie.
6. Branche le webhook Stripe (étape 2) sur l'URL déployée.
7. Vérifie `/sitemap.xml`, `/robots.txt`, et la création d'une commande test (Stripe en mode test si besoin).

### Checklist smoke-test post-déploy
- [ ] Home, boutique, réalisations, contact rendent sans erreur
- [ ] `/sign-in` OTP reçu, connexion OK
- [ ] Ajout panier → checkout Stripe → paiement test → `/commande/confirmation`
- [ ] Webhook Stripe reçu (log côté Stripe + commande créée en DB)
- [ ] Email confirmation de commande envoyé (Resend log)
- [ ] Admin `/admin` accessible après connexion avec `ADMIN_EMAIL`
- [ ] Upload image produit (Vercel Blob) fonctionne
- [ ] `/commande/annulee` s'affiche en cas d'abandon Stripe
