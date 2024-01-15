<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
// default import from firebase
import { storage } from '/src/firebase.js'
import { ref as storageRef, getMetadata, getDownloadURL, listAll } from "firebase/storage";
import { getDatabase, ref as databaseRef, onValue, child, get} from "firebase/database";
const router = useRouter();
const props = defineProps({
  url: String, //图片url地址
  abstract: String, //简略介绍
  date: String, //日期
  link: String //跳转地址
})
const url = ref("");
getDownloadURL(storageRef(storage, '/activityImage/'+props.url))
    .then((metadata) => {
     console.log(metadata);
     url.value=metadata;

    })
    .catch((error) => {
      console.log('error occured for loadImage');
    });



const clickInfo = () =>{
  window.open(props.link, '_blank')
}

</script>

<template>
<div class="info" @click="clickInfo">
  <div class="img">
    <img :src="url" style="max-width: 100%; max-height: 100%; border-radius: 10%" alt="error">
  </div>
  <div class="detail">
    <p class="abstract">{{props.abstract}}</p>
    <p class="date">{{props.date}}</p>
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
    background-color: #bdddf5;
  }
}

@media screen and (min-width: 800px){
  .info:hover {
    background-color: #bdddf5;
  }
}

.info .img {
  width: 35%;
  height: 80%;
  margin: 1% auto;
  padding: 2%;
}



.info .detail .abstract{
  color: black;
  font-size: max(1.3vw, 10px);
  font-weight: bold;
}



.info .detail .date{
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