<template>
  <div>
    <h1>Cuestionario</h1>
    <div class="descriptor" v-for="(section, idx) in tender.questionnaire" :key="`section-${idx}`">
      <div class="row">
        <div class="col">
          <h2>{{section.name}}</h2>
        </div>
        <div class="col-2 text-right">
          <button class="btn btn-secondary btn-large" @click="deleteSection(idx)">
            Eliminar sección <i class="fas fa-minus-square"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="row descriptor">
      <div class="col">
        <div class="form-group row">
          <label for="newSectionName" class="col-sm-3 col-form-label">Nombre de sección</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="newSectionName"
                   placeholder="Nuevo nombre de sección" v-model="newSectionName">
          </div>
        </div>
      </div>
      <div class="col-2 text-right">
        <button class="btn btn-secondary btn-large" @click="addSection">
          Agregar sección <i class="fas fa-plus-square"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import * as constants from '@/store/constants';

export default {
  name: 'Questionnaire',
  data() {
    return {
      newSectionName: null,
    };
  },
  computed: {
    ...mapState({
      tender: state => state.Tender.tender,
    }),
    baseSection() { return constants.TENDER_BASE_SECTION; },
    baseQuestion() { return constants.TENDER_BASE_QUESTION; },
    baseListOption() { return constants.TENDER_BASE_LIST_OPTION; },
  },
  methods: {
    ...mapMutations({
      addSectionToQuestionnaire: constants.TENDER_ADD_SECTION,
      deleteSectionFromQuestionnaire: constants.TENDER_DELETE_SECTION,
    }),
    addSection() {
      const section = { ...this.baseSection };
      section.name = this.newSectionName;
      this.addSectionToQuestionnaire(section);
      this.newSectionName = null;
    },
    deleteSection(idx) {
      this.deleteSectionFromQuestionnaire(idx);
    },
  },
};
</script>
