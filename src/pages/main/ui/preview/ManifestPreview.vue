<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import {useGameFilesStore, useGameIdStore} from "@/stores/gameInfo.ts";
import {ref} from "vue";
import type {GameFile, GameInfo} from "@/interfaces/GameData.ts";

console.log("aaaa")

const data = ref<GameInfo>({})

const gameIdStore = useGameIdStore();
const gameFilesStore = useGameFilesStore();

gameIdStore.$subscribe(() => {
  console.log("Game id update")
  update()
})

gameFilesStore.$subscribe(() => {
  console.log("Game files update")
  update()
})

const update = () => {
  data.value = {
    "createdAt": Date.now(),
    "createdAtDate": new Date().toString()
  }

  if (gameIdStore.getId()) {
    data.value["gameId"] = gameIdStore.getId();
  }

  if (gameFilesStore.getMap().size > 0) {
    const map = gameFilesStore.getMap();
    console.log("map:",map)
    const gameFiles:Array<GameFile> = [];
    const optionalFiles:Array<GameFile> = [];

    let lastDlcIndex = 0;

    map.forEach((gameFile:GameFile) => {
      const file = Object.create(gameFile);
      Object.assign(file, gameFile);
      if (file.type === "dlc") {
        file.file = file.file.replace("$i", String(lastDlcIndex)).replace("$gameId", useGameIdStore().getId() || "")
        optionalFiles.push(file);
        lastDlcIndex++;
        return;
      }

      if (file.type === "atmosphere") {
        optionalFiles.push(file);
        return;
      }

      file.file = file.file.replace("$gameId", String(gameIdStore.getId()));
      gameFiles.push(file);
    })

    data.value["gameFiles"] = gameFiles;
    data.value["optionalFiles"] = optionalFiles;
  }
}

</script>

<template>
  <div class="cont">
    <vue-json-pretty :data="data" :show-line="false" />
  </div>
</template>

<style>

.vjs-key{
  color: #cf7538;
}

.vjs-tree-node:hover {
  background-color: #1b1b1b;
  border-radius: 4px;
}

</style>

<style scoped>

.cont{
  border-left: #171717 solid 2px;
  overflow-y: scroll;
  max-height: 80%;
  height: 100%;
  color: #fff;
  width: 99%;
}

.vjs-key {
  color: #000;
}

.vjs-tree-node:hover {
  background-color: #e6f7ff !important;
  border-radius: 4px;
}

</style>
