<template>
  <form @submit.prevent>
    <div class="form-group row" v-if="type === dataTypes.TEXT">
      <label class="col-form-label col-6" :for="`textInput-${text}`">
        <span v-if="required">* </span>{{text}}
      </label>
      <div class="col-6">
        <input :placeholder="placeholder" type="text" :id="`textInput-${text}`" class="form-control"
               v-model="localAnswer">
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.TEXT_AREA">
      <label class="col-form-label col-6" :for="`areaInput-${text}`">
        <span v-if="required">* </span>{{text}}
      </label>
      <div class="col-6">
        <textarea class="form-control" :id="`areaInput-${text}`" v-model="localAnswer"></textarea>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.BOOLEAN">
      <label class="col-form-label col-6" :for="`radioInput-${text}`">
        <span v-if="required">* </span>{{text}}
      </label>
      <div class="col-6" :id="`radioInput-${text}`">
        Sí <input type="radio" name="logical" :value="true" v-model="localAnswer">
        No <input type="radio" name="logical" :value="false" v-model="localAnswer">
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.LIST">
      <label class="col-form-label col-6" :for="`datalist-${text}`">{{text}}</label>
      <div class="col-6">
        <input class="form-control" :list="`datalist-${text}`" v-model="localAnswer">
        <datalist :id="`datalist-${text}`">
          <option v-for="element in list" :value="element.code">{{element.text}}</option>
        </datalist>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.DROPDOWN">
      <label class="col-form-label col-6" :for="`dropdownInput-${text}`">
        <span v-if="required">* </span>{{text}}
      </label>
      <div class="col-6">
        <template v-if="list instanceof Array">
          <select class="form-control" v-model="localAnswer" :id="`dropdownInput-${text}`">
            <option v-for="element in list" :value="element.code">
              {{element.text}}
            </option>
          </select>
        </template>
        <template v-else-if="list instanceof Object">
          <select class="form-control" v-model="localAnswer" :id="`dropdownInput-${text}`">
            <option v-for="(elementValue, elementCode) in list" :value="elementCode">
              {{elementValue}}
            </option>
          </select>
        </template>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.FILE">
      <label class="col-form-label col-6" :for="`fileInput-${text}`">
        <span v-if="required">* </span>{{text}}
      </label>
      <div class="col-6">
        <FileLoader :fileName="text" :type="fileLoaderTypes.DATABASE" :id="`fileInput-${text}`"
                    :path="path" @loaded="setLocalAnswerFile"/>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.CHECKBOX">
      <label class="col-form-label col-6" :for="`checkInput-${text}`">
        <span v-if="required">* </span>{{text}}
      </label>
      <div class="col-6">
        <input :id="`checkInput-${text}`" type="checkbox" v-model="localAnswer">
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.NUMBER">
      <label class="col-form-label col-6" :for="`numberInput-${text}`">
        <span v-if="required">* </span>{{text}}
      </label>
      <div class="col-6">
        <input class="form-control" :id="`numberInput-${text}`" type="number"
               v-model.number="localAnswer" :placeholder="placeholder">
      </div>
    </div>

    <div class="form-group row" v-else-if="type === dataTypes.DATE">
      <label class="col-form-label col-6" :for="`dateField-${text}`">
        <span v-if="required">* </span>{{text}}
      </label>
      <div class="col-6">
        <input type="date" :id="`dateField-${text}`" class="form-control dateSelector"
               :placeholder="placeholder" v-model="localAnswer">
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.DYNAMIC_FILE">
      <label class="col-form-label col-6" :for="`fileInput-${text}`">
        <span v-if="required">* </span>{{text}}
      </label>
      <div class="col-4">
        <FileLoader :fileName="text" :type="fileLoaderTypes.DATABASE" :id="`fileInput-${text}`"
                    @loaded="setLocalAnswerFile"></FileLoader>
      </div>
      <div class="col-2">
        <button class="btn btn-secondary" @click="deleteField">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import FileLoader from '@/components/common/FileLoader';
import * as constants from '@/store/constants';
import moment from 'moment';
import _ from 'lodash';
import path from 'path';

const { remote } = window.require('electron');
const fs = remote.require('fs');

export default {
  name: 'Question',
  data() {
    return {
      localAnswer: (this.type === constants.TENDER_BASE_DATA_TYPES.DATE) ? moment.unix(this.answer)
        .format('YYYY-MM-DD') : this.answer,
      dataTypes: constants.TENDER_BASE_DATA_TYPES,
      fileLoaderTypes: constants.FILE_LOADER_TYPES,
    };
  },
  components: {
    FileLoader,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    answer: {
      type: [String, Boolean, Number, Object],
      required: false,
      default: null,
    },
    placeholder: {
      type: String,
      required: false,
    },
    list: {
      type: [Array, Object],
      required: false,
    },
    idx: {
      type: Number,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    path: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapState({
      tender: state => state.Tender.tender,
    }),
  },
  watch: {
    localAnswer() {
      this.setChange(this);
    },
  },
  model: {
    prop: 'answer',
    event: 'change',
  },
  methods: {
    setChange: _.debounce((vm) => {
      vm.$emit('change', vm.type === constants.TENDER_BASE_DATA_TYPES.DATE ?
        moment(vm.localAnswer)
          .format('X') : vm.localAnswer);
    }, 200),
    setLocalAnswerFile(path) {
      this.localAnswer = path;
    },
    deleteField() {
      let fileName = '';
      this.tender.filesList.forEach((file) => {
        if (file.name === this.text) {
          // eslint-disable-next-line prefer-destructuring
          fileName = file.fileName;
        }
      });
      if (fileName && fs.existsSync(path.join(this.localAnswer, fileName))) {
        fs.unlink(path.join(this.localAnswer, fileName), (err) => {
          if (err) throw err;
        });
        fs.readdir(this.localAnswer, (err, files) => {
          if (err) throw err;
          if (!files.length) {
            fs.rmdir(this.localAnswer, (err) => {
              if (err) throw err;
            });
          }
        });
      }
      this.$emit('delete', this.idx);
    },
  },
  created() {
  },
};
</script>
