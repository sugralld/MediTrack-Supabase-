import { getMedicines } from "./actions";

export default async function Home() {
  const medicines = await getMedicines();
  return (
    <main className="max-w-3xl mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Daftar Obat</h1>
    <ul className="space-y-2">
      {medicines.length > 0 ? (
        medicines.map((med) => (
          <li key={med.id} className="border p-4 rounded-md shadow-md">
            <p className="text-lg font-semibold">{med.name}</p>
            <p className="text-sm text-gray-600">Harga: Rp{med.price}</p>
          </li>
        ))
      ) : (
        <p className="text-gray-500">Tidak ada data obat.</p>
      )}
    </ul>
  </main>
  );
}
