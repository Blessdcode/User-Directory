export function Toolbar({ query, setQuery, total }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <div className="mb-6 flex flex-col items-stretch justify-between gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search by name or email…"
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none ring-0 focus:border-gray-300"
          />
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-1.85z"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
            {total} result{total === 1 ? "" : "s"}
          </span>
        </div>
      </div>
    </div>
  );
}
