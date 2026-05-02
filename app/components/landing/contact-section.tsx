import Link from "next/link";
import type { WebsiteContent } from "@/src/lib/website-content";
import type { Locale } from "@/dictionaries/index";
import { withLang } from "@/app/lib/routes";
import { ContactForm } from "@/app/components/landing/contact-form";
import { cn } from "@/lib/utils";

type ContactSectionProps = {
  contact: WebsiteContent["contact"];
  contactEmail: string;
  lang: Locale;
  className?: string;
};

export function ContactSection({
  contact,
  contactEmail,
  lang,
  className,
}: ContactSectionProps) {
  const { mailtoSubject, ...formLabels } = contact.form;

  return (
    <section
      id="contact"
      className={cn(
        "scroll-mt-28 border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20 md:py-24",
        className,
      )}
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div className="max-w-xl lg:max-w-none">
          <p className="text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
            {contact.eyebrow}
          </p>
          <h2
            id="contact-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-[#F9FAFB] sm:text-3xl"
          >
            {contact.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
            {contact.description}
          </p>

          <p className="mt-8 text-sm font-medium text-[#D1D5DB]">{contact.directLabel}</p>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-1 inline-block text-base text-[#059669] underline decoration-[#059669]/40 underline-offset-4 transition hover:text-[#34d399] hover:decoration-[#34d399]/50 sm:text-lg"
          >
            {contactEmail}
          </a>

          <p className="mt-6 text-sm leading-relaxed text-[#9CA3AF]">{contact.responseBlurb}</p>

          <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-[#D1D5DB] marker:text-[#6B7280]">
            {contact.bullets.map((line) => (
              <li key={line} className="leading-relaxed">
                {line}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-[#6B7280]">{contact.pricingPrompt}</p>
          <Link
            href={withLang("/#pricing", lang)}
            className="mt-1 inline-block text-sm font-medium text-[#E5E7EB] underline-offset-4 hover:underline"
          >
            {contact.pricingLinkLabel}
          </Link>
        </div>

        <div className="lg:pt-2">
          <h3 className="text-lg font-semibold text-[#F9FAFB]">{contact.formCardTitle}</h3>
          <p className="mt-1 text-sm text-[#9CA3AF]">{contact.formCardSubtitle}</p>
          <ContactForm
            className="mt-6"
            contactEmail={contactEmail}
            mailtoSubject={mailtoSubject}
            labels={formLabels}
          />
        </div>
      </div>
    </section>
  );
}
