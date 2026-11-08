
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Book } from "../services/bookService";

interface FavoriteContextType {
  favorites: Book[];
  addFavorite: (book: Book) => void;
  removeFavorite: (key: string) => void;
  isFavorite: (key: string) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Book[]>(() => {
    const saved = localStorage.getItem("favorite-books");
    return saved ? JSON.parse(saved) : [];
  });

  function addFavorite(book: Book) {
    setFavorites((prev) => {
      if (prev.some((item) => item.key === book.key)) return prev;

      const updated = [...prev, book];
      localStorage.setItem("favorite-books", JSON.stringify(updated));
      return updated;
    });
  }

  function removeFavorite(key: string) {
    setFavorites((prev) => {
      const updated = prev.filter((book) => book.key !== key);
      localStorage.setItem("favorite-books", JSON.stringify(updated));
      return updated;
    });
  }

  function isFavorite(key: string) {
    return favorites.some((book) => book.key === key);
  }

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error("useFavorites harus digunakan di dalam FavoriteProvider");
  }

  return context;
}
