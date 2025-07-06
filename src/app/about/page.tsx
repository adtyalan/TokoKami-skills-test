"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow container mt-20 mx-auto px-4 py-8">
        <article className="flex flex-col sm:flex-row items-center sm:items-start gap-8 p-6">
          <figure>
            <Image
              src="/highlight-card2.jpg"
              alt="Tentang Kami"
              width={400}
              height={400}
              className="rounded-lg mb-6 object-cover aspect-square"
            />
            <figcaption className="text-center text-gray-600">
              Foto TokoKami
            </figcaption>
          </figure>
          <div>
            <h1 className="text-3xl font-bold mb-4">Tentang Kami</h1>
            <p className="text-lg mb-4">
              Kami adalah toko online yang menyediakan berbagai produk buatan
              Indonesia berkualitas tinggi. Kami berkomitmen untuk mendukung
              pengrajin lokal dan mempromosikan warisan budaya Indonesia.
            </p>
            <p className="text-lg mb-4">
              Dengan pengalaman bertahun-tahun, kami memastikan setiap produk
              yang kami tawarkan adalah hasil karya terbaik dari pengrajin
              lokal.
            </p>
            <Button variant={"default"}>
              <Link href={"https://wa.me/+6289527157998"} target="_blank">
                Hubungi
              </Link>
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
