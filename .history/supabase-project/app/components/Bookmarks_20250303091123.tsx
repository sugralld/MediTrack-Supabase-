import { getUserBookmarks } from "@/app/actions";
import page

export default async function Bookmarks() {
  const bookmarks = await getUserBookmarks();

  return <BookmarksPage bookmarks={bookmarks} />;
}
