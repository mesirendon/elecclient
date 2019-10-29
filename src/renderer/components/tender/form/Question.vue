<template>
  <form @submit.prevent>
    <div class="form-group row" v-if="type === dataTypes.TEXT">
      <label class="col-form-label col-2" :for="`textInput-${text}`">{{text}}</label>
      <div class="col-10">
        <input type="text" :id="`textInput-${text}`" class="form-control" v-model="localAnswer">
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.TEXT_AREA">
      <label class="col-form-label col-2" :for="`areaInput-${text}`">{{text}}</label>
      <div class="col-10">
        <textarea class="form-control" :id="`areaInput-${text}`" v-model="localAnswer"></textarea>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.BOOLEAN">
      <label class="col-form-label col-2" :for="`radioInput-${text}`">{{text}}</label>
      <div class="col-10" :id="`radioInput-${text}`">
        si <input type="radio" name="logical" value="1" v-model="localAnswer">
        no <input type="radio" name="logical" value="" v-model="localAnswer">
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.LIST">
      <label class="col-form-label col-2" :for="`datalist-${text}`">{{text}}</label>
      <div class="col-10">
        <input class="form-control" :list="`datalist-${text}`" v-model="localAnswer">
        <datalist :id="`datalist-${text}`">
          <option v-for="element in list" :value="element.code">{{element.text}}</option>
        </datalist>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.DROPDOWN">
      <label class="col-form-label col-2" :for="`dropdownInput-${text}`">{{text}}</label>
      <div class="col-10">
        <select class="form-control" v-model="localAnswer" :id="`dropdownInput-${text}`">
          <option v-for="element in list" :value="element.code">
            {{element.text}}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.FILE">
      <label class="col-form-label col-2" :for="`fileInput-${text}`">{{text}}</label>
      <div class="col-10">
        <FileLoader :id="`fileInput-${text}`" @loaded="setLocalAnswerFile"></FileLoader>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.TEXT_AND_DROPDOWN">
      <label class="col-form-label col-2" :for="`firstField-${text}`">{{text}}</label>
      <div class="col-6">
        <input type="text" :id="`firstField-${text}`" class="form-control"
               v-model="localAnswer">
      </div>
      <div class="col-4">
        <select class="form-control" v-model="localSecondAnswer" :id="`secondField-${text}`">
          <option v-for="element in list" :value="element.code">
            {{element.text}}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === dataTypes.CHECKBOX">
      <label class="col-form-label col-2" :for="`checkInput-${text}`">{{text}}</label>
      <div class="col-10">
        <input :id="`checkInput-${text}`" type="checkbox" @click="setLocalAnswer" v-model="checked">
      </div>
    </div>
  </form>
</template>

<script>
import FileLoader from '@/components/common/FileLoader';
import * as constants from '@/store/constants';
import _ from 'lodash';

export default {
  name: 'Question',
  data() {
    return {
      localAnswer: this.answer,
      localSecondAnswer: this.secondAnswer,
      checked: false,
      fileHash: null,
      dataTypes: constants.TENDER_BASE_DATA_TYPES,
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
      type: Array,
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
        this.localAnswer = 'yes';
      } else {
        this.localAnswer = 'no';
      }
    },
    setLocalAnswerFile(hash) {
      this.localAnswer = hash;
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
