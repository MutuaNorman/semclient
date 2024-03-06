<script setup>
  import {onMounted, ref} from "vue"
  import Nav1 from "../components/Home/Nav1.vue";
  import Footer from  "../components/Home/Footer.vue";
  import { useAuthStore } from "../stores/Auth"; 
  import axios from "axios"
  import { useRouter } from "vue-router";

  const store = useAuthStore();

  const router = useRouter();

  onMounted(async() => {
    await store.getUser();
  })

  const isMenuVisible = ref(true);   

  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
  } 

  window.innerWidth < 700 ? isMenuVisible.value = false : isMenuVisible.value = true;

  const handleLogout = () => {
    store.logout();
    router.push({name:"login"});
  }

 </script>

<template>
    <div class="dashboard">
      <Nav1 />
      <div class="dashboard-cont">
        <div :class="{ 'dashboard-menu': isMenuVisible, 'no-dashboard-menu full-dashboard-content': !isMenuVisible }">
          <div @click="toggleMenu" class="icon">
            <i class="fa-solid fa-x"></i>
          </div>
          <div class="courses">
            <p v-if="store.user" style="color:red;"> {{ store.user.name }}</p>
            <router-link :to="{name:'bcom'}">Bcom</router-link>
            <router-link :to="{name:'procurement'}">Procurement</router-link>
            <router-link :to="{name:'bent'}">Bent</router-link>          
          </div>
          <div class="lower">
            <router-link class="lower-links" :to="{name: 'profile'}"><i class="fa-solid fa-user"></i> User Profile</router-link>
            <router-link class="lower-links" style="color:var(--white)" :to="{name:'payment'}"><i class="fa-solid fa-cart-shopping"></i> Pay</router-link>
            <button @click="handleLogout" class="lower-links"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</button>
          </div>
        </div>
        <div :class="{ 'dashboard-content': isMenuVisible, 'full-dashboard-content': !isMenuVisible }">
          <div v-if="!isMenuVisible" @click="toggleMenu" class="icon">
            <i class="fa-solid fa-bars"></i>
          </div>
          <div class="main-content">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </template>

<style scoped>
    .dashboard{
        width:100%;
        height:auto;
        /* min-height:100vh; */
        background-image: url("/images/meetings-bg.jpg");
        background-position:center;
        background-size: cover;
        background-attachment: fixed;
        /* border:2px solid red; */
        padding-top: 100px;
        /* overflow-y: auto;
        overflow-x: auto; */
    }
    .dashboard-cont{
        width:100%;
        min-height:90vh;
        /* border:2px solid white; */
        display: flex;
      }
    .dashboard-menu{
        width:250px;
        min-height:90vh;
        /* border:2px solid green; */
        position:relative;
        background-color: var(--custom-blue);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding:20px 0;
    }
    .no-dashboard-menu{
        display: none;
    }
    .dashboard-menu .icon i{
        color:var(--custom-black);
        font-size: 20px;
        cursor:pointer;
        /* background-color: var(--white); */
    }
      .dashboard-content{
        width:calc(100% - 250px);
        height:100%;
        /* border:2px solid yellow; */
        position:relative;
        overflow-y:auto;
        /* overflow-x: scroll; */
      }
    .full-dashboard-content{
        width:100%;
        height:100%;
        /* border:2px solid yellow; */
        position:relative;
        overflow-y:auto;
        /* overflow-x: scroll; */
      }
    .dashboard-menu .icon{
        /* border:2px solid white; */
        position:absolute;
        left:10px;
        top:10px; 
        width:40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--white);
        border-radius: 50%;
        cursor: pointer;
      }
    .dashboard-menu .icon:hover{
        opacity: 0.9;
    }
    .dashboard-menu .lower{
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap:10px;
      padding:0 15%;
    }
    .dashboard-menu .lower button{
      display: inline-block;
      text-align: left;
    }
    .dashboard-menu .lower .lower-links{
      background-color: transparent;
      color:var(--white);
      cursor: pointer;
      font-size: 18px;
      text-decoration: none;
    }
    .dashboard-menu .lower .lower-links:hover{
      text-decoration: underline;
      color: whitesmoke;
    }
    .dashboard-content .icon, .full-dashboard-content .icon{
        /* border:2px solid white; */
        position:absolute;
        left:10px;
        top:10px;
        width:40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--white);
        border-radius: 50%;
        cursor: pointer;
        position:fixed;
        top:110px;
    }
    .dashboard-content .icon, .full-dashboard-content .icon:hover{
        opacity:0.9;
    }
    
    .dashboard-content .icon i{
        color:var(--custom-black);
        font-size: 20px;
        cursor:pointer;
      }
    .full-dashboard-content .icon i{
        color:var(--custom-black);
        font-size: 20px;
        cursor:pointer;
    }
    .courses{
        width:100%;
        display: flex;
        flex-direction: column;
        padding:50px 20px;
        /* border:2px solid white; */
        align-items: center;
        gap:30px;
    }
    .courses a{
        background-color: var(--white);
        width:85%;
        text-align: center;
        padding:5px 0;
        border-radius: 20px;
        font-weight: 800;
        transition: 150ms ease-in-out;
        text-decoration: none;
        color:var(--custom-black);
    }
    .courses a:hover{
        opacity:0.9;
    }
    .main-content{
        /* border:2px solid white; */
        width:100%;
        height: 100%;
        padding:50px;
    }
</style>