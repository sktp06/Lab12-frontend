<template>
  <h1>Organizers</h1>
  <div class="events">
    <OrganizerCard
      v-for="organizer in organizers"
      :key="organizer.id"
      :organizer="organizer"
    ></OrganizerCard>

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'OrganizerList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        Prev Page
      </router-link>

      <router-link
        id="page-next"
        :to="{ name: 'OrganizerList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import OrganizerCard from '@/components/OrganizerCard.vue'
import OrganizerService from '@/services/OrganizerService.js'

export default {
  name: 'OrganizerListView',
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    OrganizerCard
  },
  data() {
    return {
      organizers: null,
      totalOrganizers: 0
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    OrganizerService.getOrganizers(3, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          console.log(response)
          comp.organizers = response.data
          comp.totalOrganizers = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo) {
    var queryFunction
    queryFunction = OrganizerService.getOrganizers(
      3,
      parseInt(routeTo.query.page) || 1
    )

    queryFunction
      .then((response) => {
        this.organizers = response.data // <---
        this.totalORganizers = response.headers['x-total-count'] // <---
      })
      .catch(() => {
        return { name: 'NetworkError' } // <---
      })
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalOrganizers / 3)
      return this.page < totalPages
    }
  }
}
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

.search-box {
  width: 300px;
}
</style>
