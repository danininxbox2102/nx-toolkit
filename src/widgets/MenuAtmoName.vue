<script setup lang="ts">
import {onMounted, ref} from "vue";

const props = defineProps(["fileName"]);
const emit = defineEmits(['select'])

const inputRef = ref<HTMLInputElement | null>(null);

const save = (): void => {
  if (!inputRef.value) return;
  if (inputRef.value.value == "") return;

  emit("select",inputRef.value.value);
}

onMounted(() => {
  if (!inputRef.value) return;
  inputRef.value.value = "Русская локализация";
})

</script>

<template>
  <div class="background">
    <div class="menu">
      <div class="title">Введите Название для Title content 🍵</div>
      <div class="title">{{props.fileName}}</div>
      <input type="text" ref="inputRef" @keydown.enter="save">
      <div class="confirm-btn" @click="save">Продолжить</div>
    </div>
  </div>
</template>

<style scoped>

.confirm-btn:hover{
  background-color: #2653ae;
}


.confirm-btn{
  cursor: pointer;
  user-select: none;
  background-color: #3574F0;
  color: white;
  border-radius: 5px;
  margin-top: 10px;
  padding: 5px 20px;
  margin-bottom: 20px;
}

input{
  color: white;
  outline: none;
  background: transparent;
  border: solid 2px #656565;
  border-radius: 5px;
  margin-top: 10px;
  width: 60%;
}

.title{
  text-align: center;
  font-weight: bold;
  color: white;
  margin-top: 20px;
}

.menu{
  background-color: var(--color-back);
  width: 400px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.background{
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  z-index: 999;
  background-color: rgba(25, 25, 25, 0.66);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
</style>
