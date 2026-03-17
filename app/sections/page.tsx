import Link from "next/link";
import Navbar from "../../components/Navbar";

const sections = [
  { name: "Математика", slug: "math" },
  { name: "Механика", slug: "mechanics" },
  { name: "Электромагнетизм", slug: "electromagnetism" },
  { name: "Термодинамика", slug: "thermodynamics" },
  { name: "Оптика", slug: "optics" },
  { name: "Квантовая физика", slug: "quantum" },
  { name: "Астрономия", slug: "astronomy" },
];

export default function SectionsPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="mb-8 text-5xl font-bold">Разделы</h1>

        <div className="flex flex-col gap-5">
          {sections.map((section) => (
            <Link
              key={section.slug}
              href={`/sections/${section.slug}`}
              className="group rounded-3xl border border-gray-200 bg-white px-8 py-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">{section.name}</h2>
                  <p className="mt-2 text-gray-500">
                    Перейти к материалам раздела
                  </p>
                </div>

                <span className="text-3xl text-gray-300 transition group-hover:text-black">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}