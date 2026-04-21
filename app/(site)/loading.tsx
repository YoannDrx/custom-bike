export default function SiteLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <div className="site-skeleton" style={{ height: 48, width: "40%" }} />
      <div className="mt-6 site-skeleton" style={{ height: 18, width: "60%" }} />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="site-skeleton" style={{ height: 220 }} />
        ))}
      </div>
    </div>
  );
}
