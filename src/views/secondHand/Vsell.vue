<script setup>
import {reactive, ref} from "vue";
import {getDownloadURL, ref as storageRef} from "firebase/storage";
import {storage} from "@/firebase";
import {child, get, getDatabase, ref as databaseRef} from "firebase/database";
import SellBox from "@/components/sell-box.vue";
import {ElMessageBox} from "element-plus";

const heightTemp = ref();
window.addEventListener("resize", ()=> {
  heightTemp.value = (window.innerHeight) + 'px';
  document.getElementById("app").style.height = heightTemp.value;
});
window.addEventListener("DOMContentLoaded", ()=> {
  heightTemp.value = (window.innerHeight) + 'px';
  document.getElementById("app").style.height = heightTemp.value;
});

const sellList = ref();
const db = getDatabase();
const dbRef = databaseRef(db);
get(child(dbRef, 'sell')).then((snapshot)=>{
  if (snapshot.exists()){
    console.log(snapshot.val());
    sellList.value = snapshot.val();
    console.log('sell', sellList.value);

  } else {
    console.log("No data available")
  }
}).catch((error) => {
  console.error(error);
})

const drawer = ref(false)

const form = reactive({
  name:'',
  price:'',
  refer:'',
  date:''
})


</script>

<template>
  <perfect-scrollbar class="fullscreen" :style="height=heightTemp">
    <div class="operation">
      <n-button class="n-button" type="primary"  size="large"  @click="drawer = true">
        我要出二手！
      </n-button>
    </div>
    <div class="sell-show">
      <div class="sell-item" v-for="item in sellList">
        <sell-box :date=item.date :name=item.name :price=item.price :url=item.url :refer=item.refer></sell-box>
      </div>
    </div>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false" size="50vw">
      <p>  二手物品名称：<input v-model="form.name" placeholder="二手物品名称" /></p>
      <p>  二手物品价格：<input v-model="form.price" placeholder="二手物品价格" /></p>
      <p>  联系人：<input v-model="form.refer" placeholder="联系人" /></p>
      <p>  日期：<input v-model="form.date" placeholder="日期" /></p>
    </el-drawer>


  </perfect-scrollbar>
</template>

<style scoped>

.el-drawer p {
  color: black;
  font-size: 2vw;
}

.el-drawer input {
  height: 2vw;
  font-size: 2vw;
}

.operation {
  height: 5vh;
  width: 80%;
  margin: 1vh auto;
}

.operation .n-button {
  width: 100%;
  height: 100%;
  font-size: 2vw;
  margin: 1vh;
  border-radius: 2vw;
}


.sell-show {
  width: 90%;
  margin: 4vh auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
}

.sell-show .sell-item {
  width: 30%;
  height: 25vh;
  margin: 2ch auto;
}

.n-card > .n-card-header {
  font-size: 3vw !important;
}


</style>