import Link from "next/link";

export default function EndseitenButton() {
  return (
    <div className="fixed bottom-4 w-full flex justify-center">
      <Link href={'/'}>
        <button className="btn btn-primary min-w-[10%] max-w-xs bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          Zurück zum Katalog
        </button>
      </Link>
    </div>
  );
}