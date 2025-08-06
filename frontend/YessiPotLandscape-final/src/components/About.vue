<template>
  <section class="relative bg-[#F4EAD5] min-h-screen flex items-center py-16 overflow-hidden" id="aboutus">
    <!-- Background coklat kiri -->
    <div class="absolute top-0 left-0 w-full h-1/2 sm:w-1/2 sm:h-full md:w-1/3 bg-[#CDBA83] z-0"></div>

    <!-- Konten utama -->
    <div
      class="relative w-full px-4 sm:px-6 md:px-8 xl:px-10 2xl:px-12 grid md:grid-cols-3 gap-8 md:gap-12 items-center z-10"
    >
      <!-- Kiri (Logo + Deskripsi) -->
      <div
        class="md:col-span-1 flex flex-col text-left z-10 pl-4 sm:pl-6 md:pl-10 xl:pl-12 2xl:pl-[5vw]"
      >
        <img src="/img/logo.png" alt="Logo" class="mb-6 -ml-2 sm:-ml-4 lg:-ml-6" />
        <h1 class="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold text-gray-800 leading-snug">
          Serahin Aja ke Kami!
        </h1>
        <p class="mt-4 text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-700 max-w-md">
          YessyPotLandscape adalah jasa pembuatan taman profesional di Bandung dan sekitarnya.
          Kami hadir buat bikin ruang kamu lebih indah, nyaman, dan alami — pas banget buat rumah,
          kantor, atau spot santai kamu!
        </p>
      </div>

      <!-- Kanan (3 foto grid) -->
      <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 z-10">
        <!-- Foto 1 -->
        <div>
          <div class="relative rounded-lg overflow-hidden shadow">
            <img
              src="/img/poto1 (1).jpg"
              alt="Minimalis Tropis"
              class="w-full aspect-[3/4] object-cover"
            />
            <div
              class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 via-transparent to-transparent p-3"
            >
              <h3 class="text-white font-bold text-base">Minimalis Tropis</h3>
            </div>
          </div>
          <p class="text-sm text-gray-700 mt-2">
            Desain taman sederhana dengan nuansa tropis, cocok untuk area sempit dan pencahayaan alami yang indah.
          </p>
        </div>

        <!-- Foto 2 -->
        <div>
          <div class="relative rounded-lg overflow-hidden shadow">
            <img
              src="/img/poto1 (2).jpg"
              alt="Elegan Eksotis"
              class="w-full aspect-[3/4] object-cover"
            />
            <div
              class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 via-transparent to-transparent p-3"
            >
              <h3 class="text-white font-bold text-base">Elegan Eksotis</h3>
            </div>
          </div>
          <p class="text-sm text-gray-700 mt-2">
            Taman elegan dengan tanaman palem, memberi kesan mewah dan rapi di perkantoran atau hunian modern.
          </p>
        </div>

        <!-- Foto 3 -->
        <div>
          <div class="relative rounded-lg overflow-hidden shadow">
            <img
              src="/img/poto1 (3).jpg"
              alt="Kering Modern"
              class="w-full aspect-[3/4] object-cover"
            />
            <div
              class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 via-transparent to-transparent p-3"
            >
              <h3 class="text-white font-bold text-base">Kering Modern</h3>
            </div>
          </div>
          <p class="text-sm text-gray-700 mt-2">
            Tanaman tahan panas seperti agave, cocok untuk konsep xeriscape yang minim perawatan.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
