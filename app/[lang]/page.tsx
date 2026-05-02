import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/dictionaries/index";
import { Header } from "@/app/components/landing/header";
import { HeroSection } from "@/app/components/landing/hero-section";
import { AboutSection } from "@/app/components/landing/about-section";
import { PricingSection } from "@/app/components/landing/pricing-section";
import { PricingComparison } from "@/app/components/landing/pricing-comparison";
import { CtaSection } from "@/app/components/landing/cta-section";
import { ContactSection } from "@/app/components/landing/contact-section";
import { Footer } from "@/app/components/landing/site-footer";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const content = await getDictionary(lang as Locale);

  return (
    <div className="min-h-full min-w-0 bg-[#111827] text-[#F9FAFB]">
      <Header navigation={content.navigation} lang={lang as Locale} />
      <main className="min-w-0">
        <HeroSection hero={content.hero} lang={lang as Locale} />
        <AboutSection about={content.about} />
        <PricingSection pricing={content.pricing} />
        <PricingComparison
          comparison={content.pricingComparison}
          plans={content.pricing.plans}
        />
        <CtaSection cta={content.cta} lang={lang as Locale} />
        <ContactSection
          contact={content.contact}
          contactEmail={content.footer.contactEmail}
          lang={lang as Locale}
        />
      </main>
      <Footer footer={content.footer} lang={lang as Locale} />
    </div>
  );
}
