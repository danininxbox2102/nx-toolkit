import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {GameContent, GameFile} from "@/interfaces/GameData.ts";

export const useGameIdStore = defineStore('gameId', () => {
  const gameId = ref("")

  function setId(id: string) {
    gameId.value = id
  }

  function getId() {
    return gameId.value
  }

  return { gameId, setId, getId };
})

export const useGameFilesStore = defineStore('gameFiles', () => {
  const gameFileMap = ref<Map<string, GameFile|GameContent>>(new Map<string, GameFile | GameContent>())

  function setMap(files: Map<string, GameFile|GameContent>) {
    gameFileMap.value = files
  }

  function getMap() {
    return gameFileMap.value
  }

  function set(fileName:string, mapTo:GameFile|GameContent) {
    gameFileMap.value.set(fileName, mapTo)
  }

  function remove(fileName:string) {
    gameFileMap.value.delete(fileName)
  }

  return { gameFileMap, setMap, getMap, set, remove };
})

export const useGameAtmosphereStore = defineStore('gameFiles', () => {
  const atmosphereFiles = ref<string[]>([])

  function setFiles(files: Array<string>) {
    atmosphereFiles.value = files
  }

  function getFiles() {
    return atmosphereFiles.value
  }

  return { atmosphereFiles, setFiles, getFiles };
})
