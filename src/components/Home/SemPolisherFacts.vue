<script setup>
    import { onMounted, ref } from 'vue';
    import CountUp from 'vue-countup-v3'
    import AOS from 'aos';
    import 'aos/dist/aos.css';

    onMounted(() => {
        AOS.init();
    });

    const playVideo = () => {
        window.open("https://www.youtube.com/watch?v=BRTqeAEga5E", "rel:'nofollow'", "_blank");
    };

</script>

<template>
    <section class="facts">
        <div class="facts-title">
            <h2 data-aos="fade-down" data-aos-duration="2000">A few facts about<br/> SemPolisher</h2>
        </div>
        <div class="facts-cont">
            <div class="facts-div-left">
                <div class="facts-left-left">
                    <div class="facts-left-left-card">
                        <count-up class="successedStudents h2" :end-val="470">%</count-up>
                        <h3>Succesed Students</h3>
                    </div>
                    <div class="facts-left-left-card">
                        <count-up class="activeStudents h2" :end-val="500">+</count-up>
                        <h3>Active Students</h3>
                    </div>
                </div>
                <div class="facts-left-right">
                    <div class="facts-left-left-card">
                        <count-up class="catQuestions h2" :end-val="1500">+</count-up>
                        <h3>Cat Questions</h3>
                    </div>
                    <div class="facts-left-left-card">
                        <count-up class="examQuestions h2" :end-val="3000">+</count-up>
                        <h3>Exam Questions</h3>
                    </div>
                </div>
            </div>
            <div class="facts-div-right" data-aos="flip-right">
                <img src="/images/video-item-bg.jpg" alt="SemPolisher Video poster" class="video-poster">
                <img class="play-icon" @click="playVideo()" src="/images/play-icon.png" alt="Youtube video on importance of learning">
            </div>
        </div>
    </section>
</template>

<style scoped>
    .facts{
        width:100%;
        min-height:100vh;
        background-image: url("/images/facts-bg.jpg");
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        padding:100px 8%;
    }
    .facts-title{
        margin-bottom: 20px;
    }
    .facts-title h2{
        text-transform: uppercase;
        font-size: 40px;
        font-weight: 800;
        color:var(--white);
    }
    .facts-cont{
        width:100%;
        height:60vh;
        /* border:2px solid white; */
        display: flex;
        justify-content: space-between;
    }
    .facts-div-left{
        width:48%;
        height:100%;
        /* border:2px solid blue; */
        display: flex;
        justify-content: space-between;
    }
    .facts-left-left{
        width:48%;
        height:100%;
        /* border:2px solid green; */
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        gap:40px;
    }
    .facts-left-right{
        width:48%;
        height:100%;
        /* border:2px solid orange; */
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        gap:40px
    }
    .facts-div-right{
        width:48%;
        height:100%;
        /* border:2px solid red; */
        position:relative;
    }
    .video-poster {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        bottom:40px;
        left: 0;
    }
    .play-icon{
        position:absolute;
        top:40%;
        left:50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
    }
    .facts-div-right iframe{
        width:100%;
        height: 100%;
        position: absolute;
        bottom:40px;
    }
    .facts-left-left-card{
        width:100%;
        height: 40%;
        padding:30px;
        background-color: rgba(255,255,255,0.3);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap:20px;
        flex-direction: column;
    }
    .facts-left-left-card .h2{
        color:var(--custom-blue);
        font-size:40px;
        font-weight: 800;
    }
    .facts-left-left-card h3{
        color:var(--white);
        font-size:22px;
    }



@media(max-width:725px){
    .facts-cont{
        flex-direction: column;
        min-height: 100vh;
        gap:100px;
    }
    .facts-div-left{
        width:100%;
    }
    .facts-div-right{
        width:100%;
    }
}
@media(max-width:950px){
   
}
</style>