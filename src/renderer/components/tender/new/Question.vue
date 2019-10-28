<template>
  <form @submit.prevent>
    <div class="form-group row" v-if="type === 'text'">
      <label class="col-form-label col-2" for="textInput">{{text}}</label>
      <div class="col-10">
        <input type="text" id="textInput" class="form-control"
               v-model="answer">
      </div>
    </div>
    <div class="form-group row" v-if="type === 'area'">
      <label class="col-form-label col-2" for="areaInput">{{text}}</label>
      <div class="col-10">
        <textarea class="form-control" id="areaInput"></textarea>
      </div>
    </div>
    <div class="form-group row" v-if="type === 'logical'">
      <label class="col-form-label col-2" for="radioInput">{{text}}</label>
      <div class="col-10" id="radioInput">
        si <input type="radio" name="logical" value="si">
        no <input type="radio" name="logical" value="no">
      </div>
    </div>
    <div class="form-group row" v-if="type === 'dropdown'">
      <label class="col-form-label col-2" for="dropdownInput">{{text}}</label>
      <div class="col-10">
        <input class="form-control" id="dropdownInput" list="browsers" name="myBrowser">
        <datalist id="browsers">
          <option value="Chrome"></option>
          <option value="Firefox"></option>
          <option value="Internet Explorer"></option>
          <option value="Opera"></option>
          <option value="Safari"></option>
          <option value="Microsoft Edge"></option>
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
        <input class="form-control" id="secondField" list="options" name="myBrowser">
        <datalist id="options">
          <option value="Chrome"></option>
          <option value="Firefox"></option>
          <option value="Internet Explorer"></option>
          <option value="Opera"></option>
          <option value="Safari"></option>
          <option value="Microsoft Edge"></option>
        </datalist>
      </div>
    </div>
    <div class="form-group row" v-if="type === 'checkbox'">
      <label class="col-form-label col-2" for="checkInput">{{text}}</label>
      <div class="col-10">
        <input id="checkInput" type="checkbox">
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
      fileHash: null,
      answer: null,
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
  },
  computed: {},
  watch: {
    answer() {
      this.setChange(this);
    },
  },
  methods: {
    setFile(hash) {
      this.fileHash = hash;
    },
    setChange: _.debounce((vm) => {
      vm.$emit('changed', vm.answer);
    }, 1000),
  },
  created() {},
};
</script>
