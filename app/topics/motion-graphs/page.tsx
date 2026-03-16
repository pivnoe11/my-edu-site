import Link from "next/link";
import Navbar from "../../../components/Navbar";

export default function MotionGraphsPage() {
  const tasks = [
    {
      id: 1,
      title: "Задание 1",
      description: "Определи, как меняется путь тела по графику зависимости s(t).",
      status: "Не начато",
    },
    {
      id: 2,
      title: "Задание 2",
      description: "Найди скорость тела по графику координаты от времени.",
      status: "В процессе",
    },
    {
      id: 3,
      title: "Задание 3",
      description: "Сравни два графика движения и выбери правильное утверждение.",
      status: "Решено",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm text-gray-500">Тема по физике</p>
          <h1 className="mt-2 text-4xl font-bold">Графики движения</h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-600">
            Изучи, как анализировать графики зависимости пути, координаты,
            скорости и ускорения от времени. В этой теме ты научишься читать
            графики и извлекать из них физический смысл.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Прогресс</p>
              <p className="mt-2 text-2xl font-bold">33%</p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Всего заданий</p>
              <p className="mt-2 text-2xl font-bold">3</p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Решено</p>
              <p className="mt-2 text-2xl font-bold">1</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">Задания по теме</h2>

          <div className="mt-6 space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="rounded-3xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{task.title}</h3>
                    <p className="mt-2 text-gray-600">{task.description}</p>
                    <p className="mt-3 text-sm text-gray-500">
                      Статус: {task.status}
                    </p>
                  </div>

                  <Link
                    href="/dashboard"
                    className="inline-block rounded-2xl bg-black px-5 py-3 text-white hover:opacity-90"
                  >
                    Открыть задание
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}