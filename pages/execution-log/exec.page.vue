<template>
  <div class="min-h-screen p-8" v-if="data">
    <div class="text-xl mb-2">Execution History of {{ name }}</div>
    <div class="mb-4">{{ data.date }}</div>
    <div class="exec" v-for="(val,key) in data.exec">
      <div class="text-lg font-bold">{{ key }}</div>
      <div class="stdout">
        <pre>
          <code>
            {{ val.stdout }}
          </code>
        </pre>
      </div>
      <div class="stderr text-red-500">
        <pre><code>
          {{ val.stderr }}
        </code></pre>
      </div>
      <div class="err text-red-700">
        <pre><code>{{ val.err }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import {usePageContext} from "../../renderer/usePageContext";
import {ax} from "../../lib/plugins/axios";

export default {
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
    }
  },
  data() {
    return {
      data: null,
    }
  }
}
</script>

<style scoped>

</style>
