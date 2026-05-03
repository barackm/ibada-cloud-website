import { redirect } from "next/navigation";
import { defaultLocale } from "@/dictionaries/index";

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
