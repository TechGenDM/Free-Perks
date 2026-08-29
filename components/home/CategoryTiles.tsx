'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, fadeUp, VIEWPORT_ONCE } from '@/lib/motion';

interface Category {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  tool_count: number;
}

interface CategoryTilesProps {
  categories: Category[];
}

const tileVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 26 },
  },
};

export function CategoryTiles({ categories }: CategoryTilesProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-8 border-t border-zinc-100">
      <motion.div
        variants={shouldReduce ? {} : fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-1">
            Explore by Category
          </h2>
          <p className="text-zinc-500">Discover tools tailored to your specific needs.</p>
        </div>
      </motion.div>

      {/* Mobile: horizontal scroll / Desktop: grid */}
      <motion.div
        variants={shouldReduce ? {} : staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="flex overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 snap-x hide-scrollbar"
      >
        {categories.map((category) => (
          <motion.div
            key={category._id}
            variants={shouldReduce ? {} : tileVariants}
            className="flex-shrink-0 w-40 md:w-auto snap-start"
          >
            <Link
              href={`/category/${category.slug}`}
              className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-zinc-200/80 bg-white hover:border-indigo-200 hover:bg-indigo-50/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-300 w-full"
            >
              <div className="text-3xl filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300">
                {category.icon || '📦'}
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-zinc-900 text-sm group-hover:text-indigo-900 transition-colors">
                  {category.name}
                </h3>
                <p className="text-[11px] font-medium text-zinc-500 mt-0.5">
                  {category.tool_count} perks
                </p>
              </div>
              {/* Arrow indicator */}
              <div className="overflow-hidden h-3 flex items-center justify-center">
                <span className="text-[10px] font-bold text-indigo-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                  →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
