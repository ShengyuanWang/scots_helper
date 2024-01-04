<script setup>
import {ChatLineSquare} from "@element-plus/icons-vue";
import ActivityBox from "@/components/activity-box.vue";
import {ref} from "vue";
// default import from firebase
import { storage } from '/src/firebase.js'
import { ref as storageRef, getMetadata, getDownloadURL, listAll } from "firebase/storage";
import { getDatabase, ref as databaseRef, onValue, child, get} from "firebase/database";
import { useWindowSize } from 'vue-window-size';

const heightTemp = ref();
window.addEventListener("resize", ()=> {
  heightTemp.value = (window.innerHeight) + 'px';
  document.getElementById("app").style.height = heightTemp.value;
});
window.addEventListener("DOMContentLoaded", ()=> {
  heightTemp.value = (window.innerHeight) + 'px';
  document.getElementById("app").style.height = heightTemp.value;
})







const banner = ref({
  trade:{
    name: '二手闲置',
    url: 'https://firebasestorage.googleapis.com/v0/b/ccc-program.appspot.com/o/icons%2Ftrade.png?alt=media&token=ac9170ff-5343-4bb5-a152-a5bfe4c93390',
    link: "#"
  },
  apartment:{
    name: '租房信息',
    url: 'https://firebasestorage.googleapis.com/v0/b/ccc-program.appspot.com/o/icons%2Fapartment.png?alt=media&token=2e272a12-fc7e-42a2-b25e-68a684be1f63',
    link: "#"
  },
  topics:{
    name: '话题讨论',
    url: 'https://firebasestorage.googleapis.com/v0/b/ccc-program.appspot.com/o/icons%2Ftopics.png?alt=media&token=2fcc2dce-de36-442a-8947-b6f3968c1b1a',
    link: "#"
  },
  booklet:{
    name: '新生手册',
    url: 'https://firebasestorage.googleapis.com/v0/b/ccc-program.appspot.com/o/icons%2Fbooklet.png?alt=media&token=ac384bd7-e682-40e6-9cdf-6efdc132a537',
    link: "https://www.macalester.edu/isp/wp-content/uploads/sites/95/2023/06/ISH-2023-24.pdf"
  },
  groupchat:{
    name: '官方社群',
    url: 'https://firebasestorage.googleapis.com/v0/b/ccc-program.appspot.com/o/icons%2Fgroupchat.png?alt=media&token=c6db5159-a6ac-4bed-8198-958c6142552b',
    link: "#"
  },
  plane:{
    name: '新生接机',
    url: 'https://firebasestorage.googleapis.com/v0/b/ccc-program.appspot.com/o/icons%2Fplane.png?alt=media&token=db01b4b2-3418-4005-95d1-b65568edd05f',
    link: "#"
  },
  location:{
    name: '校园周边',
    url: 'https://firebasestorage.googleapis.com/v0/b/ccc-program.appspot.com/o/icons%2Flocation.png?alt=media&token=86006583-0afc-4140-a235-c2213e1a1553',
    link: "#"
  },
  coins:{
    name: '开发团队',
    url: 'https://firebasestorage.googleapis.com/v0/b/ccc-program.appspot.com/o/icons%2Fcoins.png?alt=media&token=56eb01f9-d5ee-46bc-bbeb-7fb07e4fed9f',
    link: "#"
  }
})
const { width, height } = useWindowSize();

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

const activityList = ref();
const db = getDatabase();
const dbRef = databaseRef(db);
get(child(dbRef, 'activity')).then((snapshot)=>{
  if (snapshot.exists()){
    console.log(snapshot.val());
    activityList.value = snapshot.val();
    console.log('activity', activityList.value);

  } else {
    console.log("No data available")
  }
}).catch((error) => {
  console.error(error);
})

const handleItemClick = (link) => {
  window.open(link, '_blank')
}




</script>

<template>
<perfect-scrollbar class="fullscreen" :style="height=heightTemp">
  <div class="header"><h2>Scots 小助手</h2></div>
  <div class="rolling-banner" v-show="width < 800">
    <n-carousel autoplay centered-slides dot-placement="bottom" draggable keyboard>
      <img v-for="item in rollingBannerURL" class="carousel-img" :src="item" alt="error">
    </n-carousel>
  </div>
  <div class="select-bar">
    <div v-for="item in banner" class="select-item" role="button" @click="handleItemClick(item.link)">
      <img :src=item.url :alt="item.name" >
      <p>{{item.name}}</p>
    </div>
  </div>
  <div class="scroll-activity">
    <h2 v-show="width < 800">校园活动</h2>
    <div class="flex-item" v-for="item in activityList" role="button">
      <activity-box :url=item.imageName :abstract=item.detail :date=item.date :link=item.actLink>
      </activity-box>
    </div>




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
    border-radius: 5vw;
  }
  .select-bar .select-item {
    position: relative;
    float: left;
    height: 8vh;
    width: 22%;
    margin: 0.6vh 1.2vw;
    color: black;
    font-weight: bolder;
    border-radius: 2vw;
  }

  .select-bar .select-item:hover {
    border-color: #194167;
    border-style: groove;
    border-width: 2px;
    box-shadow: 1px -2px #2c3e50;
  }

  .select-bar .select-item img {
    width: 8vw;
    position: absolute;
    left: 28%;
    margin-top: 1vh;
    margin-bottom: 1vh;
  }



  .select-bar .select-item p {
    width: 100%;
    font-size: 2.8vw;
    bottom: 2px;
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
    text-shadow: 5px 1px 2px rgb(0, 0, 0, 20%);

  }

  .scroll-activity .flex-item {
    width: 90%;
    margin: 2vh auto;

  }



}

@media screen and (min-width: 800px) {
  .header {
    margin-top: 3vh;
    height: 10vh;
    margin-bottom: 2vh;
  }
  .header h2 {
    color: black;
    font-weight: bolder;
    text-align: center;
    font-size: 8vh;
  }
  .carousel-img {
    height: 20vh;
    object-fit: fill;
    border-radius: 4vw;
    margin: auto;
  }
  .rolling-banner {
    height: 20vh;
    margin: auto;
    border-radius: 4vw;
  }
  .select-bar {
    width: 75vw;
    height:24vh;
    margin: 2vh auto auto;
    position: relative;
    padding: 2vw;
    border-radius: 5vw;

  }
  .select-bar .select-item {
    position: relative;
    float: left;
    height: 8vh;
    width: 8vw;
    margin: 0.6vh 4vw;
    color: black;
    font-weight: bolder;
    border-radius: 1vw;
  }

  .select-bar .select-item:hover {

    border-color: #194167;
    border-style: groove;
    border-width: 4px;
    box-shadow: 4px -4px #2c3e50;

  }

  .select-bar .select-item img {
    width: 2vw;
    position: absolute;
    left: 37%;
    margin-top: 1vh;
    margin-bottom: 1vh;
  }

  .select-bar .select-item p {
    width: 100%;
    font-size: 1vw;
    bottom: 3px;
    left: 26%;
    position: absolute;
  }

  .scroll-activity {
    width: 90%;
    margin: 2vh auto;
    display: flex;
    flex-flow: wrap;
  }

  .scroll-activity .flex-item {
    width: 30%;
    margin: 1vw 1vw;
  }


}



</style>