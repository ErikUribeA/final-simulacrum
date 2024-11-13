'use client';

import { signOut } from "next-auth/react";
import Link from "next/link";
import { FaRegFolderOpen } from "react-icons/fa6";
import { PiSignOutBold } from "react-icons/pi";

const Sidebar = () => {
    const handleLogout = () => {
        signOut();
    };

    return (
        <div className="bg-white h-screen p-4 space-y-6 w-full">
            {/* Sidebar Header */}
            <div className="text-2xl font-bold text-black">VolunteerConnect</div>

            {/* Navigation Links */}
            <nav className="space-y-4">
                <Link href="#" className="flex gap-2 items-center hover:bg-gray-200 p-2 rounded">
                    <FaRegFolderOpen className="text-[1.4em]" />
                    Proyectos
                </Link>
                <button
                    onClick={handleLogout}
                    className="flex gap-2 items-center hover:bg-gray-200 p-2 rounded bg-transparent border-none text-black"
                >
                    <PiSignOutBold className="text-[1.4em]" />
                    Cerrar Sesión
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
