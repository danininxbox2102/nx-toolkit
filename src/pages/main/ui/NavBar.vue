<script setup lang="ts">
import FolderIcon from '@/assets/svg/folder.svg'
import {ref} from "vue";
import {useGameIdStore} from "@/stores/gameInfo.ts";

const props = defineProps<{dirPath: string|null, gameId: string}>()
const emit = defineEmits(["select"])


const selectDir = async () => {
  const fsResponse = await window.electronAPI.openFolder()

  if (!fsResponse) {
    console.error("Failed to open folder")
    return
  }

  if (fsResponse.cancelled) {
    return
  }

  console.log("Selected dir: ",fsResponse.filePaths)
  emit("select", fsResponse.filePaths[0])
}

const gameIdInp = ref()

const setGameId = async () => {
  if (!gameIdInp.value) return

  useGameIdStore().setId(gameIdInp.value.value)
}

</script>

<template>
  <div class="cont">
    <div class="directory">
      <div class="ch-dir-btn" @click="selectDir">
        <img :src="FolderIcon" class="folder-icon" alt="my-logo" />
      </div>
      <div class="title">{{ props.dirPath||"Select NSP directory" }}</div>
    </div>

    <div class="gameId" v-if="props.gameId !== ''">Game ID: <input ref="gameIdInp" @input="setGameId" type="text" :value="props.gameId" /></div>
  </div>
</template>

<style scoped>

input{
  color: white;
  background: transparent;
  outline: none;
  border: none;
}

.directory{
  display: flex;
  align-items: center;
}

.cont{
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
}

.title{
  font-weight: bold;
  color: white;
  margin-left: 10px;
}

.gameId{
  font-weight: bold;
  color: white;
  margin-left: 10px;
  font-size: 13px;
  margin-top: 5px;
}

.folder-icon{
  width: 18px;
  height: 18px;
}


.ch-dir-btn{
  cursor: pointer;
  width: 18px;
  height: 18px;
  border-radius: 5px;
  padding: 5px;
  background: #1b1b1b;
}
</style>
