<script setup lang="ts">
import DirEntry from "@/pages/main/ui/dirViewer/DirEntry.vue";
import FileEntry from "@/pages/main/ui/dirViewer/FileEntry.vue";
import {onMounted, ref} from "vue";
import type {Folder,File} from "@/interfaces/FS.ts";

const props = defineProps<{dirPath: string|null, gameId: string}>()

const folders = ref<Folder[]>([]);
const files = ref<File[]>([]);

const loading = ref(true)

onMounted(async () => {
  if (!props.dirPath || props.dirPath === "") {
    return
  }
  console.log("dirPath: ", props.dirPath);

  const entries = await window.electronAPI.getEntries(props.dirPath)
  console.log("entries: ", entries);
  folders.value = entries.folders as Folder[]
  files.value = entries.files as File[]
  loading.value = false
})

</script>

<template>
  <div class="entries">
    <div v-if="!loading">
      <DirEntry v-for="folder in folders" :key="folders.indexOf(folder)" :folder="folder" :i="0"></DirEntry>
      <FileEntry v-for="file in files" :key="files.indexOf(file)" :file-name="file.name" :i="0"></FileEntry>
    </div>
  </div>
</template>

<style scoped>

.entries{
  flex-direction: column;
  overflow-y: scroll;
  padding-left: 20px;
  margin-top: 15px;
  flex-shrink: 0;
  display: flex;
  width: 60%;
}

</style>
