<template>
  <div>
    <h1>{{ organizer.name }}</h1>
    <img v-for="(image, k) in organizer.imageUrls" :key="k" :src="image" />
  </div>
</template>

<script>
export default {
  props: ['id', 'organizer']
}
</script>
