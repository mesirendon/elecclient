<template>
  <form @submit.prevent>
    <div class="form-group row" v-if="type === dataTypes.TEXT">
      <label class="col-form-label col-6" :for="`textInput-${text}`">{{text}}</label>
      <div class="col-6">
        <input type="text" :id="`textInput-${text}`" class="form-control" v-model="localAnswer">
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.TEXT_AREA">
      <label class="col-form-label col-6" :for="`areaInput-${text}`">{{text}}</label>
      <div class="col-6">
        <textarea class="form-control" :id="`areaInput-${text}`" v-model="localAnswer"></textarea>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.BOOLEAN">
      <label class="col-form-label col-6" :for="`radioInput-${text}`">{{text}}</label>
      <div class="col-6" :id="`radioInput-${text}`">
        si <input type="radio" name="logical" value="1" v-model="localAnswer">
        no <input type="radio" name="logical" value="" v-model="localAnswer">
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
      <label class="col-form-label col-6" :for="`dropdownInput-${text}`">{{text}}</label>
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
      <label class="col-form-label col-6" :for="`fileInput-${text}`">{{text}}</label>
      <div class="col-6">
        <FileLoader :fileName="text" :type="fileLoaderTypes.DATABASE" :id="`fileInput-${text}`" @loaded="setLocalAnswerFile"></FileLoader>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.TEXT_AND_DROPDOWN">
      <label class="col-form-label col-6" :for="`firstField-${text}`">{{text}}</label>
      <div class="col-3">
        <input type="text" :id="`firstField-${text}`" class="form-control"
               v-model="localAnswer">
      </div>
      <div class="col-3">
        <select class="form-control" v-model="localSecondAnswer" :id="`secondField-${text}`">
          <option v-for="element in list" :value="element.code">
            {{element.text}}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.CHECKBOX">
      <label class="col-form-label col-6" :for="`checkInput-${text}`">{{text}}</label>
      <div class="col-6">
        <input :id="`checkInput-${text}`" type="checkbox" @click="setLocalAnswer" v-model="checked">
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.NUMBER">
      <label class="col-form-label col-6" :for="`numberInput-${text}`">{{text}}</label>
      <input class="col-6" :id="`numberInput-${text}`" type="number" v-model="localAnswer">
    </div>

    <div class="form-group row" v-else-if="type === dataTypes.DATE">
      <label class="col-form-label col-6" :for="`dateField-${text}`">{{text}}</label>
      <div class="col-6">
        <input type="date" :id="`dateField-${text}`" class="form-control dateSelector"
               v-model="localAnswer">
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.DYNAMIC_FILE">
      <label class="col-form-label col-6" :for="`fileInput-${text}`">{{text}}</label>
      <div class="col-4">
        <FileLoader :fileName="text" :type="fileLoaderTypes.DATABASE" :id="`fileInput-${text}`" @loaded="setLocalAnswerFile"></FileLoader>
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
import FileLoader from '@/components/common/FileLoader';
import * as constants from '@/store/constants';
import moment from 'moment';
import _ from 'lodash';

const { remote } = window.require('electron');
const fs = remote.require('fs');

export default {
  name: 'Question',
  data() {
    return {
      localAnswer: (this.type === constants.TENDER_BASE_DATA_TYPES.DATE) ? moment.unix(this.answer).format('YYYY-MM-DD') : this.answer,
      localSecondAnswer: this.secondAnswer,
      checked: false,
      fileHash: null,
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
      type: String,
      default: null,
      required: false,
    },
    secondAnswer: {
      type: String,
      default: null,
      required: false,
    },
    list: {
      type: [Array, Object],
      required: false,
    },
    dateDescription: {
      type: String,
      required: false,
    },
    idx: {
      type: Number,
      required: false,
    },
  },
  watch: {
    localAnswer() {
      this.setChange(this);
    },
    localSecondAnswer() {
      this.setSecondaryChange(this);
    },
  },
  model: {
    prop: 'answer',
    event: 'change',
  },
  methods: {
    setFile(hash) {
      this.fileHash = hash;
    },
    setChange: _.debounce((vm) => {
      vm.$emit('change', vm.localAnswer);
    }, 1000),
    setSecondaryChange: _.debounce((vm) => {
      vm.$emit('secondChange', vm.localSecondAnswer);
    }, 1000),
    setLocalAnswer() {
      if (!this.checked) {
        this.localAnswer = '1';
      } else {
        this.localAnswer = '';
      }
    },
    setLocalAnswerFile(path) {
      this.localAnswer = path;
    },
    deleteField() {
      if (fs.existsSync(`${this.localAnswer}/${this.text}`)) {
        fs.unlink(`${this.localAnswer}/${this.text}`, (err) => {
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
    if (this.localAnswer === 'yes') {
      this.checked = true;
    } else {
      this.checked = false;
    }
  },
};
</script>
