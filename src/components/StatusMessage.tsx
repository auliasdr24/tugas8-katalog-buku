
import { LoaderCircle, AlertCircle } from "lucide-react";

interface StatusMessageProps {
  type: "loading" | "error" | "empty";
  message?: string;
}

export default function StatusMessage({
  type,
  message,
}: StatusMessageProps) {
  if (type === "loading") {
    return (
      <div className="status-message">
        <LoaderCircle className="spin" size={28} />
        <p>Memuat data buku...</p>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className="status-message error">
        <AlertCircle size={28} />
        <p>{message ?? "Terjadi kesalahan saat mengambil data."}</p>
      </div>
    );
  }

  return (
    <div className="status-message">
      <p>{message ?? "Data buku tidak ditemukan."}</p>
    </div>
  );
}
