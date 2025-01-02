import { redirect } from "next/navigation";
import { Paths } from "@/utils/enum";

export default async function Home() {
  redirect(Paths.HOME);
}
