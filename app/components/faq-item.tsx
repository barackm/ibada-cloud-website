type FaqItemProps = {
  question: string;
  answer: string;
};

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="group rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-medium text-white">
        <span>{question}</span>
        <span className="text-xl text-white/50 transition-transform duration-200 group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65 sm:text-[0.95rem]">
        {answer}
      </p>
    </details>
  );
}
