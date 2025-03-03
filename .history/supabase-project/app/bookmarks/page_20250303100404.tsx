export const dynamic = "force-static"; // Halaman static default
export const dynamicParams = true;


import { getUserBookmarks } from "@/app/actions";
import BookmarksPage from "../components/BookmarksPage";

export default async function Bookmarks() {
  const bookmarks = await getUserBookmarks();

  return <BookmarksPage bookmarks={bookmarks} />;
}
