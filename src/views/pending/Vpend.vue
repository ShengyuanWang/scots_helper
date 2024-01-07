<script setup>
import {ref} from "vue";


const heightTemp = ref();
window.addEventListener("resize", ()=> {
  heightTemp.value = (window.innerHeight) + 'px';
  document.getElementById("app").style.height = heightTemp.value;
});
window.addEventListener("DOMContentLoaded", ()=> {
  heightTemp.value = (window.innerHeight) + 'px';
  document.getElementById("app").style.height = heightTemp.value;
});

</script>

<template>
  <perfect-scrollbar class="fullscreen" :style="height=heightTemp">
    <div class="center">
      <div class="pending-center">
        <img src="https://avatars.githubusercontent.com/u/78770936?s=400&u=0de619010e010600e766f808b8980431c7b70c60&v=4" class="waiting-img">
      </div>
      <div class="pending-center">
        <h1 class="waiting-word">麻衣学长 Alan 还在全力开发中...</h1>
        <h1 class="waiting-word"><a href="https://forms.gle/VWwVnBvpgBVsuomN8">校园周边美食投稿</a></h1>

      </div>
    </div>

  </perfect-scrollbar>
</template>

<style scoped>

.center {
  width: 80%;
  margin: 20vh auto;
}

.center .pending-center {
  width: 60%;
  margin: 0 auto;
}

.waiting-word {
  font-size: min(3vw, 2vh);
  color: black;
  display: block;
  text-align: center;
  margin-top: 4vh;
  width: 100%;
}

.waiting-img {
  border-radius: 50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}



</style>