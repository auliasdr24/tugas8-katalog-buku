
import BookCard from "../components/BookCard";
import { useFavorites } from "../context/FavoriteContext";
import PageHeading from "../components/PageHeading";

export default function FavoritePage() {
  const { favorites } = useFavorites();

  return (
    <section>
        <PageHeading
        title="Buku Favorit"
        description="Daftar buku yang sudah kamu simpan."
        />

      {favorites.length === 0 ? (
        <div className="status-message">
          <p>Belum ada buku favorit. Yuk, cari buku di halaman Beranda!</p>
        </div>
      ) : (
        <div className="book-grid">
          {favorites.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}
