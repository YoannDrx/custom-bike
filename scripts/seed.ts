/* eslint-disable no-console */
import { config } from "dotenv";
import Stripe from "stripe";

import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

config({ path: ".env.local" });
config({ path: ".env" });

const connectionString =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey, { typescript: true }) : null;

type SeedProduct = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  priceCents: number;
  compareAtCents?: number;
  categorySlug: string;
  stock: number;
  featured?: boolean;
  trackStock?: boolean;
  images: string[];
  variants?: { name: string; priceCents?: number; stock: number }[];
};

const categories = [
  { slug: "feux-led", name: "Feux LED & signature lumineuse", description: "Logos LED, feux additionnels, clignotants séquentiels, kits longue portée.", position: 1 },
  { slug: "covering", name: "Covering & décoration", description: "Wraps, flammes, adhésifs sur mesure posés à l'atelier.", position: 2 },
  { slug: "protections", name: "Protections & sabots", description: "Crashbars, sliders, sabots moteur, pare-carters.", position: 3 },
  { slug: "connectivite", name: "Connectivité & électronique", description: "CarPlay, supports Quad Lock, dashcams, chargeurs USB.", position: 4 },
  { slug: "sellerie", name: "Sellerie & confort", description: "Selles refaites, chauffe-poignées, confort premium.", position: 5 },
  { slug: "echappement", name: "Échappement", description: "Silencieux Akrapovic, sorties slip-on homologuées.", position: 6 },
  { slug: "carenage", name: "Carénage & bulles", description: "Bulles, saute-vent, caches latéraux, carénage sur mesure.", position: 7 },
  { slug: "bagagerie", name: "Bagagerie & rangement", description: "Top-cases, sacoches cavalières, fixations.", position: 8 },
];

