<template>
    <div class="load">
        <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="text">Vui lòng đợi trong giây lát ...</div>
    </div>
</template>

<script>
import qs from 'qs';
import { mapActions } from 'vuex';
export default {
    setup() {},
    methods: {
        ...mapActions('auth', ['setToken']),

        moveToHomePage() {
            this.$router.push({ name: 'home' });
        },

        backLoginPage() {
            this.$router.push({ name: 'back' });
        },
    },
    beforeRouteEnter(to, _, next) {
        const query = qs.parse(to.hash.replace('#', ''));

        const token = localStorage.getItem('token');
        if (!token && query.access_token) {
            localStorage.setItem('token', query.access_token);
        }

        next((vm) => {
            if (!token && query.access_token) {
                vm.setToken({ value: query.access_token });
            }
            setTimeout(function () {
                if (localStorage.getItem('token')) {
                    vm.moveToHomePage();
                } else {
                    vm.backLoginPage();
                }
            }, 2000);
        });
    },
};
</script>

<style scoped>
.load {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 32px;
    background-color: #fffd63;
}

.text {
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 0.5px;
    line-height: 1.7;
}

.lds-roller,
.lds-roller div,
.lds-roller div:after {
    box-sizing: border-box;
}
.lds-roller {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}
.lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
}
.lds-roller div:after {
    content: ' ';
    display: block;
    position: absolute;
    width: 7.2px;
    height: 7.2px;
    border-radius: 50%;
    background: #0a0b1e;
    margin: -3.6px 0 0 -3.6px;
}
.lds-roller div:nth-child(1) {
    animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
    top: 62.62742px;
    left: 62.62742px;
}
.lds-roller div:nth-child(2) {
    animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
    top: 67.71281px;
    left: 56px;
}
.lds-roller div:nth-child(3) {
    animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
    top: 70.90963px;
    left: 48.28221px;
}
.lds-roller div:nth-child(4) {
    animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
    top: 72px;
    left: 40px;
}
.lds-roller div:nth-child(5) {
    animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
    top: 70.90963px;
    left: 31.71779px;
}
.lds-roller div:nth-child(6) {
    animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
    top: 67.71281px;
    left: 24px;
}
.lds-roller div:nth-child(7) {
    animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
    top: 62.62742px;
    left: 17.37258px;
}
.lds-roller div:nth-child(8) {
    animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
    top: 56px;
    left: 12.28719px;
}
@keyframes lds-roller {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
