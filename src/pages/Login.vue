<script setup>
import Nav1 from "../components/Home/Nav1.vue";
import Footer from  "../components/Home/Footer.vue";
import Loader from "../components/Loader.vue"
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios'
import { useAuthStore } from "../stores/Auth";

const store = useAuthStore();

onMounted(async() => {
  await store.getUser();
})

const router = useRouter();

const showPassword = ref(false);

const isLoading = ref(false);

const togglePassword = () => {
      const password = document.getElementById('password');
      
      showPassword.value = !showPassword.value;

      if (showPassword.value) {
        password.type = 'text';
      } else {
        password.type = 'password';
      }
};

onMounted(() => {
  const checkbox = document.getElementById('showPasswordCheckbox');
  checkbox.addEventListener('change', togglePassword);
});

const logData = reactive({
  email : "",
  password: ""
});

const errorMessage = ref("");

const handleLogin = async() =>{
  try{
    isLoading.value = true; 

    const response = await axios.post("auth/jwt/create", logData);
    const { access, refresh } = response.data;

    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
       
    await store.getUser();

    // console.log(store.user);

    await router.push({name:'dashboard'})
       
    isLoading.value = false;
  }catch(error){
    isLoading.value = false;
    errorMessage.value = "Invalid email or password";
  }
}

</script>

<template>
  <div class="register-cont">
    <Nav1 />
    <div class="reg-div">
      <div class="reg-image">
        <img src="/images/apply-bg.jpg" alt="" />
      </div>
      <div class="reg-form">
        <form @submit.prevent="handleLogin">
          <div class="reg-title">
            <h2>Login Back.</h2>
            <div class="reg-line"></div>
            <Loader v-if="isLoading"></Loader>
            <div v-if="errorMessage" class="errors">
                <i style="color:var(--custom-red)">{{ errorMessage }}</i>
            </div>
          </div>
          <div class="input">
            <input type="email" v-model="logData.email" placeholder="your Email*..." autofocus />
          </div>
          <div class="input">
            <input id="password" v-model="logData.password" v-bind:type="showPassword ? 'text' : 'password'" placeholder="Password" />
          </div>
          <div class="input input-check">
            <input type="checkbox" id="showPasswordCheckbox" />
            <label for="showPasswordCheckbox" @change="togglePassword">{{ showPassword ? 'Hide Password' : 'Show Password' }}</label>
          </div>
          <div class="input input-submit">
            <input type="submit" />
          </div>
          <div class="have-account">
            <router-link style="color:var(--custom-blue); font-weight: 800;" :to="{name:'forgot-password'}" >Forgot Password?</router-link>
            <p>Don't have an Account? <router-link :to="{ name: 'register' }">Register</router-link></p>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </div>
</template>
  
  <style scoped>
      .register-cont{
          width:100%;
          min-height:100vh;
          background-image: url("/images/meetings-bg.jpg");
          background-size: cover;
          background-position: center;
          /* border:2px solid white; */
          padding-top: 100px;
          overflow: hidden;
      }
      .reg-div{
          width:100%;
          height:calc(100vh - 100px);
          /* border:2px solid red; */
          display: flex;
      }
      .reg-div .reg-image{
          width:50%;
          height:100%;
          /* border:2px solid white; */
      }
      .reg-div .reg-image img{
          width:100%;
          height: 100%;
          object-fit: cover;
      }
      .reg-div .reg-form{
          width:50%;
          height:100%;
          /* border:2px solid white; */
          position: relative;
      }
      .reg-div .reg-form form{
          width:70%;
          /* height:70%; */
          /* border:2px solid green; */
          position: absolute;
          top:50%;
          left:50%;
          transform: translate(-50%, -50%);
          background-color: var(--white);
          border-radius: 20px;
          padding:30px;
          display: flex;
          flex-direction: column;
          gap:22px;
      }
      .reg-div .reg-form form .reg-title{
          display: flex;
          flex-direction: column;
          gap:20px;
      }
      .reg-div .reg-form form .reg-title h2{
          text-transform: uppercase;
          font-weight: 800;
          font-size: 30px;
      }
      .reg-div .reg-form form .reg-title .reg-line{
          width:100%;
          height:1px;
          background-color: var(--custom-black);
      }
      /* .reg-div .reg-form form .input{
          border: 2px solid;
      } */
      .reg-div .reg-form form .input input{
          width:100%;
          height:45px;
          border-radius: 20px;
          padding:0 10px;
          background-color: var(--custom-gray);
          color:var(--custom-black);
          font-size:17px;
          text-align: center;
      }
      .reg-div .reg-form form .input input::placeholder{
          text-transform: uppercase;
          color:var(--custom-black);
      }
      .reg-div .reg-form form .input-check{
          display: flex;
          gap:20px;
          align-items: center;
      }
      .reg-div .reg-form form .input-check input{
          height:20px;
          width:20px;
          cursor: pointer;
      }
      .reg-div .reg-form form .input-submit input[type="submit"]{
          color:var(--white);
          background-color: var(--custom-blue);
          font-size: 18px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background-color 150ms ease-in-out;
      }
      .reg-div .reg-form form .input-submit input[type="submit"]:hover{
            background-color: transparent;
            border:1px solid var(--custom-blue);
            color:var(--custom-blue);
            font-weight: 800;
        }
      .have-account{
          text-align: center;
      }
      .have-account p{
          font-weight: 800;
      }
      .have-account p a{
          color:var(--custom-blue);
      }
      
  
  
      @media(max-width:631px){
          .reg-div .reg-form form .reg-title h2{
              font-size: 20px;
          }
          .reg-div{
              /* background-image: url("/images/apply-bg.jpg"); */
              background-image: url("/images/meetings-bg.jpg");
          }
          .reg-div .reg-image{
              display: none;
          }
          .reg-div .reg-form{
              width:100%;
              padding:0 8%;
              
          }
          .reg-div .reg-form form{
              gap:15px;
          }
          .reg-div .reg-form form .input input{
              height:35px;
          }
      }
      @media(max-width:725px){
          .reg-div .reg-form form .reg-title h2{
              font-size: 20px;
          }
          
      }
  </style>