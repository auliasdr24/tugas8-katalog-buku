import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBookDetail, getCoverUrl, type Book } from "../services/bookService";
import StatusMessage from "../components/StatusMessage";

interface BookDetail extends Book {
  description?: string | { value: string };
  subjects?: string[];
  covers?: number[];
}

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();

  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        setError("");

        if (!id) throw new Error("ID buku tidak ditemukan.");

        const result = await getBookDetail(decodeURIComponent(id));
        setBook(result as BookDetail);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Gagal mengambil detail buku."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  if (loading) return <StatusMessage type="loading" />;
  if (error) return <StatusMessage type="error" message={error} />;
  if (!book) return <StatusMessage type="empty" />;

  const description =
    typeof book.description === "string"
      ? book.description
      : book.description?.value;

  return (
    <section className="detail-page">
      <Link to="/">← Kembali ke Beranda</Link>

      <div className="detail-content">
        {book.covers?.[0] && (
        <img
            src={getCoverUrl(book.covers[0]) ?? ""}
            alt={book.title}
        />
        )}

        <div>
          <h2>{book.title}</h2>

        <p>
        <strong>ID Buku:</strong> {book.key}
        </p>

          <h3>Deskripsi</h3>
          <p>{description ?? "Deskripsi buku belum tersedia."}</p>

        <h3>Subjek</h3>
        {book.subjects && book.subjects.length > 0 ? (
            <ul>
                {book.subjects.slice(0, 10).map((subject) => (
                <li key={subject}>{subject}</li>
                ))}
            </ul>
        ) : (
            <p>Subjek buku belum tersedia.</p>
        )}
        </div>
      </div>
    </section>
  );
}
