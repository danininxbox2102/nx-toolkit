<script setup lang="ts">

import ManifestPreview from "@/pages/main/ui/preview/ManifestPreview.vue";
import MenuGameId from "@/pages/main/ui/MenuGameId.vue";
import {useGameIdStore} from "@/stores/gameInfo.ts";
import {ref} from "vue";
import DirViewer from "@/pages/main/ui/dirViewer/DirViewer.vue";

import NavBar from "@/pages/main/ui/NavBar.vue";
import RemapPreview from "@/pages/main/ui/preview/RemapPreview.vue";

const dirPath = ref<string|null>(null)
const gameId = ref("")

const setGameId = () => {
  gameId.value = useGameIdStore().getId();
  showGameIdMenu.value = false
}

const setDirPath = (path: string) => {
  dirPath.value = path;
  showGameIdMenu.value = true
}

const showGameIdMenu = ref(false);

</script>

<template>
  <div class="main">
    <NavBar :dir-path="dirPath" :game-id="gameId" @select="setDirPath"></NavBar>
    <hr>
    <div class="tiles-wrapper">
      <div class="tiles" v-if="dirPath">
        <MenuGameId  @select="setGameId" v-if="showGameIdMenu"></MenuGameId>
        <DirViewer :dir-path="dirPath" :game-id="gameId"></DirViewer>
        <div class="right">
          <ManifestPreview></ManifestPreview>
          <RemapPreview></RemapPreview>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.tiles-wrapper {
  height: 100%;
}

.right{
  display: flex;
  flex-direction: column;
}

hr{
  border: #171717 solid 1px;
  margin: 0;
}


.tiles{
  position: relative;
  display: flex;
  height: 100%;
}

.main{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
