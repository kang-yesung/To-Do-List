<script setup></script>

<template>
  <h1>오늘의 할일</h1>
  <section>
    <div class="dark-mode">
      <i class="fa-solid fa-sun" style="visibility: hidden"></i>
      <i class="fa-solid fa-moon"></i>
    </div>
  </section>
</template>

<style scoped>
.fa-sun {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.fa-moon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.fa-moon:hover {
  color: black;
  cursor: pointer;
  user-select: none;
}

.fa-sun:hover {
  color: rgb(250, 241, 158);
  cursor: pointer;
  user-select: none;
}
.dark-mode {
  /* border: 1px solid red; */
  position: relative;
  height: 10px;
}
</style>
