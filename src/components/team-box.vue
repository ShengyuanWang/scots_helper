<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
// default import from firebase
import { storage } from '/src/firebase.js'
import { ref as storageRef, getMetadata, getDownloadURL, listAll } from "firebase/storage";
import { getDatabase, ref as databaseRef, onValue, child, get} from "firebase/database";
const router = useRouter();
const props = defineProps({
  url: String, //人员照片 url地址
  name: String, //个人介绍
  info: String,
  position: String, //日期
})
const url = ref("");
getDownloadURL(storageRef(storage, '/teamImage/'+props.url))
    .then((metadata) => {
      console.log(metadata);
      url.value=metadata;
    })
    .catch((error) => {
      console.log('error occured for loadImage');
    });





</script>

<template>
  <div class="info">
    <div class="img">
      <img :src="url" style="width: 100%;; border-radius: 10%" alt="error">
    </div>
    <div class="detail">
      <p class="infoName">{{props.name}}</p>
      <p class="infoP">{{props.info}}</p>
      <p class="position">{{props.position}}</p>
    </div>

  </div>
</template>

<style scoped>
.info {
  width: 100%;
  height: 100%;
  margin: 0.5vh;
  background-color: #86c3e3;
  display: flex;
  position: relative;
  border-radius: 30px;
}

@media screen and (max-width: 800px){
  .info:hover {
    border-color: #194167;
    border-style: groove;
    border-width: 2px;
    box-shadow: 1px -2px #2c3e50;
  }
}

@media screen and (min-width: 800px){
  .info:hover {
    border-color: #194167;
    border-style: groove;
    border-width: 4px;
    box-shadow: 4px -4px #2c3e50;
  }
}

.info .img {
  display: block;
  width: 35%;
  margin: auto 1vw;
  padding: 2%;
}



.info .detail .infoName{
  color: black;
  font-size: max(1.3vw, 2vh);
  font-weight: bold;
}

.info .detail .infoP{
  color: black;
  font-size: min(1.3vw, 1.5vh);
  font-weight: bold;
}




.info .detail .position{
  color: black;
  font-size: max(1vw, 12px);
  font-weight: bold;
  position: absolute;
  bottom: 5%;
  right: 5%;
}

.info .detail {
  width: 60%;
  margin: 0.5vh auto;
  padding: 5%;
  border-radius: 10px;
}
</style>