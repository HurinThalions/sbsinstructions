import Statusbar from "@/app/ui/anleitungenerstellen/statusbar";
import ErsteInfosaufnehmen from "@/app/ui/anleitungenerstellen/ersteinfos";

export default async function AnleitungerstellenPage() {

  return (
    <main>
      <Statusbar />
      <h1 className="text-lg font-bold mb-4 text-center">Anleitung erstellen</h1>
      <ErsteInfosaufnehmen />
    </main>
  );
}
