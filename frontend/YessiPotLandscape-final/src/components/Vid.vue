<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

const isVisibleTransport = ref(false)
const transportTitle = ref(null)
const isParagraphVisible = ref(false)
const transportParagraph = ref(null)

onMounted(async () => {
  await nextTick()

  new Swiper('.transportSwiper', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 1.5 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 2.5 },
      1280: { slidesPerView: 3 },
      1536: { slidesPerView: 4 },
      1920: { slidesPerView: 5 }
    }
  })

  const observer1 = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisibleTransport.value = true
        observer1.disconnect()
      }
    },
    { threshold: 0.4 }
  )

  const observer2 = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isParagraphVisible.value = true
        observer2.disconnect()
      }
    },
    { threshold: 0.4 }
  )

  if (transportTitle.value) observer1.observe(transportTitle.value)
  if (transportParagraph.value) observer2.observe(transportParagraph.value)
})
</script>

<template>
  <section id ="service"
    class="bg-[#fef3dc] h-auto pt-14 pb-10 md:pt-16 md:pb-14 xl:pt-24 xl:pb-14 2xl:pt-20 2xl:pb-40 flex items-center justify-center font-[Poppins]"
  >
    <div class="w-full max-w-[1600px] px-4 text-center">
      <h2
        ref="transportTitle"
        :class="[
          'text-3xl',
          'font-bold',
          'mb-2',
          'text-black',
          isVisibleTransport ? 'animate-fadeInLeft' : 'opacity-0'
        ]"
      >
        Apa Aja yang Bisa Kita Bikin Buat Kamu
      </h2>

      <p
        ref="transportParagraph"
        :class="[
          'text-gray-600',
          'mb-10',
          'max-w-2xl',
          'mx-auto',
          isParagraphVisible ? 'animate-fadeInLeft' : 'opacity-0'
        ]"
      >
        YessyPotLandscape siap menangani pengiriman dan pemindahan tanaman besar langsung ke lokasi proyek kamu,
        dengan aman dan rapi. Kami pastikan semua elemen taman sampai dalam kondisi prima — siap ditanam, 
        siap bikin taman kamu makin hidup!
      </p>

      <!-- Swiper -->
      <div class="swiper transportSwiper pb-10">
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in [
              { src: '/img/video1(1).gif', title: 'Palm Sikas' },
              { src: '/img/video1(2).gif', title: 'Cemara' },
              { src: '/img/video1(3).gif', title: 'Ketapang Kencana' },
              { src: '/img/video1(4).gif', title: 'Rumput' },
              { src: '/img/video1(5).gif', title: 'Pohon Cemara' }
            ]"
            :key="index"
            class="swiper-slide relative rounded-lg overflow-hidden shadow w-[260px] h-[460px]"
          >
            <img :src="item.src" class="w-full h-full object-cover" />
            <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
              <h3 class="text-white text-sm font-semibold">{{ item.title }}</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="swiper-pagination mt-6"></div>
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

.transportSwiper::-webkit-scrollbar {
  display: none;
}
.swiper-pagination {
  text-align: center;
}
.swiper-pagination-bullet {
  background: #4b5563;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background: #15803d;
}
</style>
