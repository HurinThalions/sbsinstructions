import { fetchletzteAnleitungUser } from "@/app/lib/data";
import WeiterButton from "./weiterbutton";

export default async function HolletzteAnleitung({
  user,
}: {
  user: string;
}) {
  const anleitungId = await fetchletzteAnleitungUser(user);

  return (
    <div className="fixed bottom-4 flex items-center justify-center w-full space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
      <WeiterButton anleitungId={anleitungId} />
    </div>
  )
}