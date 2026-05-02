type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={["flex max-w-2xl flex-col gap-3", alignment].join(" ")}>
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/45">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-pretty text-sm leading-7 text-white/62 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
