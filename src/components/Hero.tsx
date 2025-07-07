import React from "react";
import Image from "next/image";
import HeroButton from "../components/HeroButton";
import Slider from "react-infinite-logo-slider";

export default function Hero() {
  return (
    <>
      <article className="relative w-full h-dvh">
        <Image
          src="/hero.jpg"
          alt="Man painting batik"
          width={500}
          height={500}
          className="w-full h-dvh object-cover"
        />
        <div className="absolute inset-0 right-16 left-16 flex flex-col gap-4 items-center justify-center text-white">
          <h1 className="text-4xl font-bold text-center">
            Belanja online untuk kekuatan lokal
          </h1>
          <p className="text-center">
            Menggunakan aplikasi kami, Anda dapat menjelajahi dan membeli
            berbagai produk karya anak bangsa Indonesia.
          </p>
          <div className="flex gap-2">
            <HeroButton></HeroButton>
          </div>
        </div>
      </article>
      <div className="py-8">
        <h1 className="font-medium text-2xl text-neutral-500 text-center">
          Partner Kami
        </h1>
        <Slider
          width="250px"
          duration={40}
          pauseOnHover={false}
          blurBorders={true}
          blurBorderColor={"#fff"}
          toRight={false}
        >
          <Slider.Slide>
            <img
              src="https://economicreview.id/wp-content/uploads/2022/04/images-548x375.png"
              alt="any"
              className="w-36"
            />
          </Slider.Slide>
          <Slider.Slide>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Logo_Kementerian_Usaha_Mikro%2C_Kecil%2C_dan_Menengah_Republik_Indonesia_%282025%29.svg/938px-Logo_Kementerian_Usaha_Mikro%2C_Kecil%2C_dan_Menengah_Republik_Indonesia_%282025%29.svg.png"
              alt="any2"
              className="w-24"
            />
          </Slider.Slide>
          <Slider.Slide>
            <img
              src="https://asset.kompas.com/crops/RKiYCdvz27uxQ2dq_VjgTsXLUwM=/0x121:719x600/780x390/data/photo/2024/12/12/675ab8ba0e6bf.jpeg"
              alt="any3"
              className="w-46"
            />
          </Slider.Slide>
          <Slider.Slide>
            <img
              src="https://api.minio.jatimprov.go.id/kominfo-jatim/images/IMG-20230105-WA0066.jpg"
              alt="any3"
              className="w-36"
            />
          </Slider.Slide>
        </Slider>
        <Slider
          width="250px"
          duration={40}
          pauseOnHover={false}
          blurBorders={true}
          blurBorderColor={"#fff"}
          toRight={false}
        >
          <Slider.Slide>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Logo_Kementerian_Usaha_Mikro%2C_Kecil%2C_dan_Menengah_Republik_Indonesia_%282025%29.svg/938px-Logo_Kementerian_Usaha_Mikro%2C_Kecil%2C_dan_Menengah_Republik_Indonesia_%282025%29.svg.png"
              alt="any2"
              className="w-24"
            />
          </Slider.Slide>
          <Slider.Slide>
            <img
              src="https://economicreview.id/wp-content/uploads/2022/04/images-548x375.png"
              alt="any"
              className="w-36"
            />
          </Slider.Slide>
          <Slider.Slide>
            <img
              src="https://api.minio.jatimprov.go.id/kominfo-jatim/images/IMG-20230105-WA0066.jpg"
              alt="any3"
              className="w-36"
            />
          </Slider.Slide>
          <Slider.Slide>
            <img
              src="https://asset.kompas.com/crops/RKiYCdvz27uxQ2dq_VjgTsXLUwM=/0x121:719x600/780x390/data/photo/2024/12/12/675ab8ba0e6bf.jpeg"
              alt="any3"
              className="w-46"
            />
          </Slider.Slide>
        </Slider>
      </div>
      <article className="sm:mx-4">
        <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 sm:flex-row gap-6">
          <div className="flex flex-col gap-4 w-full p-8 rounded-xl shadow-lg inset-shadow-sm/10">
            <h2 className="text-3xl text-center font-bold mb-4">
              Mengapa harus membeli produk lokal?
            </h2>
            <p className="text-lg">
              Membeli produk lokal bukan hanya mendukung ekonomi lokal, tetapi
              juga membantu menjaga warisan budaya dan tradisi. Dengan membeli
              produk lokal, Anda berkontribusi pada keberlanjutan usaha kecil
              dan menciptakan lapangan kerja di komunitas Anda. Produk lokal
              sering kali dibuat dengan kualitas yang lebih baik dan perhatian
              terhadap kesesuaian budaya, sehingga memberikan nilai tambah bagi
              pembeli. Selain itu, membeli produk lokal juga berkontribusi pada
              pengurangan jejak karbon, karena produk tersebut biasanya tidak
              perlu diangkut jarak jauh. Dengan demikian, membeli produk lokal
              adalah pilihan yang cerdas dan bertanggung jawab.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:col-span-2 gap-4">
            <div className="flex flex-col gap-4 w-full p-4 rounded-xl shadow-lg">
              <Image
                src="/highlight-card1.jpg"
                alt="tumpukan kain batik di atas meja"
                width={500}
                height={500}
                className="w-full aspect-video object-cover rounded-xl"
              />
              <h2 className="text-3xl font-bold">66 Juta</h2>
              <p className="text-xl font-semibold">
                Usaha Mikro, Kecil, dan Menengah
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full p-4 rounded-md shadow-lg">
              <Image
                src="/highlight-card2.jpg"
                alt="foto model tangan bergandengan dengan kain batik"
                width={500}
                height={500}
                className="w-full aspect-video object-cover rounded-md"
              />
              <h2 className="text-3xl font-bold">61%</h2>
              <p className="text-xl font-semibold">Kontribusi ke PDB Negara</p>
            </div>
            <div className="flex flex-col gap-4 w-full p-4 rounded-md shadow-lg">
              <Image
                src="/highlight-card3.jpg"
                alt="model mengenakan batik dengan latar belakang alam"
                width={500}
                height={500}
                className="w-full aspect-video object-cover rounded-md"
              />
              <h2 className="text-3xl font-bold">97%</h2>
              <p className="text-xl font-semibold">
                Tenaga kerja diserap dari total pekerja
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full p-4 rounded-md shadow-lg">
              <Image
                src="/highlight-card4.jpg"
                alt="model mengenakan batik dengan latar belakang alam"
                width={500}
                height={500}
                className="w-full aspect-video object-cover rounded-md"
              />
              <h2 className="text-3xl font-bold">117 Juta</h2>
              <p className="text-xl font-semibold">Total jumlah tenaga kerja</p>
            </div>
          </div>
        </div>
      </article>
      <article className="mb-8">
        <h1 className="text-4xl font-extrabold text-center mx-8 py-8">
          FAQ (Frequently Asked Questions)
        </h1>
        <section className="flex flex-col gap-4">
          <details className="group mx-8 p-4 border border-neutral-400 rounded-md">
            <summary className="font-semibold border-neutral-400 group-open:mb-2 cursor-pointer">
              Apa itu TokoKami?
            </summary>
            TokoKami adalah platform e-commerce yang didedikasikan untuk
            mempromosikan dan menjual produk-produk lokal Indonesia. Kami
            percaya bahwa dengan mendukung produk lokal, kita dapat membantu
            mengembangkan ekonomi lokal, menciptakan lapangan kerja, dan
            melestarikan warisan budaya Indonesia. Di TokoKami, Anda dapat
            menemukan berbagai produk berkualitas tinggi yang dibuat oleh
            pengrajin lokal, mulai dari kerajinan tangan, pakaian, makanan,
            hingga barang-barang rumah tangga.
          </details>
          <details className="group mx-8 p-4 border border-neutral-400 rounded-md">
            <summary className="font-semibold border-neutral-400 group-open:mb-2 cursor-pointer">
              Mengapa menggunakan TokoKami?
            </summary>
            TokoKami menawarkan berbagai keuntungan bagi pembeli dan penjual.
            Bagi pembeli, kami menyediakan akses mudah ke produk lokal
            berkualitas tinggi dengan harga yang kompetitif. Kami juga
            memastikan bahwa setiap produk pasti asli dan berasal dari pelaku
            usaha lokal terpercaya. Bagi penjual, TokoKami memberikan platform
            yang mudah digunakan untuk memasarkan produk ke pasar yang lebih
            luas, serta dukungan promosi dan pelatihan untuk meningkatkan
            penjualan.
          </details>
          <details className="group mx-8 p-4 border border-neutral-400 rounded-md">
            <summary className="font-semibold border-neutral-400 group-open:mb-2 cursor-pointer">
              Apa saja fitur yang tersedia di TokoKami?
            </summary>
            TokoKami menyediakan berbagai fitur untuk meningkatkan pengalaman
            belanja online Anda. Fitur-fitur ini termasuk pencarian produk yang
            mudah, sistem pembayaran yang aman, pelacakan pesanan secara
            real-time, ulasan produk dari pembeli lain, serta layanan pelanggan
            yang responsif. Selain itu, kami juga menyediakan fitur promosi
            khusus untuk produk lokal unggulan dan rekomendasi produk sesuai
            minat Anda.
          </details>
        </section>
      </article>
    </>
  );
}
