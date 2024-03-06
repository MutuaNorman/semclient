<script setup>
import {ref} from "vue"
import {useRouter, onBeforeRouteUpdate} from "vue-router"

const router  = useRouter();
const selectedGroup = ref(null);

const groups = ref([
    {
        "id":1,
        "groupName" : "Accounting",
        "link": "accounting"
    },
    {
        "id":2,
        "groupName" : "Finance",
        "link": "finance"
    },
    {
        "id":3,
        "groupName" : "Information Systems",
        "link": "information-systems"
    },
    {
        "id":4,
        "groupName" : "Insurance",
        "link": "insurance"
    },
    {
        "id":5,
        "groupName" : "Marketing",
        "link": "marketing"
    },
    {
        "id":6,
        "groupName" : "Human Resource",
        "link": "human-resource"
    }
]);

const selectGroup = (id) => {
    selectedGroup.value = id;
}

onBeforeRouteUpdate((to, from, next) => {
  // Reset selectedYear when navigating back to the bcom route
  const validRoutes = ['accounting', 'finance', 'information-systems', 'insurance', 'marketing', 'human-resource'];

  if (validRoutes.includes(from.name) && to.name === 'bcom') {
    selectedGroup.value = null;
  }
  next();
});

</script>

<template>
    <div class="cont1" v-if="selectedGroup === null">
        <div  class="spe-name">
            <h2>Bcom</h2>
        </div>
        <div class="cont">
            <router-link v-for="group in groups" :key="group.id" @click="selectGroup(group.id)" :to={name:group.link} class="year-card">
                <h2>{{ group.groupName }}</h2>
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