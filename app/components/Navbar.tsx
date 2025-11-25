"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { label: "Predictions", href: "/predictions" },
        { label: "Leaderboard", href: "/leaderboard" },
    ];

    return (
        <nav className="w-full bg-gray-100 py-4">
            <ul className="flex justify-center space-x-8">
                {navItems.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className={`font-semibold px-3 py-1 rounded ${
                                pathname === item.href
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}