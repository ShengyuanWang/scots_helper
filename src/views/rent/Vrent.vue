<script setup>
import {reactive, ref} from "vue";
import {getDownloadURL, getStorage, ref as storageRef, uploadBytes, uploadBytesResumable} from "firebase/storage";
import {storage} from "@/firebase";
import {child, get, getDatabase, ref as databaseRef, set} from "firebase/database";
import SellBox from "@/components/sell-box.vue";
import {ElMessageBox} from "element-plus";
import { UploadFilled } from '@element-plus/icons-vue'


const heightTemp = ref();
window.addEventListener("resize", ()=> {
  heightTemp.value = (window.innerHeight) + 'px';
  document.getElementById("app").style.height = heightTemp.value;
});
window.addEventListener("DOMContentLoaded", ()=> {
  heightTemp.value = (window.innerHeight) + 'px';
  document.getElementById("app").style.height = heightTemp.value;
});

const rentList = ref();
const db = getDatabase();
const dbRef = databaseRef(db);
get(child(dbRef, 'rent')).then((snapshot)=>{
  if (snapshot.exists()){
    console.log(snapshot.val());
    rentList.value = snapshot.val();
    console.log('sell', rentList.value);

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

const imageUrl = ref("");
const imageName = ref("");

const uploadImage = async (event) => {
  const fileList = (event.target);
  if(fileList.files === null) return;

  const file = fileList.files[0];
  if(file.size === 0) return;

  const storage = getStorage();
  const imageRef = storageRef(storage, `rent/${file.name}`);
  imageName.value = file.name;

  try {
    const uploadTask = uploadBytesResumable(imageRef, file);
    await uploadTask;
    alert('上傳成功');
    const url = await getDownloadURL(imageRef);
    imageUrl.value = url;
  } catch (error) {
    alert('上傳失敗');
  }
};

const writeUserData = (userId, name, price, refer, date, url) => {
  console.log('click write')
  const db = getDatabase();
  set(databaseRef(db, 'rent/' + userId), {
    name: name,
    price: price,
    refer: refer,
    date: date,
    url: url
  });
}

const size = ref('50vw');
if (innerWidth < 800) {
  size.value = '80vw'
}



</script>

<template>
  <perfect-scrollbar class="fullscreen" :style="height=heightTemp">
    <div class="operation">
      <n-button class="n-button" type="primary"  size="large"  @click="drawer = true">
        我要出转租！
      </n-button>
    </div>
    <div class="sell-show">
      <div class="sell-item" v-for="item in rentList">
        <sell-box :date=item.date :name=item.name :price=item.price :url=item.url :refer=item.refer></sell-box>
      </div>
    </div>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false" :size=size>
      <p>  地点介绍：<input v-model="form.name" placeholder="地点介绍" /></p>
      <p>  房租价格：<input v-model="form.price" placeholder="房租价格" /></p>
      <p>  联系人：<input v-model="form.refer" placeholder="联系人" /></p>
      <p>  地理位置：<input v-model="form.date" placeholder="地理位置" /></p>
      <p>  图片：</p>
      <input type="file" class="inputFile" ref="imageData" accept="image/*" @change="uploadImage"/>
      <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" class="imageData">
      <n-button type="success" class="submit" @click="writeUserData(form.name, form.name, form.price, form.refer, form.date, imageName)">
        Submit
      </n-button>
    </el-drawer>


  </perfect-scrollbar>
</template>

<style scoped>
.inputFile {
  margin: 2vw;
}

.imageData {
  display: block;
  width: 40%;
  margin-left: 4vw;
}

.el-drawer p {
  color: black;
  font-size: 2vw;
  margin: 2vw;
}

.el-drawer input {
  height: 4vw;
  font-size: 2vw;
  color: black;
}

.el-drawer .submit {
  width: 10vw;
  height: 4vh;
  font-size: min(3vh, 2vw);
  padding: 0.5vh;
  border-radius: 10px;
  margin-left: 2vw;
  margin-top: 2vh;
}

.uploadButton {
  height: 2vw;
  font-size: 2vw;
  margin-left: 2vw;
}

/deep/ .el-upload__tip {
  font-size: 1vw;
  margin-left: 2vw;
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
  margin: 2ch;
}

.n-card > .n-card-header {
  font-size: 3vw !important;
}

@media screen and (max-width: 800px){
  .sell-show .sell-item {
    width: 100%;
    height: 20vh;
    margin: 2vh;
  }

  .imageData {
    display: block;
    width: 60%;
    margin-left: 4vw;
  }
}

</style>