import { useState, useCallback } from "react";
import { Search, X } from "lucide-react";
import { searchProducts, type Product } from "@/lib/api";

interface SearchBarProps {
  onResults: (products: Product[]) => void;
  onClear: () => void;
  isSearching: boolean;
  setIsSearching: (v: boolean) => void;
}

export default function SearchBar({ onResults, onClear, isSearching, setIsSearching }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      if (debounceTimer) clearTimeout(debounceTimer);

      if (!value.trim()) {
        onClear();
        return;
      }

      const timer = setTimeout(async () => {
        setIsSearching(true);
        try {
          const results = await searchProducts(value);
          onResults(results);
        } catch {
          onResults([]);
        } finally {
          setIsSearching(false);
        }
      }, 400);
      setDebounceTimer(timer);
    },
    [debounceTimer, onResults, onClear, setIsSearching]
  );

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <div className="relative max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search products…"
        className="w-full h-9 pl-9 pr-9 rounded-full border border-border/60 bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow"
      />
      {query && (
        <button onClick={handleClear} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
