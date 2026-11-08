"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside
            aria-label="Desktop Sidebar"
            className="hidden z-30 md:fixed md:inset-y-0 md:flex md:flex-col bg-white/75 dark:bg-zinc-900/75 backdrop-blur-xl border-zinc-200/60 dark:border-zinc-800/60 border-r md:w-64"
        >
            <div className="flex items-center gap-3 px-6 border-zinc-200/50 dark:border-zinc-800/50 border-b h-16">
                <div className="flex justify-center items-center bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 rounded-lg w-9 h-9 text-emerald-600 dark:text-emerald-400">
                    <Coins className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm tracking-tight">
                        Finance Control
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">v0.1.0 • Local-First</span>
                </div>
            </div>
            <nav className="flex-1 space-y-1.5 px-3 py-4">
                {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium text-sm transition-all duration-150",
                                isActive
                                    ? "bg-zinc-900 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-900"
                                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "w-4 h-4 transition-colors shrink-0",
                                    isActive
                                        ? "text-white dark:text-zinc-900"
                                        : "text-zinc-400 group-hover:text-zinc-700 dark:text-zinc-500 dark:group-hover:text-zinc-300"
                                )}
                            />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-zinc-200/50 dark:border-zinc-800/50 border-t">
                <div className="bg-zinc-50/70 dark:bg-zinc-800/40 p-3 border border-zinc-200/50 dark:border-zinc-800/50 rounded-lg text-xs">
                    <div className="flex items-center gap-2">
                        <span className="bg-emerald-500 rounded-full w-2 h-2 animate-pulse" />
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">Privacy Active</span>
                    </div>
                    <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        Data stays 100% in your browser.
                    </p>
                </div>
            </div>
        </aside>
    );
}