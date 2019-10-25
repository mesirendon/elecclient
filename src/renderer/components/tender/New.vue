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
    <GeneralInfo v-if="active === 'generalInfo'"/>
    <Schedule v-else-if="active === 'schedule'"/>
    <Questionnaire v-else-if="active === 'questionnaire'"/>
    <div v-else-if="active === 'evaluation'">evaluation</div>
    <div v-else-if="active === 'documents'">documents</div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import * as constants from '@/store/constants';

import GeneralInfo from '@/components/tender/new/GeneralInfo';
import Schedule from '@/components/tender/new/Schedule';
import Questionnaire from '@/components/tender/new/Questionnaire';

export default {
  name: 'New',
  data() {
    return {
      active: 'generalInfo',
    };
  },
  components: {
    GeneralInfo,
    Schedule,
    Questionnaire,
  },
  computed: {
    ...mapState({
      tender: state => state.Tender.tender,
    }),
  },
  methods: {
    ...mapActions({
      createTender: constants.TENDER_SAVE_DRAFT,
      saveTender: constants.TENDER_UPDATE_DRAFT,
    }),
    saveTenderDraft() {
      this.saveTender(this.tender);
    },
  },
  created() {
    this.createTender();
  },
};
</script>
