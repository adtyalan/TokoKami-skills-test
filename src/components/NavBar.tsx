"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Tambahkan ikon X untuk menutup
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function NavigationMenuDemo() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      {/* Container Utama Navbar */}
      <header className="fixed top-5 left-5 right-5 z-50 flex h-16 items-center justify-between rounded-full bg-white px-6 shadow-md">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-xl"
        >
          TokoKami
        </Link>

        {/* Menu untuk Desktop */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={"/"}>Beranda</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={"/products"}>Produk</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/about">Tentang</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Tombol Hamburger untuk Mobile */}
        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Overlay Menu untuk Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-white lg:hidden">
          <button
            className="absolute top-7 right-7"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-8 w-8" />
          </button>
          <Link
            href={"/"}
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-semibold"
          >
            Beranda
          </Link>
          <Link
            href={"/products"}
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-semibold"
          >
            Produk
          </Link>
          <Link
            href={"/about"}
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-semibold"
          >
            Tentang
          </Link>
        </div>
      )}
    </>
  );
}
