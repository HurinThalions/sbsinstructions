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
            <div className="float-left border-solid border-2 border-black rounded-lg min-w-[40%]">
              <h1 className="m-2">{anleitung.titel}</h1>
              <p className="m-2">Dauer: {anleitung.dauer} min</p>
              <p className="m-2">Datum: {anleitung.datum}</p>

              {anleitung.schritte?.map(schritt => (
                <ul className="m-1" key={schritt.id} >
                  <li> - {schritt.titel}</li>
                </ul>
              ))}

                <Link href={`/Anleitung/${params.id}/schritte`} className={clsx("text-blue-500 hover:underline")}>
                    <button className={clsx("btn btn-primary mt-4 m-2", "text-blue-500")}>
                        Zu den Schritten
                    </button>
                </Link>
            </div>
            <div className="lg:max-w-[40vw] lg:max-h-[45] rounded-lg float-right min-w-[40%]">
              <Image
                src={'/Testbild.jpg'}
                width={550}
                height={350}
                alt="Logo"
                className="rounden-xl hidden lg:block"
              />
              <Image
                src={'/Testbild.jpg'}
                width={150}
                height={150}
                alt="Logo"
                className="block lg:hidden"
              />
            </div>
        </>
    )
}