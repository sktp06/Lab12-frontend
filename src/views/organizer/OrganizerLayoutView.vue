<template>
  <div v-if="GStore.organizer">
    <h1>{{ GStore.organizer.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'OrganizerDetailView' }">Details</router-link>
    </div>
    <router-view :organizer="GStore.organizer" />
  </div>
</template>
<script>
export default {
  inject: ['GStore']
}
</script>
