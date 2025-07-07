import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mt-20 mx-auto px-4 py-8">
        <article className="flex flex-col lg:flex-row items-center lg:items-start gap-8 p-6">
          <figure className="flex-1 flex justify-center items-center flex-col">
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
          <div className="flex-2">
            <h1 className="text-3xl font-bold mb-4">Tentang Kami</h1>
            <p className="text-lg mb-4">
              TokoKami adalah platform e-commerce yang didedikasikan untuk
              mempromosikan dan menjual produk-produk lokal Indonesia. Kami
              percaya bahwa dengan mendukung produk lokal, kita dapat membantu
              mengembangkan ekonomi lokal, menciptakan lapangan kerja, dan
              melestarikan warisan budaya Indonesia. Di TokoKami, Anda dapat
              menemukan berbagai produk berkualitas tinggi yang dibuat oleh
              pengrajin lokal, mulai dari kerajinan tangan, pakaian, makanan,
              hingga barang-barang rumah tangga.
            </p>
            <Button variant={"default"}>
              <Link href={"https://wa.me/+6289527157998"} target="_blank">
                Hubungi
              </Link>
            </Button>
          </div>
        </article>
      </main>
    </div>
  );
}
