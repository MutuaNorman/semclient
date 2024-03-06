<script setup>
    import { useRouter, useRoute } from "vue-router"
    import { ref, onMounted } from "vue";
    import axios from "axios"
    const router = useRouter();
    const route = useRoute();

    const id = route.params.id;

    const units = ref([]);

    onMounted(async() => {
        try{
            const response = await axios.get(`years/${id}`);
            console.log(response.data);
            units.value = response.data
        }catch(error){
            console.log("Error: "+ error);
        }
    })
</script>

<template>
    <div class="units-cont">
        <div class="units-title">
            <h2>Year {{ $route.params.id }} {{ $route.params.specialization }}</h2>
        </div>
        <div class="cont">
            <div v-for="unit in units" :key="unit.id" class="card">
                <h2>{{ unit.unit_code }}</h2>
                <h1>{{ unit.unit_description }}</h1>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .units-cont{
        width:100%;
        padding-bottom: 50px;
        padding-top: 50px;
        /* border:2px solid white; */
    }
    .units-cont .units-title{
        position:fixed;
        top:110px;
        right:8%;
        background-color: var(--custom-blue);
        padding:10px;
        border-radius: 5px;
    }
    .units-cont .units-title h2{
        color:var(--white);
        text-transform: capitalize;
        /* margin-bottom: 50px; */
    }
    .cont{
        display: flex;
        gap:30px;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
    }
    .card{
        width:80%;
        border:1px solid white;
        display: flex;
        /* align-items:center ; */
        justify-content: center;
        flex-direction: column;
        gap:5px;
        padding:30px;
        border-radius: 20px;
        box-shadow: 0 8px 16px 0 rgba(255,255,255);
        cursor: pointer;
        color:var(--white);
    }
    @media(max-width:600px){
        .card{
            width:100%;
        }
    }
</style>