// ...existing code...
import { useCars } from "./useCars";
import StatCard from "./StatCard";

export default function ManageCars() {
  const {
    cars,
    loading,
    stats,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
  } = useCars();

  return (
    <div className="space-y-6 p-4 md:p-6 bg-bg-main dark:bg-dark-bg text-text dark:text-dark-text-primary">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-text dark:text-dark-text-primary">
          Manage Cars
        </h1>
        <p className="text-sm text-text-muted dark:text-dark-text-secondary">
          Track inventory, availability, and ratings.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Cars" value={stats.total} />
        <StatCard label="Available" value={stats.available} />
        <StatCard label="Sold Out" value={stats.soldOut} />
        <StatCard label="Avg Rating" value={stats.avgRating} />
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-border-custom dark:border-dark-border bg-surface dark:bg-dark-surface p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <input
            className="w-full rounded-lg border border-border-custom dark:border-dark-border px-3 py-2 text-sm bg-bg-main dark:bg-dark-bg text-text dark:text-dark-text-primary placeholder:text-text-muted dark:placeholder:text-dark-text-muted outline-none transition focus:border-primary dark:focus:border-dark-primary focus:ring-2 focus:ring-primary-soft dark:focus:ring-dark-primary-soft"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title..."
          />
          <select
            className="w-full rounded-lg border border-border-custom dark:border-dark-border px-3 py-2 text-sm bg-bg-main dark:bg-dark-bg text-text dark:text-dark-text-primary outline-none transition focus:border-primary dark:focus:border-dark-primary focus:ring-2 focus:ring-primary-soft dark:focus:ring-dark-primary-soft"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All categories</option>
            {stats.categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="flex items-center text-sm text-text-muted dark:text-dark-text-secondary">
            {loading ? "Loading cars..." : `${cars.length} result(s)`}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border-custom dark:border-dark-border bg-surface dark:bg-dark-surface shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-2 px-6 py-10 text-text-muted dark:text-dark-text-secondary">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-border-custom dark:border-dark-border border-t-text-muted dark:border-t-dark-text-secondary" />
            Loading...
          </div>
        ) : cars.length === 0 ? (
          <div className="px-6 py-10 text-center text-text-muted dark:text-dark-text-secondary">
            No cars found for current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-surface-hover dark:bg-dark-surface-hover text-xs uppercase tracking-wider text-text-muted dark:text-dark-text-secondary">
                <tr>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Rating</th>
                  <th className="px-4 py-3 font-semibold">Availability</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-custom dark:divide-dark-border">
                {cars.map((car) => {
                  const isAvailable = String(car.availability)
                    .toLowerCase()
                    .includes("available");

                  return (
                    <tr key={car._id} className="transition hover:bg-surface-hover dark:hover:bg-dark-surface-hover">
                      <td className="px-4 py-3 font-medium text-text dark:text-dark-text-primary">
                        {car.title}
                      </td>
                      <td className="px-4 py-3 text-text-muted dark:text-dark-text-secondary">
                        {car.category}
                      </td>
                      <td className="px-4 py-3 text-text dark:text-dark-text-primary">{car.price}</td>
                      <td className="px-4 py-3 text-amber-600">
                        {car.rating} ★
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            isAvailable
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400"
                          }`}
                        >
                          {car.availability}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="rounded-md border border-border-custom dark:border-dark-border px-3 py-1.5 text-xs font-medium text-text dark:text-dark-text-primary transition hover:bg-surface-hover dark:hover:bg-dark-surface-hover">
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
// ...existing code...
