<script setup>
import {ChatLineSquare} from "@element-plus/icons-vue";
import ActivityBox from "@/components/activity-box.vue";
import {ref} from "vue";
// default import from firebase
import { storage } from '/src/firebase.js'
import { ref as storageRef, getMetadata, getDownloadURL, listAll } from "firebase/storage";

const banner = ref({
  trade:{
    name: '二手闲置',
        link: '/src/assets/icons/grids/trade.png',
        url: '/pages/index/secondHand/secondHand'
  },
  apartment:{
    name: '租房信息',
        link: '/src/assets/icons/grids/apartment.png',
        url: '/pages/index/rent/rent'
  },
  topics:{
    name: '话题讨论',
        link: '/src/assets/icons/grids/topics.png',
        url: '/pages/index/topics/topics'
  },
  booklet:{
    name: '新生手册',
        link: '/src/assets/icons/grids/booklet.png',
        url: '/pages/index/guideBook/guideBook'
  },
  groupchat:{
    name: '官方社群',
        link: '/src/assets/icons/grids/group-chat.png',
        url: '/pages/index/groupChat/groupChat'
  },
  plane:{
    name: '新生接机',
        link: '/src/assets/icons/grids/plane.png',
        url: '/pages/index/pickup/pickup'
  },
  location:{
    name: '校园周边',
        link: '/src/assets/icons/grids/location.png',
        url: '/pages/index/campus/campus'
  },
  coins:{
    name: '开发团队',
        link: '/src/assets/icons/grids/coins.png',
        url: '/pages/index/about/about'
  }
})

// ROLLING BANNER
const rollingBannerURL = ref([]);
const listRef = storageRef(storage, 'bannerImage');

// Find all the prefixes and items.
listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // load image according to liquid name
        getDownloadURL(storageRef(storage, itemRef.fullPath))
            .then((metadata) => {
              rollingBannerURL.value.push(metadata);
              console.log(rollingBannerURL);
            })
            .catch((error) => {
              console.log('error occured for loadImage');
            });
      });
    }).catch((error) => {
  // Uh-oh, an error occurred!
});



</script>

<template>
<perfect-scrollbar class="fullscreen">
  <div class="header"><h2>MAC CCC 校园小助手</h2></div>
  <div class="rolling-banner">
    <n-carousel autoplay centered-slides dot-placement="bottom" draggable keyboard>
      <img v-for="item in rollingBannerURL" class="carousel-img" :src="item" alt="error">
    </n-carousel>
  </div>
  <div class="select-bar">
    <div v-for="item in banner" class="select-item">
      <img :src=item.link style="width: 8vw; position: absolute; left: 28%; margin-top: 1vh;" :alt="item.name">
      <p>{{item.name}}</p>
    </div>
  </div>
  <div class="scroll-activity">
    <h2>校园活动</h2>
    <activity-box v-for="v in [1, 2, 3]" url="https://avatars.githubusercontent.com/u/78770936?v=4" abstract="hello world 我爱麻衣学姐" date="2024-01-01">

    </activity-box>
  </div>



  
</perfect-scrollbar>

</template>

<style scoped>
@media screen and (max-width: 800px) {
  .header h2 {
    color: black;
    font-weight: bolder;
    text-align: center;

  }
  .carousel-img {
    width: 98%;
    height: 20vh;
    object-fit: fill;
    border-radius: 4vw;
    margin: auto;
  }
  .rolling-banner {
    width: 98%;
    height: 20vh;
    margin: auto;
    border-radius: 4vw;
  }
  .select-bar {
    width: 90%;
    height:20vh;
    margin: 2vh auto auto;
    position: relative;
    padding: 2vw;
    background-color: #2c3e50;
    border-radius: 5vw;

  }
  .select-bar .select-item {
    background-color: red;
    position: relative;
    float: left;
    height: 8vh;
    width: 22%;
    margin: 0.6vh 1.2vw;
    color: black;
    font-weight: bolder;
    border-radius: 2vw;
  }



  .select-bar .select-item p {
    width: 100%;
    font-size: 2.8vw;
    bottom: 3px;
    left: 23%;
    position: absolute;
  }

  .scroll-activity {
    width: 100%;
    margin-top: 2vh;
  }
  .scroll-activity h2 {
    display: inline-block;
    padding-left: 5vw;
    font-size: 5vw;
    color: black;
  }



}

@media screen and (min-width: 800px) {

}



</style>