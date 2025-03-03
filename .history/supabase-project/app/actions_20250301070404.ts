'use server'

import { supabase } from "@/lib/supabase_client"

// fetch medicine list
export async function getMedicines() {
    const { data, error } = await supabase.from("medicines").select("*");
    if(error) {
        console.error("Error fetching medicines: ", error.message)
        return [];
    }
    return data;
}

// Add new medicine
export async function addMedicine(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));

  const { error } = await supabase.from("medicines").insert([{ name, price }]);

  if (error) {
    console.error("Error adding medicine: ", error.message);
    return;
  }

  console.log("Medicine added successfully!");
}