<template>
  <div>
    <div class="flex items-center cursor-pointer py-2 bg-gray-200 rounded px-4 my-1" @click="show = !show">
      <div class="text-lg font-bold tracking-wider">{{ val.cmd }}</div>
      <div class="ml-auto duration">
       <template v-if="!running && val.duration">
         {{((+val.duration/1000).toFixed(2))}} ms
       </template>
        <template v-if="running">
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
      </div>
    </div>
    <div class="details px-4 flex flex-col gap-4" :class="{show}">
      <div class="text-xs text-gray-500 py-2">Details</div>
      <div class="py-4" v-if="(String(val.stdout) + String(val.stderr) + String(val.err)) === 'null'">
        <pre><code>no output</code></pre>
      </div>
      <div class="stdout py-4" v-if="val.stdout">
        <pre><code>{{ val.stdout }}</code></pre>
      </div>
      <div class="stderr text-red-500 py-4" v-if="val.stderr">
        <pre><code>{{ val.stderr }}</code></pre>
      </div>
      <div class="err text-red-700" py-4 v-if="val.err">
        <pre><code>{{ val.err }}</code></pre>
      </div>
      <div class="mb-4"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ExecItem',
  props: {
    cmd: {},
    val: {}
  },
  data() {
    return {
      show: false,
    }
  },
  computed:{
    running(){
      const {status} = this.val || {};
      return status === 'running';
    }
  }
}
</script>
<style lang="scss">
.details{
  max-height: 0;
  height: 0;
  overflow-y: hidden;
  transition: all ease-in-out 500ms;
  &.show{
    transition: all ease-in-out 500ms;
    height: auto;
    display: block;
    max-height: 50vh;
  }
}
svg {
  .cls-1, .st0 {
    fill: none;
  }
}
</style>
