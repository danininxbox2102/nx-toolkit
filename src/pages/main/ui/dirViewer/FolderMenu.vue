<script setup lang="ts">

import {onMounted, onUnmounted, ref} from "vue";
import {useGameFilesStore} from "@/stores/gameInfo.ts";

const emit = defineEmits(['select','close'])

const props = defineProps<{types: string[],selected: number}>()

const typesR = ref(props.types)
const menuR = ref()

const handleClick = (e:MouseEvent) => {
  if (e.target != menuR.value) {
    console.log("close")
    emit('close')
    window.removeEventListener('click', handleClick)
  }
}

const createListener = () => {
  window.addEventListener('click', handleClick)
}

onMounted(() => {
  setTimeout(createListener, 100)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClick)
})

const removeTakenTypes = () => {
  const values = Array.from(useGameFilesStore().getMap().values())
  const taken = values.map(value => value.type)
  const types = [...props.types]

  types.splice(props.selected, 1)

  console.log(taken)

  if (taken.includes("base")) {
    const i = types.indexOf("Game")
    if (i >= 0) {
      console.log("base included, removing 'Game' at index ",types.indexOf("Game"))
      types.splice(i, 1)
    }
  }

  if (taken.includes("update")) {
    const i = types.indexOf("Update")
    if (i >= 0) {
      console.log("update included, removing 'Update' at index ",types.indexOf("Update"))
      types.splice(types.indexOf("Update"), 1)
    }
  }


  typesR.value = types
}

removeTakenTypes()
</script>

<template>
  <div class="menu" ref="menuR">

    <div class="menu-btn" v-for="(type) in typesR" :key="props.types.indexOf(type)" @click="emit('select',props.types.indexOf(type))">
      {{ type }}
    </div>
  </div>
</template>

<style scoped>
.menu{
  z-index: 2;
  position: absolute;
  width: 100px;
  background: var(--color-back);
  border: #3e3e3e solid 2px;
  border-radius: 10px;
  top: 100%;
}

.menu-btn{
  color: white;
  font-size: 14px;
  padding: 5px;
  cursor: pointer;
  user-select: none;
}

.menu-btn:hover{
  background: #323232;
}
</style>
