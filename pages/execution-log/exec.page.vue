<template>
  <div class="ExecDetailsPage min-h-screen p-8" v-if="data">
    <div class="text-xl mb-2">Execution History of {{ name }}</div>
    <div class="mb-4">{{ data.date }} {{fromNow}}</div>
    <div class="exec" v-for="(val,key) in data.exec">
      <ExecItem :cmd="key" :val="val"/>
    </div>
  </div>
</template>

<script>
import {usePageContext} from "../../renderer/usePageContext";
import {ax} from "../../lib/plugins/axios";
import ExecItem from "./ExecItem.vue";
import moment from "moment";

export default {
  components: {ExecItem},
  setup() {
    const {routeParams: {name, id}} = usePageContext()
    return {name, id};
  },
  mounted() {
    if (!this.data) {
      this.fetchData();
    }
  },
  methods: {
    async fetchData() {
      const {data, status} = await ax.get('github/history/' + this.name + '/' + this.id);
      this.data = data;
      if (data.status === 'running') {
        setTimeout(() => {
          this.fetchData()
        },3000);
      }
    }
  },
  data() {
    return {
      data: null,
    }
  },
  computed:{
    fromNow(){
      if (!this.data && this.data.time) return '';
      return moment(this.data.time).fromNow()
    }
  }
}
</script>

<style lang="scss">
.ExecDetailsPage{
  max-width: 768px;
  @apply mx-auto;
}
</style>
