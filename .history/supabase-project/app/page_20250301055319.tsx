import { getMedicines, addMedicine } from "./actions";

export default async function Home() {
  const medicines = await getMedicines();

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Obat</h1>

      {/* Form Tambah Obat */}
      <form action={addMedicine} className="mb-4 space-y-2">
        <input type="text" name="name" placeholder="Nama Obat" className="border p-2 rounded-md w-full" required />
        <textarea name="description" placeholder="Deskripsi Obat" className="border p-2 rounded-md w-full" required></textarea>
        <input type="number" name="price" placeholder="Harga" className="border p-2 rounded-md w-full" required />
        <input type="number" name="stock" placeholder="Stok" className="border p-2 rounded-md w-full" required />

        {/* Dropdown Classification */}
        <select name="classification" className="border p-2 rounded-md w-full" required>
          <option value="">Pilih Klasifikasi</option>
          <option value="Obat Bebas">Antibiotik</option>
          <option value="Obat Bebas Ter">Analgesik</option>
          <option value="Vitamin">Vitamin</option>
          <option value="Obat Herbal">Obat Herbal</option>
        </select>

        {/* Dropdown Category */}
        <select name="category" className="border p-2 rounded-md w-full" required>
          <option value="">Pilih Kategori</option>
          <option value="Tablet">Tablet</option>
          <option value="Kapsul">Kapsul</option>
          <option value="Sirup">Sirup</option>
          <option value="Salep">Salep</option>
        </select>

        <input type="file" name="image" accept="image/*" className="border p-2 rounded-md w-full" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Tambah</button>
      </form>

      {/* List Obat */}
      <ul className="space-y-2">
        {medicines.length > 0 ? (
          medicines.map((med) => (
            <li key={med.id} className="border p-4 rounded-md shadow-md">
              <img src={med.image_url} alt={med.name} className="w-20 h-20 object-cover rounded-md mb-2" />
              <p className="text-lg font-semibold">{med.name}</p>
              <p className="text-sm">{med.description}</p>
              <p className="text-sm text-gray-600">Harga: Rp{med.price}</p>
              <p className="text-sm text-gray-600">Stok: {med.stock}</p>
              <p className="text-sm text-gray-600">Klasifikasi: {med.classification}</p>
              <p className="text-sm text-gray-600">Kategori: {med.category}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Tidak ada data obat.</p>
        )}
      </ul>
    </main>
  );
}
