import { getUserBookmarks } from "@/app/actions";

export default async function Bookmarks() {
  const bookmarks = await getUserBookmarks();

  return <BookmarksPage bookmarks={bookmarks} />;
}
