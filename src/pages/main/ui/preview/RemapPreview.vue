<script setup lang="ts">
import {ref} from "vue";
import {useGameFilesStore} from "@/stores/gameInfo.ts";

const remap = ref<string[]>([])

const gameFilesStore = useGameFilesStore();


gameFilesStore.$subscribe(() => {
  const arr:string[] = []
  gameFilesStore.getMap().forEach((value, key) => {
    arr.push(`${key} -> ${JSON.stringify(value)}`)
  })
  remap.value = arr
})

</script>

<template>
  <div class="cont">
    <div class="remap-el" v-for="el in remap" :key="remap.indexOf(el)">
      {{el}}
    </div>
  </div>
</template>

<style scoped>

.cont{
  width: 99%;
  border-left: #171717 solid 2px;
  border-top: #171717 solid 2px;
  height: 20%;
  color: #fff;
  overflow-y: scroll;
}

.remap-el{
  font-size: 12px;
  margin-bottom: 7px;
}

</style>
