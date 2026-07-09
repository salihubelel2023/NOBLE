export default function CatalogLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-6 py-8 lg:px-8 lg:py-12">
      <div className="mb-6 h-4 w-40 bg-noble-ivory" />
      <div className="mb-10 h-9 w-64 bg-noble-ivory" />
      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
        <div className="hidden h-96 bg-noble-ivory lg:block" />
        <div>
          <div className="mb-8 h-10 bg-noble-ivory" />
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="aspect-[4/5] bg-noble-ivory" />
                <div className="h-3 w-16 bg-noble-ivory" />
                <div className="h-4 w-32 bg-noble-ivory" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
