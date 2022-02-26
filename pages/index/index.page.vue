<template>
  <div class="IndexPage min-h-screen flex flex-col pt-8 items-center gap-8">
    <div class="top mb-4 text-base md:text-lg flex items-center w-full flex-wrap whitespace-nowrap">
      <h1 class="mr-auto font-extrabold tracking-wide uppercase">Repositories</h1>
      <button @click="showNewRepo" class="btn add-repo text-primary">
        Add Repo
      </button>
    </div>
    <RepoList @edit="onEdit" ref="list"/>
    <Modal :title="'Repository'" ref="modal">
      <NewRepo @close="$refs.modal.hide()" @delete="deleteRepo" @save="onSave" ref="edit"/>
    </Modal>
  </div>
</template>

<script>
import RepoList from "./RepoList.vue";
import NewRepo from "./EditRepo.vue";
import Modal from "../../components/modal.vue";
import {ax} from "../../lib/plugins/axios";

export default {
  components: {Modal, NewRepo, RepoList},
  methods: {
    onSave() {
      this.$refs.list.fetchRepos();
      this.$refs.modal.hide();
    },
    async onEdit(repo) {
      this.$refs.modal.show();
      await this.$nextTick();
      this.$refs.edit.setRepo(repo, true);
    },
    async showNewRepo() {
      this.$refs.modal.show();
      await this.$nextTick();
      this.$refs.edit.setRepo({});
    },
    async deleteRepo(name) {
      const {data, status} = await ax.delete('github/repository/' + name);
      if (status === 200) {
        this.$refs.modal.hide();
        await this.$refs.list.fetchRepos();
      }
    }
  }
}
</script>
<style lang="scss">
.IndexPage {
  max-width: 600px;
  @apply mx-auto px-4;
  .btn {
    @apply hover:text-white hover:bg-primary rounded transition px-2 py-1;
  }
}
</style>
