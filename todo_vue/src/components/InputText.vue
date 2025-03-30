<script setup>
import { ref, defineEmits } from "vue";

const newText = ref("");
const emit = defineEmits(["add-todo"]);
const addTodo = () => {
  if (newText.value.trim() === "") {
    return;
  }
  emit("add-todo", newText.value);
  newText.value = "";
};
</script>

<template>
  <footer class="footer">
    <input
      type="text"
      class="footer_input"
      v-model="newText"
      @keyup.enter="addTodo"
    />
    <i class="fa-solid fa-plus" @click="addTodo"></i>
  </footer>
</template>

<style scoped>
.footer_input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 1.5rem;
  padding: 1rem 1rem 1.25rem;
}

.fa-plus {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  margin: auto;
  font-size: 1.5rem;
  background-color: black;
  border-radius: 50%;
  color: rgb(212, 212, 212);
  transition: 0.3s;
  transform: translateY(-10px);
  cursor: pointer;
}
.fa-circle-xmark {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 30px;
  margin: auto;
  font-size: 1.5rem;
  transition: 0.3s;
  transform: translateY(-10px);
  cursor: pointer;
  top: 80px;
}
.fa-plus:hover {
  transform: translateY(-15px) scale(1.1);
}
</style>
