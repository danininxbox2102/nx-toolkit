<script setup lang="ts">

import {ref} from "vue";
import FolderMenu from "@/pages/main/ui/dirViewer/FolderMenu.vue";

import FileIcon from "@/assets/svg/file.svg";
import DlcIcon from "@/assets/svg/package.svg";
import TrashIcon from "@/assets/svg/trash.svg";
import GameIcon from "@/assets/svg/game.svg";
import UpdateIcon from "@/assets/svg/update.svg";
import {useGameFilesStore, useGameIdStore} from "@/stores/gameInfo.ts";
import type {GameFile} from "@/interfaces/GameData.ts";
import MenuDlcName from "@/widgets/MenuDlcName.vue";

const props = defineProps(["fileName","i"])

const displayText = ref(props.fileName);

const showMenu = ref(false)
const entryStyle = ref("");
const entryIcon = ref(FileIcon);

const gameIdStore = useGameIdStore();
const gameFilesStore = useGameFilesStore();

gameIdStore.$subscribe(() => {
  console.log("Id store update")
  if (!gameIdStore.getId()) return
  update()
})


let selected = 4;

const select = (i:number) => {
  selected = i
  update()
}

const save = (type:GameFile["type"], fileName:string, customName?:string) => {
  const file:GameFile = {type:type, file:fileName}

  if (customName) file.name = customName

  console.log(`Remapping ${props.fileName} to ${JSON.stringify(file)}...`)

  gameFilesStore.set(props.fileName,file as object as GameFile);
}

const removeFromStore = () => {
  gameFilesStore.remove(props.fileName);
}

const showNameMenu = ref(false)

const update = () => {
  showMenu.value = false;
  const ext = props.fileName.split('.').pop();

  switch (selected){
    case 0:
      entryStyle.value = 'game'
      entryIcon.value = GameIcon

      displayText.value = `${gameIdStore.getId()}-base.${ext}`
      save("base",`$gameId-base.${ext}`)
      break;
    case 1:
      entryStyle.value = 'update'
      entryIcon.value = UpdateIcon

      displayText.value = `${gameIdStore.getId()}-update.${ext}`
      save("update",`$gameId-update.${ext}`)
      break;
    case 2:
      entryStyle.value = 'dlc'
      entryIcon.value = DlcIcon
      if (customName === "") showNameMenu.value = true
      break;
    case 3:
      entryStyle.value = 'excluded'
      entryIcon.value = TrashIcon
      displayText.value = props.fileName;
      removeFromStore()
      break;
    case 4:
      //Ignore
      entryStyle.value = ''
      entryIcon.value = FileIcon
      displayText.value = props.fileName;
      removeFromStore()
      break;
  }
}

const closeMenu = () => {
  showMenu.value = false;
}

let customName = ""

const setCustomName = (name:string) =>{
  const ext = props.fileName.split('.').pop();

  customName = name
  displayText.value = customName
  save("dlc",`$gameId-dlc$i.${ext}`, name)

  showNameMenu.value = false
}

</script>

<template>
  <MenuDlcName @select="setCustomName" v-if="showNameMenu" :file-name="props.fileName"></MenuDlcName>
  <div :style="props.i > 0 ? 'margin-left: 20px' : ''" class="entry" :class="entryStyle">
    <img :src="entryIcon" class="menu-icon" alt="my-logo" @click="showMenu = !showMenu"/>
    <div class="text">{{displayText}}</div>
    <FolderMenu v-if="showMenu" @select="select" @close="closeMenu"  :types="['Game', 'Update','DLC','Exclude','Ignore']" :selected="selected"></FolderMenu>
  </div>
</template>

<style scoped>

.excluded{
  background: #713c23;
}

.game{
  background: #007800;
}

.update{
  background: #37ae37;
}

.dlc{
  background: #D4C714;
}

.entry{
  display: flex;
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
  background: #ffffff38;
}

.text{
  color: white;
  margin-left: 5px;
}
</style>
