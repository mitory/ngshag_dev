<template>
    <div class="py-5 pb-2 bg__blue text-white" style="min-height: 90vh;">
        <div class='container'>
            <div class="row gx-md-1 gx-lg-3 justify-content-end flex-md-row flex-column-reverse">
                <div class="col-12 col-md-8 mx-auto" :class="{'col-12': !site_pages.find(el => this.$route.path.includes(el))}">
                    <router-view class="templ-item__bg p-sm-5 p-2"></router-view>
                </div>
                <div class="col-12 col-md-3 d-sm-block mb-sm-0 mb-2" 
                    v-if="!site_pages.find(el => this.$route.path.includes(el))">
                    <LKNavBar class="align-self-center"></LKNavBar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LKNavBar from './LkNavBar.vue'

export default {
    data() {
        return {
            site_pages: [
                '/LK/set-user-skills',
                '/LK/change-password',
                '/LK/my-teams/', '/LK/my-tasks/'
            ]
        }
    },
    components: {
        LKNavBar
    },
    methods: {

    }
}
</script>

<style scoped></style>