<template>
  <div class="list-repos">
    <div class="text-lg">Repositories</div>
    <div class="repo flex" v-for="repo in repos" :key="repo.name"
    @click="onSelect(repo)">
      <div class="title" v-text="repo.name"/>
      <div class="re-run" v-text="ReRun">

      </div>
      <a :href="'/history/' + repo.name" class="history ml-auto text-primary">
        History
      </a>
    </div>
  </div>
</template>
<script>
import {ax} from "../../lib/plugins/axios";

export default {
  name: 'RepoList',
  mounted() {
    if (!this.repos.length) {
      this.fetchRepos();
    }
  },
  data() {
    return {
      repos: [],
    }
  },
  methods: {
    async fetchRepos() {
      const {data, status} = await ax('github/repository/all');
      this.repos = data;
    },
    onSelect(repo) {
      this.$emit('select',repo);
    }
  }
}
</script>
<style lang="scss">
.list-repos{
  min-width: 400px;
  @apply p-4;

  .repo{
    @apply px-4 py-1 border border-gray-200 rounded mb-2;
  }
}
</style>
