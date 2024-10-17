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
            <h1 className="text-center font-bold mb-4">Überblick</h1>
            <div className="float-left border-solid border-2 border-black rounded-lg min-w-[40%] p-2">
              <h1 className="mb-2 font-bold">{anleitung.title}</h1>
              <p className="">Dauer: {anleitung.duration} min</p>
              <p className="mb-2">Datum: {new Date(anleitung.date).toLocaleDateString()}</p>

              {anleitung.schritte?.map(schritt => (
                <ul className="m-1" key={schritt.id} >
                  <li> - {schritt.title}</li>
                </ul>
              ))}
            <Link
                href={{
                pathname: `/Anleitung/${params.id}/schritte`,
                query: { schritte: JSON.stringify(anleitung.schritte) }
                }} className={clsx("text-blue-500 hover:underline")}>
                <button className={clsx("btn btn-primary mt-4 m-2", "text-blue-500")}>
                Zu den Schritten
                </button>
            </Link>
            </div>
            <div className="lg:max-w-[40vw] lg:max-h-[45] rounded-lg float-right min-w-[40%]">
              <Image
                src={'/Testbild.jpg'}
                width={550}
                height={330}
                alt="Logo"
                className="rounded-lg hidden lg:block"
              />
              <Image
                src={'/Testbild.jpg'}
                width={150}
                height={150}
                alt="Logo"
                className="rounded-lg block lg:hidden"
              />
            </div>
        </>
    )
}