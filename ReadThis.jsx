import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Single-file React app that fulfills the Frontend Intern Assessment.
 * - Fetches 10 users from Random User API
 * - Shows grid/list with search (by name or email)
 * - Add new user (name, email, photo upload)
 * - Validation + localStorage persistence for added users
 * - Responsive, Tailwind-styled UI
 *
 * How to use in your project:
 * 1) Copy this file as `UserDirectoryApp.jsx`
 * 2) In your `App.jsx`, render: `import UserDirectoryApp from './UserDirectoryApp'`
 *    then `<UserDirectoryApp />`
 * 3) Deploy with Vercel/Netlify
 */

export default function UserDirectoryApp() {
  const [apiUsers, setApiUsers] = useState([]);
  const [localUsers, setLocalUsers] = useState(() => getLocalUsers());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid"); // 'grid' | 'list'

  const allUsers = useMemo(() => {
    // Normalize both lists to one schema
    return [
      ...apiUsers.map(normalizeRandomUser),
      ...localUsers.map((u) => ({ ...u, isLocal: true })),
    ];
  }, [apiUsers, localUsers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allUsers;
    return allUsers.filter((u) => {
      const name = `${u.firstName} ${u.lastName}`.toLowerCase();
      return name.includes(q) || (u.email ?? "").toLowerCase().includes(q);
    });
  }, [allUsers, query]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("https://randomuser.me/api/?results=10");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setApiUsers(data.results || []);
      } catch (e) {
        if (!cancelled) setError("Failed to fetch users. Try refreshing.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist local users when changed
  useEffect(() => {
    saveLocalUsers(localUsers);
  }, [localUsers]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4 pb-24">
        <Toolbar
          query={query}
          setQuery={setQuery}
          view={view}
          setView={setView}
          total={filtered.length}
        />

        <section className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-2">
            {loading && <SkeletonGrid />}
            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}
            {!loading && !error && (
              <UserCollection users={filtered} view={view} />
            )}
          </div>

          <div className="md:col-span-1">
            <AddUserCard onAdd={(u) => setLocalUsers((prev) => [u, ...prev])} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// ===================== UI Building Blocks ===================== //

function Header() {
  return (
    <header className="sticky top-0 z-10 mb-8 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-gray-900 text-white grid place-items-center font-bold">
            UD
          </div>
          <h1 className="text-xl font-semibold">User Directory</h1>
        </div>
        <span className="text-sm text-gray-500">
          Frontend Intern Assessment
        </span>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t bg-white/50">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
        Built with React, Tailwind and localStorage • Random User API • Deploy
        on Vercel/Netlify
      </div>
    </footer>
  );
}

function Toolbar({ query, setQuery, view, setView, total }) {
  return (
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
        <div className="inline-flex rounded-xl border border-gray-200 p-1">
          <button
            className={`rounded-lg px-3 py-1 text-sm ${
              view === "grid" ? "bg-gray-900 text-white" : "text-gray-600"
            }`}
            onClick={() => setView("grid")}
          >
            Grid
          </button>
          <button
            className={`rounded-lg px-3 py-1 text-sm ${
              view === "list" ? "bg-gray-900 text-white" : "text-gray-600"
            }`}
            onClick={() => setView("list")}
          >
            List
          </button>
        </div>
      </div>
    </div>
  );
}

function UserCollection({ users, view }) {
  if (!users.length) {
    return (
      <div className="grid place-items-center rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
        No users found.
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="divide-y">
          {users.map((u) => (
            <UserRow key={u.id} user={u} />
          ))}
        </div>
      </div>
    );
  }

  // grid view
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((u) => (
        <UserCard key={u.id} user={u} />
      ))}
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow">
      <div className="flex items-center gap-3">
        <Avatar
          src={user.photo}
          firstName={user.firstName}
          lastName={user.lastName}
        />
        <div className="min-w-0">
          <div className="truncate font-medium">
            {user.firstName} {user.lastName}
          </div>
          <div className="truncate text-sm text-gray-500">{user.email}</div>
        </div>
      </div>
      {user.isLocal && (
        <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Added
          locally
        </div>
      )}
    </div>
  );
}

function UserRow({ user }) {
  return (
    <div className="flex items-center gap-4 p-4">
      <Avatar
        src={user.photo}
        firstName={user.firstName}
        lastName={user.lastName}
        size="lg"
      />
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">
          {user.firstName} {user.lastName}
        </div>
        <div className="truncate text-sm text-gray-500">{user.email}</div>
      </div>
      {user.isLocal && (
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700">
          Local
        </span>
      )}
    </div>
  );
}

function Avatar({ src, firstName, lastName, size = "md" }) {
  const initials =
    `${(firstName?.[0] || "").toUpperCase()}${(
      lastName?.[0] || ""
    ).toUpperCase()}` || "?";
  const sizeClass = size === "lg" ? "h-14 w-14 text-base" : "h-12 w-12 text-sm";

  if (src) {
    return (
      <img
        src={src}
        alt={`${firstName} ${lastName}`}
        className={`shrink-0 rounded-full object-cover ${sizeClass}`}
      />
    );
  }
  // Fallback initials avatar
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-full bg-gray-100 font-semibold text-gray-700 ${sizeClass}`}
    >
      {initials}
    </div>
  );
}

function AddUserCard({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState("");
  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return setPhotoDataUrl("");
    const dataUrl = await readFileAsDataURL(file);
    setPhotoDataUrl(dataUrl);
  };

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const [firstName, ...rest] = name.trim().split(/\s+/);
    const lastName = rest.join(" ");
    const newUser = {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      email,
      photo: photoDataUrl || "",
      isLocal: true,
    };
    onAdd(newUser);

    // Reset form
    setName("");
    setEmail("");
    setPhotoDataUrl("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">Add User</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="mb-1 block text-sm text-gray-600">Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className={`w-full rounded-xl border px-3 py-2 outline-none focus:border-gray-400 ${
              errors.name ? "border-red-300" : "border-gray-200"
            }`}
            placeholder="e.g. Ada Lovelace"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-600">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={`w-full rounded-xl border px-3 py-2 outline-none focus:border-gray-400 ${
              errors.email ? "border-red-300" : "border-gray-200"
            }`}
            placeholder="e.g. ada@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-600">
            Profile photo (optional)
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-gray-900 file:px-3 file:py-2 file:text-white"
          />
          {photoDataUrl && (
            <div className="mt-2 flex items-center gap-3">
              <img
                src={photoDataUrl}
                alt="preview"
                className="h-12 w-12 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setPhotoDataUrl("");
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="text-xs text-gray-500 underline"
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-gray-900 px-4 py-2 font-medium text-white hover:bg-black"
        >
          Add
        </button>
      </form>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4"
        >
          <div className="mb-3 h-12 w-12 rounded-full bg-gray-200" />
          <div className="mb-2 h-4 w-2/3 rounded bg-gray-200" />
          <div className="h-3 w-1/2 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

// ===================== Helpers & Persistence ===================== //

function normalizeRandomUser(u) {
  return {
    id: u.login?.uuid ?? `${u.email}-${u.registered?.date ?? Math.random()}`,
    firstName: u.name?.first ?? "",
    lastName: u.name?.last ?? "",
    email: u.email ?? "",
    photo: u.picture?.thumbnail ?? u.picture?.medium ?? "",
    isLocal: false,
  };
}

const LS_KEY = "customUsers.v1";

function getLocalUsers() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // sanitize
    return parsed.map((u) => ({
      id: u.id || crypto.randomUUID(),
      firstName: u.firstName || "",
      lastName: u.lastName || "",
      email: u.email || "",
      photo: u.photo || "",
      isLocal: true,
    }));
  } catch {
    return [];
  }
}

function saveLocalUsers(users) {
  try {
    const toSave = users.map(({ id, firstName, lastName, email, photo }) => ({
      id,
      firstName,
      lastName,
      email,
      photo,
    }));
    localStorage.setItem(LS_KEY, JSON.stringify(toSave));
  } catch {
    // ignore write errors
  }
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
