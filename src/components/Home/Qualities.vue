<script setup>
    import {ref, onMounted} from "vue"
    import {useRouter} from "vue-router"
    import AOS from 'aos';
    import 'aos/dist/aos.css';

    onMounted(() => {
        AOS.init();
    });

    const router = useRouter();

    const moreSpecializations = ref(false);
    const num = ref("more");

    const handleShowMoreSpecializations = () => {
        moreSpecializations.value = true;  
    }

    const handleShowLessSpecializations = () => {
        moreSpecializations.value = false;  
    }

    const handleClickYear = () => {
        router.push({name:'dashboard'});
    } 

    const cards = ref([
        {
            "id" : 1,
            "image" : "/images/service-icon-01.png",
            "alt": "SemPolisher - study materials service icon",
            "title" : "Comprehensive Study Materials",
            "description":"Unlock your academic potential with our extensive collection of revision materials. From detailed study guides to pastpaper exams, we provide everything you need to excel in your studies.",
            "animate":"fade-right"
        },
        {
            "id" : 2,
            "image" : "/images/service-icon-02.png",
            "alt": "SemPolisher - expert guidance and support service icon",
            "title" : "Expert Guidance and Support",
            "description":"Receive personalized guidance and support from our team of experienced educators. Whether you need help understanding complex concepts or guidance on effective study strategies, we're here to assist you every step of the way.",
            "animate":"zoom-in"
        },
        {
            "id" : 3,
            "image" : "/images/service-icon-03.png",
            "alt": "SemPolisher - interactive learning resources service icon",
            "title" : "Interactive Learning Resources",
            "description":"Engage in interactive learning experiences with our innovative resources. From interactive quizzes to multimedia presentations, our dynamic learning materials make studying enjoyable and effective.",
            "animate":"fade-left"
        }
    ]);

    const years = ref([
        {
            "id" : 1,
            "name": "Year One",
            "image":"/images/1.png",
            "alt":"SemPolisher - Year one Resources",
            "animate":"fade-right"
        },
        {
            "id" : 2,
            "name": "Year Two",
            "image":"/images/2.jpeg",
            "alt":"SemPolisher - Year two Resources",
            "animate":"fade-up"
        },
        {
            "id" : 3,
            "name": "Year Three",
            "image":"/images/3.jpeg",
            "alt":"SemPolisher - Year Three Resources",
            "animate":"fade-up"
        },
        {
            "id" : 4,
            "name": "Year Four",
            "image":"/images/4.jpeg",
            "alt":"SemPolisher - Year Four Resources",
            "animate":"fade-left"
        }
    ]);
</script>

<template>
    <section class="qualities">
        <div class="container">
            <div v-for="card in cards" class="card" :data-aos="card.animate" :key="card.id">
                <div class="service-image">
                    <img :src="card.image" :alt="card.alt" loading="lazy">
                </div>
                <h2>{{ card.title }}</h2>
                <p>{{ card.description }}</p>
            </div>
        </div>
        <div class="material-content">
        <h2 data-aos="fade-up" data-aos-duration="2000">Resources Coverage</h2>
        <div class="line"></div>
        <div class="coverage">
            <div class="div-left">
                <div class="groups" data-aos="fade-right">
                    <h2>Specializations Categories</h2>
                    <div class="spe-line"></div>
                    <p><i class="fa-solid fa-circle-dot"></i> Accounting</p>
                    <p><i class="fa-solid fa-circle-dot"></i> Finance</p>
                    <p><i class="fa-solid fa-circle-dot"></i> Insurance</p>
                    <p><i class="fa-solid fa-circle-dot"></i> Information Systems</p>
                    <p><i class="fa-solid fa-circle-dot"></i> Procurement</p>
                    <p><i class="fa-solid fa-circle-dot"></i> Enterpreneurship(Bent)</p>
                    <p v-if="moreSpecializations"><i class="fa-solid fa-circle-dot"></i> Marketing</p>
                    <p v-if="moreSpecializations"><i class="fa-solid fa-circle-dot"></i> Human Resource</p>
                    <div class="spe-line"></div>
                    <button v-if="!moreSpecializations" @click="handleShowMoreSpecializations()">More Specializations</button>
                    <button v-if="moreSpecializations" @click="handleShowLessSpecializations()">Less Specializations</button>
                </div>
            </div>
            <div class="div-right">
                <div @click="handleClickYear()" v-for="year in years" class="year" :key="year.id" :data-aos="year.animate">
                    <div class="year-image">
                        <img :src="year.image" :alt="year.alt" loading="lazy">
                    </div>
                    <div class="year-name">
                        <h1>{{ year.name }}</h1>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>
