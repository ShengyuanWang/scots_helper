<script setup>
import {ref} from "vue";
import {getDownloadURL, ref as storageRef} from "firebase/storage";
import {storage} from "@/firebase";
import TeamBox from "@/components/team-box.vue";

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
    <div class="team-show">
      <div class="team-item" v-for="i in [1, 2, 3]">
        <team-box></team-box>
      </div>
    </div>
  </perfect-scrollbar>
</template>

<style scoped>

.team-show {
  width: 90%;
  margin: 4vh auto;
  display: flex;
}

.team-show .team-item {
  width: 30%;
  height: 25vh;
  margin: 2ch auto;
}



</style>