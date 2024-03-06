<script setup>
import Nav1 from '../components/Home/Nav1.vue';
import Footer from  "../components/Home/Footer.vue";
import Loader from "../components/Loader.vue"
import { onMounted, ref, reactive } from "vue";
import axios from "axios"
import { useAuthStore } from '../stores/Auth';
import { useRouter } from 'vue-router';

const store = useAuthStore();

const router = useRouter();

const isLoading = ref(false);

const plans = ref([]);

onMounted(async() => {
    try{
        const res = await axios.get("/pesapal/payments/");
        plans.value = res.data.data;
    }catch(error){

    }
})

const handlePayment = async(plan) => {
    if (store.user !== null){
        const payData = reactive({
            "amount":plan.amount,
            "duration": plan.duration.toLowerCase(),
            "customer_email" : store.user.email,
            "user_id": store.user.id
        });

        try{
            isLoading.value = true;
            const response = await axios.post("pesapal/pay/", {payData});
            console.log(response.data.data.redirect_url);
            const pesapal_redirect_url = response.data.data.redirect_url;
            window.location.href = pesapal_redirect_url;
            isLoading.value = false;
        }catch(error){
            isLoading.value = true;
            console.log(error);
        }
    }else{
        router.push({name:"login"});
    }
}
</script>

<template>
    <div>
        <Nav1 />
        <div class="pay-cont">
            <div class="pay-title">
                <h1>Choose a payment plan</h1>
                <Loader v-if="isLoading"></Loader>
            </div>
            <div class="plans">
                <div v-for="plan in plans" :key="plan.id" class="plan-item">
                    <h2>{{ plan.duration }}</h2>
                    <p><span>Price: Ksh.{{ plan.amount }}</span></p>
                    <button @click="handlePayment(plan)">Pay</button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped>
.pay-cont {
    padding-top: 100px;
    padding-bottom: 20px;
    min-height: 100vh;
    width: 100%;
    background-image: url("/images/meetings-bg.jpg");
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
}

.pay-title {
    margin-top: 70px;
    text-align: center;
}

.pay-title h1 {
    font-size: 50px;
    color: var(--white);
    font-weight: 800;
}

.plans {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap:30px;
    margin-top: 20px;
}

.plan-item {
    width:250px;
    height:350px;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    border:1px solid white;
    box-shadow: 0 8px 16px 0 rgba(255,255,255);
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap:20px
}
.plan-item h2{
    font-size: 40px;
    color:var(--custom-red);
}
.plan-item p{
    font-size: 20px;
    color:var(--white);
}
.plan-item button{
    width:80%;
    height:40px;
    font-size:20px;
    background-color: var(--custom-blue);
    color:var(--white);
    cursor: pointer;
    transition: background-color 150ms ease-in-out;
}
.plan-item button:hover{
    border:1px solid white;
    background-color: transparent;
}
</style>
