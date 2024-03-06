<script setup>
    import {ref} from "vue"
    import { useRouter } from "vue-router";
    import { useAuthStore } from '../../stores/Auth';

    const store = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        store.logout();
        router.push({name:"login"});
    } 

    const date = new Date();

    const year = ref("");

    year.value = date.getFullYear().toString();

</script>

<template>
    <footer class="footer-cont">
        <div class="links-cont">
            <div class="pages">
                <h2>Quick Links</h2>
                <router-link class="linkings" :to="{name:'home'}">Home</router-link>
                <router-link v-if="!store.user" class="linkings" :to="{name:'login'}">Login</router-link>
                <router-link v-if="!store.user" class="linkings" :to="{name:'register'}">Register</router-link>
                <router-link v-if="!store.user" class="linkings" :to="{name:'forgot-password'}">Forgot Password</router-link>
                <router-link class="linkings" :to="{name:'dashboard'}">Dashboard</router-link>
                <router-link class="linkings" :to="{name:'payment'}">Payment</router-link>
            </div>
            <div class="pages">
                <h2>Resources</h2>
                <router-link class="linkings" :to="{name:'bcom'}">Bcom</router-link>
                <router-link class="linkings" :to="{name:'bent'}">Enterpreneurship(Bent)</router-link>
                <router-link class="linkings" :to="{name:'procurement'}">Procurement</router-link>
                <router-link class="linkings" :to="{name:'accounting'}">Accounting</router-link>
                <router-link class="linkings" :to="{name:'finance'}">Finance</router-link>
                <router-link class="linkings" :to="{name:'insurance'}">Insurace</router-link>
                <router-link class="linkings" :to="{name:'information-systems'}">Information Systems</router-link>
                <router-link class="linkings" :to="{name:'human-resource'}">Human Resource</router-link>
                <router-link class="linkings" :to="{name:'marketing'}">Marketing</router-link>
            </div>
            <div class="pages">
                <h2>Manage Account</h2>
                <router-link class="linkings" :to="{name:'profile'}">Profile</router-link>
                <router-link class="linkings" :to="{name:'profile'}">Delete Account</router-link>
                <router-link class="linkings" :to="{name:'profile'}">Change Password</router-link>
                <a v-if="store.user" class="logout" @click="handleLogout()">Logout</a>
            </div>
        </div>
        <div class="footer-line"></div>
        <div class="footer">
            <p>&copy; {{ year }} SemPolisher. All Rights Reserved.</p>
        </div>
    </footer>
</template>

<style scoped>
    .footer-cont{
        width:100%;
        /* height:400px; */
        background-color: var(--custom-black);
    }
    .links-cont{
        display: flex;
        justify-content: space-evenly;
        gap:10px;
        padding:20px 0;
        flex-wrap: wrap;
    }
    .pages{
        display: flex;
        flex-direction: column;
        gap:5px;
    }
    .pages h2{
        color:var(--white);
    }
    .linkings{
        color:var(--custom-blue);
    }
    .logout{
        color:var(--custom-red);
        text-decoration: underline;
        cursor: pointer;
    }
    .footer-line{
        width:100%;
        height: 1px;
        background-color: var(--white);
    }
    .footer{
        width:100%;
        /* height: 200px; */
        text-align: center;
        padding: 30px 0;
        /* border:2px solid white; */
    }
    .footer p{
        text-transform: uppercase;
        color:var(--white);
    }
    @media(max-width:600px){
        .links-cont{
            flex-direction: column;
            padding:10px 8%;
        }
    }
</style>