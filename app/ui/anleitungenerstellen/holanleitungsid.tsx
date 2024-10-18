import { fetchletzteAnleitungUser } from "@/app/lib/data";
import WeiterButton from "./weiterbutton";

export default async function HolletzteAnleitung({
  user,
}: {
  user: string;
}) {
  const anleitungId = await fetchletzteAnleitungUser(user);

  return <WeiterButton anleitungId={anleitungId} />;
}