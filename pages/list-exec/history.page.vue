<template>
  <div class="min-h-screen p-8">
      <div class="text-xl mb-8">All Executions for {{name}}</div>
    <div class="list">
      <a class="item mb-2" v-for="item in list" :key="item" :href="'/history/'+name+'/'+item">
        {{ new Date(+item).toLocaleString()}}
      </a>
    </div>
  </div>
</template>

<script>
import {usePageContext} from "../../renderer/usePageContext";
import {ax} from "../../lib/plugins/axios";

export default {
  setup(){
    const {routeParams:{name}} = usePageContext()
    return {name};
  },
  mounted() {
    if (!this.list.length) {
      this.fetchList();
    }
  },
  methods:{
    async fetchList() {
      const {data, status} = await ax.get('github/history/' + this.name);
      this.list = data;
    }
  },
  data() {
    return {
      list: [],
    }
  }
}
</script>

<style scoped>

</style>
