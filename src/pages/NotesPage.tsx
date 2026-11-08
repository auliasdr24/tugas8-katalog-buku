import { useState, type FormEvent } from "react";
import PageHeading from "../components/PageHeading";

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function NotesPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (title.trim().length < 3) {
      setError("Judul catatan minimal 3 karakter.");
      return;
    }

    if (content.trim().length < 5) {
      setError("Isi catatan minimal 5 karakter.");
      return;
    }

    const newNote: Note = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
    };

    setNotes((prev) => [...prev, newNote]);
    setTitle("");
    setContent("");
    setError("");
  }

  return (
    <section>
        <PageHeading
        title="Catatan Buku"
        description="Tulis catatan atau ulasan singkat tentang buku."
        />

      <form className="note-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Judul catatan</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan judul catatan"
        />

        <label htmlFor="content">Isi catatan</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis catatanmu..."
        />

        {error && <p className="form-error">{error}</p>}

        <button type="submit">Simpan Catatan</button>
      </form>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p>Belum ada catatan.</p>
        ) : (
          notes.map((note) => (
            <article key={note.id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