</template>

<style scoped>
    .qualities{
        width:100%;
        /* min-height: 100vh; */
        background-image: url("/images/meetings-bg.jpg");
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        padding:0 8%;
        padding-top:100px;
        padding-bottom: 50px;
    }
    .container{
        width:100%;
        display: flex;
        justify-content:space-between;
        align-items: flex-start;
        /* border:2px solid white; */
        margin:0 auto;
        gap:3%;
    }
    .card{
        width:30%;
        min-height: 300px; 
        background-image: url("/images/service.jpg");
        border-radius:20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
        text-align: center;
        gap:20px;
        padding:20px;
    } 
    .card h2{
        color:var(--custom-black);
        font-weight: 800;
        font-size: 20px;
    }
    .card p{
        color:var(--white);
        font-size: 18px;
        text-align: left;
    }
    .material-content{
        width:100%;
        margin-top: 50px;
    }
    .material-content h2{
        text-transform: uppercase;
        text-align: center;
        color:var(--white);
        font-size: 40px;
        font-weight: 800;
    }
    .material-content .line{
        height:1px;
        background-color: var(--white);
        margin: 50px 8%;
    }
    .coverage{
        width:100%;
        min-height:900px;
        /* padding:0 8%; */
        display: flex;
        justify-content: space-between;
        padding-bottom: 30px;
        /* border: 2px solid; */
        gap:40px;
    }
    .div-left{
        width:27%;
        height:50%;
    }
    .div-left .groups{
        width:100%;
        height:100%;
        background-color: var(--white);
        border-radius: 20px;
        padding:20px;
    }
    .div-left .groups h2{
        color:var(--custom-black);
        font-size: 22px;
        text-transform: capitalize;
        text-align: left;
        font-weight: 800;
    }
    .div-left .groups .spe-line{
        height:1px;
        width:100%;
        background-color: var(--custom-black);
        margin: 30px 0;
    }
    .div-left .groups p{
        font-size: 17px;
        margin:5px 0;
    }
    .fa-circle-dot{
        color:var(--custom-blue);
    }
    .div-left .groups button{
        width:100%;
        background-color: var(--custom-blue);
        padding:10px 5px;
        border-radius: 20px;
        margin-top: 20px;
        color:var(--white);
        font-weight: 800;
        font-size:18px;
        text-transform: uppercase;
        transition:background-color 150ms ease-in-out;
        cursor: pointer;
    }
    .div-left .groups button:hover{
        background-color: transparent;
        border: 1px solid var(--custom-blue);
        color:var(--custom-blue);
    }
    .div-right{
        width:70%;
        height:100%;
        display: flex;
        gap:30px;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items:flex-start;
    }
    .div-right .year{
        width:45%;
        height:45%;
        display:flex;
        flex-direction: column;
        border-radius: 20px;
        cursor: pointer;
    }
    .div-right .year .year-image{
        height:300px;
        width: 100%;
    }
    .div-right .year .year-image img{
        width:100%;
        height:100%;
        object-fit: cover;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
    }
    .div-right .year .year-name{
        height:100px;
        width: 100%;
        background-color: var(--white);
        border-bottom-right-radius: 20px;
        border-bottom-left-radius:20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .div-right .year .year-name h1{
        font-size: 30px;
        font-weight: bold;
    }


@media(min-width: 951px){
    .card{
        min-height:400px;
    }
}     

@media(max-width:725px){
    .overlay .welcome{
        /* top:30%; */
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
    .home-top-card-nav .no-links{
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
    .home-top-card-nav .no-links i{
        display: inline-block;
    }
    .home-top-card-nav .bar-icon{
        display: inline-block;
    }
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
    .popular-title h2,  .facts-title h2{
        font-size: 30px;
    }
    .form-contact-div{
        flex-direction: column;
    }
    .form-contact-div .form{
        width:100%;
    }
    .form-contact-div .contact{
        width:100%;
    }
    .form-contact-div .form .inputs{
        flex-direction: column;
        gap:20px;
    }
    .form-contact-div .form .inputs input{
        width:100%;
    }
}
@media(max-width:950px){
    .container{
        flex-direction: column;
        gap:20px;
    }
    .card{
        width:100%;
    }
    .material-content h2{
        font-size: 30px;
    }
    .coverage{
        flex-direction: column;
    }
    .div-left{
        width: 100%;
    }
    .div-right{
        width: 100%;
    }
    .div-right .year .year-name h1{
        font-size: 20px;
    }
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