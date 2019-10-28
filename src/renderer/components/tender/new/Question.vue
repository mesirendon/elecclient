<template>
  <form @submit.prevent class="form-inline minor-separated">
    <div class="form-group">
      <label for="x">{{text}}</label>
      <input type="text" id="x" class="form-control mx-sm-3" :placeholder="text" v-model="localAnswer">
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
