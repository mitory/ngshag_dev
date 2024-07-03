<template>
    <div @click="handleClickOutside">
        <div class="wrapper">
            <div class="d-flex justify-content-sm-end justify-content-center">
                <div ref="notifyMenu" class="col-xl-2 col-md-3 col-sm-4 col-10 bg_second-blue notify-menu mb-5 text-white">
                    <div class="px-4 py-3 d-flex flex-column gap-2">
                        <div class="text-white fw-bold notify-menu__title text-center text-uppercase" v-if="get_new.length">
                            Новые<br>уведомления
                        </div>
                        <br v-else class="d-lg-none">
                        <div v-for="notification in get_new" :key="notification.id">
                            <p class="m-0 notify-item__content">{{ notification.message }}</p>
                            <p class="text-blue notify-item__date m-0">Получено {{ toStringDate(new Date(Date.parse(notification.created_at))) }}</p>
                            <hr>
                        </div>
                        <div class="text-white fw-bold notify-menu__title text-center text-uppercase"
                            v-if="get_new.length && get_old.length">
                            Прочитанные
                        </div>
                        <div v-for="notification in get_old" :key="notification.notification">
                            <p class="m-0 notify-item__content">{{ notification.message }}</p>
                            <p class="text-blue notify-item__date m-0">Получено {{ toStringDate(new Date(Date.parse(notification.create_at))) }}</p>
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { validateService } from '../services/validate.service';

export default {
    data() {
        return {}
    },
    computed: {
        get_new(){
            return this.$store.state.notify.new_notifications
        },
        get_old(){
            return this.$store.state.notify.old_notifications
        },
        is_start(){
            return this.$store.state.notify.status
        }
    },
    created(){
        if(!this.is_start){
            this.$store.dispatch("notify/start")
        }
    },
    components: {
        
    },
    methods: {
        handleClickOutside(event) {
            const notifyMenu = this.$refs.notifyMenu;
            if (notifyMenu && !notifyMenu.contains(event.target)) {
                this.$store.dispatch("notify/change_show")
            }
        },
        toStringDate(date){
            return validateService.toStringDate(date)
        }
    }
}
</script>

<style scoped>
.wrapper {
    padding: 0 2em;
}
.close {
    width: 28px;
    color: var(--color-white);
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: var(--color-black);
    text-decoration: none;
    cursor: pointer;
  }
    .notify-menu {
        border-radius: 0 0 10px 10px;
        max-height: 80vh;
        overflow-y: auto;
    }

    /* WebKit Browsers (Chrome, Safari) */
.notify-menu::-webkit-scrollbar {
    width: 4px; 
}

.notify-menu::-webkit-scrollbar-track {
    background: transparent; 
    border-radius: 20px; 
}

.notify-menu::-webkit-scrollbar-thumb {
    background: var(--color-white); 
    border-radius: 20px; 
}

.notify-menu::-webkit-scrollbar-thumb:hover {
    background: var(--color-pre-main-blue); 
}

.notify-menu {
    scrollbar-width: thin; /* делаем скроллбар тоньше */
    scrollbar-color: var(--color-white) transparent; /* цвет бегунка и фона */
}
    @media (max-width: 992px) {
        .notify-menu {
            padding-top: 32px;
        }
    }
    .notify-menu__title {
        /* padding: 0.5rem;
        padding-top: 5px;
        border-radius: 50% 50% 50% 40px / 100% 100% 50% 50px; */
        margin-top: 10px;
        padding: 5px 10px;
        border-radius: 10px;
    }
    .notify-item__content {
        font-size: 14px;
    }
    .notify-item__date {
        font-size: 13px;
    }
</style>