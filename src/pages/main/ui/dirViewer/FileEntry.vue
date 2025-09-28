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
import MenuDlcName from "@/pages/main/ui/MenuDlcName.vue";

const props = defineProps(["fileName"])

const displayText = ref(props.fileName);

const showMenu = ref(false)
const entryStyle = ref("");
const entryIcon = ref(FileIcon);

const gameIdStore = useGameIdStore();
const gameFilesStore = useGameFilesStore();

gameIdStore.$subscribe(() => {
  console.log("Game info update ")
  update()
})


let selected = 4;

const select = (i:number) => {
  selected = i
  update()
}

const save = (type:string, displayName:string, customName?:string) => {
  const obj:{type?:string, name?:string} = {}

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  obj[type]=displayName

  if (customName){
    obj.name = customName
  }

  console.log(`Remapping ${props.fileName} to ${JSON.stringify(obj)}...`)

  gameFilesStore.set(props.fileName,obj as object as GameFile);
}

const removeFromStore = () => {
  gameFilesStore.remove(props.fileName);
}

const showNameMenu = ref(false)

const update = () => {
  showMenu.value = false;
  const gameId = gameIdStore.getId();
  const ext = props.fileName.split('.').pop();

  switch (selected){
    case 0:
      entryStyle.value = 'game'
      entryIcon.value = GameIcon

      displayText.value = `${gameId}-base.${ext}`
      save("base",`${gameId}-base.${ext}`)
      break;
    case 1:
      entryStyle.value = 'update'
      entryIcon.value = UpdateIcon

      displayText.value = `${gameId}-update.${ext}`
      save("update",`${gameId}-update.${ext}`)
      break;
    case 2:
      entryStyle.value = 'dlc'
      entryIcon.value = DlcIcon
      showNameMenu.value = true
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

const setDlcName = (value:string) =>{
  const gameId = gameIdStore.getId();
  const ext = props.fileName.split('.').pop();

  displayText.value = value
  save("dlc",`${gameId}-dlc.${ext}`, value)

  showNameMenu.value = false
}

</script>

<template>
  <MenuDlcName @select="setDlcName" v-if="showNameMenu" :file-name="props.fileName"></MenuDlcName>
  <div class="entry" :class="entryStyle">
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
