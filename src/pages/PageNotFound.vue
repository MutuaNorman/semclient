<script setup>
    import Nav1 from '../components/Home/Nav1.vue';
    import Footer from  "../components/Home/Footer.vue";
</script>

<template>
    <div class="notfoundcont">
        <Nav1 />
        <div class="notfoundimg">
            <img src="/images/notfound.svg" alt="page not found">
        </div>
        <div class="actions">
            <p>Sorry, the page you are looking for does not exist.</p>
            <router-link class="link" :to="{name:'home'}">Go Home</router-link>
        </div>
        <Footer />
    </div>
</template>

<style scoped>
.notfoundcont{
    width:100%;
    height:100vh;
    padding-top: 100px;
    background-image: url("/images/meetings-bg.jpg");
    background-position: center;
    background-size: cover;
}
.notfoundimg{
    display: flex; 
    justify-content: center;            
    align-items: center;
    /* border:2px solid black; */
}
.notfoundimg img{
    max-height:300px;
    width:60%;
}
.actions{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap:20px;
    padding-bottom: 20px;
}
p{
    text-align: center;
    margin-top: 50px;
    color:var(--white);
    font-size:20px;
}
.link{
   background-color: var(--custom-blue);
   text-decoration: none;
   padding:1% 5%;
   color:var(--white);
   font-size: 18px;
   transition: background-color 150ms ease-in-out;
}
.link:hover{
    border:1px solid white;
    background-color: transparent;
}
</style>