const products: SeedProduct[] = [
  {
    slug: "logo-led-reservoir",
    name: "Logo LED réservoir sur mesure",
    tagline: "Signature lumineuse au nom du rider, découpe laser.",
    description:
      "Logo LED découpé sur mesure, pose propre sur réservoir ou carénage. Éclairage uniforme, connectique intégrée, finition studio. Prix incluant découpe, branchement et pose atelier.",
    priceCents: 24900,
    compareAtCents: 29900,
    categorySlug: "feux-led",
    stock: 8,
    featured: true,
    images: ["/media/goldwing-led.jpg"],
  },
  {
    slug: "feu-led-additionnel",
    name: "Feux LED additionnels premium",
    tagline: "Kit longue portée 2 × 40W, visibilité maximale.",
    description:
      "Paire de projecteurs LED 40W avec support alu, faisceau câblé fusible. Installation soignée atelier.",
    priceCents: 18900,
    categorySlug: "feux-led",
    stock: 12,
    images: ["/media/bmw-rt-led.jpg"],
    variants: [
      { name: "Blanc 6000K", priceCents: 18900, stock: 12 },
      { name: "Jaune 3000K", priceCents: 18900, stock: 6 },
    ],
  },
  {
    slug: "clignotants-led-sequentiels",
    name: "Clignotants LED séquentiels",
    tagline: "Défilement fluide, homologués CE, pose 30 min.",
    description:
      "Set de 4 clignotants LED à défilement, homologués, boîtier résine. Pose comprise pour les machines courantes.",
    priceCents: 12900,
    categorySlug: "feux-led",
    stock: 20,
    images: ["/media/tiktok-yamaha-led.jpg"],
  },
  {
    slug: "covering-total-carenage",
    name: "Covering total carénage",
    tagline: "Wrap avec pose premium, au mètre carré.",
    description:
      "Film 3M/Avery au choix, préparation surface, pose à la thermique. Tarif forfait catégorie moyenne (sportives, GT, roadster).",
    priceCents: 49000,
    categorySlug: "covering",
    stock: 5,
    featured: true,
    images: ["/media/covering-gs.jpg"],
    variants: [
      { name: "Moyenne cylindrée", priceCents: 49000, stock: 5 },
      { name: "Grosse cylindrée / GT", priceCents: 69000, stock: 3 },
    ],
  },
  {
    slug: "flammes-vice-kit",
    name: "Kit flammes Vice",
    tagline: "Flammes holographiques découpées, signature GTA.",
    description:
      "Kit adhésifs premium découpe plotter, look street racing. Livré avec tutoriel pose.",
    priceCents: 5900,
    categorySlug: "covering",
    stock: 35,
    images: ["/media/tiktok-avant-apres.jpg"],
  },
  {
    slug: "crashbars-moteur",
    name: "Crashbars moteur",
    tagline: "Protection tubulaire acier, peinture noir satin.",
    description:
      "Barres de protection moteur, montage sur points fixes constructeur. Tubes Ø 25 mm acier E235.",
    priceCents: 24900,
    categorySlug: "protections",
    stock: 10,
    images: ["/media/honda-integra.jpg"],
    variants: [
      { name: "Noir satin", stock: 10 },
      { name: "Chrome", priceCents: 28900, stock: 4 },
    ],
  },
  {
    slug: "sliders-cadre",
    name: "Sliders cadre anti-chute",
    tagline: "Protection en chute basse, nylon renforcé.",
    description:
      "Paire de sliders universels, fixation sur visserie cadre. Pose simple, conçus pour absorber une chute basse à l'arrêt.",
    priceCents: 7900,
    categorySlug: "protections",
    stock: 18,
    images: ["/media/tracer-gta.jpeg"],
  },
  {
    slug: "carplay-sans-fil",
    name: "Module CarPlay sans fil",
    tagline: "Navigation, musique, appels — intégration atelier.",
    description:
      "Boîtier CarPlay intégré au tableau de bord OEM. Compatible avec la plupart des GT et trail modernes. Installation et calibration incluses.",
    priceCents: 39900,
    compareAtCents: 44900,
    categorySlug: "connectivite",
    stock: 6,
    featured: true,
    images: ["/media/tiktok-overview.jpg"],
  },
  {
    slug: "support-quad-lock",
    name: "Support Quad Lock + chargeur",
    tagline: "Tête universelle, USB-C atelier câblé propre.",
    description:
      "Support téléphone Quad Lock monté sur guidon ou potence, avec prise USB-C intégrée au faisceau.",
    priceCents: 12900,
    categorySlug: "connectivite",
    stock: 15,
    images: ["/media/tiktok-msport.jpg"],
  },
  {
    slug: "dashcam-moto",
    name: "Dashcam moto 4K avant/arrière",
    tagline: "Double canal, étanche IP67, app mobile.",
    description:
      "Caméra embarquée moto 4K avant / 1080p arrière, carte 128 Go fournie. Pose atelier incluse.",
    priceCents: 34900,
    categorySlug: "connectivite",
    stock: 7,
    images: ["/media/tiktok-rt-black.jpg"],
  },
  {
    slug: "sellerie-gel-confort",
    name: "Sellerie gel confort",
    tagline: "Remousse gel, finition cuir ou alcantara.",
    description:
      "Refonte de selle avec mousse haute densité + insert gel. Finition au choix : cuir nappa ou alcantara perforé.",
    priceCents: 29900,
    categorySlug: "sellerie",
    stock: 4,
    images: ["/media/hero-bmw.jpg"],
    variants: [
      { name: "Cuir nappa noir", priceCents: 29900, stock: 4 },
      { name: "Alcantara perforé", priceCents: 34900, stock: 3 },
    ],
  },
  {
    slug: "echappement-akrapovic-slip-on",
    name: "Akrapovic slip-on titane",
    tagline: "Silencieux titane homologué, sonorité racing.",
    description:
      "Silencieux Akrapovic slip-on titane pour TMAX et supersportives sélectionnées. Allègement et sonorité racing homologuée.",
    priceCents: 79900,
    categorySlug: "echappement",
    stock: 3,
    featured: true,
    images: ["/media/akrapovic-tmax-gta.jpeg", "/media/tmax-gta.png"],
  },
  {
    slug: "pack-vice-full-wrap",
    name: "Pack Vice full wrap",
    tagline: "Covering total + logo LED + flammes, offre atelier.",
    description:
      "Pack signature Custom Bike : covering total + logo LED sur réservoir + kit flammes Vice. Rendez-vous atelier 2 jours.",
    priceCents: 89000,
    compareAtCents: 99900,
    categorySlug: "covering",
    stock: 2,
    featured: true,
    images: ["/media/bike1-gta.jpg", "/media/bike2-gta.jpg"],
  },
  {
    slug: "diagnostic-express",
    name: "Forfait diagnostic express",
    tagline: "1h d'atelier pour trouver la panne.",
    description:
      "Diagnostic rapide multi-marques : lecture OBD, tests composants, compte rendu et devis. Non remboursable mais déductible si la réparation est confiée à l'atelier.",
    priceCents: 8900,
    categorySlug: "connectivite",
    stock: 99,
    trackStock: false as unknown as boolean,
    images: ["/media/tiktok-rt-black.jpg"],
  },
  {
    slug: "bon-cadeau-100",
    name: "Carte cadeau 100 €",
    tagline: "Pour offrir un geste atelier à un rider.",
    description:
      "Carte cadeau valable 1 an sur toutes les prestations atelier et accessoires Custom Bike.",
    priceCents: 10000,
    categorySlug: "connectivite",
    stock: 999,
    images: ["/media/custombike-logo.jpg"],
    variants: [
      { name: "50 €", priceCents: 5000, stock: 999 },
      { name: "100 €", priceCents: 10000, stock: 999 },
      { name: "250 €", priceCents: 25000, stock: 999 },
    ],
  },
  {
    slug: "kit-feux-route-led",
    name: "Kit feux de route LED longue portée",
    tagline: "2 × 60W, faisceau 300m, alu anodisé.",
    description:
      "Paire de projecteurs LED 60W longue portée avec support universel, câblage relais + fusible inclus. Idéal trail, GT et routières nocturnes.",
    priceCents: 22900,
    compareAtCents: 27900,
    categorySlug: "feux-led",
    stock: 9,
    images: ["/media/bmw-rt-led.jpg"],
    variants: [
      { name: "Support guidon", stock: 9 },
      { name: "Support crashbar", priceCents: 24900, stock: 5 },
    ],
  },
  {
    slug: "mini-clignotants-led",
    name: "Mini clignotants LED CE",
    tagline: "Format discret, homologués route, pose universelle.",
    description:
      "Paire de mini clignotants LED ultra compacts, corps alu noir, lentille fumée. Homologués CE, compatibles relais LED. Vendus à la paire.",
    priceCents: 4900,
    categorySlug: "feux-led",
    stock: 28,
    images: ["/media/tiktok-yamaha-led.jpg"],
    variants: [
      { name: "Lentille fumée", stock: 28 },
      { name: "Lentille transparente", stock: 22 },
    ],
  },
  {
    slug: "feu-stop-led-dynamique",
    name: "Feu stop LED dynamique",
    tagline: "Signature allumage progressif + clignotants intégrés.",
    description:
      "Feu arrière LED avec signature dynamique à l'allumage et clignotants séquentiels intégrés. Plug and play sur nombreuses machines.",
    priceCents: 9900,
    categorySlug: "feux-led",
    stock: 14,
    images: ["/media/tiktok-rt-black.jpg"],
  },
  {
    slug: "rubans-led-sous-caisse",
    name: "Rubans LED sous-caisse RGB",
    tagline: "Kit 4 bandes, contrôle via app, 16M couleurs.",
    description:
      "Kit de 4 bandes LED RGB étanches IP68 pour moto/scooter. Contrôleur Bluetooth, pilotage via application mobile. Pose atelier conseillée.",
    priceCents: 11900,
    categorySlug: "feux-led",
    stock: 16,
    images: ["/media/tmax-gta.png"],
  },
  {
    slug: "sabot-moteur-alu",
    name: "Sabot moteur aluminium",
    tagline: "Protection carter, alu 4 mm, noir texturé.",
    description:
      "Sabot moteur en aluminium 4mm, finition noir texturé. Protection renforcée du carter et du circuit de refroidissement. Fixations inox inclues.",
    priceCents: 18900,
    categorySlug: "protections",
    stock: 12,
    images: ["/media/honda-integra.jpg"],
    variants: [
      { name: "Noir texturé", stock: 12 },
      { name: "Alu brut", priceCents: 17900, stock: 7 },
    ],
  },
  {
    slug: "sabot-moteur-carbone",
    name: "Sabot moteur carbone",
    tagline: "Look racing, fibre de carbone vernis UV.",
    description:
      "Sabot moteur fibre de carbone tissage 2×2, vernis UV haute résistance. Ultra léger, style racing assumé.",
    priceCents: 34900,
    categorySlug: "protections",
    stock: 5,
    featured: true,
    images: ["/media/tracer-gta.jpeg"],
  },
  {
    slug: "pare-mains-trail",
    name: "Pare-mains trail renforcés",
    tagline: "Barres alu + coques ABS, look aventure.",
    description:
      "Paire de pare-mains avec barres aluminium et coques ABS. Protection contre branches, vent et chutes basses. Montage sur leviers.",
    priceCents: 7900,
    categorySlug: "protections",
    stock: 16,
    images: ["/media/hero-bmw.jpg"],
    variants: [
      { name: "Noir", stock: 16 },
      { name: "Orange", stock: 8 },
    ],
  },
  {
    slug: "chauffe-poignees",
    name: "Chauffe-poignées 5 niveaux",
    tagline: "Câblage propre, commande au guidon, universel.",
    description:
      "Kit chauffe-poignées universel avec 5 niveaux de chauffe et commande lumineuse au guidon. Coupure batterie basse automatique. Pose atelier 1h30.",
    priceCents: 8900,
    categorySlug: "sellerie",
    stock: 22,
    images: ["/media/tiktok-msport.jpg"],
  },
  {
    slug: "bulle-saute-vent-sport",
    name: "Bulle saute-vent sport fumée",
    tagline: "Double bulle polycarbonate, traitement anti-rayures.",
    description:
      "Bulle sportive double courbure en polycarbonate teinté, traitement anti-rayure. Améliore la protection aéro sans casser la ligne.",
    priceCents: 14900,
    categorySlug: "carenage",
    stock: 10,
    images: ["/media/bike1-gta.jpg"],
    variants: [
      { name: "Fumée", stock: 10 },
      { name: "Noire opaque", stock: 5 },
      { name: "Iridium", priceCents: 17900, stock: 4 },
    ],
  },
  {
    slug: "top-case-45l",
    name: "Top-case 45L + platine",
    tagline: "2 casques intégraux, serrure à clé unique.",
    description:
      "Top-case 45 litres, capacité 2 casques intégraux, serrure sécurité à clé unique. Platine spécifique fournie selon modèle.",
    priceCents: 24900,
    categorySlug: "bagagerie",
    stock: 7,
    images: ["/media/tiktok-overview.jpg"],
    variants: [
      { name: "Noir", stock: 7 },
      { name: "Noir + dosseret", priceCents: 27900, stock: 4 },
    ],
  },
  {
    slug: "sacoche-reservoir-magnetique",
    name: "Sacoche réservoir magnétique",
    tagline: "12L extensible, poche smartphone étanche.",
    description:
      "Sacoche réservoir 12L extensible, fixation magnétique ou sangles selon modèle. Poche smartphone étanche avec accès tactile.",
    priceCents: 8900,
    categorySlug: "bagagerie",
    stock: 14,
    images: ["/media/tiktok-avant-apres.jpg"],
  },
  {
    slug: "repose-pieds-racing",
    name: "Repose-pieds racing réglables",
    tagline: "Alu CNC, grip renforcé, 8 positions.",
    description:
      "Paire de repose-pieds usinés CNC aluminium, grip dents de loup, 8 positions réglables. Compatibilité majorité des sportives.",
    priceCents: 13900,
    categorySlug: "protections",
    stock: 9,
    images: ["/media/akrapovic-tmax-gta.jpeg"],
    variants: [
      { name: "Noir", stock: 9 },
      { name: "Or anodisé", priceCents: 15900, stock: 4 },
      { name: "Rouge anodisé", priceCents: 15900, stock: 3 },
    ],
  },
  {
    slug: "leve-bequille-paddock",
    name: "Lève-béquille paddock avant + arrière",
    tagline: "Paire, charge 300 kg, caoutchoucs protégés.",
    description:
      "Paire de lève-béquilles paddock (avant fourche + arrière bras oscillant). Charge 300 kg, caoutchoucs de protection. Indispensable atelier.",
    priceCents: 12900,
    categorySlug: "bagagerie",
    stock: 6,
    images: ["/media/covering-gs.jpg"],
  },
  {
    slug: "kit-hazard-flasher",
    name: "Kit hazard / flashing lights d'urgence",
    tagline: "Module 4 clignotants simultanés, câblage plug and play.",
    description:
      "Module électronique permettant d'activer les 4 clignotants simultanément (warning) + mode flashing d'urgence haute visibilité. Relais intégré.",
    priceCents: 6900,
    categorySlug: "feux-led",
    stock: 18,
    images: ["/media/bike2-gta.jpg"],
  },
  {
    slug: "chargeur-usb-guidon",
    name: "Chargeur USB-C double 45W guidon",
    tagline: "Double port, étanche, charge rapide PD.",
    description:
      "Chargeur double USB-C/USB-A 45W Power Delivery, étanche IP67. Fixation guidon Ø 22-32 mm. Câblage direct batterie avec fusible inclus.",
    priceCents: 4900,
    categorySlug: "connectivite",
    stock: 24,
    images: ["/media/tiktok-msport.jpg"],
  },
];

