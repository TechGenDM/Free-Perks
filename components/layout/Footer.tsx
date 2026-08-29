import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-[#05070a] border-t border-white/6 text-slate-400 relative overflow-hidden">
      {/* Top subtle glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 flex flex-col gap-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-600 to-purple-500 text-white font-mono text-xs font-bold shadow-md shadow-indigo-600/20">
                FP
              </div>
              <span className="font-bold text-lg text-white tracking-tight">FreePerks</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The premier curated directory of free tools, cloud credits, software, and developer perks for verified students.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium w-fit mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All perk verifications operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">Navigation</h4>
            <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Explore All Perks</Link>
            <Link href="/saved" className="text-sm text-slate-400 hover:text-white transition-colors">Saved Perks</Link>
            <Link href="/submit" className="text-sm text-slate-400 hover:text-white transition-colors">Submit a Perk</Link>
            <Link href="/admin" className="text-sm text-slate-400 hover:text-white transition-colors">Moderation Portal</Link>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">Categories</h4>
            <Link href="/category/ai-tools" className="text-sm text-slate-400 hover:text-white transition-colors">AI & Copilots</Link>
            <Link href="/category/cloud-credits" className="text-sm text-slate-400 hover:text-white transition-colors">Cloud Credits</Link>
            <Link href="/category/hosting" className="text-sm text-slate-400 hover:text-white transition-colors">Hosting & Deploy</Link>
            <Link href="/category/dev-software" className="text-sm text-slate-400 hover:text-white transition-colors">Developer Software</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FreePerks. Curated for student developers worldwide.</p>
          <p className="text-slate-500">Not officially affiliated with listed third-party services.</p>
        </div>
      </div>
    </footer>
  );
}
