<script setup>
    import {ref, onMounted} from "vue"
    import AOS from 'aos';
    import 'aos/dist/aos.css';

    onMounted(() => {
        AOS.init();
    });

    const questions = ref([
        { title: "Discuss the role of government in financing small business development in Kenya.", star: "fa-solid fa-star", type: "cat"},
        { title: "Explain the importance of high-level time management skills for a University student.", star: "fa-solid fa-star", type: "exam"},
        { title: "Discuss five factors underlying the recognition of the importance of logistics management.", star: "fa-solid fa-star", type: "cat"},
        { title: "'No entrepreneur, No innovation' Discuss this sentiment in the light of the role that entrepreneurs play in innovation in enterprises.", star: "fa-solid fa-star", type: "exam"},
        { title: "Briefly explain the axioms of Consumer Preference Theory.", star: "fa-solid fa-star", type: "cat"}
    ]);
</script>

<template>
    <section class="popular">
      <div class="popular-title">
        <h2 data-aos="fade-up" data-aos-duration="2000">Our Popular questions</h2>
        <div class="popular-line"></div>
      </div>
      <div class="popular-cont">
        <div v-for="({ title, star, type }, index) in questions" :key="index" class="popular-card">
          <p><i class="fa-solid fa-quote-left"></i>{{ title }}<i class="fa-solid fa-quote-right"></i></p>
          <div class="popular-card-line"></div>
          <div class="reviews">
            <div class="popular-stars">
              <i :class="star"></i>
              <i :class="star"></i>
              <i :class="star"></i>
              <i :class="star"></i>
              <i :class="star"></i>
            </div>
            <div class="question-type">
              <p>{{ type }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>

<style scoped>
    .popular{
        width:100%;
        min-height: 100vh;
        background-image: url("/images/meetings-bg.jpg");
        background-attachment: fixed;
        background-size: cover;
        background-position: center;
        padding: 100px 8%;
    }
    .popular-title{
        margin-bottom:50px;
        display: flex;
        flex-direction: column;
        gap:40px;
    }
    .popular-title h2{
        text-transform: uppercase;
        font-size: 40px;
        color:var(--white);
        font-weight: 800;
    }
    .popular-line{
        width:100%;
        height: 1px;
        background-color: var(--white);
    }    
    .popular-cont{
        width:100%;
        /* height:500px; */
        display: flex;
        gap:20px;
        overflow-x: scroll;
        padding:30px;
        scroll-snap-type: x mandatory;
    }
    .popular-cont::-webkit-scrollbar{
        height: 10px;
    }
    .popular-cont::-webkit-scrollbar-thumb{
        border-radius: 5px;
        background-color: var(--custom-blue);
    }
    .popular-card{
        min-width:300px;
        height:250px;
        /* border:2px solid white; */
        padding:30px;
        background-color: rgba(255,255,255,0.9);
        border-radius: 20px;
        scroll-snap-align: start;
        position: relative;
    }
    .popular-card p{
        font-size: 18px;
        /* margin-bottom: 20px; */
    }
    .popular-card p i{
        color:var(--custom-blue)
    }
    .popular-card-line{
        width:100%;
        height:1px;
        background-color: var(--custom-black);
        margin:20px 0;
        position: absolute;
        bottom:25px;
    }
    .reviews{
        position: absolute;
        bottom:20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .popular-stars i{
        color:var(--custom-blue);
    }


@media(max-width:725px){
    .popular-title h2,  .facts-title h2{
        font-size: 30px;
    }
}
@media(max-width:950px){
    
}
</style>