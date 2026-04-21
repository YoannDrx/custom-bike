export default function AdminLoading() {
  return (
    <div className="admin-page" style={{ paddingTop: 40 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div className="admin-skeleton" style={{ width: "40%", height: 32 }} />
        <div className="admin-skeleton" style={{ width: "60%", height: 18 }} />
        <div className="admin-stat-grid" style={{ marginTop: 24 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="admin-skeleton" style={{ height: 110 }} />
          ))}
        </div>
        <div className="admin-skeleton" style={{ height: 320, marginTop: 24 }} />
      </div>
    </div>
  );
}
