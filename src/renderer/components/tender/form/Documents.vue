<template>
  <div>
    <h1>Documentos</h1>
    <div class="descriptor">
      <div v-if="showForm" >
        <form @submit.prevent>
          <div class="form-group row">
            <label class="col-form-label col-3" for="newFile">Nombre del archivo</label>
            <div class="col-7">
              <input type="text" id="newFile" class="form-control" v-model="newFileName">
            </div>
            <div class="col-2">
              <button class="btn btn-secondary" @click="addFile">Agregar</button>
            </div>
          </div>
        </form>
      </div>
      <div class="minor-separated" v-else>
        <button class="btn btn-secondary" @click="showForm = true">
          <i class="fas fa-plus"></i> Agregar archivo
        </button>
      </div>
      <h4 class="minor-separated information">Los siguientes archivos son sugeridos para el proceso de licitación del PAES</h4>
      <question v-for="(field, idx) in filesList" :text="field.name" :type="dataTypes.DYNAMIC_FILE" :idx="idx"
                @delete="deleteFile"/>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import FileLoader from '@/components/common/FileLoader';
import * as constants from '@/store/constants';
import Question from '@/components/tender/form/Question';

export default {
  name: 'Documents',
  data() {
    return {
      dataTypes: constants.TENDER_BASE_DATA_TYPES,
      fileLoaderTypes: constants.FILE_LOADER_TYPES,
      load: false,
      showForm: false,
      newFileName: null,
    };
  },
  components: {
    FileLoader,
    Question,
  },
  computed: {
    ...mapState({
      filesList: state => state.Tender.tender.filesList,
    }),
    baseFile() { return constants.TENDER_BASE_FILE; },
  },
  methods: {
    ...mapMutations({
      addFileToList: constants.TENDER_ADD_FILE,
      deleteFileFromList: constants.TENDER_DELETE_FILE,
    }),
    addFile() {
      const file = { ...this.baseFile };
      file.name = this.newFileName;
      this.addFileToList(file);
      this.newFileName = null;
    },
    deleteFile(idx) {
      this.deleteFileFromList(idx);
    },
  },
};
</script>
