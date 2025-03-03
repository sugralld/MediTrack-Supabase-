"use server";

import { supabase } from "@/lib/supabase_client";
import { revalidatePath } from "next/cache";

// fetch medicine list
export async function getMedicines() {
  const { data, error } = await supabase.from("medicines").select("*");
  if (error) {
    console.error("Error fetching medicines: ", error.message);
    return [];
  }
  return data;
}

// fetch medicine by id
export const getMedicineById = async (id: string) => {
  const { data, error } = await supabase
    .from("medicines")
    .select("*")
    .eq("id", id)
    .single(); // ambil satu item saja

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// add new medicine
export async function addMedicine(formData: FormData) {

  console.log("addMedicine dipanggil!");

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const classification = formData.get("classification") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as File;

  console.log("Data input:", { name, description, price, stock, classification, category });


  // upload image to Supabase storage
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

  // insert medicine data to database
  const { error } = await supabase.from("medicines").insert([
    { name, description, price, stock, classification, category, image_url, created_at: new Date() },
  ]);

  if (error) {
    console.error("Error adding medicine: ", error.message);
    return;
  }

  console.log("Medicine added successfully!");

  revalidatePath("/");
}

// edit medicine
export async function editMedicine(id: string, updatedData: {
  name: string;
  description: string;
  stock: number;
  classification: string;
  category: string;
  image_url: string;
}) {
  console.log("editMedicine dipanggil!", id);

  const { error } = await supabase
    .from("medicines")
    .update(updatedData)
    .eq("id", id);

  if (error) {
    console.error("Error updating medicine: ", error.message);
    throw new Error("Failed to update medicine.");
  }

  console.log("Medicine updated successfully!");
  revalidatePath("/");
}


// delete medicine
export async function deleteMedicine(id: string) {
  console.log("deleteMedicine dipanggil!", id);

  const { error } = await supabase.from("medicines").delete().eq("id", id);

  if (error) {
    console.error("Error deleting medicine: ", error.message);
    return;
  }

  console.log("Medicine deleted successfully!");
  revalidatePath("/");
}