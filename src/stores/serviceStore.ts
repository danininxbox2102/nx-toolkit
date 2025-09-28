import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMappingStore = defineStore('mapping', () => {
  const mapping = ref<Map<string, string>>(new Map<string, string>)

  function getMap() {
    return  mapping
  }

  function replaceMap(map: Map<string, string>) {
    mapping.value = map
  }

  function set(origin:string, mapTo:string) {
    mapping.value.set(origin, mapTo)
  }

  return { mapping, getMap, replaceMap, set };
})
