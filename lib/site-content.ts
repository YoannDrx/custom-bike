export const business = {
  name: "Custom Bike",
  phoneDisplay: "01 48 37 66 37",
  phoneHref: "tel:+33148376637",
  email: "custombike.idf@gmail.com",
  emailHref: "mailto:custombike.idf@gmail.com",
  address: "17 rue Voltaire, 93100 Montreuil",
  mapHref: "https://maps.google.com/?q=17+rue+Voltaire+93100+Montreuil",
  mapEmbed:
    "https://maps.google.com/maps?q=17%20rue%20Voltaire%2093100%20Montreuil&t=m&z=15&output=embed&iwloc=near",
  hours: [
    "Lundi au vendredi : 10h00 - 18h00",
    "Samedi : sur rendez-vous selon planning",
    "Dimanche : fermé",
  ],
  socials: {
    instagram: "https://www.instagram.com/custom_bike93/",
    tiktok: "https://www.tiktok.com/@custombike",
  },
};

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Boutique", href: "/boutique" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Vente & location", href: "/vente-location" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export const heroTypingPhrases = [
  "révision premium",
  "LED sur mesure",
  "vente & location",
  "assurance simplifiée",
];

export const corePromises = [
  "Réparations & entretien du 50cc au 1800cc",
  "Atelier moto / scooter multi-marques",
  "Véhicule de courtoisie possible en option payante",
  "Devis rapides et suivi atelier clair",
];

export const featuredServices = [
  {
    slug: "revision",
    title: "Révision",
    subtitle: "Entretien complet et forfaits atelier",
    description:
      "Forfaits révision et entretien au meilleur prix, contrôle général, pièces de qualité et suivi mécanique lisible.",
    category: "atelier",
    image: "/media/hero-bmw.jpg",
  },
  {
    slug: "reparation",
    title: "Réparation",
    subtitle: "Diagnostic, remise en état, mécanique",
    description:
      "Recherche de panne, réparation, remise en état après choc ou usure, avec restitution sérieuse et finie.",
    category: "atelier",
    image: "/media/honda-integra.jpg",
  },
  {
    slug: "feu-led",
    title: "Feu LED",
    subtitle: "Signature lumineuse et visibilité",
    description:
      "Logos LED, feux additionnels, intégrations propres et projets lumineux qui changent immédiatement la perception de la moto.",
    category: "custom",
    image: "/media/goldwing-led.jpg",
  },
  {
    slug: "sellerie",
    title: "Sellerie sur mesure",
    subtitle: "Confort, allure et finition",
    description:
      "Sellerie repensée pour améliorer la ligne, le confort et la sensation premium à chaque trajet.",
    category: "custom",
    image: "/media/covering-gs.jpg",
  },
  {
    slug: "logo-led",
    title: "Logo LED / Feux additionnels",
    subtitle: "Le détail qui signe la machine",
    description:
      "Montages plus pointus pour les clients qui veulent une moto forte, visible et immédiatement reconnaissable.",
    category: "custom",
    image: "/media/bmw-rt-led.jpg",
  },
  {
    slug: "quadlock",
    title: "Quad Lock / CarPlay",
    subtitle: "Accessoires et électronique",
    description:
      "Supports, dashcam, CarPlay, instrumentation et électronique utile posés proprement et durablement.",
    category: "accessoires",
    image: "/media/tiktok-msport.jpg",
  },
  {
    slug: "avant-apres",
    title: "Avant / Après",
    subtitle: "Transformation atelier",
    description:
      "Le meilleur format pour montrer le niveau de remise en état, la transformation visuelle et le soin de finition.",
    category: "atelier",
    image: "/media/tiktok-avant-apres.jpg",
  },
  {
    slug: "covering",
    title: "Covering",
    subtitle: "Couleur, texture et silhouette",
    description:
      "Pour sortir du standard usine et aller vers une vraie personnalité visuelle, sans tomber dans le mauvais goût.",
    category: "custom",
    image: "/media/covering-gs.jpg",
  },
  {
    slug: "vente-location",
    title: "Vente / Location",
    subtitle: "Deux-roues prêts à rouler",
    description:
      "Vente neuf / occasion selon disponibilités, location et solutions de mobilité atelier selon le besoin.",
    category: "mobilite",
    image: "/media/tiktok-overview.jpg",
  },
];

