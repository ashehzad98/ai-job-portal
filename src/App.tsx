function App() {
  return (
    <main className="min-h-screen bg-page px-4 py-12 sm:px-6">
      <section className="mx-auto max-w-3xl rounded-xl border border-border bg-surface p-6 shadow-card sm:p-8">
        <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
          AI Job Portal
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Find jobs matched to your profile
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          Your frontend foundation is ready. We will build each interface
          feature separately using reusable components and mock data.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline-brand-600"
          >
            Primary action
          </button>

          <button
            type="button"
            className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Secondary action
          </button>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <StatusExample
            label="Strong match"
            value="92%"
            valueClassName="text-success"
          />

          <StatusExample
            label="Possible match"
            value="68%"
            valueClassName="text-warning"
          />

          <StatusExample
            label="Weak match"
            value="34%"
            valueClassName="text-danger"
          />
        </div>
      </section>
    </main>
  );
}

type StatusExampleProps = {
  label: string;
  value: string;
  valueClassName: string;
};

function StatusExample({
  label,
  value,
  valueClassName,
}: StatusExampleProps) {
  return (
    <div className="rounded-lg border border-border bg-slate-50 p-4">
      <p className="text-sm text-slate-600">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${valueClassName}`}>{value}</p>
    </div>
  );
}

export default App;