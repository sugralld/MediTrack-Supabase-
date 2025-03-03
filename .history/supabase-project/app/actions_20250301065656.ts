"use server";

import { 
import { cookies } from "next/headers";

// 🛠 Fungsi untuk membuat Supabase Client di Server
function getSupabase() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (key) => cookieStore.get(key)?.value } }
  );
}

// 🛠 Fetch medicine list
export async function getMedicines() {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("medicines").select("*");
  if (error) {
    console.error("Error fetching medicines:", error.message);
    return [];
  }
  return data;
}

// 🛠 Add new medicine
export async function addMedicine(formData: FormData) {
  const supabase = getSupabase();
  
  // 🔥 Fix cara ambil session di server
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User is not authenticated");
  }

  console.log("addMedicine dipanggil oleh:", user.email);

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const classification = formData.get("classification") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as File;

  console.log("Data input:", { name, description, price, stock, classification, category });

  // 🛠 Upload image ke Supabase Storage
  const fileExt = image.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `medicines/${fileName}`;

  const { data: imageData, error: uploadError } = await supabase.storage
    .from("medicine_images")
    .upload(filePath, image);

  if (uploadError) {
    console.error("Error uploading image:", uploadError.message);
    throw new Error("Gagal upload gambar");
  }

  const image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/medicine_images/${filePath}`;

  // 🛠 Insert data obat ke database
  const { error } = await supabase.from("medicines").insert([
    { 
      user_id: user.id, // Tambahkan user_id supaya data hanya bisa diakses oleh user terkait
      name, 
      description, 
      price, 
      stock, 
      classification, 
      category, 
      image_url, 
      created_at: new Date() 
    }
  ]);

  if (error) {
    console.error("Error adding medicine:", error.message);
    throw new Error("Gagal menambahkan obat");
  }

  console.log("Medicine added successfully!");
}
