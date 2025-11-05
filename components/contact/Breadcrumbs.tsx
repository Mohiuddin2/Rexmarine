import Link from "next/link";

export function Breadcrumbs() {
  return (
    <nav className="text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
        </li>
        <li className="opacity-50">/</li>
        <li className="text-gray-200">Contact</li>
      </ol>
    </nav>
  );
}

export function PageHeader() {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px w-16 bg-gradient-to-r from-[#3a67e2] to-transparent" />
        <span className="text-[#3a67e2] text-xs font-mono uppercase tracking-widest">
          Get In Touch
        </span>
      </div>
      <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">Contact Us</h1>
      <p className="text-gray-400 mt-2">Have questions? We're here to help you.</p>
    </div>
  );
}

