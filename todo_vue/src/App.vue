<script setup>
import InputText from "./components/InputText.vue";
import Reset from "./components/Reset.vue";
import Title from "./components/Title.vue";
import TodoList from "./components/TodoList.vue";
import { ref, onMounted } from "vue";

const todos = ref([]);

const addTodo = (newtodo) => {
  if (!newtodo.trim()) return;
  todos.value.push({
    id: Date.now(),
    text: newtodo,
    completed: false,
    createAt: new Date().toLocaleDateString(),
  });
  saveTodo();
};

const trashTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
  saveTodo();
};

const toggleTodo = (id) => {
  const todo = todos.value.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodo();
  }
};

const completedTrash = () => {
  todos.value = todos.value.filter((todo) => todo.completed === false);
  saveTodo();
};

const resetTodos = () => {
  todos.value = [];
  saveTodo();
};

const saveTodo = () => {
  localStorage.setItem("todos", JSON.stringify(todos.value));
};

const loadTodos = () => {
  const saveTodos = localStorage.getItem("todos");
  if (saveTodos) {
    todos.value = JSON.parse(saveTodos);
  } else {
    todos.value = []; // 데이터가 없으면 빈 배열로 초기화
  }
};

onMounted(() => {
  loadTodos();
});
</script>

<template>
  <section class="container">
    <header class="header">
      <Title></Title>
    </header>
    <ul class="items">
      <TodoList
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @trash-todo="trashTodo"
        @toggle-todo="toggleTodo"
      ></TodoList>
    </ul>
    <footer class="footer">
      <InputText @add-todo="addTodo"></InputText>
      <Reset
        @reset-todos="resetTodos"
        @completed-trash="completedTrash"
      ></Reset>
    </footer>
  </section>
</template>

<style scoped></style>
