<template>
  <div class="observation">
    <div class="row align-items-center">
      <div class="col description">{{observation.plain}}</div>
      <div class="col-1">
        <button type="button" class="btn download">
          <i class="fas fa-file-download"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Observation',
  props: {
    observation: {
      type: Object,
      required: true,
    },
  },
};
</script>
