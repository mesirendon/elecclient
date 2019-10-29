<template>
  <form @submit.prevent>
    <div class="form-group row" v-if="type === 'text'">
      <label class="col-form-label col-2" for="textInput">{{text}}</label>
      <div class="col-10">
        <input type="text" id="textInput" class="form-control" v-model="localAnswer">
      </div>
    </div>
    <div class="form-group row" v-if="type === 'area'">
      <label class="col-form-label col-2" for="areaInput">{{text}}</label>
      <div class="col-10">
        <textarea class="form-control" id="areaInput" v-model="localAnswer"></textarea>
      </div>
    </div>
    <div class="form-group row" v-if="type === 'logical'">
      <label class="col-form-label col-2" for="radioInput">{{text}}</label>
      <div class="col-10" id="radioInput">
        si <input type="radio" name="logical" value="si">
        no <input type="radio" name="logical" value="no" checked>
      </div>
    </div>
    <div class="form-group row" v-if="type === 'dropdown'">
      <label class="col-form-label col-2" for="dropdownInput">{{text}}</label>
      <div class="col-10">
        <input class="form-control" id="dropdownInput" list="dropdownOptions" name="myBrowser">
        <datalist id="dropdownOptions">
          <option v-for="dropdownOption in dropdownOptions">{{dropdownOption}}</option>
        </datalist>
      </div>
    </div>
    <div class="form-group row" v-if="type === 'file'">
      <label class="col-form-label col-2" for="fileInput">{{text}}</label>
      <div class="col-10">
        <FileLoader id="fileInput" @loaded="setFile"></FileLoader>
      </div>
    </div>
    <div class="form-group row" v-if="type === 'textDropdown'">
      <label class="col-form-label col-2" for="firstField">{{text}}</label>
      <div class="col-6">
        <input type="text" id="firstField" class="form-control"
               v-model="answer">
      </div>
      <div class="col-4">
        <input class="form-control" type="text" id="propsDropdown" v-model="dropdownOption" list="dropdownOptions2">
        <datalist id="dropdownOptions2">
          <option v-for="dropdownOption in dropdownOptions">{{dropdownOption}}</option>
        </datalist>
      </div>
    </div>
    <div class="form-group row" v-if="type === 'checkbox'">
      <label class="col-form-label col-2" for="checkInput">{{text}}</label>
      <div class="col-10">
        <input id="checkInput" type="checkbox" checked>
      </div>
    </div>
  </form>
</template>

<script>
  import FileLoader from '@/components/common/FileLoader';
  import _ from 'lodash';

  export default {
    name: 'Question',
    data() {
      return {
        localAnswer: this.answer,
        fileHash: null,
        dropdownOption: '',
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
      dropdownOptions: {
        type: Object,
        default: () => {},
        required: false,
      },
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
      setFile(hash) {
        this.fileHash = hash;
      },
      setChange: _.debounce((vm) => {
        vm.$emit('change', vm.localAnswer);
      }, 1000),
    },
    created() {},
  };
</script>
