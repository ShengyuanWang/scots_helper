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
    <img :src="url" style="width: 100%; height: 100%" alt="error">
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
  margin: 0.5vh 5vw 0.5vh 5vw;
  background-color: grey;
  display: flex;
  position: relative;
  border-radius: 10px;
}
.info .img {
  width: 35%;
  margin: 1% auto;
  background-color: red;
  padding: 2%;
  border-radius: 10px;
}



.info .detail .abstract{
  color: black;
  font-size: 1.3vw;
  font-weight: bold;

}

.info .detail .date{
  color: black;
  font-size: 1vw;
  font-weight: bold;
  position: absolute;
  bottom: 5%;
  right: 5%;
}

.info .detail {
  width: 60%;
  margin: 0.5vh auto;
  background-color: green;
  padding: 5%;
  border-radius: 10px;
}
</style>