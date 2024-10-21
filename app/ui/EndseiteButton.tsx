import Link from "next/link"

export default function EndseitenButton() {

    return (
        <div className="fixed bottom-4 flex flex-col items-center justify-center w-full space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
            <Link href={'/'} className="btn btn-primary whitespace-nowrap min-w-[10%] max-w-[40%] sm:max-w-[70%] md:max-w-xs bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            <h1 className="text-center font-bold text-2xl">Aufgabegeschafft</h1>
            </Link>
        </div>
    )
}