<script setup>
import {ref} from "vue";
import {getDownloadURL, ref as storageRef} from "firebase/storage";
import {storage} from "@/firebase";
import {child, get, getDatabase, ref as databaseRef} from "firebase/database";
import LocationBox from "@/components/location-box.vue";

const heightTemp = ref();
window.addEventListener("resize", ()=> {
  heightTemp.value = (window.innerHeight) + 'px';
  document.getElementById("app").style.height = heightTemp.value;
});
window.addEventListener("DOMContentLoaded", ()=> {
  heightTemp.value = (window.innerHeight) + 'px';
  document.getElementById("app").style.height = heightTemp.value;
});

const locationList = ref();
const db = getDatabase();
const dbRef = databaseRef(db);
get(child(dbRef, 'location')).then((snapshot)=>{
  if (snapshot.exists()){
    console.log(snapshot.val());
    locationList.value = snapshot.val();
    console.log('location', locationList.value);

  } else {
    console.log("No data available")
  }
}).catch((error) => {
  console.error(error);
})

</script>

<template>
  <perfect-scrollbar class="fullscreen" :style="height=heightTemp">
    <div class="location-show">
      <div class="location-item" v-for="item in locationList">
        <location-box :name=item.name :url=item.url :location=item.location></location-box>
      </div>
    </div>
  </perfect-scrollbar>
</template>

<style scoped>

.location-show {
  width: 90%;
  margin: 4vh auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
}

.location-show .location-item {
  width: 30%;
  height: 25vh;
  margin: 2vh;
}





</style>