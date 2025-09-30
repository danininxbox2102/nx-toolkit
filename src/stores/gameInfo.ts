import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {GameFile} from "@/interfaces/GameData.ts";

export const useGameIdStore = defineStore('gameId', () => {
  const gameId = ref<string|undefined>("")

  function setId(id: string) {
    gameId.value = id
  }

  function deleteId() {
    gameId.value = undefined
  }

  function getId() {
    return gameId.value
  }

  return { gameId, setId, getId, deleteId };
})

export const useGameFilesStore = defineStore('gameFiles', () => {
  const gameFileMap = ref<Map<string, GameFile>>(new Map<string, GameFile>())

  function setMap(files: Map<string, GameFile>) {
    gameFileMap.value = files
  }

  function getMap() {
    return gameFileMap.value
  }

  function set(fileName:string, mapTo:GameFile) {
    gameFileMap.value.set(fileName, mapTo)
  }

  function remove(fileName:string) {
    gameFileMap.value.delete(fileName)
  }

  return { gameFileMap, setMap, getMap, set, remove };
})
