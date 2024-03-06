<script setup>
  import Nav1 from "./Nav1.vue";
</script>

<template>
    <section class="home-top-card">
        <video autoplay muted loop>
            <source src="/videos/course-video.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <div class="overlay">
            <div class="welcome">
                <h2>Hello Students,</h2>
                <h1>Welcome to SemPolisher</h1>
                <p>Empower your learning journey with SemPolisher – your trusted platform for comprehensive revision materials. Whether you're preparing for exams, seeking study aids, or refining your academic skills, we've got you covered.</p>
                <router-link :to="{name:'register'}" class="join-us">Join us Now!</router-link>
            </div>
        </div>
        <Nav1 />
    </section>
</template>


<style scoped>
    .home-top-card{
        width:100%;
        height: 100vh;
    }
    .home-top-card video {
        min-width: 100%;
        min-height: 100vh;
        max-width: 100%;
        max-height: 100vh;
        object-fit: cover;
        z-index: -1;
    }
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 1;
    }
    .overlay .welcome{
        position:relative;
        top:40%;
        width:60%;
        padding-left:8%;
        padding-right: 20px;
    }
    .overlay .welcome h2{
        font-size: 20px;
        color:var(--custom-blue);
        font-weight: 800;
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    .overlay .welcome h1{
        font-size: 25px;
        color:var(--white);
        font-weight: 800;
        margin-bottom: 15px;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    .overlay .welcome p{
        color:var(--white);
        font-size: 20px;
        margin-bottom: 35px;
    }
    .overlay .welcome .join-us{
        background-color: var(--custom-blue);
        padding:8px 25px;
        border-radius: 50px;
        color:var(--white);
        font-size: 18px;
        font-weight: 800;
        text-transform: uppercase;
        text-decoration: none;
        transition:background-color 150ms ease-in-out;
    }
    .overlay .welcome .join-us:hover{
        background-color: transparent;
        border: 1px solid var(--custom-blue);
        color:var(--custom-blue);
    }
    .home-top-card video::-webkit-media-controls {
        display: none !important;
    }
    


@media(max-width:725px){
    .overlay .welcome{
        width:100%;
    }
    .home-top-card-nav .title h1{
        font-size: 25px;
    }
    .overlay .welcome h2{
        font-size: 20px;
    }
    .overlay .welcome h1{
        font-size: 22px;
    }
    .overlay .welcome h2{
        font-size: 17px;
    }
}
</style>