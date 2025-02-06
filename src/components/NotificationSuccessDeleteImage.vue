<template>
    <div class="toast--list" ref="toastList"></div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions('addNotification', [
            'setAddNoti',
            'setTypeNoti',
            'setTitleNoti',
        ]),
        addNotification() {
            if (this.getAddNoti) {
                const toastList = document.querySelector('.toast--list');

                if (!toastList)
                    return console.error('khong tim thay toast list');

                const toastItem = document.createElement('div');

                toastItem.classList.add(
                    'toast--item',
                    `toast--${this.getTypeNoti}`
                );

                let icon;

                if (this.getTypeNoti === 'success') {
                    icon = `
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        fill="#16a34a"
                        viewBox="0 0 256 256"
                    >
                        <path
                            d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
                        ></path>
                    </svg>
                    `;
                }

                if (this.getTypeNoti === 'error') {
                    icon = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#991b1b" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path></svg>
                    `;
                }

                toastItem.innerHTML = `
                <div class="icon">
                    ${icon}
                </div>
                <div class="content">
                    <div class="description">${this.getTitleNoti}</div>
                </div>
                <div class="btn-exit--toast">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="#1f2937"
                        viewBox="0 0 256 256"
                    >
                        <path
                            d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
                        ></path>
                    </svg>
                </div>
            `;

                toastList.insertAdjacentElement('beforeend', toastItem);

                const clear = setTimeout(() => {
                    toastList.removeChild(toastItem);
                }, 3000);

                toastItem.addEventListener('click', function (event) {
                    const btnExitToast =
                        event.target.closest('.btn-exit--toast');

                    if (!btnExitToast) return;

                    toastList.removeChild(toastItem);
                    clearTimeout(clear);
                });

                this.setAddNoti({ status: false });

                this.setTypeNoti({ typeNoti: '' });

                this.setTitleNoti({ titleNoti: '' });
            }
        },
    },
    computed: {
        ...mapGetters('addNotification', [
            'getAddNoti',
            'getTypeNoti',
            'getTitleNoti',
        ]),
    },
    watch: {
        getAddNoti: {
            handler() {
                this.addNotification();
            },
            immediate: true,
        },
    },
};
</script>

<style>
.toast--list {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.toast--item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: white;
    gap: 16px;
    overflow: hidden;
    animation: slide-in linear 0.5s, fade-out linear 1s 2s;
    transition: all 1s;
}

.toast--success {
    border: 1px solid #16a34a;
}

.toast--error {
    border: 1px solid #991b1b;
}

@keyframes slide-in {
    from {
        transform: translateX(calc(100% + 24px));
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes fade-out {
    to {
        opacity: 0;
    }
}

.icon {
    padding-left: 16px;
    align-self: stretch;
    display: flex;
    align-items: center;
}

.content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 12px;
}

.description {
    font-size: 16px;
    font-weight: 900;
}

.btn-exit--toast {
    padding: 16px;
    display: flex;
    justify-content: center;
}

.btn-exit--toast:hover {
    cursor: pointer;
    background-color: #d1d5db;
}
</style>
