<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
// default import from firebase
import { storage } from '/src/firebase.js'
import { ref as storageRef, getMetadata, getDownloadURL, listAll } from "firebase/storage";
import { getDatabase, ref as databaseRef, onValue, child, get} from "firebase/database";
const router = useRouter();
const props = defineProps({
  url: String, //物品照片 url地址
  name: String, //物品名称
  price: String, //物品价格
  refer: String, //联系人，电话
  date: String, //日期
})

const url = ref("");
getDownloadURL(storageRef(storage, '/sellImage/'+props.url))
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
      <div class="upper">
        <p class="infoName">{{props.name}}</p>
        <p class="infoDetail">99新</p>
        <p class="infoPrice">{{props.price}}</p>
      </div>
      <div class="lower">
        <p class="infoRefer">{{props.refer}}</p>
        <p class="date">{{props.date}}</p>
      </div>

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

.info .detail .upper {
  height: 80%;
}

.info .detail .lower {
  height: 30%;
  position: relative;
}


.info .detail .upper .infoName{
  color: black;
  font-size: max(1.3vw, 2vh);
  font-weight: bold;
}

.info .detail .upper .infoPrice{
  color: black;
  font-size: min(1.3vw, 1.5vh);
  font-weight: bold;
}

.info .detail .upper .infoDetail {
  color: black;
  font-size: min(1.3vw, 1.5vh);
  font-weight: bold;
}




.info .detail .lower .date{
  color: black;
  font-size: max(1vw, 12px);
  font-weight: bold;
  position: absolute;
  bottom: 10%;
  right: 0%;
}

.info .detail .lower .infoRefer{
  color: black;
  font-size: max(1vw, 12px);
  font-weight: bold;
  margin: 2px;
  position: absolute;
  right: 0;
}

.info .detail {
  width: 60%;
  margin: 0.5vh auto;
  padding: 5%;
  border-radius: 10px;
}

</style>