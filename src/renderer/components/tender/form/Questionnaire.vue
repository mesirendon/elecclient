<template>
  <div>
    <div class="tender-section-head">
      <div class="top-panel">
        <div class="row">
          <div class="col">
            <div class="form-group row">
              <label for="newSectionName" class="col-sm-3 col-form-label">Nombre de sección</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="newSectionName"
                       placeholder="Nombre de la nueva sección" v-model="newSectionName">
              </div>
            </div>
          </div>
          <div class="col-3 text-right">
            <button class="btn btn-secondary btn-large" @click="addSection">
              Agregar sección <i class="fas fa-plus-square"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <questionnaire-section v-for="(section, idx) in questionnaire" :key="`questionnaire-${idx}`" :idx="idx" :section="section" @deleteSection="deleteSection"/>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import * as constants from '@/store/constants';

import QuestionnaireSection from '@/components/tender/form/QuestionnaireSection';

export default {
  name: 'Questionnaire',
  data() {
    return {
      newSectionName: null,
    };
  },
  computed: {
    ...mapState({
      // eslint-disable-next-line no-underscore-dangle
      address: state => state.Tender.tender._id,
      questionnaire: state => state.Tender.tender.questionnaire,
    }),
    baseSection() { return constants.TENDER_BASE_SECTION; },
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
      this.$emit('sectionAdded');
      this.$router.push({
        name: 'redirect',
        params: {
          name: 'tender',
          delay: 500,
        },
        query: {
          address: this.address,
          tag: constants.TENDER_FORM_TAGS.QUESTIONNAIRE,
        },
      });
    },
    deleteSection(idx) {
      this.deleteSectionFromQuestionnaire(idx);
    },
  },
  components: {
    QuestionnaireSection,
  },
};
</script>