const testimonials = [
  { author: "Julien M.", bike: "BMW R 1250 RT", content: "Logo LED sur la RT, un travail d'horloger. Résultat exactement comme sur la photo.", rating: 5, position: 1 },
  { author: "Sofiane K.", bike: "Yamaha TMAX 560", content: "Slip-on Akrapovic + flammes Vice, le TMAX est méconnaissable. Rapide, propre.", rating: 5, position: 2 },
  { author: "Alex D.", bike: "Honda Goldwing", content: "Dashcam et CarPlay posés en une journée, plus aucun faisceau qui traîne. Du sérieux.", rating: 5, position: 3 },
  { author: "Camille R.", bike: "Suzuki GSX-S1000", content: "Covering complet en 48h, le rendu est fou. Équipe super à l'écoute.", rating: 5, position: 4 },
  { author: "Ben T.", bike: "Kawasaki Z900", content: "Diagnostic express qui m'a sauvé un week-end, panne trouvée et réparée dans la journée.", rating: 5, position: 5 },
];

const faqs = [
  { question: "Vous travaillez sur toutes les marques ?", answer: "Oui, du 50cc à la 1800cc. Multi-marques, toutes motos et scooters. On peut refuser un projet hors périmètre technique.", position: 1 },
  { question: "Le devis est-il gratuit ?", answer: "Oui. Prise de rendez-vous rapide, diagnostic clair et devis détaillé avant toute intervention.", position: 2 },
  { question: "Vous pouvez me fournir un véhicule en remplacement ?", answer: "Véhicule de courtoisie possible en option payante selon disponibilité. À discuter lors du dépôt.", position: 3 },
  { question: "Les accessoires LED sont-ils homologués ?", answer: "Tous les produits proposés à la vente sont homologués CE. La pose respecte les normes route.", position: 4 },
  { question: "Livrez-vous en France ?", answer: "Oui. Colissimo standard ou Chronopost express. Retrait atelier à Montreuil aussi disponible.", position: 5 },
  { question: "Je peux payer en plusieurs fois ?", answer: "On accepte le paiement en 3 ou 4 fois via Stripe pour les commandes supérieures à 150 €.", position: 6 },
];

