<script setup>
import {ref} from "vue"
import {useRouter, onBeforeRouteUpdate} from "vue-router"

const router  = useRouter();
const selectedYear = ref(null);

const years = ref([
    {
        "id":1,
        "yearName" : "Year One",
        "specialization": "bent"
    },
    {
        "id":2,
        "yearName" : "Year Two",
        "specialization": "bent"
    },
    {
        "id":3,
        "yearName" : "Year Three",
        "specialization": "bent"
    },
    {
        "id":4,
        "yearName" : "Year Four",
        "specialization": "bent"
    }
]);

const selectYear = (id) => {
    selectedYear.value = id;
}

onBeforeRouteUpdate((to, from, next) => {
  // Reset selectedYear when navigating back to the bcom route
  if (from.name === 'bent-units' && to.name === 'bent') {
    selectedYear.value = null;
  }
  next();
});

</script>

<template>
    <div v-if="selectedYear === null" class="cont1">
        <div  class="spe-name">
            <h2>Bent</h2>
        </div>
        <div class="cont">
            <router-link v-for="year in years" :key="year.id" @click="selectYear(year.id)" :to="{ name: 'bent-units', params: { id: year.id, specialization:year.specialization } }" class="year-card">
                <h2>{{ year.yearName }}</h2>
            </router-link>
        </div>
    </div>
    <div v-else>
        <router-view></router-view>
    </div>
</template>

<style scoped>
 
 .cont1{
        width:100%;
        height:100%;
    }
    .cont{
        width:100%;
        /* min-height:100vh; */
        /* border:2px solid white; */
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap:20px;
        padding-top: 20px;
        padding-bottom: 50px;
    }
    .spe-name{
        background-color:var(--custom-blue);
        position: fixed;
        top:110px;
        right:8%;
        padding:10px;
        border-radius: 5px;
    }

    .spe-name h2{
        color:var(--white);
    }
    .year-card{
        width:30%;
        min-width:250px;
        height:250px;
        border:1px solid white;
        display: flex;
        align-items:center ;
        justify-content: center;
        border-radius: 20px;
        box-shadow: 0 8px 16px 0 rgba(255,255,255);
        cursor: pointer;
        text-decoration: none;
    }
    .year-card h2{
        font-size: 25px;
        color:var(--white);
        text-align: center;
    }
    @media(max-width:754px){
        .cont{
            justify-content: center;
        }
    }
</style>