// pages/ProductsPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Import untuk React Hook Form & Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"; // 1. Import komponen Drawer

// --- Skema Zod untuk form input (sesuaikan dengan ekspektasi FakeStoreAPI untuk POST/PUT) ---
const productFormSchema = z.object({
  title: z.string().min(3, "Nama produk minimal 3 karakter"),
  price: z.number().positive("Harga harus angka positif"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  category: z.string().min(3, "Kategori minimal 3 karakter"),
  image: z.string().url("Link gambar harus URL yang valid"),
});

// --- Infer type dari skema Zod ---
type ProductFormValues = z.infer<typeof productFormSchema>;

// --- Type Product (sesuaikan dengan respons dari FakeStoreAPI) ---
type Product = {
  id: number; // ID dari FakeStoreAPI adalah number
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

export default function ProductsPage() {
  const router = useRouter(); // Untuk navigasi detail produk

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddProductForm, setShowAddProductForm] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Inisialisasi React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
  });

  // Fungsi untuk fetch semua produk (READ)
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: Product[] = await response.json();
      setProducts(data);
      setFilteredProducts(data); // Inisialisasi filteredProducts dengan semua data
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Gagal memuat produk. Coba lagi nanti ya.");
    } finally {
      setLoading(false);
    }
  };

  // Effect untuk fetching data saat komponen pertama kali render
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // BUG: Secara paksa mengatur posisi scroll ke paling atas.
    window.scrollTo(0, 0);
  });

  // Effect untuk filter produk berdasarkan search query
  useEffect(() => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]); // Dependensi: searchQuery atau products berubah

  // Fungsi untuk handle submit form (ADD/UPDATE)
  const onSubmit = async (values: ProductFormValues) => {
    try {
      let response;
      if (selectedProduct) {
        // Mode UPDATE (PUT request)
        response = await fetch(
          `https://fakestoreapi.com/products/${selectedProduct.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to update product: ${response.statusText}`);
        }
        const updatedProduct = await response.json();
        console.log("Update success (not persistent):", updatedProduct);

        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === selectedProduct.id ? { ...p, ...values } : p
          )
        );
        alert("Produk berhasil di-update (secara visual)!");
      } else {
        // Mode ADD (POST request)
        response = await fetch("https://fakestoreapi.com/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error(`Failed to add product: ${response.statusText}`);
        }
        const newProduct = await response.json();
        console.log("Add success (not persistent):", newProduct);

        setProducts((prevProducts) => [
          ...prevProducts,
          { ...newProduct, id: newProduct.id },
        ]);
        alert("Produk berhasil ditambahkan (secara visual)!");
      }

      reset(); // Reset form
      setSelectedProduct(null); // Keluar dari mode edit
      setShowAddProductForm(false); // Tutup form setelah submit
    } catch (err: any) {
      console.error("Error saving product:", err);
      alert(`Error: ${err.message}`);
    }
  };

  // Fungsi untuk memulai mode edit
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    // Isi form dengan data produk yang akan diedit
    setValue("title", product.title);
    setValue("price", product.price);
    setValue("description", product.description);
    setValue("category", product.category);
    setValue("image", product.image);
    setShowAddProductForm(true); // Tampilkan form
  };

  // Fungsi untuk menghapus produk
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin mau hapus produk ini?")) return;

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.statusText}`);
      }
      const deletedItem = await response.json();
      console.log("Delete success (not persistent):", deletedItem);

      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== id)
      ); // Update filtered juga
      alert("Produk berhasil dihapus (secara visual)!");
    } catch (err: any) {
      console.error("Error deleting product:", err);
      alert(`Error: ${err.message}`);
    }
  };

  // Handle ketika tombol 'Tambahkan Produk' diklik
  const handleAddProductClick = () => {
    setSelectedProduct(null); // Pastikan bukan mode edit
    reset(); // Reset form jika ada sisa isian
    setShowAddProductForm(true); // Tampilkan form
  };

  // Handle ketika tombol 'Tutup Form' diklik
  const handleCloseForm = () => {
    setShowAddProductForm(false);
    setSelectedProduct(null); // Keluar dari mode edit
    reset(); // Reset form
  };

  // --- UI Render berdasarkan state loading dan error ---
  if (loading) {
    return (
      <>
        <div className="h-screen flex flex-col items-center justify-center text-center my-8">
          <p className="text-xl">
            Lagi nyiapin produk-produk keren nih, sabar ya...
          </p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="h-screen flex flex-col items-center justify-center text-center my-8">
          <p className="text-xl text-red-500">{error}</p>
          <p className="text-lg">
            Coba refresh halaman atau cek koneksi internetmu ya.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="mt-26 mx-6 p-4">
        <h1 className="text-4xl font-extrabold text-center my-8">
          Koleksi Produk Pilihan
        </h1>
        <p className="text-center mb-6 text-gray-700">
          Jelajahi produk atau tambahkan item baru ke daftar!
        </p>

        {/* 2. Ganti tombol dengan struktur Drawer */}
        <div className="mb-8 flex flex-col gap-4 items-center sm:flex-row">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari produk berdasarkan nama..."
            className="grow w-full sm:w-2/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Kontrol Drawer ada di sini */}
          <Drawer
            open={showAddProductForm}
            onOpenChange={setShowAddProductForm}
          >
            <DrawerTrigger asChild>
              <button
                onClick={handleAddProductClick}
                className="w-full sm:w-auto px-6 py-3 bg-neutral-950 outline-2 text-white font-semibold rounded-lg shadow-md focus:outline-none hover:bg-white hover:text-black focus:ring-2 focus:ring-offset-2 focus:ring-neutral-950 transition-colors duration-200"
              >
                Tambahkan Produk
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>
                    {selectedProduct ? "Edit Produk" : "Tambah Produk Baru"}
                  </DrawerTitle>
                  <DrawerDescription>
                    Isi detail produk di bawah ini. Klik simpan jika sudah
                    selesai.
                  </DrawerDescription>
                </DrawerHeader>

                {/* 1. Bungkus form fields dalam div yang bisa di-scroll */}
                <div className="p-4 overflow-y-auto max-h-[60vh]">
                  <form
                    id="product-form" // 2. Beri ID pada form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {/* Semua field input (Nama, Harga, Deskripsi, dll.) ada di sini */}
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nama Produk
                      </label>
                      <input
                        id="title"
                        {...register("title")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Harga
                      </label>
                      <input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register("price", { valueAsNumber: true })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.price && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.price.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Deskripsi
                      </label>
                      <textarea
                        id="description"
                        {...register("description")}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Kategori
                      </label>
                      <input
                        id="category"
                        {...register("category")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.category.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Link Gambar (URL)
                      </label>
                      <input
                        id="image"
                        type="url"
                        {...register("image")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.image && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.image.message}
                        </p>
                      )}
                    </div>
                  </form>
                  <DrawerFooter>
                    <button
                      type="submit"
                      form="product-form" // Hubungkan ke form dengan ID
                      disabled={isSubmitting}
                      className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      {isSubmitting
                        ? "Mengirim..."
                        : selectedProduct
                        ? "Update Produk"
                        : "Tambah Produk"}
                    </button>
                    <DrawerClose asChild>
                      <button
                        type="button"
                        onClick={handleCloseForm}
                        className="w-full px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      >
                        Batal
                      </button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* 4. Hapus blok form lama dari sini */}
        {/* Blok <div className="bg-white p-6 ..."> yang lama sudah dihapus */}

        {/* Daftar Produk (logika ini tetap sama) */}
        {filteredProducts.length === 0 && searchQuery !== "" ? (
          <div className="h-dvh text-center py-16">
            <p className="text-xl text-gray-500">
              Duh, produk yang kamu cari tidak ditemukan.
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="h-dvh text-center py-16">
            <p className="text-xl text-gray-500">
              Duh, belum ada produk yang tampil nih. Tambahin dulu yuk!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              // 2. Ganti div pembungkus dengan Link
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="border-2 border-neutral-200 p-4 rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col"
              >
                {/* Konten kartu produk tetap sama */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-700 text-sm mb-2 flex-grow">
                  {product.description.substring(0, 100)}...
                </p>
                <p className="text-lg font-bold text-green-600">
                  Rp{(product.price * 15000).toLocaleString("id-ID")}
                </p>
                <p className="text-gray-500 text-xs">
                  Kategori: {product.category}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-500">★</span>
                  <span className="font-bold">{product.rating?.rate}</span>
                  <span className="text-gray-500">
                    ({product.rating?.count} ulasan)
                  </span>
                </div>
                <div className="flex space-x-2 mt-auto">
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // 4. Cegah navigasi saat klik tombol edit
                      e.stopPropagation();
                      handleEdit(product);
                    }}
                    className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // 5. Cegah navigasi saat klik tombol delete
                      e.stopPropagation();
                      handleDelete(product.id);
                    }}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
