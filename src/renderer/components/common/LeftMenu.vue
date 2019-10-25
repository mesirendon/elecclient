<template>
  <div id="menu">
    <div class="title">
      <h1>
        <i class="fas fa-landmark" v-if="client === 'tenderer'"></i>
        <i class="fas fa-user-friends" v-else-if="client === 'vendor'"></i>
      </h1>
    </div>
    <div class="list-group">
      <router-link :to="{name: link.name}" v-for="(link, idx) in links" :key="idx"
                   class="list-group-item list-group-item-action"
                   :class="{active: link.name === route}">
        <i class="fas" :class="link.class"></i> {{link.text}}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LeftMenu',
  data() {
    return {
      links: [
        { name: 'home', text: 'Inicio', class: 'fa-home' },
        { name: 'configuration', text: 'Configuración', class: 'fa-sliders-h' },
        { name: 'tender-creation', text: 'Crear nueva licitación', class: 'fa-plus' },
      ],
    };
  },
  computed: {
    ...mapState({
      route: state => state.route.name,
      client: state => state.Session.client,
    }),
  },
};
</script>
