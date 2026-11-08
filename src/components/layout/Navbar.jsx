"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Coins, Menu, X } from "lucide-react";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    return (
        <header className="md:hidden top-0 z-50 sticky bg-[#090D16] backdrop-blur-xl border-[#1E293B]/90 border-b w-full">
            <div className="flex justify-between items-center px-4 h-14">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="flex justify-center items-center bg-[#10B981] rounded-lg w-8 h-8">
                        <span className="font-mono font-bold text-white text-xs">FC</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-white text-sm leading-none">Finance Control</span>
                        <span className="mt-1 font-mono text-[#10B981] text-[10px]">● LOCAL-FIRST (IDB)</span>
                    </div>
                </Link>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex justify-center items-center bg-[#0D1322] border border-[#1E293B] rounded-lg w-9 h-9 text-slate-300 hover:text-white transition"
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>
            {isOpen && (
                <div className="space-y-1 px-4 py-3 border-[#1E293B] border-[#1E293B] border-t border-t">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium text-sm transition-colors",
                                    isActive
                                        ? "bg-[#10B981] shadow-sm text-white"
                                        : "text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10"
                                )}
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            )}

        </header>
    )
}