import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function TopicsPage() {
  const topics = [
    {
      title: "Графики движения",
      description:
        "Изучи графики пути, координаты, скорости и ускорения во времени.",
      progress: "33%",
      href: "/topics/motion-graphs",
    },
    {
      title: "Линейные функции",
      description:
        "Потренируйся читать прямые графики и находить коэффициенты.",
      progress: "40%",
      href: "/dashboard",
    },
    {
      title: "Квадратичные зависимости",
      description:
        "Разбери, как меняется форма параболы и что значат её параметры.",
      progress: "15%",
      href: "/dashboard",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl font-bold">Темы</h1>
        <p className="mt-2 text-gray-600">
          Выбери тему и продолжай обучение.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold">{topic.title}</h2>
              <p className="mt-3 text-gray-600">{topic.description}</p>

              <div className="mt-6">
                <p className="mb-2 text-sm text-gray-500">Прогресс</p>
                <div className="h-3 w-full rounded-full bg-gray-200">
                  <div
                    className="h-3 rounded-full bg-black"
                    style={{ width: topic.progress }}
                  />
                </div>
                <p className="mt-2 text-sm font-medium">{topic.progress}</p>
              </div>

              <Link
                href={topic.href}
                className="mt-6 inline-block rounded-2xl bg-black px-5 py-3 text-white hover:opacity-90"
              >
                Открыть тему
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}