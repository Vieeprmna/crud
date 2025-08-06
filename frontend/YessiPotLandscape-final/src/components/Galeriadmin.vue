  <template>
    <section class="relative min-h-screen bg-[#f3f1e7] px-6 py-8 overflow-hidden">
      <!-- Canvas daun jatuh -->
      <canvas ref="leafCanvas" class="absolute inset-0 w-full h-full z-0"></canvas>

      <!-- Content -->
      <div class="relative z-10">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-[#2e3d2f] flex items-center gap-2">
            <SparklesIcon class="w-6 h-6 text-green-700" /> Mode Pemilik
          </h1>
          <button @click="isAdmin = !isAdmin"
            :class="isAdmin ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-600'"
            class="px-4 py-2 rounded-full font-semibold shadow-sm hover:opacity-90 transition-all text-sm flex items-center gap-2">
            <LockClosedIcon v-if="isAdmin" class="w-5 h-5" />
            <LockOpenIcon v-else class="w-5 h-5" />
            <span v-if="isAdmin">Matikan Admin Mode</span>
            <span v-else>Aktifkan Admin Mode</span>
          </button>
        </div>

        <!-- Card -->
        <div class="bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-6 md:p-8">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2 text-[#2e3d2f]">
            <PhotoIcon class="w-6 h-6 text-green-600" /> Tambah Galeri
          </h2>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="flex flex-col md:flex-row flex-wrap gap-4 mb-8 items-start md:items-end">
            <!-- Drag & Drop -->
            <div
              class="w-full md:w-1/3 border-2 border-dashed border-green-300 rounded p-4 text-center cursor-pointer bg-green-50 hover:bg-green-100 transition"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <p class="text-green-700 font-semibold mb-2">Tarik Gambar ke sini</p>
              <input type="file" class="hidden" ref="fileInput" @change="handleFileChange" />
              <button type="button" @click="fileInput.click()" class="text-sm underline">Pilih Gambar</button>
              <p class="mt-2 text-gray-500 text-sm">{{ selectedFile?.name || 'Belum ada gambar' }}</p>
            </div>

            <!-- Judul -->
            <input type="text" v-model="form.title" placeholder="Judul"
              class="border rounded px-4 py-2 w-full md:w-[30%]" required />

            <!-- Deskripsi -->
            <input type="text" v-model="form.desc" placeholder="Deskripsi"
              class="border rounded px-4 py-2 w-full md:w-[30%]" required />

            <!-- Tombol -->
            <button type="submit"
              class="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded w-full md:w-auto">
              {{ form.id ? 'Update' : 'Tambah' }}
            </button>
          </form>

          <!-- Daftar Galeri -->
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2 text-[#2e3d2f]">
            <ViewColumnsIcon class="w-6 h-6 text-green-600" /> Daftar Galeri
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="item in gallery"
            :key="item.id"
            class="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img :src="item.image" alt="img" class="w-full h-64 xl:h-80 object-cover" />
            <div class="p-4 text-left">
              <h3 class="font-bold mb-2 text-base xl:text-lg text-[#2e3d2f]">{{ item.title }}</h3>
              <p class="text-gray-600 text-xs xl:text-sm">{{ item.desc }}</p>
              <div v-if="isAdmin" class="flex justify-end gap-4 text-sm mt-2">
                <button @click="editItem(item)" class="text-yellow-700 hover:underline">Edit</button>
                <button @click="deleteItem(item.id)" class="text-red-700 hover:underline">Hapus</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue'
  import {
    LockClosedIcon, LockOpenIcon, SparklesIcon,
    PhotoIcon, ViewColumnsIcon, StarIcon
  } from '@heroicons/vue/24/solid'
  import axios from 'axios'

  const BASE_URL = 'http://localhost:2500'
  const gallery = ref([])
  const form = ref({ id: null, image: '', title: '', desc: '' })
  const selectedFile = ref(null)
  const fileInput = ref(null)
  const isAdmin = ref(true)
  const leafCanvas = ref(null)

  const ratings = ref([])
  const ratingForm = ref({ id: null, name: '', comment: '', score: '' })

  onMounted(() => {
    const saved = localStorage.getItem('gallery_data')
    if (saved) gallery.value = JSON.parse(saved)

    const savedRatings = localStorage.getItem('ratings_data')
    if (savedRatings) ratings.value = JSON.parse(savedRatings)

    const canvas = leafCanvas.value
    const ctx = canvas.getContext('2d')
    let leaves = []
    const maxLeaves = 20

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const createLeaf = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      speedY: 1 + Math.random() * 2,
      speedX: Math.random() * 1 - 0.5,
      size: 20 + Math.random() * 20,
      angle: Math.random() * 2 * Math.PI
    })

    for (let i = 0; i < maxLeaves; i++) leaves.push(createLeaf())

    const drawLeaf = (leaf) => {
      ctx.save()
      ctx.translate(leaf.x, leaf.y)
      ctx.rotate(leaf.angle)
      ctx.fillStyle = 'rgba(89, 125, 80, 0.5)'
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.quadraticCurveTo(-leaf.size / 2, leaf.size / 2, 0, leaf.size)
      ctx.quadraticCurveTo(leaf.size / 2, leaf.size / 2, 0, 0)
      ctx.fill()
      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let leaf of leaves) {
        drawLeaf(leaf)
        leaf.y += leaf.speedY
        leaf.x += leaf.speedX
        leaf.angle += 0.01
        if (leaf.y > canvas.height) Object.assign(leaf, createLeaf())
      }
      requestAnimationFrame(animate)
    }

    animate()

    axios.get(`${BASE_URL}/galeri`).then(res => {
    gallery.value = res.data.map(item => ({
      id: item.id,
      title: item.judul,
      desc: item.deskripsi,
      image: `${BASE_URL}/${item.gambar}`
    }))
  })

  })

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('judul', form.value.title)
    formData.append('deskripsi', form.value.desc)
    if (selectedFile.value) {
      formData.append('gambar', selectedFile.value)
    }

    if (form.value.id) {
      // Update
      await axios.put(`${BASE_URL}/galeri/${form.value.id}`, formData)
    } else {
      // Tambah baru
      await axios.post(`${BASE_URL}/galeri`, formData)
    }

    // Refresh
    await fetchGallery()
    resetForm()
  }


  const fetchGallery = async () => {
    const res = await axios.get(`${BASE_URL}/galeri`)
    gallery.value = res.data.map(item => ({
      id: item.id,
      title: item.judul,
      desc: item.deskripsi,
      image: `${BASE_URL}/${item.gambar}`
    }))
  }

  const resetForm = () => {
    form.value = { id: null, title: '', desc: '', image: '' }
    selectedFile.value = null
  }


  const handleFileChange = (e) => {
    selectedFile.value = e.target.files[0]
  }

  const handleDrop = (e) => {
    const file = e.dataTransfer.files[0]
    if (file) selectedFile.value = file
  }


  const editItem = (item) => {
    form.value = { id: item.id, title: item.title, desc: item.desc }
  }

  const deleteItem = async (id) => {
    if (!confirm('Yakin ingin menghapus item ini?')) return
    await axios.delete(`${BASE_URL}/galeri/${id}`)
    await fetchGallery()
  }



  </script>

