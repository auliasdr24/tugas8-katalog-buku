const BASE_URL = "https://openlibrary.org";

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  subject?: string[];
}

export interface BookResponse {
  docs: Book[];
  numFound: number;
}

export async function getBooks(
  query: string = "",
  page: number = 1,
  signal?: AbortSignal
): Promise<BookResponse> {
  const searchQuery = query.trim() || "subject:fiction";

  const response = await fetch(
    `${BASE_URL}/search.json?q=${encodeURIComponent(searchQuery)}&page=${page}&limit=12&fields=key,title,author_name,cover_i,first_publish_year,subject`,
    { signal }
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil data buku.");
  }

  return response.json();
}

export async function getBookDetail(key: string): Promise<Book> {
  const response = await fetch(`${BASE_URL}${key}.json`);

  if (!response.ok) {
    throw new Error("Gagal mengambil detail buku.");
  }

  return response.json();
}

export function getCoverUrl(coverId?: number): string | null {
  if (!coverId) return null;

  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
}
