import Statusbar from "@/app/ui/anleitungenerstellen/statusbar";
import ErsteInfosaufnehmen from "@/app/ui/anleitungenerstellen/ersteinfos";
import HolletzteAnleitung from "@/app/ui/anleitungenerstellen/holanleitungsid";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";

export default async function AnleitungerstellenPage() {
  const session = await getServerSession(authOptions);

  const user = session?.user?.name || null;

  return (
    <main>
      <Statusbar />
      <ErsteInfosaufnehmen />
      {user && <HolletzteAnleitung user={user} />}  {/* Weiterbutton für eingeloggte User */}
    </main>
  );
}