const realizations = [
  { slug: "bmw-rt-led-signature", title: "BMW R 1250 RT — signature LED", bike: "BMW R 1250 RT", category: "LED sur mesure", summary: "Logo LED sur réservoir + feux additionnels intégrés.", coverImage: "/media/bmw-rt-led.jpg", featured: true, position: 1 },
  { slug: "goldwing-logo-led", title: "Goldwing — logo LED rider", bike: "Honda Goldwing", category: "LED sur mesure", summary: "Logo personnalisé découpe laser + pose propre.", coverImage: "/media/goldwing-led.jpg", featured: true, position: 2 },
  { slug: "tmax-akrapovic-vice", title: "TMAX — Akrapovic + Vice wrap", bike: "Yamaha TMAX 560", category: "Covering", summary: "Slip-on titane, flammes Vice holographiques.", coverImage: "/media/akrapovic-tmax-gta.jpeg", featured: true, position: 3 },
  { slug: "gs-covering-integral", title: "GS — covering intégral", bike: "BMW R 1250 GS", category: "Covering", summary: "Wrap complet noir mat et stickers custom.", coverImage: "/media/covering-gs.jpg", position: 4 },
  { slug: "tracer-gta-build", title: "Tracer GTA build", bike: "Yamaha Tracer 900", category: "Custom build", summary: "Projet custom complet inspiré GTA.", coverImage: "/media/tracer-gta.jpeg", position: 5 },
  { slug: "honda-integra-retouche", title: "Honda Integra — retouche LED", bike: "Honda Integra", category: "Atelier", summary: "Réparation et upgrade signature lumineuse.", coverImage: "/media/honda-integra.jpg", position: 6 },
];

