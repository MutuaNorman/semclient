<script setup>
    import {ref, reactive, onMounted} from "vue"
    import { useAuthStore } from "../../stores/Auth";
    import {useRouter} from "vue-router"
    import { useToast } from "vue-toastification";
    import Loader from "../Loader.vue"
    import axios from "axios"
    import AOS from 'aos';
    import 'aos/dist/aos.css';

    onMounted(() => {
        AOS.init();
    });

    const store = useAuthStore();

    const router = useRouter();

    const toast = useToast();

    const isLoading = ref(false);

    const message = ref("")

    const contactsData = reactive({
        name : "",
        email : store.user ? store.user.email : "",
        subject : "",
        message : ""
    });

    const handleSendEmail = async() => {
        if(store.user !== null){
            try{
                isLoading.value = true;
                const response = await axios.post("contacts/support/", contactsData);
                toast.success(`${response.data.message}`,{
                    timeout: 2000,
                    // toastClassName: "toastSuccess"
                });
                // message.value = response.data.message;
                contactsData.name = ""
                contactsData.subject = ""
                contactsData.message = ""
                isLoading.value = false;
            }catch(error){
                isLoading.value = false;
                console.log(error.response.data)
                toast.error(`${error.response.data.message}`,{
                    timeout:2000,
                })
            }
        }else{
            router.push({name:"login"})
        }
    }

</script>

