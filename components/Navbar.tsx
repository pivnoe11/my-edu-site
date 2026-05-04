import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-black">
          Физическая одиссея
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/sections"
            className="text-gray-600 transition hover:text-black"
          >
            Разделы
          </Link>

          <Link
            href="/sign-in"
            className="text-gray-600 transition hover:text-black"
          >
            Войти
          </Link>

          <Link
            href="/sign-up"
            className="rounded-xl bg-black px-5 py-2 text-white transition hover:bg-gray-800"
          >
            Регистрация
          </Link>
        </nav>
      </div>
    </header>
  );
}