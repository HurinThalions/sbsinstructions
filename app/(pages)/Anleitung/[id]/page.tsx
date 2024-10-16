import { fetchAnleitungMitSchritten } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";

export default async function AnleitungPage({
  params,
}: {
  params: { id: string };
}) {
  const anleitung = await fetchAnleitungMitSchritten(params.id);

  return (
    <main>
      <div className="flow-root display-flex">
        <div className="float-left border-solid border-2 border-black rounded-lg">
          <h1>{anleitung.titel}</h1>
          <p>Dauer: {anleitung.dauer}</p>
          <p>Datum: {anleitung.datum}</p>

          {anleitung.schritte?.map(schritt => (
            <div key={schritt.id}>
              <h2>{schritt.titel}</h2>
              <p>{schritt.beschreibung}</p>
            </div>
          ))}

          <Link href={`/Anleitung/${params.id}/schritte`}>
            <button className="btn btn-primary mt-4">
              Zu den Schritten
            </button>
          </Link>
        </div>
        <div className="lg:max-w-[40vw] lg:max-h-[45] rounded-lg float-right ml-[2vw]">
          <Image
            src={'/Testbild.jpg'}
            width={600}
            height={400}
            alt="Logo"
            className="hidden lg:block"
          />
          <Image
            src={'/Testbild.jpg'}
            width={150}
            height={150}
            alt="Logo"
            className="block lg:hidden"
          />
        </div>
      </div>
    </main>
  );
}