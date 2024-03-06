<script setup>
    import HomeTopCard from '../components/Home/HomeTopCard.vue';
    import Qualities from '../components/Home/Qualities.vue';
    import RegisterSection from '../components/Home/RegisterSection.vue';
    import PopularQuestions from '../components/Home/PopularQuestions.vue';
    import SemPolisherFacts from '../components/Home/SemPolisherFacts.vue';
    import ContactsSection from '../components/Home/ContactsSection.vue';
    import Footer from '../components/Home/Footer.vue'
</script>

<template>
    <main class="home-cont">
        <HomeTopCard />
        <Qualities />
        <RegisterSection />
        <PopularQuestions />
        <SemPolisherFacts />
        <ContactsSection />
        <Footer />
    </main>
</template>

<style scoped>
    .home-cont{
        width:100%;
        height: 100%;
    }
</style>