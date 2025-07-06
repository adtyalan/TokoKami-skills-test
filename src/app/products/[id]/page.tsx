"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Image from "next/image";

// Tipe data untuk satu produk (bisa disamakan dengan di halaman products)
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id; // Mengambil ID dari URL

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Jangan fetch jika ID belum tersedia
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(
            "Produk tidak ditemukan atau terjadi kesalahan server."
          );
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Jalankan useEffect setiap kali 'id' berubah

  // Tampilan saat loading
  if (loading) {
    return (
      <>
        <NavBar />
        <div className="flex h-screen items-center justify-center">
          <p className="text-xl">Memuat detail produk...</p>
        </div>
        <Footer />
      </>
    );
  }

  // Tampilan jika ada error
  if (error) {
    return (
      <>
        <NavBar />
        <div className="flex h-screen items-center justify-center text-center">
          <p className="text-xl text-red-500">{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  // Tampilan jika produk tidak ditemukan setelah fetch selesai
  if (!product) {
    return (
      <>
        <NavBar />
        <div className="flex h-screen items-center justify-center">
          <p className="text-xl">Produk tidak ditemukan.</p>
        </div>
        <Footer />
      </>
    );
  }

  // Tampilan utama jika produk berhasil dimuat
  return (
    <>
      <NavBar />
      <main className="container mx-auto px-4 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Kolom Gambar */}
          <div className="w-full">
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-auto object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Kolom Detail Produk */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">{product.title}</h1>
            <p className="text-lg text-gray-600 capitalize">
              {product.category}
            </p>
            <p className="text-3xl font-semibold text-green-600">
              Rp{(product.price * 15000).toLocaleString("id-ID")}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">★</span>
              <span className="font-bold">{product.rating.rate}</span>
              <span className="text-gray-500">
                ({product.rating.count} ulasan)
              </span>
            </div>
            <p className="text-gray-800 leading-relaxed mt-4">
              {product.description}
            </p>
            <button className="mt-6 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
