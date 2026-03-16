import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          Физическая одиссея
        </Link>

        <nav className="flex items-center gap-6 text-sm md:text-base">
          <Link href="/topics" className="text-gray-700 hover:text-black">
            Темы
          </Link>
          <Link href="/sign-in" className="text-gray-700 hover:text-black">
            Войти
          </Link>
          <Link
            href="/sign-up"
            className="rounded-xl bg-black px-4 py-2 text-white hover:opacity-90"
          >
            Регистрация
          </Link>
        </nav>
      </div>
    </header>
  );
}