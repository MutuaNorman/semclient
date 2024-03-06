<script setup>
    import {ref} from "vue"

    const years = ref([
        {
            "name" : "Year One",
            "img" : "/images/1.png"
        },
        {
            "name" : "Year Two",
            "img" : "/images/2.jpeg"
        },
        {
            "name" : "Year Three",
            "img" : "/images/3.jpeg"
        },
        {
            "name" : "Year Four",
            "img" : "/images/4.jpeg"
        }
    ]);
</script>

<template>
    <div v-for="{name, img} in years" :key="name" class="div-right">
        <div class="year">
            <div class="year-image">
                <img :src="img" alt="">
            </div>
            <div class="year-name">
                <h1>{{ name }}</h1>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .div-right{
        width:70%;
        height:100%;
        /* border:2px solid red; */
        display: flex;
        gap:30px;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items:flex-start;
    }
    .div-right .year{
        width:45%;
        height:45%;
        /* border:2px solid yellow; */
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


@media(max-width:950px){
    .div-right{
        width: 100%;
    }
    .div-right .year .year-name h1{
        font-size: 20px;
    }
}
</style>