<script setup>
import { useAuthStore } from '../../stores/Auth';
import {ref, reactive} from "vue"
import {useRouter} from "vue-router"
import axios from 'axios';

const store = useAuthStore();

const router = useRouter();

const showUsernameForm = ref(false);
const showPasswordForm = ref(false);
const showAccountForm = ref(false);

const UsernameData = reactive({
    name : "",
    re_name: "",
    email : store.user.email,
    id : store.user.id
});

const passwordData = reactive({
    new_password : "",
    re_new_password : "",
    current_password : ""
});


const toggleUsername = () => {
   showUsernameForm.value = !showUsernameForm.value;
}

const togglePassword = () => {
   showPasswordForm.value = !showPasswordForm.value;
}

const toggleAccount = () => {
   showAccountForm.value = !showAccountForm.value;
}

const handleChangeUsername = async() => {
    if (UsernameData.name !== UsernameData.re_name) {
        console.error('New usernames do not match');
        return;
    }
    try{
        const response = await axios.patch("auth/users/me/", {
            name : UsernameData.name,
            email: UsernameData.email,
            id : UsernameData.id
        });
        console.log(response.data);
    }catch(error){
        console.log("Error changing username", error);
    }
}

const handleChangePassword = async() => {
    try{
        const response = await axios.post("auth/users/set_password/", passwordData);
        console.log(response);
        showPasswordForm.value = !showPasswordForm.value;
    }catch(error){
        console.log("Error changing password:", error);
    }
}

const handleDeleteAccount = async() => {
     try{
        const response = await axios.delete(`accounts/delete-user/${store.user.id}/`);
        router.push({name:'login'});
    }catch(error){
        console.log("Error deleting Account:", error)
    }
}

</script>

<template>
    <div class="profile">
        <div class="profile-cont">
            <div class="profile-title">
                <div class="user-image">
                    <img src="/images/user.jpeg" alt="user image">
                </div>
                <div v-if="store.user" class="user-name">
                    <h3>{{ store.user.name }}</h3>
                    <p><i>{{ store.user.email }}</i></p>
                    <p>{{ store.user }}</p>
                    <!-- <p>{{ store.user.payment_date }}</p>
                    <p>{{ store.user.payment_period }}</p> -->
                </div>
            </div>
            <div class="profile-line">
                <div class="line"></div>
            </div>
            <div class="profile-actions">
                <h3>Manage Account</h3>
                <div class="username">
                    <p @click="toggleUsername"><i class="fa-regular fa-pen-to-square"></i> Change Username</p>
                    <form @submit.prevent="handleChangeUsername" v-if="showUsernameForm" action="">
                        <input v-model="UsernameData.name" type="text" placeholder="New Username" autofocus required>
                        <input v-model="UsernameData.re_name" type="text" placeholder="Confirm New Username" required>
                        <input type="submit">
                    </form>
                </div>
                <div class="username">
                    <p @click="togglePassword"><i class="fa-regular fa-pen-to-square"></i> Change Password</p>
                    <form @submit.prevent="handleChangePassword" v-if="showPasswordForm" action="">
                        <input v-model="passwordData.new_password" type="password" placeholder="New Password" autofocus required>
                        <input v-model="passwordData.re_new_password" type="password" placeholder="Confirm New Password" required>
                        <input v-model="passwordData.current_password" type="password" placeholder="Enter your Current password" required>
                        <input type="submit">
                    </form>
                </div>
                <div class="username">
                    <p @click="toggleAccount"><i class="fa-regular fa-pen-to-square"></i> Delete Account</p>
                    <form @submit.prevent="handleDeleteAccount" v-if="showAccountForm" action="">
                        <input type="submit" value="Delete Account">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .profile{
        /* border:2px solid white; */
        /* min-height: 90vh; */
        display: flex;
        justify-content: center;
    }
    .profile-cont{
        width:70%;
        min-height:500px;
        border:1px solid white;
        border-radius: 20px;
        box-shadow: 0 8px 16px 0 rgba(255,255,255);
        flex-direction: column;
        padding:20px;
    }
    .profile-title{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
    .profile-title .user-image{
        width:100px;
        height: 100px;
        border-radius: 50%;
    }
    .profile-title .user-image img{
        width:100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
    .profile-title .user-name{
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        text-align: center;
        gap:5px;
    }
    .profile-title .user-name h3{
        color:var(--white);
        letter-spacing: 2px;
        font-size: 22px;
    }
    .profile-title .user-name p{
        color:var(--custom-blue);
        letter-spacing: 2px;
        font-size: 15px;
    }
    .profile-line{
        width:100%;
        display: flex;
        justify-content: center;
        margin:30px 0;
    }
    .profile-line .line{
        width:90%;
        height:1px;
        background-color: var(--white);
    } 
    .profile-actions h3{
        text-align: center;
        color:var(--white);
        font-size: 25px;
        text-decoration: underline;
    }
    .profile-actions .username{
        text-align: center;
        margin-top: 20px;
    } 
    .profile-actions .username p{
        color:var(--custom-blue);
        font-size: 20px;
        margin:10px 0;
        cursor: pointer;
    }
    .profile-actions .username p i{
        color:var(--white);
    }
    .profile-actions .username form{
        width:100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap:10px;
        /* border:2px solid red; */
    }
    .profile-actions .username form input{
        width:60%;
        height:30px;
        border-radius: 5px;
        padding:0 10px;
    }
    .profile-actions .username form input[type="submit"]{
        background-color: var(--custom-blue);
        color:var(--white);
        font-size: 16px;
    }
</style>
