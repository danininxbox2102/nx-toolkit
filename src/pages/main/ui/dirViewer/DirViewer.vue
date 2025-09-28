<script setup lang="ts">
import DirEntry from "@/pages/main/ui/dirViewer/DirEntry.vue";
import FileEntry from "@/pages/main/ui/dirViewer/FileEntry.vue";
import {onMounted, ref} from "vue";

const props = defineProps<{dirPath: string|null, gameId: string}>()

// const folders = ['atmosphere']
// const files = ['Game Name [sj92hq9dfjg3]v0.nsp', 'Game Name [sj92hq9dfjg3]v14163.nsp','Game  DLC [Aboba bebra] [sj92hq9dfjg3].nsp']

const folders = ref<string[]>([]);
const files = ref<string[]>([]);

const loading = ref(true)

onMounted(async () => {
  if (!props.dirPath || props.dirPath === "") {
    return
  }
  console.log("dirPath: ", props.dirPath);

  const entries = await window.electronAPI.getEntries(props.dirPath)
  folders.value = entries.folders
  files.value = entries.files
  loading.value = false
})

</script>

<template>
  <div class="entries">
    <div v-if="!loading">
      <DirEntry v-for="folder in folders" :key="folders.indexOf(folder)" :file-name="folder"></DirEntry>
      <FileEntry v-for="file in files" :key="files.indexOf(file)" :file-name="file"></FileEntry>
    </div>
  </div>
</template>

<style scoped>

.entries{
  margin-top: 15px;
  width: 60%;
  flex-shrink: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
}

</style>
