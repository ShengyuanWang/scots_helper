<script setup>
import {ref} from "vue";
import {getDownloadURL, ref as storageRef} from "firebase/storage";
import {storage} from "@/firebase";

const heightTemp = ref();
window.addEventListener("resize", ()=> {
  heightTemp.value = (window.innerHeight) + 'px';
  document.getElementById("app").style.height = heightTemp.value;
});
window.addEventListener("DOMContentLoaded", ()=> {
  heightTemp.value = (window.innerHeight) + 'px';
  document.getElementById("app").style.height = heightTemp.value;
})
const finishImage = ref(false)
const groupChatURL = ref("");
getDownloadURL(storageRef(storage, 'groupchatImage/groupchat.jpeg'))
    .then((metadata) => {
      groupChatURL.value = metadata;
      finishImage.value = true;
    })
    .catch((error) => {
      console.log('error occured for loadImage');
    });

</script>

<template>
  <perfect-scrollbar class="fullscreen" :style="height=heightTemp">
    <div class="group" v-if="finishImage">
      <div class="groupImage">
        <img :src="groupChatURL">
      </div>

      <div class="groupInfo">
        <h1 style="color: black">
          ins: macalesterccc
        </h1>
        <h1 style="color: black">
          若二维码过期请找工作人员寻找组织，<a href="https://scots-helper.vercel.app/team">点击链接</a>
        </h1>
      </div>


    </div>

  </perfect-scrollbar>
</template>

<style scoped>


@media screen and (min-width: 800px){
  .group {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .group .groupImage {
    width: 50%;
    margin: 3vh auto;
  }

  .group .groupImage img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
  }

  .group .groupInfo {
    width: 50%;
    margin: auto 0;
  }
}

@media screen and (max-width: 800px){
  .group {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .group .groupImage {
    width: 100%;
    margin: 3vh auto;
  }

  .group .groupImage img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
  }

  .group .groupInfo {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
}


.group .groupInfo h1 {
  font-size: min(5vh, 3vw);
  margin: 1vh;
}
</style>