<template>
  <div>
    <ul class="nav nav-tabs separated">
      <li class="nav-item">
        <a class="nav-link active" @clicked="setActive(1)">Informacion general</a>
      </li>
      <li class="nav-item">
        <button class="nav-link" @clicked="setActive(2)">Cronograma</button>
      </li>
      <li class="nav-item">
        <a class="nav-link" @clicked="setActive(3)">Cuestionario</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @clicked="setActive(4)">Evaluacion</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @clicked="setActive(5)">Documentos</a>
      </li>
    </ul>
    <GeneralInfo v-if="active === 1"/>
    <Schedule v-if="active === 2"/>
    <Questionnaire v-if="active === 3"/>
  </div>
</template>

<script>
import GeneralInfo from '@/components/tender/new/GeneralInfo';
import Schedule from '@/components/tender/new/Schedule';
import Questionnaire from '@/components/tender/new/Questionnaire';

export default {
  name: 'Name',
  data() {
    return {
      active: 1,
    };
  },
  components: {
    GeneralInfo,
    Schedule,
    Questionnaire,
  },
  computed: {},
  watch: {},
  methods: {
    setActive(index) {
      this.active = index;
    },
  },
  created() {},
};
</script>
