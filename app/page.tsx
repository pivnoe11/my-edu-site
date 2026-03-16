import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl flex-col justify-center px-6 py-16">
        <div className="mb-6 inline-flex w-fit rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-600">
          Интерактивная платформа для обучения
        </div>

        <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
          Учись через задачи,
          <br />
          графики и практику
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600 md:text-xl">
          Решай задания, смотри интерактивные графики, отслеживай прогресс и
          изучай темы в удобном личном кабинете.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/dashboard"
            className="rounded-2xl bg-black px-6 py-3 text-white transition hover:opacity-90"
          >
            Начать обучение
          </Link>

          <Link
            href="/topics"
            className="rounded-2xl border border-gray-300 px-6 py-3 text-black transition hover:bg-gray-100"
          >
            Посмотреть темы
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Интерактивные задания</h2>
            <p className="mt-3 text-gray-600">
              Решай задачи с быстрым ответом, выбором варианта и визуальными
              элементами.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Графики и визуализация</h2>
            <p className="mt-3 text-gray-600">
              Понимай темы через наглядные графики, параметры и динамические
              изменения.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Прогресс по темам</h2>
            <p className="mt-3 text-gray-600">
              Следи за тем, что уже изучено, и возвращайся к заданиям в любой
              момент.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}