export const detailedServiceSections = [
  {
    title: "Réparations & entretien",
    intro:
      "Custom Bike réalise la réparation et l'entretien de scooters et motos toutes cylindrées, du quotidien urbain jusqu'aux machines plus exigeantes.",
    details: [
      "Réparation et entretien toutes cylindrées, du 50cc au 1800cc",
      "Forfaits révision et entretien avec pièces de qualité",
      "Prise de rendez-vous rapide et lecture atelier claire",
      "Véhicule de courtoisie possible en option payante",
    ],
    image: "/media/hero-bmw.jpg",
  },
  {
    title: "Personnalisation & accessoires",
    intro:
      "Custom Bike, c'est aussi la personnalisation du véhicule avec des pièces reconnues, des accessoires utiles et une vraie culture de la finition.",
    details: [
      "Akrapovic, LeoVince et Yasuni pour les échappements",
      "Malossi, JCosta et Polini pour les variateurs et le gain de réponse",
      "Tucano ou Bagster pour tabliers et manchons",
      "Top Block pour la protection et l'antivol",
      "Tecno Globe pour LED ventilées, poignées chauffantes, USB, Bluetooth et alarme SRA",
      "Large choix de casques et gants adulte / enfant",
    ],
    image: "/media/goldwing-led.jpg",
  },
  {
    title: "Prise en charge assurance",
    intro:
      "Le sinistre ne doit pas être une perte de temps ou d'énergie. L'atelier simplifie la lecture du dossier, le chiffrage et la remise en état.",
    details: [
      "Constat atelier rapide",
      "Devis et coordination du dossier",
      "Remise en état esthétique et mécanique",
      "Restitution propre et valorisante",
    ],
    image: "/media/tiktok-avant-apres.jpg",
  },
];

export const brandPartners = [
  "Akrapovic",
  "LeoVince",
  "Yasuni",
  "Malossi",
  "JCosta",
  "Polini",
  "Tucano",
  "Bagster",
  "Top Block",
  "Tecno Globe",
];

export const trustGuests = [
  "Koba La D",
  "Maes",
  "Cyril Benzaquen",
  "Mokhtar",
  "Ibra TV",
  "Hatik",
];

export const testimonials = [
  {
    quote:
      "Ma RT 1250 est ressortie avec un rendu incroyable. Le montage LED est propre, la moto paraît vraiment montée d'origine.",
    author: "Sofiane M.",
    meta: "BMW RT 1250",
  },
  {
    quote:
      "Très bon accueil, devis clair et réparation rapide. On sent qu'il y a une vraie exigence sur les finitions, pas juste sur la mécanique.",
    author: "Camille R.",
    meta: "Yamaha Tmax",
  },
  {
    quote:
      "Je voulais quelque chose de plus personnalisé sans tomber dans l'excès. Ils ont trouvé le bon équilibre entre style, confort et propreté de pose.",
    author: "Yacine D.",
    meta: "Honda Integra 750",
  },
  {
    quote:
      "L'atelier m'a accompagné pour la remise en état après sinistre. C'était clair, rassurant et la restitution était vraiment propre.",
    author: "Nora B.",
    meta: "Scooter urbain",
  },
  {
    quote:
      "Sellerie, accessoires et révision complète au même endroit, avec un vrai regard esthétique. C'est rare.",
    author: "Mehdi K.",
    meta: "BMW GS",
  },
];

export const pricingReference = [
  {
    title: "Diagnostic atelier",
    price: "39€",
    description: "Premier contrôle, lecture du besoin et trajectoire claire avant intervention.",
  },
  {
    title: "Révision scooter",
    price: "Dès 89€",
    description: "Entretien courant, contrôle global et préparation pour un usage fiable au quotidien.",
  },
  {
    title: "Révision moto",
    price: "Dès 129€",
    description: "Entretien plus pointu pour les motos demandant un suivi atelier plus dense.",
  },
  {
    title: "Montage accessoire",
    price: "Dès 49€",
    description: "Support, électronique, confort ou équipement utile posé proprement.",
  },
  {
    title: "Projet custom / LED",
    price: "Sur devis",
    description: "Logo LED, feux additionnels, covering, compteur ou sellerie selon le projet.",
  },
  {
    title: "Véhicule de courtoisie",
    price: "Option payante",
    description: "Solution de mobilité atelier selon disponibilité et planning.",
  },
];

