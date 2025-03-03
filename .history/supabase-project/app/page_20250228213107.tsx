import { getMedicines } from "./actions";

const medicines = await getMedicines();

export default function Home() {
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
