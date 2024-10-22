import Statusbar from "@/app/ui/anleitungenerstellen/statusbar";
import ErsteInfosaufnehmen from "@/app/ui/anleitungenerstellen/ersteinfos";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";

export default async function AnleitungerstellenPage() {
  const session = await getServerSession(authOptions);

  const user = session?.user?.name || null;

  return (
    <main>
      <Statusbar />
      <ErsteInfosaufnehmen />
    </main>
  );
}