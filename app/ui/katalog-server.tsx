import { fetchgefilterteAnleitungen } from "../lib/data";
import KatalogClient from "./katalog";

export default async function KatalogServer({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const anleitungen = await fetchgefilterteAnleitungen(query, currentPage);

    return <KatalogClient anleitungen={anleitungen} />;
}