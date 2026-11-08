import { useEffect, useState } from "react";
import { getBooks, type Book } from "../services/bookService";

export function useBooks(query: string, page: number) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBooks() {
      try {
        setLoading(true);
        setError("");

        const result = await getBooks(query, page, controller.signal);
        setBooks(result.docs);
        setTotalBooks(result.numFound);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchBooks();

    return () => controller.abort();
  }, [query, page]);

  return { books, loading, error, totalBooks };
}