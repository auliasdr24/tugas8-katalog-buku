
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <Search size={20} />

      <input
        type="text"
        placeholder="Cari judul atau penulis buku..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
