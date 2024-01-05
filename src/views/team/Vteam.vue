<script setup>
import {ref} from "vue";
import {getDownloadURL, ref as storageRef} from "firebase/storage";
import {storage} from "@/firebase";
import TeamBox from "@/components/team-box.vue";
import {child, get, getDatabase, ref as databaseRef} from "firebase/database";

const heightTemp = ref();
window.addEventListener("resize", ()=> {
  heightTemp.value = (window.innerHeight) + 'px';
  document.getElementById("app").style.height = heightTemp.value;
});
window.addEventListener("DOMContentLoaded", ()=> {
  heightTemp.value = (window.innerHeight) + 'px';
  document.getElementById("app").style.height = heightTemp.value;
});

const teamList = ref();
const db = getDatabase();
const dbRef = databaseRef(db);
get(child(dbRef, 'team')).then((snapshot)=>{
  if (snapshot.exists()){
    console.log(snapshot.val());
    teamList.value = snapshot.val();
    console.log('team', teamList.value);

  } else {
    console.log("No data available")
  }
}).catch((error) => {
  console.error(error);
})

</script>

<template>
  <perfect-scrollbar class="fullscreen" :style="height=heightTemp">
    <div class="team-show">
      <div class="team-item" v-for="item in teamList">
        <team-box :position=item.position :name=item.name :info=item.info :url=item.url></team-box>
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