<template>
  <div>
    <div class="row">
      <div class="col">
        <ul class="nav nav-tabs separated">
          <li class="nav-item">
            <button class="nav-link" :class="{active: active === 'generalInfo'}"
                    @click="active = 'generalInfo'">
              Información general
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{active: active === 'schedule'}"
                    @click="active = 'schedule'">
              Cronograma
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{active: active === 'questionnaire'}"
                    @click="active = 'questionnaire'">
              Cuestionario
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{active: active === 'evaluation'}"
                    @click="active = 'evaluation'">
              Evaluación
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{active: active === 'documents'}"
                    @click="active = 'documents'">
              Documentos
            </button>
          </li>
        </ul>
      </div>
      <div class="col-2">
        <button class="btn btn-secondary" @click="saveTenderDraft">
          Guardar
        </button>
      </div>
    </div>
    <div>{{tender}}</div>
    <general-info v-if="active === 'generalInfo'"/>
    <schedule v-else-if="active === 'schedule'"/>
    <questionnaire v-else-if="active === 'questionnaire'"/>
    <evaluation v-else-if="active === 'evaluation'"/>
    <documents v-else-if="active === 'documents'"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import * as constants from '@/store/constants';

import GeneralInfo from '@/components/tender/form/GeneralInfo';
import Schedule from '@/components/tender/form/Schedule';
import Questionnaire from '@/components/tender/form/Questionnaire';
import Evaluation from '@/components/tender/form/Evaluation';
import Documents from '@/components/tender/form/Documents';

export default {
  name: 'TenderForm',
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      active: 'generalInfo',
    };
  },
  components: {
    GeneralInfo,
    Schedule,
    Questionnaire,
    Evaluation,
    Documents,
  },
  computed: {
    ...mapState({
      tender: state => state.Tender.tender,
      tenders: state => state.Tender.tenders,
    }),
  },
  methods: {
    ...mapActions({
      createTender: constants.TENDER_SAVE_DRAFT,
      saveTender: constants.TENDER_UPDATE_DRAFT,
      loadDraftTenders: constants.TENDER_LOAD_DRAFTS,
      setTender: constants.TENDER_SET_TENDER,
    }),
    saveTenderDraft() {
      this.saveTender(this.tender);
      this.loadDraftTenders();
    },
  },
  created() {
    if (!this.id) {
      this.createTender();
    }
    // eslint-disable-next-line no-underscore-dangle
    const [tenderToLoad] = this.tenders.filter(t => t._id === this.id);
    this.setTender(tenderToLoad);
  },
};
</script>
