<template>
  <div>
    <h1>Create an organizer</h1>
    <form @submit.prevent="saveOrganizer">
      <BaseInput
        v-model="organizer.name"
        type="text"
        label="Name"
        class="field"
      />

      <h3>The image of the Organizer</h3>
      <UploadImages @changed="handleImages" />

      <button type="submit">Submit</button>
    </form>
    <pre>{{ organizer }}</pre>
  </div>
</template>

<script>
import OrganizerService from '@/services/OrganizerService.js'
import UploadImages from 'vue-upload-drop-images'
export default {
  inject: ['GStore'],
  components: {
    UploadImages
  },

  data() {
    return {
      organizer: {
        name: '',
        imageUrls: []
      },
      files: []
    }
  },
  methods: {
    saveOrganizer() {
      Promise.all(
        this.files.map((file) => {
          return OrganizerService.uploadFile(file)
        })
      ).then((response) => {
        this.organizer.imageUrls = response.map((r) => r.data)
        OrganizerService.saveOrganizer(this.organizer)
          .then((response) => {
            this.$router.push({
              path: '/'
            })
            this.GStore.flashMessage =
              'You are succcessfully add a new organizer for ' +
              response.data.title
            setTimeout(() => {
              this.GStore.flashMessage = ''
            }, 3000)
          })
          .catch(() => {
            this.$router.push('NetworkError')
          })
      })
    },
    handleImages(files) {
      this.files = files
    }
  }
}
</script>
<style scoped></style>