<template>
    <section class="contacts" id="contacts">
        <div class="form-contact-div">
            <div class="form" data-aos="fade-down" data-aos-duration="2000">
                <form @submit.prevent="handleSendEmail()" action="">
                    <h2>Let's get in touch</h2>
                    <div class="contact-line"></div>
                    <!-- <p v-if="message" style="color:var(--custom-blue)">{{ message }}</p> -->
                    <Loader v-if="isLoading"></Loader>
                    <div class="inputs">
                        <input v-model="contactsData.name" type="text" placeholder="your name...*">
                        <input v-model="contactsData.email" type="email" placeholder="your email...*">
                        <input v-model="contactsData.subject" type="text" placeholder="subject...*">
                    </div>
                    <textarea v-model="contactsData.message" name="" id="" cols="30" rows="10" placeholder="Your message..."></textarea>
                    <button>send message now</button>
                </form>
            </div>
            <div class="contact" data-aos="fade-up" data-aos-duration="2000">
                <div class="phone-email">
                    <div class="phone">
                        <h3>Phone Number</h3>
                        <h2>0704412259</h2>
                    </div>
                    <div class="email">
                        <h3>Email Address</h3>
                        <h2>sempolisher@gmail.com</h2>
                    </div>
                </div>
                <div class="street">
                    <h3>Street Address</h3>
                    <h2>Oginga Odinga Ave, Nakuru</h2>
                </div>
                <div class="website">
                    <h3>Website URL</h3>
                    <h2>www.sempolisher.com</h2>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .contacts{
        width:100%;
        min-height: 100vh;
        background-image: url("/images/meetings-bg.jpg");
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
    }
    .form-contact-div{
        width:100%;
        /* min-height:90vh;  */
        /* border:2px solid white; */
        display: flex;
        justify-content: space-between;
        padding:100px 8%;
        gap:30px;
    }
    .form-contact-div .form{
        width:65%;
        /* height:90vh; */
        display:flex;
        align-items: center;
        /* border:2px solid black; */
    }
    .form-contact-div .form form{
        width:100%;
        /* height:80vh; */
        background-color: var(--white);
        border-radius: 20px;
        padding:30px;
        display: flex;
        flex-direction: column;
        gap:20px;
        /* border:2px solid black; */
    }
    .form-contact-div .form h2{
        font-size: 25px;
        text-transform: uppercase;
        font-weight: 800;
    }
    .form-contact-div .form .contact-line{
        width:100%;
        height:1px;
        background-color: var(--custom-black);
        margin-bottom: 20px;
    }
    .form-contact-div .form .inputs{
        display: flex;
        justify-content: space-around;
    }
    .form-contact-div .form .inputs input{
        width:30%;
        height: 40px;
        background-color: var(--custom-gray);
        border-radius: 20px;
        padding:0 10px;
        text-align: center;
        font-size:17px;
    }
    .form-contact-div .form .inputs input::placeholder{
        text-transform: uppercase;
        color:var(--custom-black);
    }
    .form-contact-div .form textarea{
        min-height:100px;
        max-height: 150px;
        max-width: 100%;
        background-color: var(--custom-gray);
        border-radius: 20px;
        padding:10px;
        text-align: center;
        font-size:17px;
    }
    .form-contact-div .form textarea::placeholder{
        text-transform: uppercase;
        color:var(--custom-black);
    }
    .form-contact-div .form button{
        background-color: var(--custom-red);
        height: 40px;
        border-radius: 20px;
        text-transform: uppercase;
        color:var(--white);
        cursor: pointer;
        font-size: 18px;
        transition: background-color 150ms ease-in-out;
    }
    .form-contact-div .form button:hover{
        background-color: transparent;
        border:1px solid var(--custom-red);
        color:var(--custom-red);
        font-weight: 800;
    }
    .form-contact-div .contact{
        width:28%;
        height:100%;
        background-color: var(--custom-red);
        border-radius: 20px;
        padding:30px;
        color:var(--white);
        display: flex;
        flex-direction: column;
        gap:30px;
    }
    .form-contact-div .contact .phone-email{
        display: flex;
        flex-direction: column;
        gap:30px;
    }
    .form-contact-div .contact .phone-email .phone{
        display: flex;
        flex-direction: column;
        gap:20px;
    }
    .form-contact-div .contact .phone-email .phone::after{
        content:"";
        width:30%;
        height:1px;
        background-color: var(--white);
    }
    .form-contact-div .contact .phone-email .phone h3{
        font-size:18px;
        font-weight: 600;
    }
    .form-contact-div .contact .phone-email .phone h2{
        font-size:22px;
        font-weight: 800;
    }
    .form-contact-div .contact .phone-email .email{
        display: flex;
        flex-direction: column;
        gap:20px;
    }
    .form-contact-div .contact .phone-email .email::after{
        content:"";
        width:50%;
        height:1px;
        background-color: var(--white);
    }
    .form-contact-div .contact .phone-email .email h3{
        font-size:18px;
        font-weight: 600;
    }
    .form-contact-div .contact .phone-email .email h2{
        font-size:22px;
        font-weight: 800;
    }
    .form-contact-div .contact .street{
        display: flex;
        flex-direction: column;
        gap:20px;
    }
    .form-contact-div .contact .street::after{
        content:"";
        width:70%;
        height:1px;
        background-color: var(--white);
    }
    .form-contact-div .contact .street h3{
        font-size:18px;
        font-weight: 600
    }
    .form-contact-div .contact .street h2{
        font-size:22px;
        font-weight: 800;
    }
    .form-contact-div .contact .website{
        display: flex;
        flex-direction: column;
        gap:20px;
    }
    .form-contact-div .contact .website::after{
        content:"";
        width:100%;
        height:1px;
        background-color: var(--white);
    }
    .form-contact-div .contact .website h3{
        font-size:18px;
        font-weight: 600
    }
    .form-contact-div .contact .website h2{
        font-size:22px;
        font-weight: 800;
    }
    


@media(max-width:1353px){
    .form-contact-div .form{
        width:57%;
    }
    .form-contact-div .contact{
        width:40%;
    }
    .form-contact-div .contact .phone-email .phone h3{
        font-size:16px;
    }
    .form-contact-div .contact .phone-email .phone h2{
        font-size:20px;
    }
    .form-contact-div .contact .phone-email .email h3{
        font-size:16px;
    }
    .form-contact-div .contact .phone-email .email h2{
        font-size:20px;
    }
    .form-contact-div .contact .street h3{
        font-size:16px;
    }
    .form-contact-div .contact .street h2{
        font-size:20px;
    }
    .form-contact-div .contact .website h3{
        font-size:16px;
    }
    .form-contact-div .contact .website h2{
        font-size:20px;
    }
}
@media(max-width:950px){
    
}

@media(max-width:881px){
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


</style>