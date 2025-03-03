"use server";

import { supabase } from "@/lib/supabase_client";
import { revalidatePath } from "next/cache";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Bookmark } from "@/types";

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

  return profile?.role || "Unknown"; 
}

// fetch medicine list
export async function getMedicines() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from("medicines").select("*");
  if (error) {
    console.error("Error fetching medicines: ", error.message);
    return [];
  }
  return data;
}

// fetch medicine by id
export const getMedicineById = async (id: string) => {
  const supabase = createServerComponentClient({ cookies });
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
  const supabase = createServerActionClient({ cookies });

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

  revalidatePath("/admin/dashboard");
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
  const supabase = createServerActionClient({ cookies });

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
  revalidatePath("/admin/dashboard");
}


// delete medicine
export async function deleteMedicine(id: string) {
  const supabase = createServerActionClient({ cookies });

  console.log("deleteMedicine dipanggil!", id);

  const { error } = await supabase.from("medicines").delete().eq("id", id);

  if (error) {
    console.error("Error deleting medicine: ", error.message);
    return;
  }

  console.log("Medicine deleted successfully!");
  revalidatePath("/admin/dashboard");
}

// add bookmark
export async function addBookmark(medicine_id: string) {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user_id = session.user.id;

  const { error } = await supabase.from("bookmarks").insert({
    user_id,
    medicine_id,
  });

  if (error) throw error;

  return true;
}

// user bookmarks
export async function getUserBookmarks(): Promise<Bookmark[]> {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("bookmarks")
    .select(`
      id,
      medicine_id,
      medicines!inner (
        id,
        name,
        description,
        price,
        stock,
        classification,
        category,
        image_url
      )
    `)
    .eq("user_id", session.user.id);

  if (error) throw new Error(error.message);

  return (
    data?.map((bookmark) => ({
      id: bookmark.id,
      medicine_id: bookmark.medicine_id,
      medicines: bookmark.medicines ?? null, // Ini udah object
    })) ?? []
  );
}

// remove bookmark
export async function removeBookmark(bookmarkId: string) {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", bookmarkId)
    .eq("user_id", session.user.id); // biar aman, cuma hapus bookmark milik user ini

  if (error) {
    console.error("Failed to delete bookmark:", error.message);
    throw new Error(error.message);
  }

  return { success: true };
}
