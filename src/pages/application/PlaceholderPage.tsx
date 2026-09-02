type PlaceholderPageProps = {
  title: string;
  description: string;
};

function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-brand-600">
        Frontend preview
      </p>

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
        {title}
      </h1>

      <p className="mt-3 max-w-2xl text-slate-600">{description}</p>

      <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="text-sm text-slate-500">
          This interface will be built in a later step.
        </p>
      </div>
    </main>
  );
}

export default PlaceholderPage;