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
        url: 'https://firebasestorage.googleapis.com/v0/b/ccc-program.appspot.com/o/icons%2Ftrade.png?alt=media&token=ac9170ff-5343-4bb5-a152-a5bfe4c93390'
  },
  apartment:{
    name: '租房信息',
        url: 'https://firebasestorage.googleapis.com/v0/b/ccc-program.appspot.com/o/icons%2Fapartment.png?alt=media&token=2e272a12-fc7e-42a2-b25e-68a684be1f63'
  },
  topics:{
    name: '话题讨论',
        url: 'https://firebasestorage.googleapis.com/v0/b/ccc-program.appspot.com/o/icons%2Ftopics.png?alt=media&token=2fcc2dce-de36-442a-8947-b6f3968c1b1a'
  },
  booklet:{
    name: '新生手册',
        url: 'https://firebasestorage.googleapis.com/v0/b/ccc-program.appspot.com/o/icons%2Fbooklet.png?alt=media&token=ac384bd7-e682-40e6-9cdf-6efdc132a537'
  },
  groupchat:{
    name: '官方社群',
        url: 'https://firebasestorage.googleapis.com/v0/b/ccc-program.appspot.com/o/icons%2Fgroupchat.png?alt=media&token=c6db5159-a6ac-4bed-8198-958c6142552b'
  },
  plane:{
    name: '新生接机',
        url: 'https://firebasestorage.googleapis.com/v0/b/ccc-program.appspot.com/o/icons%2Fplane.png?alt=media&token=db01b4b2-3418-4005-95d1-b65568edd05f'
  },
  location:{
    name: '校园周边',
        url: 'https://firebasestorage.googleapis.com/v0/b/ccc-program.appspot.com/o/icons%2Flocation.png?alt=media&token=86006583-0afc-4140-a235-c2213e1a1553'
  },
  coins:{
    name: '开发团队',
        url: 'https://firebasestorage.googleapis.com/v0/b/ccc-program.appspot.com/o/icons%2Fcoins.png?alt=media&token=56eb01f9-d5ee-46bc-bbeb-7fb07e4fed9f'
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

// for (const item in banner.value) {
//   console.log('/icons/'+item+'.png')
//   getDownloadURL(storageRef(storage, 'icons/'+item+'.png'))
//       .then((metadata) => {
//         console.log(banner.value.item)
//         console.log(metadata);
//       })
//       .catch((error) => {
//         console.log('error occured for loadImage');
//       });
// }
// getDownloadURL(storageRef(storage, 'icons/'+'apartment'+'.png'))
//     .then((metadata) => {
//       banner.value.apartment.link = metadata;
//       console.log(metadata);
//     })
//     .catch((error) => {
//       console.log('error occured for loadImage');
//     });



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
      <img :src=item.url style="width: 8vw; position: absolute; left: 28%; margin-top: 1vh;" :alt="item.name">
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