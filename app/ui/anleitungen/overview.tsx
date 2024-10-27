import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { fetchAnleitungMitSchritten } from "@/app/lib/data";

export default async function Overview({
    params,
}: {
    params: { id: string };
}) {

    const anleitung = await fetchAnleitungMitSchritten(params.id);

    return (
      <>
        <div className="flow-root display-flex p-4">
            <h1 className="text-center font-bold text-2xl mb-4">Überblick</h1>
            <div className="float-left border-solid border-2 border-black rounded-lg min-w-[45%]">
              <h1 className="mb-2 font-bold">{anleitung.title}</h1>
              <p>Dauer: {anleitung.duration} min</p>
              <p className="mb-2">Datum: {new Date(anleitung.date).toLocaleDateString()}</p>

              {anleitung.schritte?.map(schritt => (
                <ul className="m-1" key={schritt.id} >
                  <li> - {schritt.title}</li>
                </ul>
              ))}
            </div>

            <div className="lg:max-w-[40vw] lg:max-h-[45] rounded-lg float-right min-w-[45%]">
              <Image
                src={`${anleitung.image}`}
                width={500}
                height={280}
                alt="Bild der Anleitung"
                className="rounded-lg border-solid border-2 border-black hidden lg:block"
              />
              <Image
                src={`${anleitung.image}`}
                width={150}
                height={100}
                alt="Bild der Anleitung"
                className="rounded-lg border-solid border-2 border-black block lg:hidden"
              />
            </div>
            </div>
            <div className="fixed bottom-4 flex flex-col items-center justify-center w-full space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
                <Link href="/">
                    <button className="w-full max-w-[100%] lg:max-w-xs bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 whitespace-nowrap">
                        Zurück zum Katalog
                    </button>
                </Link>

                <Link
                    href={{
                    pathname: `/Anleitung/${params.id}/schritte`,
                    query: { schritte: JSON.stringify(anleitung.schritte) }
                    }}>
                    <button className="w-full max-w-[100%] lg:max-w-xs bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 whitespace-nowrap">
                        Zu den Schritten
                    </button>
                </Link>
            </div>
      </>
    )
}