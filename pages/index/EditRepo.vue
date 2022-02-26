<template>
  <div class="new-repo">
    <div class="head mb-4 flex gap-4 items-center">
      <h4 class="text-lg mr-auto" v-text="'Respsitory'"/>
      <button
          v-if="editMode"
          @click="$emit('delete',this.form.name)"
          class="delete"
          v-text="'Delete'"
      />
<!--      <div @click="$emit('close')" class="close">Close</div>-->
    </div>
    <form @submit.prevent.stop="submit">
      <div class="form-group">
        <label
            for="name"
            class="form-label"
        >Repository Name</label>
        <input
            id="name"
            v-model="form.name"
            :disabled="loading || editMode"
            type="text"
            class="input"
            placeholder="enter the name"
        >
      </div>
      <div class="form-group">
        <label
            for="name"
            class="form-label"
        >Working Directory</label>
        <input
            id="dir"
            v-model="form.working_dir"
            :disabled="loading"
            type="text"
            class="input"
            placeholder="enter the path to execute scripts from"
        >
      </div>
      <div class="form-group">
        <label
            for="script"
            class="form-label"
        >Script Steps</label>
        <div class="flex bg-primary items-center rounded overflow-hidden" v-for="index in linesCount" :key="index">
          <div
              class="index text-white rounded w-8 text-white  flex justify-center items-center h-8 bg-primary"
              v-text="index">

          </div>
          <input
              id="script"
              v-model="form.script[index - 1]"
              :disabled="loading"
              type="text"
              class="input"
              placeholder=""
          >
        </div>
        <div class="flex justify-around">
          <div class="text-center cursor-pointer " @click="linesCount++">
            more line
          </div>
          <div class="text-center cursor-pointer " @click="onLessLine">
            less lines
          </div>
        </div>
      </div>
      <div class="form-group">
        <button
            type="submit"
            class="button"
            :disabled="loading"
            :class="{loading}"
        >
          {{ loading ? 'Processing ...' : 'Save' }}
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import {ax} from "../../lib/plugins/axios";

export default {
  name: 'NewRepo',
  data() {
    return {
      loading: false,
      form: {
        name: '',
        script: [],
        working_dir: '',
      },
      linesCount: 4,
      editMode: false,
    }
  },
  methods: {
    getEditMode() {
      alert('called')
      return this.editMode;
    },
    setRepo(repo, editMode) {
      this.editMode = editMode
      this.form = {...this.form, ...repo};
      if (this.form.script) this.linesCount = this.form.script.length + 1;
    },
    onLessLine() {
      if (this.linesCount < 3) return;
      this.linesCount--;
      this.form.script.length = this.linesCount
    },
    async submit() {
      const {name, script, working_dir} = this.form;
      if (!(name && working_dir)) return;
      if (!(script && script.length)) return;
      const {status, data} = await ax.post('github/repository/save', this.form);
      if (status === 200) {
        this.$emit('save', data);
      }
    }
  }
}
</script>
<style lang="scss">
.new-repo {
  @apply p-4;
  max-width: 90vw;
  .delete{
    @apply transition rounded px-2 py-1 hover:text-white  text-red-400 hover:bg-red-500;
  }

  .form-group {
    @apply flex flex-col py-2 gap-2 ;
    .form-label {
      @apply text-xs opacity-50;
    }

    input {
      @apply w-full outline-1 px-2 h-8 bg-gray-100 border rounded border-gray-300 ring-0 outline-primary;
    }

    .button {
      @apply border border-primary transition bg-primary text-white px-4 py-1 rounded text-lg
      font-bold;
      &:hover, &:focus {
        @apply bg-white text-primary border border-primary;
      }

      &:active {
        @apply scale-90;
      }

      &.loading {
        @apply bg-primary text-white border border-primary opacity-50;
        @apply scale-100;
      }
    }
  }
}

</style>
