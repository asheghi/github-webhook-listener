<template>
  <div class="min-h-screen flex flex-col justify-center items-center gap-8">
    <RepoList @select="onSelect" ref="list"/>
    <NewRepo @save="onSave" ref="edit"/>
  </div>
</template>

<script>
import RepoList from "./RepoList.vue";
import NewRepo from "./EditRepo.vue";

export default {
  components: {NewRepo, RepoList},
  methods: {
    onSave() {
      this.$refs.list.fetchRepos();
    },
    onSelect(repo) {
      this.$refs.edit.setRepo(repo);
    }
  }
}
</script>
