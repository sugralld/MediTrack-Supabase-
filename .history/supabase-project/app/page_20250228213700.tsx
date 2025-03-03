import { getMedicines } from "./actions";

export default function Home() {
  const medicines = await getMedicines();
  return (
    <div>
      {medicines.map((med) => (
        <li key={med.id} className="border p-2 rounded-md mb-2">
          <p className="font-semibold">{med.name}</p>
          <p>Harga: Rp{med.price}</p>
        </li>
      ))}
    </div>
  );
}
