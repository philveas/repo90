export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Veas Acoustics
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Practical, credible noise and acoustics consulting. Fast delivery, clear reporting.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <a href="/services/noise-surveys" className="rounded-2xl border p-6 hover:shadow">
            <h2 className="text-xl font-medium">Noise Surveys</h2>
            <p className="mt-2 text-sm text-gray-600">Baseline, construction & operational.</p>
          </a>
          <a href="/services/building-acoustics" className="rounded-2xl border p-6 hover:shadow">
            <h2 className="text-xl font-medium">Building Acoustics</h2>
            <p className="mt-2 text-sm text-gray-600">Design support and sound insulation.</p>
          </a>
          <a href="/services/sound-testing" className="rounded-2xl border p-6 hover:shadow">
            <h2 className="text-xl font-medium">Sound Testing</h2>
            <p className="mt-2 text-sm text-gray-600">Pre-completion & diagnostics.</p>
          </a>
        </div>
      </section>
    </main>
  );
}
// sanity check 
"// ruleset test" 
