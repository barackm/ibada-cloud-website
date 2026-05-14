import type { ReactNode } from "react";
import { getDictionary, type Locale } from "@/dictionaries/index";
import { Header } from "@/app/components/landing/header";
import { Footer } from "@/app/components/landing/site-footer";

type Props = {
  locale: Locale;
  children: ReactNode;
};

export async function SeoShell({ locale, children }: Props) {
  const content = await getDictionary(locale);

  return (
    <div className="min-h-full min-w-0 bg-[#111827] text-[#F9FAFB]">
      <Header navigation={content.navigation} lang={locale} />
      {children}
      <Footer footer={content.footer} lang={locale} />
    </div>
  );
}
