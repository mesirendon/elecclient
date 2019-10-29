<template>
  <form @submit.prevent>
    <div class="form-group row" v-if="type === 'text'">
      <label class="col-form-label col-2" for="textInput">{{text}}</label>
      <div class="col-10">
        <input type="text" id="textInput" class="form-control" v-model="localAnswer">
      </div>
    </div>
    <div class="form-group row" v-else-if="type === 'area'">
      <label class="col-form-label col-2" for="areaInput">{{text}}</label>
      <div class="col-10">
        <textarea class="form-control" id="areaInput" v-model="localAnswer"></textarea>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === 'logical'">
      <label class="col-form-label col-2" for="radioInput">{{text}}</label>
      <div class="col-10" id="radioInput">
        si <input type="radio" name="logical" value="si" v-model="localAnswer">
        no <input type="radio" name="logical" value="no " v-model="localAnswer" checked>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === 'dropdown'">
      <label class="col-form-label col-2" for="dropdownInput">{{text}}</label>
      <div class="col-10">
        <select class="form-control" v-model="localAnswer" id="dropdownInput">
          <option v-for="element in list" v-bind:value="element">
            {{element}}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === 'file'">
      <label class="col-form-label col-2" for="fileInput">{{text}}</label>
      <div class="col-10">
        <file-loader id="fileInput" @loaded="setFile"></file-loader>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === 'textDropdown'">
      <label class="col-form-label col-2" for="firstField">{{text}}</label>
      <div class="col-6">
        <input type="text" id="firstField" class="form-control"
               v-model="localAnswer">
      </div>
      <div class="col-4">
        <select class="form-control" v-model="localAnswer" id="secondField">
          <option v-for="element in list" v-bind:value="element">
            {{element}}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group row" v-else-if="type === 'checkbox'">
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
    list: {
      type: Array,
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
