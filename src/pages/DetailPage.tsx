
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getBookDetail,
  getCoverUrl,
  type Book,
} from "../services/bookService";
import StatusMessage from "../components/StatusMessage";
import { useFavorites } from "../context/FavoriteContext";
import { Heart } from "lucide-react";

interface BookDetail extends Book {
  description?: string | { value: string };
  subjects?: string[];
  covers?: number[];
}

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          throw new Error("ID buku tidak ditemukan.");
        }

        const result = await getBookDetail(decodeURIComponent(id));
        setBook(result as BookDetail);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Gagal mengambil detail buku."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  if (loading) {
    return <StatusMessage type="loading" />;
  }

  if (error) {
    return <StatusMessage type="error" message={error} />;
  }

  const currentBook = book;

  if (!currentBook) {
    return <StatusMessage type="empty" />;
  }

  const description =
    typeof currentBook.description === "string"
      ? currentBook.description
      : currentBook.description?.value;

  const coverUrl = currentBook.covers?.[0]
    ? getCoverUrl(currentBook.covers[0])
    : null;

  const favorite = isFavorite(currentBook.key);

  return (
    <section className="detail-page">
      <Link to="/" className="detail-back">
        <span>←</span> Kembali ke Beranda
      </Link>

      <div className="detail-hero">
        <div className="detail-cover-area">
          <span className="detail-cover-label">
            BUKUKITA COLLECTION
          </span>

          <div className="detail-cover">
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={`Cover ${currentBook.title}`}
              />
            ) : (
              <div className="detail-no-cover">
                <span>📖</span>
                <p>Cover tidak tersedia</p>
              </div>
            )}
          </div>

          <p className="detail-cover-caption">
            Temukan cerita dan pengetahuan baru.
          </p>
        </div>

        <div className="detail-main-info">
          <span className="detail-eyebrow">
            <span className="detail-eyebrow-dot" />
            DETAIL KOLEKSI BUKU
          </span>

          <h1>{currentBook.title}</h1>

          <div className="detail-divider" />

          <div className="detail-id">
            <span className="detail-id-icon">#</span>

            <div>
              <span className="detail-meta-label">ID BUKU</span>
              <p>{currentBook.key}</p>
            </div>
          </div>

          <button
            type="button"
            className={`detail-favorite-btn ${
              favorite ? "active" : ""
            }`}
            onClick={() => {
              if (favorite) {
                removeFavorite(currentBook!.key);
              } else {
                addFavorite(currentBook!);
              }
            }}
          >
            <Heart
              size={19}
              fill={favorite ? "currentColor" : "none"}
            />

            {favorite
              ? "Hapus dari Favorit"
              : "Tambah ke Favorit"}
          </button>

          <div className="detail-description">
            <h3>Tentang Buku</h3>
            <p>
              {description || "Deskripsi buku belum tersedia."}
            </p>
          </div>

          <div className="detail-subjects">
            <h3>Topik & Kategori</h3>

            {currentBook.subjects &&
            currentBook.subjects.length > 0 ? (
              <div className="subject-list">
                {currentBook.subjects
                  .slice(0, 10)
                  .map((subject, index) => (
                    <span
                      className="subject-chip"
                      key={`${subject}-${index}`}
                    >
                      {subject}
                    </span>
                  ))}
              </div>
            ) : (
              <p className="detail-empty-subject">
                Informasi subjek buku belum tersedia.
              </p>
            )}
          </div>

          <div className="detail-note">
            <span>✦</span>
            <p>
              Setiap buku punya cerita. Temukan pengetahuan baru
              melalui koleksi BukuKita.
            </p>
          </div>
        </div>
      </div>

      <div className="detail-bottom">
        <div>
          <span className="detail-bottom-title">BukuKita</span>
          <p>Temukan Cerita, Jelajahi Dunia.</p>
        </div>

        <span className="detail-bottom-mark">
          DIGITAL LIBRARY
        </span>
      </div>
    </section>
  );
}
