"use server";

import { supabase } from "@/lib/supabase_client";

// Fetch medicine list
export async function getMedicines() {
  const { data, error } = await supabase.from("medicines").select("*");
  if (error) {
    console.error("Error fetching medicines: ", error.message);
    return [];
  }
  return data;
}

// Add new medicine
export async function addMedicine(formData: FormData) {

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const classification = formData.get("classification") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as File;

  console.log("Data input:", { name, description, price, stock, classification, category });


  // Upload image ke Supabase Storage
  const fileExt = image.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `medicines/${fileName}`;

  const { data: imageData, error: uploadError } = await supabase.storage
    .from("medicine_images")
    .upload(filePath, image);

  if (uploadError) {
    console.error("Error uploading image: ", uploadError.message);
    return;
  }

  const image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/medicine_images/${filePath}`;

  // Insert data obat ke database
  const { error } = await supabase.from("medicines").insert([
    { name, description, price, stock, classification, category, image_url, created_at: new Date() },
  ]);

  if (error) {
    console.error("Error adding medicine: ", error.message);
    return;
  }

  console.log("Medicine added successfully!");
}
