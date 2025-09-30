<script setup lang="ts">

import {ref} from "vue";
import FolderMenu from "@/pages/main/ui/dirViewer/FolderMenu.vue";
import FolderIcon from "@/assets/svg/folder-open.svg";
import TrashIcon from "@/assets/svg/trash.svg";
import AtmoIcon from "@/assets/svg/atmo.svg";
import FileIcon from "@/assets/svg/file.svg";

import DownIcon from "@/assets/svg/down.svg";
import UpIcon from "@/assets/svg/up.svg";


import type {GameFile} from "@/interfaces/GameData.ts";
import {useGameFilesStore} from "@/stores/gameInfo.ts";
import MenuAtmoName from "@/widgets/MenuAtmoName.vue";
import type {Folder} from "@/interfaces/FS.ts";
import FileEntry from "@/pages/main/ui/dirViewer/FileEntry.vue";

const props = defineProps<{folder: Folder, i:number}>();

const showMenu = ref(false)
const entryStyle = ref("");
const entryIcon = ref(FolderIcon);


let selected = 2;

const select = (i:number) => {
  selected = i
  update()
}

const gameFilesStore = useGameFilesStore();

const save = (type:"atmosphere"|"delete",fileName:string, customName?:string) => {
  const file:GameFile = {type:type, file:fileName, name:customName}

  console.log(`Remapping ${props.folder.fullPath} to ${JSON.stringify(file)}...`)

  gameFilesStore.set(props.folder.fullPath,file as object as GameFile);
}

const removeFromStore = () => {
  gameFilesStore.remove(props.folder.fullPath);
}

const update = () => {
  showMenu.value = false;
  switch (selected){
    case 0:
      entryStyle.value = 'atmosphere'
      entryIcon.value = AtmoIcon
      showNameMenu.value = true
      break;
    case 1:
      entryStyle.value = 'delete'
      entryIcon.value = TrashIcon
      displayText.value = `<s>${props.folder.name}</s>>`
      save("delete",props.folder.name,"")
      break;
    case 2:
      //Ignore
      entryStyle.value = ''
      displayText.value = props.folder.name
      entryIcon.value = FileIcon
      removeFromStore()
      break;
  }
}

const closeMenu = () => {
  showMenu.value = false;
}

let customName = ""
const showNameMenu = ref(false)
const displayText = ref(props.folder.name);

const setCustomName = (name:string) =>{
  customName = name
  displayText.value = customName
  save("atmosphere",props.folder.name,name)

  showNameMenu.value = false
}

const showChild = ref(false)

const toggleChild = () => {
  showChild.value = !showChild.value
}

</script>

<template>
  <MenuAtmoName @select="setCustomName" v-if="showNameMenu" :file-name="props.folder.name"></MenuAtmoName>
  <div :style="props.i > 0 ? 'margin-left: 20px' : ''" class="entry" :class="entryStyle">
    <div class="info">
      <img :src="entryIcon" class="menu-icon" alt="my-logo" @click="showMenu = !showMenu"/>
      <img :src="showChild ? DownIcon : UpIcon" class="menu-icon" alt="my-logo" @click="toggleChild()"/>
      <div class="text" v-html="displayText"></div>
      <FolderMenu v-if="showMenu" @select="select" @close="closeMenu" :types="['Atmosphere','Delete','Ignore']" :selected="selected"></FolderMenu>
    </div>
    <div class="child" v-if="showChild">
      <DirEntry v-for="folder in props.folder.children.folders" :key="props.folder.children.folders.indexOf(folder)" :folder="folder" :i="i+1"></DirEntry>
      <FileEntry v-for="file in props.folder.children.files" :key="props.folder.children.files.indexOf(file)" :file-name="file.name" :i="i+1"></FileEntry>
    </div>
  </div>
</template>

<style scoped>

.delete{
  background: #713c23;
}

.atmosphere{
  background: #237168;
}

.entry{
  display: flex;
  flex-direction: column;
}

.info{
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
