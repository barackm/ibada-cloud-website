import Image from "next/image";

type MockupFrameProps = {
  src: string;
  alt: string;
  title: string;
  className?: string;
};

export function MockupFrame({ src, alt, title, className }: MockupFrameProps) {
  return (
    <div
      className={[
        "overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0f1013] shadow-[0_28px_70px_-34px_rgba(0,0,0,0.75)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="size-2.5 rounded-full bg-white/12" />
          <span className="size-2.5 rounded-full bg-white/12" />
        </div>
        <span className="text-xs uppercase tracking-[0.24em] text-white/45">
          {title}
        </span>
      </div>
      <div className="bg-[#17181d] p-2 sm:p-3">
        <Image
          src={src}
          alt={alt}
          width={3024}
          height={1656}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 900px"
          className="block h-auto w-full rounded-[1rem] border border-white/6"
        />
      </div>
    </div>
  );
}