async function main() {
  console.log("🏁 Seed start");

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      create: cat,
      update: cat,
    });
  }
  console.log(`✓ ${categories.length} catégories`);

  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: `seed-${t.author.toLowerCase().replace(/[^a-z]/g, "")}` },
      create: { id: `seed-${t.author.toLowerCase().replace(/[^a-z]/g, "")}`, ...t },
      update: t,
    });
  }
  console.log(`✓ ${testimonials.length} témoignages`);

  for (const [i, f] of faqs.entries()) {
    await prisma.faqItem.upsert({
      where: { id: `seed-faq-${i + 1}` },
      create: { id: `seed-faq-${i + 1}`, ...f },
      update: f,
    });
  }
  console.log(`✓ ${faqs.length} FAQ`);

  for (const r of realizations) {
    const realization = await prisma.realization.upsert({
      where: { slug: r.slug },
      create: r,
      update: r,
    });
    if (r.coverImage) {
      await prisma.realizationImage.upsert({
        where: { id: `seed-img-${r.slug}` },
        create: {
          id: `seed-img-${r.slug}`,
          realizationId: realization.id,
          url: r.coverImage,
          alt: r.title,
          position: 0,
        },
        update: { url: r.coverImage, alt: r.title },
      });
    }
  }
  console.log(`✓ ${realizations.length} réalisations`);

  for (const product of products) {
    const category = await prisma.category.findUnique({
      where: { slug: product.categorySlug },
    });
    if (!category) continue;

    let stripeProductId: string | null = null;
    let stripePriceId: string | null = null;

    if (stripe) {
      try {
        const existing = await prisma.product.findUnique({ where: { slug: product.slug } });
        if (existing?.stripeProductId) {
          stripeProductId = existing.stripeProductId;
          stripePriceId = existing.stripePriceId;
          await stripe.products.update(stripeProductId, {
            name: product.name,
            description: product.tagline,
          });
        } else {
          const stripeProduct = await stripe.products.create({
            name: product.name,
            description: product.tagline,
            metadata: { slug: product.slug, category: product.categorySlug },
          });
          const stripePrice = await stripe.prices.create({
            product: stripeProduct.id,
            unit_amount: product.priceCents,
            currency: "eur",
          });
          stripeProductId = stripeProduct.id;
          stripePriceId = stripePrice.id;
        }
      } catch (err) {
        console.warn(`⚠ Stripe failed for ${product.slug}:`, (err as Error).message);
      }
    }

    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      create: {
        slug: product.slug,
        name: product.name,
        tagline: product.tagline,
        description: product.description,
        priceCents: product.priceCents,
        compareAtCents: product.compareAtCents,
        stock: product.stock,
        trackStock: product.trackStock ?? true,
        status: "ACTIVE",
        featured: product.featured ?? false,
        categoryId: category.id,
        stripeProductId,
        stripePriceId,
      },
      update: {
        name: product.name,
        tagline: product.tagline,
        description: product.description,
        priceCents: product.priceCents,
        compareAtCents: product.compareAtCents,
        stock: product.stock,
        trackStock: product.trackStock ?? true,
        status: "ACTIVE",
        featured: product.featured ?? false,
        categoryId: category.id,
        ...(stripeProductId ? { stripeProductId, stripePriceId } : {}),
      },
    });

    for (const [i, url] of product.images.entries()) {
      const imageId = `seed-img-${product.slug}-${i}`;
      await prisma.productImage.upsert({
        where: { id: imageId },
        create: {
          id: imageId,
          productId: created.id,
          url,
          alt: product.name,
          position: i,
        },
        update: { url, alt: product.name, position: i },
      });
    }

    if (product.variants) {
      for (const [i, v] of product.variants.entries()) {
        const variantId = `seed-variant-${product.slug}-${i}`;
        await prisma.productVariant.upsert({
          where: { id: variantId },
          create: {
            id: variantId,
            productId: created.id,
            name: v.name,
            priceCents: v.priceCents,
            stock: v.stock,
          },
          update: {
            name: v.name,
            priceCents: v.priceCents,
            stock: v.stock,
          },
        });
      }
    }
  }
  console.log(`✓ ${products.length} produits`);

  console.log("🏁 Seed done");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
