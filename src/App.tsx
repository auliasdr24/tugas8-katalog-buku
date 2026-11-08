
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import FavoritePage from "./pages/FavoritePage";
import NotesPage from "./pages/NotesPage";
import { FavoriteProvider } from "./context/FavoriteContext";

function App() {
  return (
    <FavoriteProvider>
      <BrowserRouter basename="/tugas8">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="buku/:id" element={<DetailPage />} />
            <Route path="favorit" element={<FavoritePage />} />
            <Route path="catatan" element={<NotesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoriteProvider>
  );
}

export default App;
