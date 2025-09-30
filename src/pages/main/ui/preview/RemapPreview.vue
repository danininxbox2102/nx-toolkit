<script setup lang="ts">
import {ref} from "vue";
import {useGameFilesStore, useGameIdStore} from "@/stores/gameInfo.ts";

const remap = ref<string[]>([])

const gameFilesStore = useGameFilesStore();


gameFilesStore.$subscribe(() => {
  const arr:string[] = []
  let lastDlcIndex = 0;

  gameFilesStore.getMap().forEach((value, key) => {
    let filename = value.file

    filename = filename.replace("$i", String(lastDlcIndex)).replace("$gameId", useGameIdStore().getId() || "")

    if (value.type === "dlc") lastDlcIndex++;

    arr.push(`${key} -> ${filename}`)
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
