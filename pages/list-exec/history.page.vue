<template>
  <div class="HistoryList">
    <div>
      <div class="text-xl">All Executions for {{ name }}</div>
      <div class="text-gray-400">Showing runs from all workflows</div>
    </div>
    <div class="search">
      <input v-model="filter" type="text" placeholder="Filter ">
    </div>
    <div class="table-wrapper border border-gray-200 rounded-lg">
      <table class="table-auto w-full whitespace-nowrap">
        <thead class="bg-gray-100">
        <tr>
          <td style="">{{ list.length }} Executions</td>
          <td>Duration</td>
          <td class="">Date</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="it in filtered_list" :key="it.id">
          <td class="flex gap-2 items-center">
            <div class="icon pt-1">
              <template v-if="it.status === 'running'">
                <svg class="fill-primary animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                     viewBox="0 0 32 32">
                  <path
                      d="M16,22a6,6,0,1,1,6-6A6.0067,6.0067,0,0,1,16,22Zm0-10a4,4,0,1,0,4,4A4.0045,4.0045,0,0,0,16,12Z"/>
                  <path d="M16,26a10.0162,10.0162,0,0,1-7.4531-3.3325l1.49-1.334A8,8,0,1,0,16,8V6a10,10,0,0,1,0,20Z"/>
                  <path
                      d="M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z"/>
                  <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32"
                        height="32"/>
                </svg>
              </template>
              <template v-if="it.status === 'success'">
                <svg class="fill-green-600" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                     viewBox="0 0 32 32">
                  <polygon points="14 21.414 9 16.413 10.413 15 14 18.586 21.585 11 23 12.415 14 21.414"/>
                  <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"/>
                  <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32"
                        height="32"/>
                </svg>

              </template>
              <template v-if="it.status === 'failed'">
                <svg version="1.1" class="fill-red-500" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     width="20" height="20" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;"
                     xml:space="preserve">
                  <title>checkmark</title>
                  <path d="M16,2C8.2,2,2,8.2,2,16s6.2,14,14,14s14-6.2,14-14S23.8,2,16,2z M16,28C9.4,28,4,22.6,4,16S9.4,4,16,4s12,5.4,12,12
	S22.6,28,16,28z"/>
                  <rect id="_Transparent_Rectangle_" class="st0" width="32" height="32"/>
                  <polygon
                      points="21.4,23 16,17.6 10.6,23 9,21.4 14.4,16 9,10.6 10.6,9 16,14.4 21.4,9 23,10.6 17.6,16 23,21.4 "/>
                </svg>
              </template>
            </div>
            <a
                class="hover:text-primary hover:underline pr-4"
                :href="'/history/'+name+'/'+it.id">
              {{ it.msg || 'no message' }}
            </a>
          </td>
          <td class="text-xs">
            <div v-if="it.duration" class="flex items-center ">
              <svg class="fill-gray-400" width="14px" height="14px" id="icon" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 32 32">
                <title>hourglass</title>
                <rect x="15" y="19" width="2" height="2"/>
                <rect x="15" y="23" width="2" height="2"/>
                <path
                    d="M23,11.67V4h3V2H6V4H9v7.67a2,2,0,0,0,.4,1.2L11.75,16,9.4,19.13a2,2,0,0,0-.4,1.2V28H6v2H26V28H23V20.33a2,2,0,0,0-.4-1.2L20.25,16l2.35-3.13A2,2,0,0,0,23,11.67ZM21,4v7H11V4Zm0,16.33V28H11V20.33L14.25,16,12,13h8l-2.25,3Z"
                    transform="translate(0)"/>
                <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32"
                      height="32"/>
              </svg>
              <div>{{ (+it.duration / 1000).toFixed(2) }} ms</div>
            </div>
            <div v-if="!it.duration">
              <div>{{ ((new Date().getTime() - +it.time) / 1000).toFixed(2) }} ms</div>
            </div>
          </td>
          <td class="text-xs">{{ fromNow(it.time) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {usePageContext} from "../../renderer/usePageContext";
import {ax} from "../../lib/plugins/axios";
import moment from 'moment';

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
      setTimeout(() => {
        this.fetchList();
      }, 5000);
    },
    fromNow(arg) {
      if (!arg) return '';
      return moment(arg).fromNow()
    },
  },
  computed: {
    filtered_list() {
      let f = this.filter.trim().toLowerCase();
      if (!f) return this.list;
      return this.list.filter(it => (it.msg || '').indexOf(f) > -1)
    }
  },
  data() {
    return {
      list: [],
      filter: '',
    }
  }
}
</script>

<style lang="scss">
.HistoryList {
  @apply mx-auto px-4 py-8 flex flex-col gap-4;
  max-width: 600px;

  table {
    thead {
      tr {
        td {
          @apply px-4 py-4 font-extrabold tracking-wider text-gray-400;
        }
      }
    }

    tbody {
      tr {
        td {
          @apply px-4 py-3 text-gray-500 text-lg;
        }
      }
    }
  }

  .search {
    input {
      @apply border-gray-200 border rounded w-full px-2 py-1 outline-primary;
    }
  }
}

svg {
  .cls-1, .st0 {
    fill: none;
  }
}
</style>
