"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-lg border border-white/10 bg-[#1F2937]/50 px-3 py-2.5 text-sm text-[#F9FAFB] outline-none transition-colors placeholder:text-[#6B7280] focus:border-[#059669]/50 focus:ring-1 focus:ring-[#059669]/25";

const labelClass = "text-sm font-medium text-[#D1D5DB]";

type ContactFormLabels = {
  nameLabel: string;
  emailLabel: string;
  organizationLabel: string;
  messageLabel: string;
  submitLabel: string;
  note: string;
  validationHint: string;
};

type ContactFormProps = {
  contactEmail: string;
  mailtoSubject: string;
  labels: ContactFormLabels;
  className?: string;
};

export function ContactForm({
  contactEmail,
  mailtoSubject,
  labels,
  className,
}: ContactFormProps) {
  const formId = useId();
  const [touchedSubmit, setTouchedSubmit] = useState(false);

  function buildMailto(fd: FormData): string {
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const organization = String(fd.get("organization") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const bodyLines = [
      name && `Name: ${name}`,
      email && `Email: ${email}`,
      organization && `Organization: ${organization}`,
      "",
      message && message,
    ].filter(Boolean);

    const body = bodyLines.join("\n");
    const q = new URLSearchParams({
      subject: mailtoSubject,
      body: body || "(no message)",
    });
    return `mailto:${contactEmail}?${q.toString()}`;
  }

  return (
    <form
      id={formId}
      className={cn("space-y-5", className)}
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const email = String(fd.get("email") ?? "").trim();
        const message = String(fd.get("message") ?? "").trim();
        if (!email || !message) {
          setTouchedSubmit(true);
          return;
        }
        setTouchedSubmit(false);
        window.location.href = buildMailto(fd);
      }}
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className={labelClass}>{labels.nameLabel}</span>
          <input name="name" type="text" autoComplete="name" className={fieldClass} />
        </label>
        <label className="block space-y-1.5">
          <span className={labelClass}>{labels.emailLabel}</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={touchedSubmit ? true : undefined}
            className={cn(fieldClass, "aria-invalid:border-red-500/50")}
          />
        </label>
      </div>
      <label className="block space-y-1.5">
        <span className={labelClass}>{labels.organizationLabel}</span>
        <input
          name="organization"
          type="text"
          autoComplete="organization"
          className={fieldClass}
        />
      </label>
      <label className="block space-y-1.5">
        <span className={labelClass}>{labels.messageLabel}</span>
        <textarea
          name="message"
          required
          rows={5}
          aria-invalid={touchedSubmit ? true : undefined}
          className={cn(
            fieldClass,
            "min-h-30 resize-y leading-relaxed aria-invalid:border-red-500/50",
          )}
        />
      </label>
      {touchedSubmit ? (
        <p className="text-sm text-amber-200/90" role="status">
          {labels.validationHint}
        </p>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <Button
          type="submit"
          className="h-11 w-full rounded-lg bg-[#059669] px-6 text-sm font-semibold text-white hover:bg-[#047857] sm:w-auto"
        >
          {labels.submitLabel}
        </Button>
        <p className="text-xs leading-relaxed text-[#6B7280] sm:max-w-56">{labels.note}</p>
      </div>
    </form>
  );
}
