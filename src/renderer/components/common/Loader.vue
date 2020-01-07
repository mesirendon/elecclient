<template>
  <div class="loading row align-items-center full-height">
    <div class="col">
      <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
             :style="`width: ${progress}%`" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <h2>{{message}}</h2>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Loader',
  computed: {
    ...mapState({
      message: state => state.Bid.message,
      progress: state => state.Bid.progress,
    }),
  },
};
</script>
