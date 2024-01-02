<script setup>
import {ref} from 'vue';
const props = defineProps({
  url: String, //图片url地址
  abstract: String, //简略介绍
  date: String, //日期
})
</script>

<template>
<div class="info">
  <div class="img">
    <n-image :src="props.url" width="100%"></n-image>
  </div>
  <div class="detail">
    <p class="abstract">{{props.abstract}}</p>

    <p class="date">{{props.date}}</p>
  </div>

</div>
</template>

<style scoped>
.info {
  width: 90%;
  height: 18vh;
  margin: 0.5vh 5vw 0.5vh 5vw;
  background-color: grey;
  display: flex;
  position: relative;
  border-radius: 10px;
}
.info .img {
  width: 35%;
  margin: 1vh auto;
  background-color: red;
  padding: 2%;
  border-radius: 10px;
}



.info .detail .abstract{
  color: black;
  font-size: 3vw;
  font-weight: bold;

}

.info .detail .date{
  color: black;
  font-size: 3vw;
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