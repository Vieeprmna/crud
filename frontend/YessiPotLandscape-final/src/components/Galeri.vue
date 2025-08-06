<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
import axios from 'axios'

const gallery = ref([])
const isVisible = ref(false)
const galleryTitle = ref(null)
const backend = 'http://localhost:2500' // Ganti ke domain/hosting lo kalau udah upload

// Ambil data galeri dari backend
const loadGallery = async () => {
  try {
    const res = await axios.get(`${backend}/galeri`)
    gallery.value = res.data
  } catch (err) {
    console.error('Gagal load galeri:', err)
  }
}

onMounted(async () => {
  await loadGallery()
  await nextTick()

  new Swiper('.galeriSwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  })

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.4 }
  )
  if (galleryTitle.value) observer.observe(galleryTitle.value)
})
</script>

<template>
  <section id="galeri" class="bg-[#F4EAD5] py-14 flex items-center justify-center font-[Poppins]">
    <div class="w-full max-w-[1920px] px-4 text-center">
      <!-- Judul -->
      <h2 ref="galleryTitle"
          :class="['text-[#3C4C33]', 'text-3xl', 'xl:text-5xl', 'font-bold', 'mb-10', isVisible ? 'animate-fadeInLeft' : 'opacity-0']">
        Gaya Taman Ala YessyPot
      </h2>

      <!-- MOBILE Swiper -->
      <div class="block md:hidden">
        <div class="swiper galeriSwiper h-auto w-full">
          <div class="swiper-wrapper">
            <div
              v-for="(item, i) in gallery"
              :key="i"
              class="swiper-slide w-[90%] max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img :src="`${backend}/${item.gambar}`" class="w-full h-60 object-cover" />
              <div class="p-4 text-left">
                <h3 class="text-base font-bold mb-2">{{ item.judul }}</h3>
                <p class="text-gray-600 text-sm leading-snug">{{ item.deskripsi }}</p>
              </div>
            </div>
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-pagination"></div>
        </div>
      </div>

      <!-- DESKTOP Cards -->
      <!-- DESKTOP Cards -->
    <div class="hidden md:flex">
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        <div
          v-for="(item, i) in gallery"
          :key="i"
          class="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <img :src="`${backend}/${item.gambar}`" class="w-full h-64 xl:h-80 object-cover" />
          <div class="p-4 text-left">
            <h3 class="font-bold mb-2 text-base xl:text-lg">{{ item.judul }}</h3>
            <p class="text-gray-600 text-xs xl:text-sm">{{ item.deskripsi }}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-80px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fadeInLeft {
  animation: fadeInLeft 1.5s ease-out 0s forwards;
}

@media (max-width: 768px) {
  .swiper-button-next,
  .swiper-button-prev {
    display: none !important;
  }
}
</style>
