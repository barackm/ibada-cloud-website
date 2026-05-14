import type { Locale } from "@/dictionaries/index";
import {
  collectClusterKeywords,
  getSeoLocaleConfig,
} from "@/src/lib/seo/config";
import type { SeoPage, SeoPageIntent, SeoPageRoute } from "@/src/lib/seo/types";

type PageSeed = {
  route: SeoPageRoute;
  slug: string;
  kind: SeoPage["kind"];
  intent: SeoPageIntent;
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  heroEyebrow: string;
  sections: SeoPage["sections"];
  relatedLinks: SeoPage["relatedLinks"];
  cta: SeoPage["cta"];
  keywords: string[];
  breadcrumbLabel: string;
  softwareApplication?: SeoPage["softwareApplication"];
};

const UPDATED_AT = "2026-05-14";

function withLocale(locale: Locale, seeds: PageSeed[]): SeoPage[] {
  return seeds.map((seed) => ({
    ...seed,
    locale,
    updatedAt: UPDATED_AT,
  }));
}

const EN_MONEY: PageSeed[] = [
  {
    route: "platform",
    slug: "platform",
    kind: "money",
    intent: "transactional",
    title: "Church Management Platform",
    metaTitle: "Church Management Platform for Members, Finance & Forms",
    description:
      "Ibada Cloud is a church management platform for members, branches, activities, finance, and Smart Forms in one structured workspace.",
    excerpt:
      "Unify church operations in one cloud platform built for structured teams.",
    heroEyebrow: "Church management software",
    sections: [
      {
        title: "One structured operating layer",
        paragraphs: [
          "Ibada Cloud replaces scattered spreadsheets and disconnected tools with one workflow for membership, activities, and finance.",
          "Teams can collaborate with clear permissions, shared records, and reliable exports for accountants and leadership.",
        ],
        bullets: [
          "Member and household records",
          "Branch-aware operations",
          "Finance categories and reporting",
          "Smart Forms for intake and campaigns",
        ],
      },
      {
        title: "Built for growth",
        paragraphs: [
          "Whether your church is single-site or multi-site, Ibada Cloud keeps data clean and searchable as your organization grows.",
          "You keep your existing ministry context while gaining faster reporting and better execution.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Church CRM solution", href: "/solutions/church-crm" },
      { label: "Membership management", href: "/solutions/membership-management" },
      { label: "Pricing comparison", href: "/compare/church-management-software-pricing" },
    ],
    cta: { label: "Request a demo", href: "mailto:hello@ibadacloud.com?subject=Platform%20demo" },
    keywords: [
      "church management platform",
      "church management software",
      "cloud church software",
      "parish management software",
    ],
    breadcrumbLabel: "Platform",
    softwareApplication: {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      pricingSummary: "Subscription plans for churches of different sizes",
      featureList: [
        "Membership management",
        "Church CRM",
        "Finance and donation tracking",
        "Smart forms",
      ],
    },
  },
  {
    route: "solutions",
    slug: "church-crm",
    kind: "money",
    intent: "transactional",
    title: "Church CRM Software",
    metaTitle: "Church CRM Software for Pastoral Care and Follow-Up",
    description:
      "Track member journeys, households, communication context, and follow-up workflows in a purpose-built church CRM.",
    excerpt: "A church CRM designed for ministry context, not generic pipelines.",
    heroEyebrow: "Church CRM",
    sections: [
      {
        title: "Pastoral context that stays connected",
        paragraphs: [
          "Keep member records, households, and branch activity connected so leaders can act with confidence.",
        ],
        bullets: [
          "Member timelines",
          "Household relationships",
          "Follow-up tasks",
          "Branch-level visibility",
        ],
      },
      {
        title: "Operational follow-up at scale",
        paragraphs: [
          "Move from ad hoc reminders to repeatable workflows with forms, notes, and campaign-linked actions.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Membership management", href: "/solutions/membership-management" },
      { label: "Church forms", href: "/solutions/church-forms" },
    ],
    cta: { label: "Request CRM walkthrough", href: "mailto:hello@ibadacloud.com?subject=Church%20CRM%20walkthrough" },
    keywords: ["church CRM", "church CRM software", "church member management"],
    breadcrumbLabel: "Church CRM",
    softwareApplication: {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      pricingSummary: "Included in Growth and Scale plans",
      featureList: ["Member records", "Households", "Pastoral notes", "Follow-up workflows"],
    },
  },
  {
    route: "solutions",
    slug: "membership-management",
    kind: "money",
    intent: "transactional",
    title: "Church Membership Management",
    metaTitle: "Church Membership Management Software for Growing Churches",
    description:
      "Manage member profiles, households, attendance context, and branch records with a structured membership system.",
    excerpt: "Keep member data consistent across teams and branches.",
    heroEyebrow: "Membership software",
    sections: [
      {
        title: "Clean member records",
        paragraphs: [
          "Standardized profiles and household mapping reduce duplicates and missing context.",
        ],
        bullets: [
          "Unified member directory",
          "Branch allocation",
          "Attendance and activity links",
          "Export-ready data",
        ],
      },
      {
        title: "Leadership-ready visibility",
        paragraphs: [
          "Build reports and snapshots quickly so pastors and administrators can make better decisions.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Church CRM", href: "/solutions/church-crm" },
      { label: "Finance & donations", href: "/solutions/church-finance" },
    ],
    cta: { label: "Request a membership demo", href: "mailto:hello@ibadacloud.com?subject=Membership%20demo" },
    keywords: [
      "church membership management software",
      "church member management",
      "church database software",
    ],
    breadcrumbLabel: "Membership management",
    softwareApplication: {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      pricingSummary: "Available across all plans with scaled limits",
      featureList: ["Member profiles", "Households", "Branch records", "Attendance context"],
    },
  },
  {
    route: "solutions",
    slug: "church-finance",
    kind: "money",
    intent: "transactional",
    title: "Church Finance and Donation Tracking",
    metaTitle: "Church Finance Software for Donation Tracking and Reporting",
    description:
      "Track income, expenses, categories, and donation workflows with structured church finance reporting.",
    excerpt: "From daily entries to leadership reports, finance stays organized.",
    heroEyebrow: "Finance & donations",
    sections: [
      {
        title: "Track money in and money out",
        paragraphs: [
          "Capture financial activity with categories that reflect real church operations.",
        ],
        bullets: [
          "Income and expense records",
          "Category structures",
          "Monthly and annual snapshots",
          "Excel and CSV export",
        ],
      },
      {
        title: "Scale-level reporting",
        paragraphs: [
          "Advanced summaries and trends support audits, board reviews, and planning cycles.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Pricing comparison", href: "/compare/church-management-software-pricing" },
      { label: "Church forms", href: "/solutions/church-forms" },
    ],
    cta: { label: "Talk with our finance team", href: "mailto:hello@ibadacloud.com?subject=Church%20finance%20demo" },
    keywords: ["church finance software", "church donation tracking software", "church reporting software"],
    breadcrumbLabel: "Finance & donations",
    softwareApplication: {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      pricingSummary: "Advanced reporting included in Scale plan",
      featureList: ["Income tracking", "Expense tracking", "Category analysis", "Financial exports"],
    },
  },
  {
    route: "solutions",
    slug: "church-forms",
    kind: "money",
    intent: "transactional",
    title: "Church Form Builder and Smart Forms",
    metaTitle: "Church Form Builder for Registrations, Pledges, and Workflows",
    description:
      "Create church forms for registrations, pledges, and internal workflows with structured data capture.",
    excerpt: "Collect once, route cleanly, and reduce manual follow-up.",
    heroEyebrow: "Smart Forms",
    sections: [
      {
        title: "From form submission to action",
        paragraphs: [
          "Capture structured details from events, campaigns, and pledges without scattered inbox threads.",
        ],
        bullets: [
          "Registration forms",
          "Pledge and campaign forms",
          "Custom field capture",
          "Workflow-ready records",
        ],
      },
      {
        title: "Data that feeds operations",
        paragraphs: [
          "Form responses are stored in context so teams can report, follow up, and plan with confidence.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Church CRM", href: "/solutions/church-crm" },
      { label: "Membership management", href: "/solutions/membership-management" },
    ],
    cta: { label: "Request a Smart Forms demo", href: "mailto:hello@ibadacloud.com?subject=Smart%20Forms%20demo" },
    keywords: ["church form builder", "church onboarding forms", "church smart forms"],
    breadcrumbLabel: "Church forms",
    softwareApplication: {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      pricingSummary: "Included in Growth and unlimited in Scale",
      featureList: ["Custom forms", "Structured intake", "Campaign support", "Automated follow-up context"],
    },
  },
  {
    route: "compare",
    slug: "church-management-software-pricing",
    kind: "money",
    intent: "comparison",
    title: "Church Management Software Pricing Comparison",
    metaTitle: "Church Software Pricing: Essential vs Growth vs Scale",
    description:
      "Compare church software pricing, limits, and capabilities across Essential, Growth, and Scale plans.",
    excerpt: "Clear pricing and capability breakdown for church teams.",
    heroEyebrow: "Pricing and plan comparison",
    sections: [
      {
        title: "Plan fit by operating complexity",
        paragraphs: [
          "Essential helps early-stage teams organize daily operations.",
          "Growth adds Smart Forms, exports, and automation. Scale unlocks unlimited usage and advanced reporting.",
        ],
      },
      {
        title: "Choose with clarity",
        paragraphs: [
          "Use your current member count, branch footprint, and finance reporting needs to select the right plan.",
        ],
        bullets: [
          "Members and branches limits",
          "Forms and automation availability",
          "Reporting depth",
          "Support tier",
        ],
      },
    ],
    relatedLinks: [
      { label: "Platform overview", href: "/platform" },
      { label: "Church finance solution", href: "/solutions/church-finance" },
    ],
    cta: { label: "Request pricing consultation", href: "mailto:hello@ibadacloud.com?subject=Pricing%20consultation" },
    keywords: [
      "church software pricing",
      "best church management software",
      "church management software comparison",
    ],
    breadcrumbLabel: "Pricing comparison",
    softwareApplication: {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      pricingSummary: "Essential, Growth, and Scale monthly subscriptions",
      featureList: ["Plan limits", "Capability matrix", "Support tiers", "Upgrade path"],
    },
  },
];

const FR_MONEY: PageSeed[] = [
  {
    route: "platform",
    slug: "platform",
    kind: "money",
    intent: "transactional",
    title: "Plateforme de gestion d'église",
    metaTitle: "Plateforme de gestion d'église: membres, finances et formulaires",
    description:
      "Ibada Cloud est une plateforme de gestion d'église pour les membres, branches, activités, finances et formulaires intelligents.",
    excerpt: "Centralisez les opérations de votre église dans un environnement structuré.",
    heroEyebrow: "Logiciel de gestion d'église",
    sections: [
      {
        title: "Une couche opérationnelle unique",
        paragraphs: [
          "Ibada Cloud remplace les fichiers éparpillés et les outils isolés par un flux unifié pour les membres, les activités et la finance.",
          "Vos équipes collaborent avec des données propres et des exports fiables pour la gouvernance et la comptabilité.",
        ],
        bullets: [
          "Profils membres et foyers",
          "Gestion multi-branches",
          "Catégories financières",
          "Formulaires intelligents",
        ],
      },
      {
        title: "Conçu pour la croissance",
        paragraphs: [
          "Que votre église soit mono-site ou multi-site, la plateforme garde un historique clair et actionnable.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Solution CRM église", href: "/solutions/church-crm" },
      { label: "Gestion des membres", href: "/solutions/membership-management" },
      { label: "Comparatif tarifs", href: "/compare/church-management-software-pricing" },
    ],
    cta: { label: "Demander une démo", href: "mailto:hello@ibadacloud.com?subject=Demo%20plateforme" },
    keywords: [
      "logiciel de gestion d'église",
      "plateforme de gestion d'église",
      "solution église en ligne",
      "logiciel gestion paroissiale",
    ],
    breadcrumbLabel: "Plateforme",
    softwareApplication: {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      pricingSummary: "Formules par abonnement pour différentes tailles d'église",
      featureList: [
        "Gestion des membres",
        "CRM église",
        "Suivi des finances et dons",
        "Formulaires intelligents",
      ],
    },
  },
  {
    route: "solutions",
    slug: "church-crm",
    kind: "money",
    intent: "transactional",
    title: "CRM église",
    metaTitle: "CRM église pour le suivi pastoral et la relation membre",
    description:
      "Suivez les parcours membres, les foyers, les notes pastorales et les actions de suivi dans un CRM conçu pour les églises.",
    excerpt: "Un CRM pensé pour le ministère, pas un pipeline générique.",
    heroEyebrow: "CRM église",
    sections: [
      {
        title: "Contexte pastoral structuré",
        paragraphs: [
          "Conservez un historique clair des interactions, des foyers et des engagements par branche.",
        ],
        bullets: ["Chronologie membre", "Foyers", "Tâches de suivi", "Vue par branche"],
      },
      {
        title: "Suivi opérationnel à grande échelle",
        paragraphs: [
          "Passez de rappels ponctuels à des workflows répétables grâce aux formulaires et aux campagnes.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Gestion des membres", href: "/solutions/membership-management" },
      { label: "Formulaires église", href: "/solutions/church-forms" },
    ],
    cta: { label: "Demander une démo CRM", href: "mailto:hello@ibadacloud.com?subject=Demo%20CRM%20eglise" },
    keywords: ["CRM église", "logiciel CRM église", "suivi des membres église"],
    breadcrumbLabel: "CRM église",
    softwareApplication: {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      pricingSummary: "Inclus dans les formules Croissance et Échelle",
      featureList: ["Dossiers membres", "Foyers", "Notes pastorales", "Suivi"],
    },
  },
  {
    route: "solutions",
    slug: "membership-management",
    kind: "money",
    intent: "transactional",
    title: "Gestion des membres d'église",
    metaTitle: "Logiciel de gestion des membres pour églises en croissance",
    description:
      "Gérez les profils membres, foyers, présences et branches avec un système structuré de gestion des membres.",
    excerpt: "Des données membres cohérentes pour des équipes plus efficaces.",
    heroEyebrow: "Gestion des membres",
    sections: [
      {
        title: "Des dossiers membres propres",
        paragraphs: [
          "Standardisez les profils et évitez les doublons pour garder une base fiable.",
        ],
        bullets: [
          "Annuaire membre unifié",
          "Affectation par branche",
          "Contexte activité et présence",
          "Exports exploitables",
        ],
      },
      {
        title: "Vision leadership",
        paragraphs: [
          "Produisez rapidement des indicateurs utiles pour les responsables et l'administration.",
        ],
      },
    ],
    relatedLinks: [
      { label: "CRM église", href: "/solutions/church-crm" },
      { label: "Finances et dons", href: "/solutions/church-finance" },
    ],
    cta: { label: "Demander une démo membres", href: "mailto:hello@ibadacloud.com?subject=Demo%20gestion%20membres" },
    keywords: ["gestion des membres église", "logiciel pour église", "base de données membres église"],
    breadcrumbLabel: "Gestion des membres",
    softwareApplication: {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      pricingSummary: "Disponible dans toutes les formules avec limites adaptées",
      featureList: ["Profils membres", "Foyers", "Branches", "Historique"],
    },
  },
  {
    route: "solutions",
    slug: "church-finance",
    kind: "money",
    intent: "transactional",
    title: "Logiciel finances et dons d'église",
    metaTitle: "Suivi des finances et dons pour église avec rapports structurés",
    description:
      "Suivez entrées, sorties, catégories et dons avec une logique financière conçue pour les églises.",
    excerpt: "De la saisie quotidienne aux rapports de pilotage.",
    heroEyebrow: "Finances et dons",
    sections: [
      {
        title: "Pilotez les flux financiers",
        paragraphs: [
          "Enregistrez les mouvements financiers selon des catégories qui reflètent la réalité de vos opérations.",
        ],
        bullets: [
          "Suivi recettes et dépenses",
          "Catégories financières",
          "Synthèses mensuelles et annuelles",
          "Exports Excel et CSV",
        ],
      },
      {
        title: "Reporting avancé",
        paragraphs: [
          "Les rapports avancés soutiennent les audits, revues de conseil et décisions budgétaires.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Comparatif tarifs", href: "/compare/church-management-software-pricing" },
      { label: "Formulaires église", href: "/solutions/church-forms" },
    ],
    cta: { label: "Parler à un expert finance", href: "mailto:hello@ibadacloud.com?subject=Demo%20finances%20eglise" },
    keywords: ["logiciel finances église", "logiciel dons et offrandes", "rapport financier église"],
    breadcrumbLabel: "Finances et dons",
    softwareApplication: {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      pricingSummary: "Rapports avancés inclus dans la formule Échelle",
      featureList: ["Suivi financier", "Catégorisation", "Analyse", "Exports structurés"],
    },
  },
  {
    route: "solutions",
    slug: "church-forms",
    kind: "money",
    intent: "transactional",
    title: "Formulaires intelligents pour église",
    metaTitle: "Logiciel formulaires église pour inscriptions, promesses et workflows",
    description:
      "Créez des formulaires d'église pour inscriptions, promesses et collecte structurée de données opérationnelles.",
    excerpt: "Collectez une fois, exploitez partout.",
    heroEyebrow: "Formulaires église",
    sections: [
      {
        title: "De la soumission à l'action",
        paragraphs: [
          "Centralisez les demandes d'événements, promesses et inscriptions sans perdre d'informations en route.",
        ],
        bullets: [
          "Formulaires d'inscription",
          "Promesses et campagnes",
          "Champs personnalisés",
          "Données réutilisables",
        ],
      },
      {
        title: "Des données qui alimentent l'équipe",
        paragraphs: [
          "Les réponses sont reliées aux membres, activités et suivis pour accélérer l'exécution.",
        ],
      },
    ],
    relatedLinks: [
      { label: "CRM église", href: "/solutions/church-crm" },
      { label: "Gestion des membres", href: "/solutions/membership-management" },
    ],
    cta: { label: "Voir les formulaires en démo", href: "mailto:hello@ibadacloud.com?subject=Demo%20formulaires%20eglise" },
    keywords: ["logiciel formulaires église", "formulaires intelligents", "gestion événements église"],
    breadcrumbLabel: "Formulaires",
    softwareApplication: {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      pricingSummary: "Inclus dans Croissance et illimité dans Échelle",
      featureList: ["Formulaires personnalisés", "Collecte structurée", "Campagnes", "Suivi"],
    },
  },
  {
    route: "compare",
    slug: "church-management-software-pricing",
    kind: "money",
    intent: "comparison",
    title: "Comparatif tarifs logiciel de gestion d'église",
    metaTitle: "Tarifs logiciel église: Essentiel vs Croissance vs Échelle",
    description:
      "Comparez les tarifs, limites et capacités entre les formules Essentiel, Croissance et Échelle.",
    excerpt: "Un comparatif clair pour choisir votre formule.",
    heroEyebrow: "Comparatif des formules",
    sections: [
      {
        title: "Choisir selon votre complexité",
        paragraphs: [
          "Essentiel convient aux équipes en structuration, Croissance ajoute les formulaires et automatisations, Échelle ouvre l'illimité et le reporting avancé.",
        ],
      },
      {
        title: "Décider avec des critères concrets",
        paragraphs: [
          "Comparez volumes membres, nombre de branches, exigences financières et niveau de support.",
        ],
        bullets: [
          "Limites membres et branches",
          "Formulaires et automatisations",
          "Niveau de reporting",
          "Support prioritaire",
        ],
      },
    ],
    relatedLinks: [
      { label: "Plateforme", href: "/platform" },
      { label: "Finances et dons", href: "/solutions/church-finance" },
    ],
    cta: { label: "Demander un conseil tarifaire", href: "mailto:hello@ibadacloud.com?subject=Conseil%20tarifaire" },
    keywords: [
      "prix logiciel de gestion d'église",
      "comparatif logiciel église",
      "meilleur logiciel de gestion d'église",
    ],
    breadcrumbLabel: "Comparatif tarifs",
    softwareApplication: {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      pricingSummary: "Trois abonnements mensuels évolutifs",
      featureList: ["Limites de plan", "Matrice de capacités", "Support", "Parcours de montée en gamme"],
    },
  },
];

const EN_GUIDES: PageSeed[] = [
  {
    route: "guides",
    slug: "how-to-choose-church-management-software",
    kind: "guide",
    intent: "informational",
    title: "How to Choose Church Management Software",
    metaTitle: "How to Choose Church Management Software: Practical Checklist",
    description:
      "Use this step-by-step checklist to evaluate church management software across CRM, finance, forms, and reporting.",
    excerpt: "A practical framework for software selection committees.",
    heroEyebrow: "Guide",
    sections: [
      { title: "Selection criteria", paragraphs: ["Define requirements for members, branches, finance, and forms before evaluating vendors."], bullets: ["Data model", "Reporting", "Workflow automation", "Support quality"] },
      { title: "Pilot before rollout", paragraphs: ["Run a 30-day pilot with real ministry scenarios and confirm adoption signals."] },
    ],
    relatedLinks: [{ label: "Platform overview", href: "/platform" }],
    cta: { label: "Request a guided demo", href: "mailto:hello@ibadacloud.com?subject=Guided%20demo" },
    keywords: ["how to choose church management software"],
    breadcrumbLabel: "Choose church software",
  },
  {
    route: "guides",
    slug: "church-crm-implementation-checklist",
    kind: "guide",
    intent: "informational",
    title: "Church CRM Implementation Checklist",
    metaTitle: "Church CRM Implementation Checklist for Teams",
    description: "A practical church CRM implementation checklist covering data migration, onboarding, and adoption.",
    excerpt: "Reduce rollout risk with a clear implementation sequence.",
    heroEyebrow: "Checklist",
    sections: [
      { title: "Pre-launch tasks", paragraphs: ["Audit member records, map households, and define ownership per ministry team."] },
      { title: "Go-live rhythm", paragraphs: ["Train admins first, then ministry leads, then volunteers with weekly QA loops."] },
    ],
    relatedLinks: [{ label: "Church CRM solution", href: "/solutions/church-crm" }],
    cta: { label: "Request implementation support", href: "mailto:hello@ibadacloud.com?subject=CRM%20implementation" },
    keywords: ["church CRM implementation checklist"],
    breadcrumbLabel: "CRM implementation checklist",
  },
  {
    route: "guides",
    slug: "church-member-data-management-best-practices",
    kind: "guide",
    intent: "informational",
    title: "Church Member Data Management Best Practices",
    metaTitle: "Church Member Data Management Best Practices",
    description: "Best practices for maintaining clean, secure, and useful member data across church teams.",
    excerpt: "Governance patterns that keep your member database trustworthy.",
    heroEyebrow: "Best practices",
    sections: [
      { title: "Data hygiene", paragraphs: ["Use standardized fields, duplicate checks, and ownership rules."] },
      { title: "Access and privacy", paragraphs: ["Set role-based access and define retention policies for sensitive pastoral notes."] },
    ],
    relatedLinks: [{ label: "Membership management", href: "/solutions/membership-management" }],
    cta: { label: "Review your current setup", href: "mailto:hello@ibadacloud.com?subject=Data%20review" },
    keywords: ["church member data management best practices"],
    breadcrumbLabel: "Member data best practices",
  },
  {
    route: "guides",
    slug: "church-donation-reporting-template",
    kind: "guide",
    intent: "informational",
    title: "Church Donation Reporting Template",
    metaTitle: "Church Donation Reporting Template and Metrics",
    description: "A simple donation reporting template with monthly and annual church finance metrics.",
    excerpt: "Report donations clearly to leadership and finance teams.",
    heroEyebrow: "Template",
    sections: [
      { title: "Core metrics", paragraphs: ["Track total giving, category trends, campaign performance, and variance."] },
      { title: "Review cadence", paragraphs: ["Set monthly finance reviews and quarterly leadership summaries."] },
    ],
    relatedLinks: [{ label: "Church finance solution", href: "/solutions/church-finance" }],
    cta: { label: "See finance reporting demo", href: "mailto:hello@ibadacloud.com?subject=Finance%20reporting%20demo" },
    keywords: ["church donation reporting template"],
    breadcrumbLabel: "Donation reporting template",
  },
  {
    route: "guides",
    slug: "digitize-church-administration",
    kind: "guide",
    intent: "informational",
    title: "How to Digitize Church Administration",
    metaTitle: "How to Digitize Church Administration Without Chaos",
    description: "Learn how to digitize church administration with phased adoption across members, finance, and forms.",
    excerpt: "A phased modernization path for church operations.",
    heroEyebrow: "Transformation guide",
    sections: [
      { title: "Phase your rollout", paragraphs: ["Start with member data, then finance, then forms and automation."] },
      { title: "Protect adoption", paragraphs: ["Keep workflows simple and train each team on a small change set."] },
    ],
    relatedLinks: [{ label: "Church management platform", href: "/platform" }],
    cta: { label: "Book a modernization call", href: "mailto:hello@ibadacloud.com?subject=Digitization%20call" },
    keywords: ["how to digitize church administration"],
    breadcrumbLabel: "Digitize administration",
  },
  {
    route: "guides",
    slug: "church-software-pricing-guide",
    kind: "guide",
    intent: "comparison",
    title: "Church Software Pricing Guide",
    metaTitle: "Church Software Pricing Guide: Cost Drivers and Plan Fit",
    description: "Understand church software pricing drivers and how to match plan tiers to your growth stage.",
    excerpt: "A decision guide to avoid overpaying or under-scoping.",
    heroEyebrow: "Pricing guide",
    sections: [
      { title: "What changes pricing", paragraphs: ["Member count, branch complexity, reporting depth, and automation needs drive plan fit."] },
      { title: "Plan selection", paragraphs: ["Choose the smallest plan that supports your next 12 months of growth."] },
    ],
    relatedLinks: [{ label: "Pricing comparison", href: "/compare/church-management-software-pricing" }],
    cta: { label: "Request pricing advice", href: "mailto:hello@ibadacloud.com?subject=Pricing%20advice" },
    keywords: ["church software pricing"],
    breadcrumbLabel: "Pricing guide",
  },
  {
    route: "guides",
    slug: "multi-site-church-software-playbook",
    kind: "guide",
    intent: "informational",
    title: "Multi-Site Church Software Playbook",
    metaTitle: "Multi-Site Church Software Playbook for Branch Operations",
    description: "A practical playbook for managing data, branches, and reporting in multi-site church software environments.",
    excerpt: "Operational patterns for multi-site leadership teams.",
    heroEyebrow: "Operations playbook",
    sections: [
      { title: "Branch governance", paragraphs: ["Define branch ownership, shared standards, and reporting cadences."] },
      { title: "Central and local balance", paragraphs: ["Give branches autonomy while keeping central metrics consistent."] },
    ],
    relatedLinks: [{ label: "Membership management", href: "/solutions/membership-management" }],
    cta: { label: "Talk multi-site strategy", href: "mailto:hello@ibadacloud.com?subject=Multi-site%20strategy" },
    keywords: ["multi-site church software"],
    breadcrumbLabel: "Multi-site playbook",
  },
  {
    route: "guides",
    slug: "church-smart-forms-guide",
    kind: "guide",
    intent: "informational",
    title: "Church Smart Forms Guide",
    metaTitle: "Church Smart Forms Guide for Registrations and Campaigns",
    description: "Design church Smart Forms that capture better data and reduce follow-up workload.",
    excerpt: "Form patterns that improve data quality and execution speed.",
    heroEyebrow: "Forms guide",
    sections: [
      { title: "Design for clarity", paragraphs: ["Use concise fields, role-specific sections, and validation rules."] },
      { title: "Operational handoff", paragraphs: ["Route submissions into follow-up tasks and campaign tracking."] },
    ],
    relatedLinks: [{ label: "Church forms", href: "/solutions/church-forms" }],
    cta: { label: "See Smart Forms in action", href: "mailto:hello@ibadacloud.com?subject=Smart%20Forms%20walkthrough" },
    keywords: ["church form builder", "church onboarding forms"],
    breadcrumbLabel: "Smart Forms guide",
  },
  {
    route: "guides",
    slug: "church-attendance-tracking-best-practices",
    kind: "guide",
    intent: "informational",
    title: "Church Attendance Tracking Best Practices",
    metaTitle: "Church Attendance Tracking Best Practices for Teams",
    description: "Best practices for accurate church attendance tracking and ministry follow-up.",
    excerpt: "Turn attendance data into actionable ministry insights.",
    heroEyebrow: "Attendance guide",
    sections: [
      { title: "Capture consistency", paragraphs: ["Standardize attendance events and naming across branches."] },
      { title: "Follow-up rules", paragraphs: ["Trigger consistent outreach for absences and first-time attendees."] },
    ],
    relatedLinks: [{ label: "Membership management", href: "/solutions/membership-management" }],
    cta: { label: "Request attendance workflow review", href: "mailto:hello@ibadacloud.com?subject=Attendance%20workflow" },
    keywords: ["church attendance tracking software"],
    breadcrumbLabel: "Attendance best practices",
  },
  {
    route: "guides",
    slug: "church-volunteer-scheduling-guide",
    kind: "guide",
    intent: "informational",
    title: "Church Volunteer Scheduling Guide",
    metaTitle: "Church Volunteer Scheduling Guide for Ministry Teams",
    description: "Build volunteer scheduling workflows that reduce burnout and improve ministry reliability.",
    excerpt: "Volunteer planning patterns for consistent execution.",
    heroEyebrow: "Volunteer guide",
    sections: [
      { title: "Planning framework", paragraphs: ["Create role templates and schedule windows with backup assignments."] },
      { title: "Communication cadence", paragraphs: ["Automate reminders and confirmation steps to reduce no-shows."] },
    ],
    relatedLinks: [{ label: "Church CRM", href: "/solutions/church-crm" }],
    cta: { label: "Discuss volunteer workflows", href: "mailto:hello@ibadacloud.com?subject=Volunteer%20scheduling" },
    keywords: ["church volunteer scheduling software"],
    breadcrumbLabel: "Volunteer scheduling guide",
  },
  {
    route: "guides",
    slug: "church-finance-controls-checklist",
    kind: "guide",
    intent: "informational",
    title: "Church Finance Controls Checklist",
    metaTitle: "Church Finance Controls Checklist for Accountability",
    description: "A finance controls checklist for churches to improve accountability and reporting confidence.",
    excerpt: "Practical controls for money movement and governance.",
    heroEyebrow: "Finance checklist",
    sections: [
      { title: "Control foundations", paragraphs: ["Define approvals, separation of duties, and category ownership."] },
      { title: "Reporting rhythm", paragraphs: ["Use monthly variance review and quarterly leadership reporting."] },
    ],
    relatedLinks: [{ label: "Church finance solution", href: "/solutions/church-finance" }],
    cta: { label: "Review your finance setup", href: "mailto:hello@ibadacloud.com?subject=Finance%20controls%20review" },
    keywords: ["church finance controls checklist"],
    breadcrumbLabel: "Finance controls checklist",
  },
  {
    route: "guides",
    slug: "church-membership-onboarding-workflow",
    kind: "guide",
    intent: "informational",
    title: "Church Membership Onboarding Workflow",
    metaTitle: "Church Membership Onboarding Workflow That Scales",
    description: "Build a repeatable church membership onboarding workflow from first contact to integration.",
    excerpt: "A structured onboarding journey for member retention.",
    heroEyebrow: "Onboarding guide",
    sections: [
      { title: "Journey design", paragraphs: ["Map stages, owners, and touchpoints from registration to active participation."] },
      { title: "Operational tracking", paragraphs: ["Track completion and handoffs using tasks and standardized data fields."] },
    ],
    relatedLinks: [{ label: "Church CRM", href: "/solutions/church-crm" }],
    cta: { label: "Plan onboarding with our team", href: "mailto:hello@ibadacloud.com?subject=Onboarding%20workflow" },
    keywords: ["church membership onboarding", "church member management"],
    breadcrumbLabel: "Membership onboarding workflow",
  },
];

const FR_GUIDES: PageSeed[] = [
  {
    route: "guides",
    slug: "how-to-choose-church-management-software",
    kind: "guide",
    intent: "informational",
    title: "Comment choisir un logiciel de gestion d'église",
    metaTitle: "Choisir un logiciel de gestion d'église: checklist pratique",
    description: "Une checklist concrète pour évaluer un logiciel de gestion d'église selon vos besoins réels.",
    excerpt: "Un cadre décisionnel pour comité de sélection.",
    heroEyebrow: "Guide",
    sections: [
      { title: "Critères de choix", paragraphs: ["Définissez besoins membres, branches, finances et formulaires avant de comparer les solutions."], bullets: ["Modèle de données", "Rapports", "Automatisation", "Accompagnement"] },
      { title: "Pilote terrain", paragraphs: ["Lancez un pilote de 30 jours avec des cas réels de ministère avant décision finale."] },
    ],
    relatedLinks: [{ label: "Plateforme", href: "/platform" }],
    cta: { label: "Demander une démo guidée", href: "mailto:hello@ibadacloud.com?subject=Demo%20guidee" },
    keywords: ["comment choisir un logiciel de gestion d'église"],
    breadcrumbLabel: "Choisir un logiciel",
  },
  {
    route: "guides",
    slug: "church-crm-implementation-checklist",
    kind: "guide",
    intent: "informational",
    title: "Checklist d'implémentation CRM église",
    metaTitle: "Checklist d'implémentation CRM église pour équipes",
    description: "Checklist d'implémentation CRM église: migration, formation, adoption.",
    excerpt: "Réduisez les risques de déploiement avec une séquence claire.",
    heroEyebrow: "Checklist",
    sections: [
      { title: "Préparation", paragraphs: ["Nettoyez les données membres, validez les foyers et définissez les responsabilités." ] },
      { title: "Mise en service", paragraphs: ["Formez d'abord les admins, puis les responsables, puis les bénévoles avec suivi hebdomadaire."] },
    ],
    relatedLinks: [{ label: "CRM église", href: "/solutions/church-crm" }],
    cta: { label: "Demander un accompagnement", href: "mailto:hello@ibadacloud.com?subject=Implementation%20CRM" },
    keywords: ["checklist implémentation CRM église"],
    breadcrumbLabel: "Checklist implémentation CRM",
  },
  {
    route: "guides",
    slug: "church-member-data-management-best-practices",
    kind: "guide",
    intent: "informational",
    title: "Bonnes pratiques des données membres d'église",
    metaTitle: "Bonnes pratiques de gestion des données membres d'église",
    description: "Bonnes pratiques pour garder des données membres fiables, sécurisées et exploitables.",
    excerpt: "Des règles simples pour une base membres de qualité.",
    heroEyebrow: "Bonnes pratiques",
    sections: [
      { title: "Hygiène des données", paragraphs: ["Standardisez les champs, contrôlez les doublons et clarifiez les rôles de mise à jour."] },
      { title: "Accès et confidentialité", paragraphs: ["Appliquez des droits par rôle et des règles de conservation des notes sensibles."] },
    ],
    relatedLinks: [{ label: "Gestion des membres", href: "/solutions/membership-management" }],
    cta: { label: "Auditer ma base actuelle", href: "mailto:hello@ibadacloud.com?subject=Audit%20donnees%20membres" },
    keywords: ["base de données membres église"],
    breadcrumbLabel: "Données membres",
  },
  {
    route: "guides",
    slug: "church-donation-reporting-template",
    kind: "guide",
    intent: "informational",
    title: "Modèle de rapport dons d'église",
    metaTitle: "Modèle de rapport dons d'église et indicateurs clés",
    description: "Un modèle simple de rapport dons d'église pour vos revues mensuelles et annuelles.",
    excerpt: "Présentez vos données de dons avec clarté.",
    heroEyebrow: "Modèle",
    sections: [
      { title: "Indicateurs essentiels", paragraphs: ["Suivez total des dons, tendances par catégorie, campagnes et écarts."] },
      { title: "Cadence de revue", paragraphs: ["Planifiez revue mensuelle finance et synthèse trimestrielle pour leadership."] },
    ],
    relatedLinks: [{ label: "Finances et dons", href: "/solutions/church-finance" }],
    cta: { label: "Voir la démo reporting", href: "mailto:hello@ibadacloud.com?subject=Demo%20reporting" },
    keywords: ["logiciel dons et offrandes"],
    breadcrumbLabel: "Modèle rapport dons",
  },
  {
    route: "guides",
    slug: "digitize-church-administration",
    kind: "guide",
    intent: "informational",
    title: "Digitaliser l'administration d'une église",
    metaTitle: "Digitaliser l'administration d'une église sans friction",
    description: "Une méthode progressive pour digitaliser l'administration d'église sans casser les équipes.",
    excerpt: "Un plan de modernisation réaliste et progressif.",
    heroEyebrow: "Guide transformation",
    sections: [
      { title: "Déploiement par phases", paragraphs: ["Commencez par les données membres, puis la finance, puis les formulaires et l'automatisation."] },
      { title: "Conduite du changement", paragraphs: ["Limitez les changements simultanés et accompagnez chaque équipe par cas d'usage."] },
    ],
    relatedLinks: [{ label: "Plateforme", href: "/platform" }],
    cta: { label: "Planifier un appel transformation", href: "mailto:hello@ibadacloud.com?subject=Transformation%20digitale" },
    keywords: ["digitaliser son église"],
    breadcrumbLabel: "Digitaliser l'administration",
  },
  {
    route: "guides",
    slug: "church-software-pricing-guide",
    kind: "guide",
    intent: "comparison",
    title: "Guide des prix logiciel d'église",
    metaTitle: "Guide des prix logiciel d'église: critères et choix de formule",
    description: "Comprenez les facteurs de prix d'un logiciel d'église et choisissez la bonne formule.",
    excerpt: "Évitez le surdimensionnement comme le sous-dimensionnement.",
    heroEyebrow: "Guide tarifs",
    sections: [
      { title: "Ce qui influence le prix", paragraphs: ["Le volume membres, la complexité multi-branches, le reporting et l'automatisation sont les facteurs clés."] },
      { title: "Choisir la bonne formule", paragraphs: ["Visez la formule qui couvre vos 12 prochains mois d'exploitation."] },
    ],
    relatedLinks: [{ label: "Comparatif tarifs", href: "/compare/church-management-software-pricing" }],
    cta: { label: "Demander un conseil tarifaire", href: "mailto:hello@ibadacloud.com?subject=Conseil%20tarifs" },
    keywords: ["prix logiciel de gestion d'église"],
    breadcrumbLabel: "Guide des prix",
  },
  {
    route: "guides",
    slug: "multi-site-church-software-playbook",
    kind: "guide",
    intent: "informational",
    title: "Playbook logiciel église multisite",
    metaTitle: "Playbook logiciel église multisite pour opérations et reporting",
    description: "Playbook pratique pour piloter branches, données et reporting dans un contexte multisite.",
    excerpt: "Des pratiques concrètes pour les équipes multi-branches.",
    heroEyebrow: "Playbook opérations",
    sections: [
      { title: "Gouvernance branches", paragraphs: ["Clarifiez propriétaires de données et standards communs entre sites."] },
      { title: "Équilibre central/local", paragraphs: ["Conservez une autonomie locale tout en harmonisant les indicateurs globaux."] },
    ],
    relatedLinks: [{ label: "Gestion des membres", href: "/solutions/membership-management" }],
    cta: { label: "Discuter stratégie multisite", href: "mailto:hello@ibadacloud.com?subject=Strategie%20multisite" },
    keywords: ["logiciel église multisite"],
    breadcrumbLabel: "Playbook multisite",
  },
  {
    route: "guides",
    slug: "church-smart-forms-guide",
    kind: "guide",
    intent: "informational",
    title: "Guide formulaires intelligents église",
    metaTitle: "Guide formulaires intelligents église pour inscriptions et campagnes",
    description: "Concevez des formulaires intelligents pour mieux collecter et exploiter les données d'église.",
    excerpt: "Des modèles de formulaires qui améliorent la qualité des données.",
    heroEyebrow: "Guide formulaires",
    sections: [
      { title: "Conception claire", paragraphs: ["Structurez les champs par profil utilisateur et validez les informations à la saisie."] },
      { title: "Passage à l'action", paragraphs: ["Reliez les soumissions aux tâches et campagnes pour fluidifier les suivis."] },
    ],
    relatedLinks: [{ label: "Formulaires église", href: "/solutions/church-forms" }],
    cta: { label: "Voir une démonstration", href: "mailto:hello@ibadacloud.com?subject=Demo%20formulaires" },
    keywords: ["logiciel formulaires église"],
    breadcrumbLabel: "Guide formulaires",
  },
  {
    route: "guides",
    slug: "church-attendance-tracking-best-practices",
    kind: "guide",
    intent: "informational",
    title: "Bonnes pratiques du suivi de présence",
    metaTitle: "Bonnes pratiques du suivi de présence pour église",
    description: "Améliorez le suivi de présence et les relances pastorales avec des règles simples.",
    excerpt: "Transformez la présence en actions de suivi utiles.",
    heroEyebrow: "Guide présence",
    sections: [
      { title: "Capture cohérente", paragraphs: ["Standardisez les événements de présence et les nomenclatures par branche."] },
      { title: "Relances pertinentes", paragraphs: ["Définissez des seuils de relance pour absences et nouveaux venus."] },
    ],
    relatedLinks: [{ label: "Gestion des membres", href: "/solutions/membership-management" }],
    cta: { label: "Analyser vos flux de présence", href: "mailto:hello@ibadacloud.com?subject=Suivi%20presence" },
    keywords: ["suivi des membres église"],
    breadcrumbLabel: "Suivi de présence",
  },
  {
    route: "guides",
    slug: "church-volunteer-scheduling-guide",
    kind: "guide",
    intent: "informational",
    title: "Guide planification bénévoles église",
    metaTitle: "Guide planification bénévoles église pour équipes ministère",
    description: "Structurer la planification des bénévoles pour réduire la fatigue et sécuriser l'exécution.",
    excerpt: "Des routines simples pour des plannings plus fiables.",
    heroEyebrow: "Guide bénévoles",
    sections: [
      { title: "Cadre de planification", paragraphs: ["Définissez rôles, fenêtres de planning et suppléants."] },
      { title: "Rappels et confirmations", paragraphs: ["Automatisez les rappels pour limiter les absences non anticipées."] },
    ],
    relatedLinks: [{ label: "CRM église", href: "/solutions/church-crm" }],
    cta: { label: "Discuter planning bénévoles", href: "mailto:hello@ibadacloud.com?subject=Planning%20benevoles" },
    keywords: ["planification bénévoles église"],
    breadcrumbLabel: "Planification bénévoles",
  },
  {
    route: "guides",
    slug: "church-finance-controls-checklist",
    kind: "guide",
    intent: "informational",
    title: "Checklist contrôles financiers église",
    metaTitle: "Checklist contrôles financiers église pour plus de fiabilité",
    description: "Checklist de contrôles financiers pour renforcer la fiabilité et la transparence.",
    excerpt: "Des contrôles pratiques pour votre gouvernance financière.",
    heroEyebrow: "Checklist finance",
    sections: [
      { title: "Contrôles de base", paragraphs: ["Formalisez validations, séparation des tâches et responsabilités de catégories."] },
      { title: "Rythme de pilotage", paragraphs: ["Mettez en place un cycle de revue mensuel et un reporting trimestriel leadership."] },
    ],
    relatedLinks: [{ label: "Finances et dons", href: "/solutions/church-finance" }],
    cta: { label: "Évaluer vos contrôles", href: "mailto:hello@ibadacloud.com?subject=Controles%20financiers" },
    keywords: ["contrôles financiers église"],
    breadcrumbLabel: "Contrôles financiers",
  },
  {
    route: "guides",
    slug: "church-membership-onboarding-workflow",
    kind: "guide",
    intent: "informational",
    title: "Workflow d'intégration des nouveaux membres",
    metaTitle: "Workflow d'intégration des nouveaux membres d'église",
    description: "Construisez un workflow reproductible d'intégration des nouveaux membres, du premier contact à l'engagement.",
    excerpt: "Un parcours clair pour améliorer l'accueil et la rétention.",
    heroEyebrow: "Guide onboarding",
    sections: [
      { title: "Parcours cible", paragraphs: ["Définissez les étapes, propriétaires et points de contact de l'arrivée à l'intégration."] },
      { title: "Suivi opérationnel", paragraphs: ["Pilotez les handoffs avec des tâches, statuts et données standardisées."] },
    ],
    relatedLinks: [{ label: "CRM église", href: "/solutions/church-crm" }],
    cta: { label: "Structurer mon onboarding", href: "mailto:hello@ibadacloud.com?subject=Onboarding%20membres" },
    keywords: ["gestion des membres église"],
    breadcrumbLabel: "Onboarding membres",
  },
];

const PAGES_BY_LOCALE: Record<Locale, SeoPage[]> = {
  en: withLocale("en", [...EN_MONEY, ...EN_GUIDES]),
  fr: withLocale("fr", [...FR_MONEY, ...FR_GUIDES]),
};

export function getAllSeoPages(locale: Locale): SeoPage[] {
  return PAGES_BY_LOCALE[locale];
}

export function getPagesByRoute(locale: Locale, route: SeoPageRoute): SeoPage[] {
  return PAGES_BY_LOCALE[locale].filter((page) => page.route === route);
}

export function getSeoPageByRouteAndSlug(
  locale: Locale,
  route: SeoPageRoute,
  slug: string,
): SeoPage | null {
  const out = PAGES_BY_LOCALE[locale].find(
    (page) => page.route === route && page.slug === slug,
  );
  return out ?? null;
}

export function getSeoPagePath(page: Pick<SeoPage, "route" | "slug">): string {
  if (page.route === "platform") {
    return "/platform";
  }

  return `/${page.route}/${page.slug}`;
}

export function getLocalizedPageUrl(page: Pick<SeoPage, "locale" | "route" | "slug">): string {
  return `/${page.locale}${getSeoPagePath(page)}`;
}

export function getRouteHubKeywords(locale: Locale, route: SeoPageRoute): string[] {
  const config = getSeoLocaleConfig(locale);
  if (route === "compare") return config.keywordClusters.comparison;
  if (route === "guides") return config.keywordClusters.informational;
  return config.keywordClusters.transactional;
}

export function getHomepageKeywordSet(locale: Locale): string[] {
  const cluster = collectClusterKeywords(locale);
  return cluster.slice(0, 24);
}
