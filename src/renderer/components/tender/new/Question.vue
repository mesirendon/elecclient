<template>
  <div class="row">
    <div class="col-2">
      <label>{{text}}</label>
    </div>
    <div v-if="type === 'text'" class="col">
      <input class="form-control" id="tenderNumber">
    </div>
    <div v-if="type === 'area'" class="col">
      <textarea class="form-control" id="tenderDesription"></textarea>
    </div>
    <div v-if="type === 'logical'" class="col">
      si <input type="radio" name="paa" value="si">
      no <input type="radio" name="paa" value="no">
    </div>
    <div v-if="type === 'dropdown'" class="col">
      <input class="form-control" v-model="thing" list="browsers" name="myBrowser">
      <datalist id="browsers">
        <option value="Chrome"></option>
        <option value="Firefox"></option>
        <option value="Internet Explorer"></option>
        <option value="Opera"></option>
        <option value="Safari"></option>
        <option value="Microsoft Edge"></option>
      </datalist>
    </div>
    <div v-if="type === 'file'" class="col">
      
    </div>
  </div>
</template>

<script>
  import FileLoader from '@/components/common/FileLoader';

  export default {
    name: 'Question',
    data() {
      return {
        thing: null,
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
    watch: {},
    methods: {},
    created() {},
  };
</script>

<style scoped>

</style>
