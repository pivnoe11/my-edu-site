import Link from "next/link";
import Navbar from "../../components/Navbar";
import { mechanicsTopics } from "../../lib/topics";

export default function MechanicsPage() {
  return (
    <main className="min-h-screen bg-[#f4f4f2] text-black">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <Link href="/" className="transition hover:text-black hover:underline">
            Главная
          </Link>
          <span>→</span>
          <Link
            href="/sections"
            className="transition hover:text-black hover:underline"
          >
            Разделы
          </Link>
          <span>→</span>
          <span className="font-medium text-black">Механика</span>
        </div>

        <h1 className="mb-8 text-4xl font-bold md:text-5xl">Механика</h1>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {mechanicsTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/graph/${topic.slug}`}
              className="group rounded-3xl border-2 border-green-700/50 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold leading-snug text-green-900">
                  {topic.title}
                </h2>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-lg text-green-800">
                  ↗
                </div>
              </div>

              <p className="text-base leading-7 text-gray-600">
                {topic.description}
              </p>

              <div className="mt-6 inline-flex rounded-xl bg-green-800 px-4 py-2 text-sm font-medium text-white transition group-hover:bg-green-900">
                Начать тему
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
