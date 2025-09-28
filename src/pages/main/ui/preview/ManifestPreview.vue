<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import {useGameFilesStore, useGameIdStore} from "@/stores/gameInfo.ts";
import {ref} from "vue";
import type {GameInfo} from "@/interfaces/GameData.ts";

// const example = {
//   "createdAt": 1758740487143,
//   "createdAtDate": "Wed Sep 24 2025 22:01:27 GMT+0300 (Moscow Standard Time)",
//   "gameId": "ac-ezio",
//   "gameFiles":[
//     {"base":"ac-ezio-base.nsz"},
//     {"update":"ac-ezio-update.nsz"},
//     {"dlc":"ac-ezio-dlc1.nsz","name":"DLC Brotherhood"},
//     {"dlc":"ac-ezio-dlc2.nsz","name":"DLC Embers"},
//     {"dlc":"ac-ezio-dlc3.nsz","name":"DLC Lineage"},
//     {"dlc":"ac-ezio-dlc4.nsz","name":"DLC Revelations"},
//     {"dlc":"ac-ezio-dlc5.nsz","name":"DLC Voice Audio Package"}
//   ]
// }

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
    data.value["gameFiles"] = Array.from(map.values());
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
  width: 99%;
  border-left: #171717 solid 2px;
  height: 80%;
  color: #fff;
  overflow-y: scroll;
}

.vjs-key {
  color: #000;
}

.vjs-tree-node:hover {
  background-color: #e6f7ff !important;
  border-radius: 4px;
}

</style>
