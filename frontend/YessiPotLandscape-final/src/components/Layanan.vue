<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

const isVisibleService = ref(false)
const serviceTitle = ref(null)

onMounted(async () => {
  await nextTick()

  new Swiper('.serviceSwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
  })

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisibleService.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.4 }
  )

  if (serviceTitle.value) {
    observer.observe(serviceTitle.value)
  }
})
</script>

<template>
  <section class="bg-[#F4EAD5]  h-auto pt-14 pb-10 md:pt-16 md:pb-14 xl:pt-24 xl:pb-14 2xl:pt-0   2xl:pb-40 flex items-center justify-center font-[Poppins]">
    <div class="w-full max-w-[1600px] px-4 text-center">
      <!-- Judul dan paragraf dibungkus dalam 1 div yang di-observe -->
      <div ref="serviceTitle" :class="isVisibleService ? 'animate-fadeInLeft' : 'opacity-0'" class="mb-6">
        <h2 class="text-3xl font-bold mb-4">
          Apa Aja yang Bisa Kita Bikin Buat Kamu
        </h2>
        <p class="text-base max-w-2xl mx-auto text-gray-700">
          YessyPotLandscape siap bantu bikin taman sesuai gaya dan kebutuhan kamu — dari konsep, desain, sampai pemilihan tanaman. Kami juga bisa bantu pengadaan dan penanaman berbagai jenis tanaman hias dan pohon peneduh keren.
        </p>
      </div>

      <!-- Mobile (Swiper) -->
      <div class="block md:hidden">
        <div class="swiper serviceSwiper">
          <div class="swiper-wrapper">
            <div
              v-for="(card, i) in [
                { img: '/img/poto1 (1).jpg', title: 'Monstera' },
                { img: '/img/poto1 (3).jpg', title: 'Pohon Pule' },
                { img: '/img/poto1 (2).jpg', title: 'Kamboja' },
                { img: '/img/poto1 (9).jpg', title: 'Ketapang Kencana' }
              ]"
              :key="i"
              class="swiper-slide relative rounded-lg overflow-hidden shadow"
            >
              <img :src="card.img" class="w-full h-64 object-cover" />
              <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent px-4 py-2">
                <h3 class="text-white font-bold text-base">{{ card.title }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop (Grid) -->
      <div class="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        <div
          v-for="(card, i) in [
            { img: '/img/poto1 (1).jpg', title: 'Monstera' },
            { img: '/img/poto1 (3).jpg', title: 'Pohon Pule' },
            { img: '/img/poto1 (2).jpg', title: 'Kamboja' },
            { img: '/img/poto1 (9).jpg', title: 'Ketapang Kencana' }
          ]"
          :key="i"
          class="relative rounded-lg overflow-hidden shadow"
        >
          <img :src="card.img" class="w-full h-80 xl:h-[22rem] 2xl:h-[26rem] object-cover" />
          <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent px-4 py-2">
            <h3 class="text-white font-bold text-base">{{ card.title }}</h3>
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
  animation: fadeInLeft 1.5s ease-out forwards;
}
</style>
