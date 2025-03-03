import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { 
    persistSession: true,
    autoRefreshToken: true,
   } }
);

// Cek apakah user sudah login
async function checkAuth() {
  const { data, error } = await supabase.auth.getSession();
  console.log("User Session:", data?.session);
  if (error) console.error("Auth error:", error.message);
}

checkAuth();

export { supabase };