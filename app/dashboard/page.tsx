import Navbar from "../../components/Navbar";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl font-bold">Личный кабинет</h1>
        <p className="mt-2 text-gray-600">
          Здесь будет твой прогресс, темы и последние задания.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Общий прогресс</h2>
            <p className="mt-4 text-3xl font-bold">24%</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Решено заданий</h2>
            <p className="mt-4 text-3xl font-bold">12</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Текущая тема</h2>
            <p className="mt-4 text-xl font-medium">Графики функций</p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Последние действия</h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>Решено задание №5</li>
            <li>Открыта тема “Линейные функции”</li>
            <li>Получена подсказка в задании №3</li>
          </ul>
        </div>
      </section>
    </main>
  );
}