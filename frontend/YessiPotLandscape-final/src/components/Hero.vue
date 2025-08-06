<script setup>
import { onMounted, ref } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  isVisible.value = true
})
</script>

<template>
  <section
    id="home"
    class="relative h-screen bg-cover bg-center pt-16 w-full"
    style="background-image: url('/img/video1(5).gif');"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/30"></div>

    <!-- Container -->
    <div class="relative h-full max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20 font-[Poppins]">
      <!-- Judul -->
      <div
        class="absolute top-[35%] left-6 lg:left-12 xl:left-16 2xl:left-20 -translate-y-1/2 z-10 transition-all duration-1000 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <h1 class="text-white text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold leading-tight">
          JASA PEMBUATAN TAMAN<br />|YESSYPOTLANDSCAPE
        </h1>
        <p class="text-white text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl leading-snug max-w-[310px] sm:max-w-[420px] md:max-w-[620px] lg:max-w-[680px] xl:max-w-[780px] mt-4 md:mt-6 text-left">
  Kami ubah halaman biasa jadi taman yang luar biasa.<br />
  Ciptakan ruang hijau yang estetik dan fungsional bersama YessyPot.
</p>



      </div>
    </div>

    <!-- Tombol WhatsApp -->
    <div class="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 xl:bottom-10 xl:right-10 z-50 font-[Poppins]">
      <a
        href="https://wa.me/6282120526772"
        target="_blank"
        class="flex items-center gap-2 lg:gap-3 bg-black px-4 py-2 lg:px-6 lg:py-3 xl:px-7 xl:py-4 rounded-full shadow-lg hover:bg-neutral-800 transition-all duration-300 hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7"
          viewBox="0 0 24 24"
          fill="#25D366"
        >
          <path
            d="M20.52 3.48A11.9 11.9 0 0012 0C5.37 0 0 5.38 0 12c0 2.11.55 4.15 1.6 5.95L0 24l6.21-1.63A11.95 11.95 0 0012 24c6.63 0 12-5.38 12-12 0-3.19-1.25-6.19-3.48-8.52zM12 22c-1.85 0-3.64-.49-5.2-1.4l-.37-.22-3.69.97.99-3.59-.24-.37A9.9 9.9 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.22-7.48l-2.7-1.26a.93.93 0 00-1.1.27l-.48.6a7.7 7.7 0 01-3.6-3.6l.6-.48a.93.93 0 00.27-1.1L9.5 6.78a.93.93 0 00-1.07-.52c-1.13.3-1.93 1.38-1.93 2.58 0 4.23 3.44 7.67 7.67 7.67 1.2 0 2.28-.8 2.58-1.93a.93.93 0 00-.53-1.07z"
          />
        </svg>
        <span class="text-white text-sm lg:text-base xl:text-lg font-medium">Hubungi Kami</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
@media (min-width: 1920px) {
  #home h1 {
    font-size: 5rem;
  }
}
@media (min-width: 2560px) {
  #home h1 {
    font-size: 6rem;
  }
}
</style>
