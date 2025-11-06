export function Breadcrumbs() {
  return (
    <nav className="text-xs text-gray-500 mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        <li>
          <a href="/" className="hover:text-black transition-colors">Home</a>
        </li>
        <li className="opacity-50">/</li>
        <li className="text-gray-800">Schedules</li>
      </ol>
    </nav>
  );
}

export function PageHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-lime-500">Sailing Schedule</h1>
      <p className="text-gray-600 mt-2">Have any questions? We're here to help you.</p>
    </div>
  );
}




