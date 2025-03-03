"use server";

import { supabase } from "@/lib/supabase_client";
import { revalidatePath } from "next/cache";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// user role
export async function getUserRole() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error getting user:", userError);
    return "Unknown";
  }

  if (!user) return "Unknown";

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching user role:", profileError);
    return "Unknown";
  }

  console.log("USER:", user);
  console.log("ERROR:", Error);

  return profile?.role || "Unknown"; 
}

// login as admin
export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("Login Admin Error: ", error.message);
    return { error: error.message };
  }

  // Setelah login berhasil
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (!existingUser) {
    await supabase.from("users").insert({
      id: data.user.id,
      role: "Guest", // Atau sesuai kebutuhan
    });
  }

  return { user: data.user };
}

// login as guest
export async function loginGuest() {
  const guestEmail = "guest@email.com";
  const guestPassword = "123456";

  const { data, error } = await supabase.auth.signInWithPassword({
    email: guestEmail,
    password: guestPassword,
  });

  if (error) {
    console.error("Login Guest Error: ", error.message);
    return { error: error.message };
  }

  // Setelah login berhasil
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (!existingUser) {
    await supabase.from("users").insert({
      id: data.user.id,
      role: "Guest", // Atau sesuai kebutuhan
    });
  }

  return { user: data.user };
}


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
  price: number;
  stock: number;
  classification: string;
  category: string;
  image_url: string;
}) {
  console.log("editMedicine dipanggil dengan ID:", id);
  console.log("Data yang dikirim ke Supabase:", updatedData);

  const { error } = await supabase
    .from("medicines")
    .update(updatedData)
    .eq("id", id)
    .select("*");

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

// add bookmark
export async function addBookmark(id: string) {
}