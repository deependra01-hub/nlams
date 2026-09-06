import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-soft">
        <h2 className="text-2xl font-semibold text-slate-900">Page not found</h2>
        <p className="mt-2 text-sm text-slate-600">
          The requested route does not exist yet in this phase.
        </p>
        <Link
          to="/foundation"
          className="mt-6 inline-flex rounded-xl bg-gov-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gov-800 focus:outline-none focus:ring-2 focus:ring-gov-500 focus:ring-offset-2"
        >
          Return to foundation
        </Link>
      </div>
    </div>
  );
}
