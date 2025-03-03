import { getMedicines, add } from "./actions";

export default async function Home() {
  const medicines = await getMedicines();
  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Obat</h1>

      {/* Tombol Tambah Obat */}
      <form action={addMedicine} className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Nama Obat"
          className="border p-2 rounded-md mr-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Harga"
          className="border p-2 rounded-md mr-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Tambah
        </button>
      </form>

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
