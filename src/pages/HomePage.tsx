
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import StatusMessage from "../components/StatusMessage";
import Pagination from "../components/Pagination";
import { useBooks } from "../hooks/useBooks";
import PageHeading from "../components/PageHeading";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("page")) || 1;

    const [searchInput, setSearchInput] = useState(query);
    const [sortOrder, setSortOrder] = useState("title-asc");
    const [category, setCategory] = useState("all");

    const { books, loading, error, totalBooks } = useBooks(query, page);

    const sortedBooks = [...books].sort((a, b) => {
    const comparison = a.title.localeCompare(b.title);

    return sortOrder === "title-asc" ? comparison : -comparison;
    });

    const filteredBooks =
    category === "all"
        ? sortedBooks
        : sortedBooks.filter((book) =>
            book.subject?.some((subject) =>
            subject.toLowerCase().includes(category)
            )
        );

  function handleSearch(value: string) {
    setSearchInput(value);
    setSearchParams({ q: value, page: "1" });
    }

  function handlePageChange(newPage: number) {
    setSearchParams({ q: query, page: String(newPage) });
  }

  return (
    <section>
      <PageHeading
        title="Katalog Buku"
        description="Temukan berbagai buku menarik untuk dibaca."
        />

      <SearchBar value={searchInput} onChange={handleSearch} />

      <div className="filter-bar">
        <label htmlFor="category">Kategori:</label>
        <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        >
        <option value="all">Semua Kategori</option>
        <option value="fiction">Fiction</option>
        <option value="fantasy">Fantasy</option>
        <option value="history">History</option>
        <option value="science">Science</option>
        <option value="romance">Romance</option>
        </select>

        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="title-asc">Judul A-Z</option>
          <option value="title-desc">Judul Z-A</option>
        </select>
      </div>

      {loading ? (
        <StatusMessage type="loading" />
      ) : error ? (
        <StatusMessage type="error" message={error} />
      ) : filteredBooks.length === 0 ? (
        <StatusMessage type="empty" />
      ) : (
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}

      {!loading && !error && books.length > 0 && (
        <Pagination
          page={page}
          totalPages={Math.max(1, Math.ceil(totalBooks / 12))}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}
