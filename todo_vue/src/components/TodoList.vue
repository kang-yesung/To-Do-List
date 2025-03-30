<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["trash-todo", "toggle-todo"]);
const trashTodo = () => {
  emit("trash-todo", props.todo.id);
};
const toggleTodo = () => {
  emit("toggle-todo", props.todo.id);
};
</script>

<template>
  <li class="item" :class="{ completed: todo.completed }">
    <span @click="toggleTodo">{{ todo.text }}</span>
    <i class="fa-solid fa-check" @click="toggleTodo"></i>
    <i class="fa fa-trash" @click="trashTodo"></i>
  </li>
</template>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
  transition: 0.3s;
}
.item:hover {
  background-color: #eae9ee;
}
/* li 체크 클릭됬을 때 */
.item.completed span {
  opacity: 0.1;
  text-decoration: line-through;
}
.item span {
  flex: 1;
  text-align: left;
}

/*  아이콘 */
.fa-check,
.fa-trash {
  font-size: 16px;
  transition: 0.3s;
}
.fa-check:hover {
  color: dodgerblue;
}
.fa-trash:hover {
  color: red;
  transform: scale(1.1);
}
</style>
