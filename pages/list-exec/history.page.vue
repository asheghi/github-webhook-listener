<template>
  <div class="HistoryList">
    <div class="text-xl mb-8">All Executions for {{ name }}</div>
    <div class="list">
      <a class="item mb-2" v-for="item in list" :key="item" :href="'/history/'+name+'/'+item.id">
        <div class="date">{{ item.date }}</div>
        <div class="duration">
          {{ item.duration }}ms
        </div>
        <div class="status">
          {{ item.status }}
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import {usePageContext} from "../../renderer/usePageContext";
import {ax} from "../../lib/plugins/axios";

export default {
  setup() {
    const {routeParams: {name}} = usePageContext()
    return {name};
  },
  mounted() {
    if (!this.list.length) {
      this.fetchList();
    }
  },
  methods: {
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

<style lang="scss">
.HistoryList {
  @apply mx-auto pt-8;
  max-width: 500px;

  .list {
    @apply flex flex-col gap-4;
    .item {
      min-width: 2000px;
      @apply flex gap-8 items-center;
    }
  }
}
</style>
