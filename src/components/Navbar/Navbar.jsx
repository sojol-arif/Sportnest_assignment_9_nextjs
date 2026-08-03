// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "./Navbar.css";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { ChevronDown } from "lucide-react";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/facilities", label: "All Facilities" },
    { href: "/add-facility", label: "Add Facility" },
    { href: "/my-bookings", label: "My Bookings" },
    { href: "/manage-facilities", label: "Manage My Facilities" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenLogout, setIsOpenLogout] = useState(false);

    const {
        data: session,
    } = authClient.useSession()
    console.log('session from navbar', session)

    const user = session?.user
    console.log('user from navbar', user)

    const handleLogout = async () => {
        await authClient.signOut();
    }

    return (
        <header className="bg-[#fff]">
            <nav className="bg-white border-b border-[rgba(0,0,0,0.06)] sticky top-0 z-50">
                <div className="container_s">
                    <div className="flex items-center justify-between h-16">
                        <div className="navbar-brand">
                            <Link href="/" className="flex items-center gap-2.5">
                                <div className="w-8 h-8 bg-[#3d8b5e] rounded-lg flex items-center justify-center flex-shrink-0"><span className="text-white text-[11px] font-medium tracking-tight">SN</span></div>
                                <span className="font-medium text-default text-[17px] tracking-tight">SportNest</span>
                            </Link>
                        </div>

                        <button
                            className="md:hidden p-2 text-gray-500 hover:text-default"
                            onClick={() => setIsOpen((prev) => !prev)}
                            aria-label="Toggle navigation"
                        >
                            ☰
                        </button>

                        <ul className={`hidden md:flex items-center gap-8 ${isOpen ? "open" : ""}`}>
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`text-sm transition-colors duration-200 text-[#3f3f46] hover:text-default ${pathname === link.href
                                            ? "active"
                                            : ""
                                            }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="hidden md:flex items-center">
                            {user ?
                                (
                                    <div className="relative">
                                        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity py-1 px-2 rounded-lg" onClick={() => setIsOpenLogout((prev) => !prev)}>
                                            <div className="w-8 h-8 rounded-full bg-[#3d8b5e] flex items-center justify-center">
                                                <span className="text-white text-xs font-medium">{user?.name.slice(0, 1)}</span>
                                            </div>
                                            <span className="text-sm text-[#1a1a1e]">{user?.name}</span>
                                            {isOpenLogout ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down text-gray-400 transition-transform rotate-180"><path d="m6 9 6 6 6-6"></path></svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down text-gray-400 transition-transform"><path d="m6 9 6 6 6-6"></path></svg>
                                            }
                                        </button>
                                        {isOpenLogout &&
                                            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-[rgba(0,0,0,0.08)] py-1.5 z-50">
                                                <div className="px-4 py-2.5 mb-1">
                                                    <p className="text-xs font-medium text-[#1a1a1e]">{user?.name}</p>
                                                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                                                </div>
                                                <div className="border-t border-gray-100 mt-1 pt-1">
                                                    <button className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-50 transition-colors flex items-center gap-2" onClick={handleLogout}><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg> Logout</button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                                :
                                (
                                    <div className="flex gap-2 items-center">
                                        <Link className="bg-[#3d8b5e] text-white text-sm px-5 py-2 rounded-lg hover:bg-[#326d4b] transition-colors duration-200 font-normal" href={"/login"} data-discover="true">Login</Link>
                                        <Link className="bg-[#3d8b5e] text-white text-sm px-5 py-2 rounded-lg hover:bg-[#326d4b] transition-colors duration-200 font-normal" href={"/signup"} data-discover="true">Sign Up</Link>
                                    </div>
                                )
                            }
                        </div>
                        {isOpen && (
                            <ul className={"md:hidden border-t border-gray-100 py-3 space-y-0.5"}>
                                {NAV_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`block px-3 py-2.5 text-sm text-[#3f3f46] hover:text-default rounded-lg hover:bg-background transition-colors ${pathname === link.href
                                                ? "active"
                                                : ""
                                                }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}