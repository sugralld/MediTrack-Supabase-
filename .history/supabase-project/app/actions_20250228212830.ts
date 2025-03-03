'use server'

import { supabase } from "@/lib/supabase_client"

// fetch medicine list
export async function getMedicines() {
    const { data, error } = await supabase.from("medicines").select("*")
    if(error) {
        console.error("Error fetching medicines: ", error.message)
    }
}