<template>
  <v-app>
    <v-content>
      <Base/>
    </v-content>
  </v-app>
</template>

<script>
import Base from './views/Base.vue';

export default {
  name: 'App',

  components: {
	  Base,
  },

  data: () => ({
    //
  }),
};
</script>
