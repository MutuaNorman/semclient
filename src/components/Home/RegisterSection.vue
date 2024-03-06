<script setup>
    import {onMounted, ref} from "vue";
    import AOS from 'aos';
    import 'aos/dist/aos.css';

    const benefits = ref([
        { 
            title: 'Comprehensive Study Materials', 
            content: 'Access a wide range of comprehensive study materials designed to support your academic journey. From detailed study guides to practice tests, SemPolisher provides everything you need to succeed.', 
            isOpen: false 
        },
        { 
            title: 'Expert Guidance and Support', 
            content: 'Receive expert guidance and support from experienced educators who are dedicated to helping you achieve your academic goals. Get personalized assistance, tips, and advice to enhance your learning experience.', 
            isOpen: false 
        },
        { 
            title: 'Interactive Learning Resources', 
            content: 'Engage in interactive learning experiences with our innovative resources. Explore multimedia presentations, interactive quizzes, and immersive simulations to make learning enjoyable and effective.', 
            isOpen: false 
        },
        { 
            title: 'Community Collaboration', 
            content: 'Join a vibrant learning community where you can collaborate with peers, share knowledge, and exchange ideas. Connect with like-minded individuals and expand your network while learning together.', 
            isOpen: false 
        },
    ]);


    const toggleCard = (index) => {
        benefits.value = benefits.value.map((benefit, i) => (i === index ? { ...benefit, isOpen: !benefit.isOpen } : benefit));
    };

    // Scroll to the first open card on mount
    onMounted(() => {
       
        AOS.init();
  
        const firstOpenCard = benefits.value.findIndex((benefit) => benefit.isOpen);
        if (firstOpenCard !== -1) {
            const cardElement = document.getElementById(`benefits-card-${firstOpenCard}`);
            cardElement && cardElement.scrollIntoView({ behavior: 'smooth' });
        }
    });

</script>

<template>
    <section class="register-section">
      <div class="register-cont">
        <div class="reg-left">
            <div class="reg-card" data-aos="flip-left">
                <h1>Unlock Premium Resources</h1>
                <p>Gain exclusive access to our premium study materials and resources tailored to help you excel in your academic journey. From comprehensive study guides to interactive quizzes, we've got everything you need to succeed.</p>
                <router-link :to="{name:'register'}" class="btn1">Register Now!</router-link>
            </div>
            <div class="reg-card" data-aos="flip-right">
                <h1>Join Our Learning Community</h1>
                <p>Join hundreds of students who have already benefited from our platform. By registering, you'll become part of a supportive learning community where you can connect with peers, share knowledge, and collaborate on projects.</p>
                <router-link :to="{name:'register'}" class="btn2">Register Now!</router-link>
            </div>
        </div>
        <div class="reg-right">
          <div class="other-benefits" data-aos="fade-up" data-aos-duration="2000">
            <div v-for="(benefit, index) in benefits" :key="index" :class="{ 'open': benefit.isOpen }" :id="'benefits-card-' + index" class="benefits-card">
              <div class="benefits-title">
                <h2>{{ benefit.title }}</h2>
                <i @click="toggleCard(index)" :class="{ 'fa-solid fa-angle-right': !benefit.isOpen, 'fa-solid fa-angle-down': benefit.isOpen }"></i>
              </div>
              <div class="benefits-card-content">
                <p>{{ benefit.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<style scoped>
    .register-section{
        width:100%;
        min-height: 100vh;
        background-image:url("/images/apply-bg.jpg");
        background-size: cover;
        background-position: center;
        background-attachment:fixed;
        display: flex;
        align-items: center;
    }
    .register-cont{
        width:100%;
        min-height:80vh;
        /* border:2px solid white; */
        padding:40px 8%;
        display: flex;
        justify-content: space-between;
        gap:40px;
    }
    .reg-left{
        width:45%;
        height:100%;
        /* border:2px solid black; */
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap:30px; 
    }
    .reg-card{
        width:100%;
        /* height:35vh; */
        background-color: rgba(255, 255, 255, 0.1);
        padding:30px;
        display: flex;
        flex-direction: column;
        gap:20px;
    }
    .reg-card h1{
        color:var(--white);
        text-transform: uppercase;
        font-weight: 800;
        font-size: 25px;
    }
    .reg-card p{
        color:var(--white);
    }
    .reg-card .btn1{
        background-color: var(--custom-blue);
        width:40%;
        padding:10px 15px;
        border-radius: 20px;
        color:var(--white);
        text-align: center;
        text-decoration: none;
        transition:background-color 150ms ease-in-out;
    }
    .reg-card .btn1:hover{
        background-color: transparent;
        border:1px solid  var(--custom-blue);
        font-weight: 800;
    }
    .reg-card .btn2{
        background-color: var(--custom-red);
        width:40%;
        padding:10px 15px;
        border-radius: 20px;
        color:var(--white);
        text-align: center;
        text-decoration: none;
        transition:background-color 150ms ease-in-out;
    }
    .reg-card .btn2:hover{
        background-color: transparent;
        border:1px solid  var(--custom-red);
        font-weight: 800;
    }
    .reg-right{
        width:45%;
        height:100%;
        /* border:2px solid black; */
    }
    .other-benefits{
        width:100%;
        height:100%;
        background-color: var(--white);
        border-radius: 20px;
        padding:30px;
        display: flex;
        flex-direction: column;
        gap:20px;
    }
    .benefits-card{
        display: flex;
        /* height:140px; */
        /* overflow-y:hidden; */
        border-bottom: 1px solid var(--custom-black);
        flex-direction: column;
        gap: 20px;
    }
    .benefits-card p{
        padding: 0 30px;
    } 
    .benefits-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .benefits-title h2{
        font-weight: 800;
        font-size:20px;
        color:var(--custom-blue)
    }
    .benefits-title i{
        font-size: 20px;
        color:var(--custom-black);
        font-weight: 800;
        cursor: pointer;
    }
    .benefits-card-content {
         max-height: 0px;
         overflow: hidden;
         transition: max-height 0.5s ease-in-out;
    }
    .benefits-card.open .benefits-card-content {
        max-height: 150px; 
    }


@media(max-width:545px){
    .reg-card .btn1, .reg-card .btn2{
        width:100%;
    }
    
}

@media(max-width:725px){
    
}
@media(max-width:950px){
    .register-cont{
        flex-direction: column;
    }
    .reg-left{
        width:100%;
    }
    .reg-right{
        width:100%;
    }
}
</style>