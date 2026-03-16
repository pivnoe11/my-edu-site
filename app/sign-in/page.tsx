import Navbar from "../../components/Navbar";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <Navbar />

      <section className="mx-auto flex max-w-6xl justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Вход</h1>
          <p className="mt-2 text-gray-600">
            Войди в аккаунт, чтобы продолжить обучение.
          </p>

          <form className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Пароль</label>
              <input
                type="password"
                placeholder="Введите пароль"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <button className="w-full rounded-xl bg-black px-4 py-3 text-white hover:opacity-90">
              Войти
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}