export const featuredProjects = [
  {
    title: "BMW RT 1250 triple black",
    subtitle: "Personnalisation lumineuse et présence visuelle plus radicale.",
    image: "/media/bmw-rt-led.jpg",
    url: business.socials.instagram,
    category: "LED",
  },
  {
    title: "Goldwing avec logos LED",
    subtitle: "Une signature visuelle très forte pensée pour se voir immédiatement.",
    image: "/media/goldwing-led.jpg",
    url: business.socials.instagram,
    category: "LED",
  },
  {
    title: "Compteur BMW M Sport",
    subtitle: "L'atelier touche aussi à l'expérience pilote et à l'instrumentation.",
    image: "/media/tiktok-msport.jpg",
    url: "https://www.tiktok.com/@custombike/video/7419298293030587680",
    category: "Électronique",
  },
  {
    title: "Honda Integra 750",
    subtitle: "Peinture noire, feux additionnels et dashcam pour un rendu plus dense et plus premium.",
    image: "/media/honda-integra.jpg",
    url: business.socials.instagram,
    category: "Avant / après",
  },
];

export const galleryItems = [
  {
    title: "Face avant BMW",
    caption: "Montage lumineux / atelier",
    image: "/media/hero-bmw.jpg",
    url: business.socials.instagram,
    aspect: "aspect-[4/5]",
    category: "LED",
  },
  {
    title: "RT full black",
    caption: "TikTok",
    image: "/media/tiktok-rt-black.jpg",
    url: "https://www.tiktok.com/@custombike/video/7501297224568147222",
    aspect: "aspect-[4/5]",
    category: "Custom",
  },
  {
    title: "Goldwing signature",
    caption: "Instagram",
    image: "/media/goldwing-led.jpg",
    url: business.socials.instagram,
    aspect: "aspect-square",
    category: "LED",
  },
  {
    title: "Compteur M",
    caption: "Programmation",
    image: "/media/tiktok-msport.jpg",
    url: "https://www.tiktok.com/@custombike/video/7419298293030587680",
    aspect: "aspect-[5/6]",
    category: "Électronique",
  },
  {
    title: "Honda Integra",
    caption: "Avant / après",
    image: "/media/honda-integra.jpg",
    url: business.socials.instagram,
    aspect: "aspect-[4/5]",
    category: "Avant / après",
  },
  {
    title: "Covering GS",
    caption: "Palette couleur",
    image: "/media/covering-gs.jpg",
    url: business.socials.instagram,
    aspect: "aspect-[4/5]",
    category: "Covering",
  },
  {
    title: "Yamaha LED",
    caption: "TikTok",
    image: "/media/tiktok-yamaha-led.jpg",
    url: "https://www.tiktok.com/@custombike/video/7575206149968989462",
    aspect: "aspect-[4/5]",
    category: "LED",
  },
  {
    title: "Vue atelier",
    caption: "Montage accessoire",
    image: "/media/tiktok-overview.jpg",
    url: "https://www.tiktok.com/@custombike/video/7417625464291724577",
    aspect: "aspect-[5/6]",
    category: "Accessoires",
  },
];

export const faqItems = [
  {
    question: "Custom Bike travaille sur quelles marques ?",
    answer:
      "L'atelier se positionne sur le multi-marques, avec une présence déjà très visible sur BMW, Honda, Yamaha et les scooters urbains.",
  },
  {
    question: "Est-ce seulement un garage mécanique ?",
    answer:
      "Non. Custom Bike assume le double ADN : entretien / réparation d'un côté, personnalisation premium de l'autre avec LED, accessoires, sellerie, covering et finitions.",
  },
  {
    question: "Peut-on louer un véhicule ou avoir un véhicule de courtoisie ?",
    answer:
      "Oui. La vente et la location font partie de l'offre, et un véhicule de courtoisie peut être proposé en option payante selon disponibilité.",
  },
  {
    question: "Comment se passe la prise en charge assurance ?",
    answer:
      "Le parcours est pensé pour être simple : lecture atelier, devis, coordination du dossier et remise en état jusqu'à la restitution.",
  },
];
