<script setup lang="ts">

import {ref} from "vue";
import FolderMenu from "@/pages/main/ui/dirViewer/FolderMenu.vue";
import FolderIcon from "@/assets/svg/folder-open.svg";
import TrashIcon from "@/assets/svg/trash.svg";
import AtmoIcon from "@/assets/svg/atmo.svg";

const props = defineProps(["fileName"])

const showMenu = ref(false)
const entryStyle = ref("");
const entryIcon = ref(FolderIcon);


const select = (i:number) => {
  showMenu.value = false;
  switch (i){
    case 0:
      entryStyle.value = 'atmosphere'
      entryIcon.value = AtmoIcon
      break;
    case 1:
      entryStyle.value = 'delete'
      entryIcon.value = TrashIcon
      break;
  }
}

const closeMenu = () => {
  showMenu.value = false;
}

</script>

<template>
<div class="entry" :class="entryStyle">
  <img :src="entryIcon" class="menu-icon" alt="my-logo" @click="showMenu = !showMenu"/>
  <div class="text">{{props.fileName}}</div>
  <FolderMenu v-if="showMenu" @select="select" @close="closeMenu" :types="['Atmosphere','Delete']"></FolderMenu>
</div>
</template>

<style scoped>

.excluded{
  background: #713c23;
}

.atmosphere{
  background: #237168;
}

.entry{
  display: flex;
  align-items: center;
  border-bottom: #3e3e3e solid 2px;
  position: relative;
}

.menu-icon {
  display: flex;
  width: 18px;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
}

.menu-icon:hover{
  background: #2b2b2b;
}

.text{
  color: white;
  margin-left: 5px;
}
</style>
