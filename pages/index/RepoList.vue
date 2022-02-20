<template>
  <div class="list-repos w-full">
    <div class="repo flex gap-4" v-for="repo in repos" :key="repo.name">
      <div class="title mr-auto" v-text="repo.name"/>
      <div class="re-run" v-text="ReRun"></div>
      <div class="edit cursor-pointer text-primary" @click="onEdit(repo)" v-text="'Edit'"></div>
      <a :href="'/history/' + repo.name" class="history text-primary">
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
    onEdit(repo) {
      this.$emit('edit',repo);
    }
  }
}
</script>
<style lang="scss">
.list-repos{
  min-width: 400px;
  .repo{
    @apply text-xl py-1 rounded mb-2;
  }
}
</style>
