<script setup>
import { ref, defineEmits } from "vue";

const display = ref(false);
const showDisplay = () => {
  display.value = !display.value;
};

const emit = defineEmits(["reset-todos", "completed-trash"]);
const resetTodos = () => {
  emit("reset-todos");
  showDisplay();
};

const completedTrash = () => {
  emit("completed-trash");
  showDisplay();
};
</script>

<template>
  <div>
    <i class="fa-solid fa-circle-xmark" @click="showDisplay"></i>
    <div class="x-button" v-if="display">
      <button class="reset" @click="resetTodos">전체삭제</button>
      <button class="select" @click="completedTrash">완료된 항목 삭제</button>
    </div>
  </div>
</template>

<style scoped>
.trash {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 170px;
  width: 170px;
  border-radius: 5px;
  background-color: rgba(255, 163, 163, 0.582);
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

.fa-circle-xmark:hover {
  transform: translateY(-15px) scale(1.1);
}
.x-button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  height: 130px;
  width: 170px;
  top: -250px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(69, 68, 68, 0.541);
}

.reset,
.select {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  width: 150px;
  height: 45px;
  font-size: 13px;
  background-color: rgb(0, 0, 0);
  border-radius: 5px;
  border: none;
  color: white;
  transition: 0.3s;
  cursor: pointer;
}
.select:hover,
.reset:hover {
  transform: scale(1.1);
}
</style>
