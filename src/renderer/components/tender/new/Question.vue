<template>
  <form @submit.prevent class="form-inline minor-separated">
    <div class="form-group">
      <label for="x">{{text}}</label>
      <input type="text" id="x" class="form-control mx-sm-3" :placeholder="text"
             v-model="answer">
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
