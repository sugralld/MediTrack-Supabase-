import { getUserBookmarks } from "@/app/actions";
import BookmarksPage from "../components/BookmarksPage";
import book

export default async function Bookmarks() {
  const bookmarks = await getUserBookmarks();

  return <BookmarksPage bookmarks={bookmarks} />;
}
