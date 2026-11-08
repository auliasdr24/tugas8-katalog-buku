import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import {
  getCoverUrl,
  type Book,
} from "../services/bookService";
import { useFavorites } from "../context/FavoriteContext";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(book.key);

  function toggleFavorite() {
    if (favorite) {
      removeFavorite(book.key);
    } else {
      addFavorite(book);
    }
  }

  return (
    <article className="book-card">
      {book.cover_i ? (
        <img
            src={getCoverUrl(book.cover_i) ?? ""}
            alt={book.title}
            onError={(e) => {
            e.currentTarget.style.display = "none";
            }}
        />
        ) : (
        <div className="cover-placeholder">
            Sampul tidak tersedia
        </div>
        )}

      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.author_name?.[0] ?? "Penulis tidak diketahui"}</p>
        <p>{book.first_publish_year ?? "Tahun tidak diketahui"}</p>

        <div className="book-actions">
          <Link to={`/buku/${encodeURIComponent(book.key)}`}>
            Detail
          </Link>

          <button onClick={toggleFavorite} type="button">
            <Heart
              size={18}
              fill={favorite ? "red" : "none"}
              color={favorite ? "red" : "currentColor"}
            />
          </button>
        </div>
      </div>
    </article>
  );
}