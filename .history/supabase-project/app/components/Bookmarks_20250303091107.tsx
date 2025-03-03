import { getUserBookmarks } from "@/app/actions";
import BookmarksPage from "./BookmarksPage";

export default async function Bookmarks() {
  const bookmarks = await getUserBookmarks();

  return <BookmarksPage bookmarks={bookmarks} />;
}
