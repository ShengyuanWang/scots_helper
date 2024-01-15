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
  detail: String,
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
      <img :src="url" style="max-width: 100%; max-height: 100%; border-radius: 10%" alt="error">
    </div>
    <div class="detail">
      <div class="upper">
        <p class="infoName">{{props.name}}</p>
        <p class="infoDetail">{{ props.detail}}</p>

      </div>
      <div class="lower">
        <p class="infoPrice">{{props.price}}</p>
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
    background-color: #bdddf5;
  }

  .info .detail .upper .infoName{
    color: black;
    font-size: max(1.3vw, 1.8vh);
    font-weight: bold;
  }

  .info .detail .lower .infoPrice{
    color: black;
    font-size: max(1.3vw, 1.5vh);
    font-weight: bold;
    width: 50%;
    display: inline;
  }

  .info .detail .upper .infoDetail {
    color: black;
    font-size: max(1.3vw, 1.2vh);
    font-weight: bold;
  }


  .info .detail .lower .date{
    color: black;
    font-size: max(1vw, 10px);
    font-weight: bold;
    position: absolute;
    bottom: 3%;
    right: 0%;
  }

  .info .detail .lower .infoRefer{
    color: black;
    font-size: max(1vw, 10px);
    font-weight: bold;
    margin: 1px;
    position: absolute;
    right: 0;
    top: 0;
  }
}

@media screen and (min-width: 800px){
  .info:hover {
    background-color: #bdddf5;
  }

  .info .detail .upper .infoName{
    color: black;
    font-size: max(1.3vw, 2vh);
    font-weight: bold;
  }

  .info .detail .lower .infoPrice{
    color: black;
    font-size: min(1.3vw, 1.5vh);
    font-weight: bold;
    width: 50%;
    display: inline;
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
    bottom: 3%;
    right: 0%;
  }

  .info .detail .lower .infoRefer{
    color: black;
    font-size: max(1vw, 12px);
    font-weight: bold;
    margin: 1px;
    position: absolute;
    right: 0;
    top: 0;
  }
}

.info .img {
  display: block;
  width: 35%;
  height: 80%;
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




.info .detail {
  width: 60%;
  margin: 0.5vh auto;
  padding: 5%;
  border-radius: 10px;
}

</style>