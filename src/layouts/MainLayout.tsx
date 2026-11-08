
import { NavLink, Outlet } from "react-router-dom";
import { BookOpen, Heart, Home, NotebookPen } from "lucide-react";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
            <BookOpen size={24} />
            BukuKita
          </h1>

          <div className="flex gap-6">
            <NavLink to="/" className="flex items-center gap-2">
              <Home size={18} />
              Beranda
            </NavLink>

            <NavLink to="/favorit" className="flex items-center gap-2">
              <Heart size={18} />
              Favorit
            </NavLink>

            <NavLink to="/catatan" className="flex items-center gap-2">
                <NotebookPen size={18} />
                Catatan
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Outlet />
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        © 2026 BukuKita - Katalog Buku
      </footer>
    </div>
  );
}
