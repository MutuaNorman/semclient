import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    isOnFreePeriod: false,
  }),
  actions: {
    async getUser() {
      try {
        const responseUser = await axios.get('auth/users/me');
        this.setUser(responseUser.data);

        if(responseUser.data.has_paid){
            const currentDate = new Date();
            const expiryDate = new Date(responseUser.data.expiry_date);

            if (currentDate > expiryDate) {
                // Subscription has expired, send request to update has_paid to false
                await axios.patch("/auth/users/me/", { has_paid: false });
                console.log('Subscription expired. has_paid updated to false.');
            } else {
                console.log('Subscription is still active.');
            }
        }else{
          console.log('User has not paid for subscription.');
        }

        // Set up inactivity timeout
        const inactivityTimeout = setTimeout(this.logout, 300000); // 5 minutes (300000 milliseconds)

        // Reset inactivity timeout on user activity
        const resetInactivityTimer = () => {
            clearTimeout(inactivityTimeout);
            this.startInactivityTimer();
        };

        document.addEventListener("mousemove", resetInactivityTimer);
        document.addEventListener("keypress", resetInactivityTimer);

        const registrationDate = localStorage.getItem('registrationDate');
        if (registrationDate) {
          const registrationDateTime = new Date(registrationDate);
          // Set the credit period to 5 days after registration
          const creditPeriodEnd = new Date(registrationDateTime.getTime() + 5 * 24 * 60 * 60 *1000);
          const currentDate = new Date();
          this.isOnFreePeriod = currentDate < creditPeriodEnd;
        }
                    
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    },
    setUser(user) {
      this.user = user;
    },
    logout() {
      this.user = null;
      this.isOnFreePeriod = false;
      try {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      } catch (error) {
        console.log(error);
      }
    },
    startInactivityTimer() {
        const inactivityTimeout = setTimeout(this.logout, 300000); // 5 minutes (300000 milliseconds)
        this.$store.inactivityTimeout = inactivityTimeout;
    },
  },

  onMounted() {
    this.getUser();
  },
});
