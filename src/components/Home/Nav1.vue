<script setup>
    import { ref, onMounted, onBeforeUnmount } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import { useAuthStore } from "../../stores/Auth";

    const store = useAuthStore();
    const router = useRouter();
    const route = useRoute();

    const navStyle = ref("home-top-card-nav");
    const isVisible = ref(true);

    const toggleMenu = () => {
        isVisible.value = !isVisible.value;
    };

    const toHome = () => {
        router.push({name:'home'})
    }

    const handleLogout = () => {
        try {
            store.logout();
            router.push("/login");
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    onMounted(() => {
        window.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
        window.removeEventListener("scroll", handleScroll);
    });

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        if (route.path === "/" && scrollPosition < 250) {
            navStyle.value = "home-top-card-nav1";
        } else {
            navStyle.value = "home-top-card-nav";
        }
    };
    // route.path === "/" && window.scrollY < 250 ? navStyle.value = "home-top-card-nav1" : navStyle.value = "home-top-card-nav";
</script>

<template>
    <header :class="navStyle" >
        <div class="title">
            <div class="logo-div" @click="toHome()">
                <img src="/images/logo.jpg" alt="SemPolisher logo">
            </div>
            <h1 @click="toHome()">SemPolisher</h1>
        </div>
        <nav :class="{ 'no-links': true, 'links': isVisible, 'unknown-class': !isVisible }">
            <router-link :to="{name:'home'}" class="to-page">Home</router-link>
            <router-link :to="{name:'dashboard'}" class="to-page">Dashboard</router-link>
            <router-link v-if="!store.user" :to="{name:'register'}" class="to-page">Register</router-link>
            <router-link v-if="!store.user" :to="{name:'login'}" class="to-page">Login</router-link>
            <a v-if="store.user" @click="handleLogout" href="#" class="to-page logout">Logout</a>
        </nav>
        <div v-if="store.user" class="if-user">
            <i class="fa-solid fa-user"></i><h3>{{ store.user.name }}</h3>
        </div>    
        <div class="bar-icon">
            <i @click="toggleMenu" class="fa-solid" :class="{ 'fa-bars': isVisible, 'fa-x': !isVisible }"></i>
        </div>
    </header>
</template>

<style scoped>
    .home-top-card-nav{
        width:100%;
        height:100px;
        padding:0 8%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.8);
        position:fixed;
        top:0;
        z-index: 1;
    }
    .home-top-card-nav1{
        width:100%;
        height:100px;
        padding:0 8%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: transparent;
        position:fixed;
        top:0;
        z-index: 1;
    }
    .title{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap:35px;
    }
    .title .logo-div{
        width:10%;
        height:100%;
        cursor: pointer;
    } 
    .title .logo-div img{
        height: 60px;
        width:60px;
        /* border-radius: 50%; */
    }
    .title h1{
        color:white;
        font-size: 35px;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-weight: 800;
        cursor: pointer;
    }
    .no-links{
        display: flex;
        justify-content: center;
        align-items: center;
        gap:20px;
    }
    .no-links i{
        font-size: 25px;
        color:var(--white);
        display:none;
    }
    .to-page{
        color:var(--white);
        font-size: 25px;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-weight: 800;
        text-decoration: none;
        transition: 150ms ease-in-out;
    }
    .to-page:hover{
        color:var(--custom-blue);
    } 
    .logout{
        color:var(--custom-red);
        transition:border 150ms ease-in-out;
    }
    .logout:hover{
        color:var(--white);
        border-radius: 20px;
        border:1px solid var(--custom-red);
        padding: 2px 8px;
    }
    .bar-icon{
        display: none;
    }
   .bar-icon i{
        color:var(--white);
        font-size: 25px;
        cursor: pointer;
    }
    .if-user{
        display: flex;
        align-items:center;
        justify-content: center;
        gap:5px;
        /* border:2px solid white; */
        cursor: pointer;
    }
    .if-user h3{
        color:var(--white);
        text-transform: capitalize;
        font-size: 25px;
    }
    .if-user i{
        color:var(--white);
        font-size: 25px;
    }
    .active-links{
        color:var(--custom-blue);
    }

    @media(max-width:1000px){
   .no-links{
        flex-direction: column;
        background-color: var(--custom-black);
        opacity:0.9;
        position: absolute;
        top:100%;
        width:80%;
        text-align: center;
        border-radius: 20px;
        padding:30px 60px;
    }
    .no-links i{
        display: inline-block;
    }
    .links{
        display: none;
    }
    .bar-icon{
        display: inline-block;
    }
    .if-user{
        display: none;
    }
    .title h1{
        font-size:30px;
    }
    .to-page{
        font-size: 20px;
    }
    .title{
        gap:20px;
    }
    .title .logo-div img{
        width:45px;
        height:45px;
    }
}
    @media(max-width:950px){
        
    }
</style>