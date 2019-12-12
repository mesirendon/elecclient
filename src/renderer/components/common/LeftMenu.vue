<template>
  <div id="menu">
    <div class="title text-center minor-separated-top minor-separated">
      <h1>
        <i class="fas fa-landmark" v-if="client === 'tenderer'"></i>
        <i class="fas fa-user-friends" v-else-if="client === 'vendor'"></i>
      </h1>
    </div>
    <div class="list-group">
      <router-link :to="{name: link.name}" v-for="(link, idx) in links" :key="idx"
                   class="list-group-item-action list-group-item text-center"
                   :class="{active: link.name === route}" v-if="includes(link.scope, client)">
        <i class="fas" :class="link.class"><p>{{link.text}}</p></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import _ from 'lodash';

export default {
  name: 'LeftMenu',
  data() {
    return {
      links: [
        {
          name: 'home',
          text: 'Inicio',
          class: 'fa-home',
          scope: ['tenderer', 'vendor'],
        },
        {
          name: 'newTender',
          text: 'Crear Licitación',
          class: 'fa-plus',
          scope: ['tenderer'],
        },
        {
          name: 'configuration',
          text: 'Perfil',
          class: 'fa-sliders-h',
          scope: ['tenderer', 'vendor'],
        },
      ],
    };
  },
  computed: {
    ...mapState({
      route: state => state.route.name,
      client: state => state.Session.client,
    }),
  },
  methods: {
    includes: (...args) => _.includes(...args),
  },
};
</script>
