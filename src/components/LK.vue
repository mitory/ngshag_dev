<template>
    <div class='container'>
        <div class="row gx-5 justify-content-end">
            <div class="col-sm-8">
                <router-view class="border p-5"></router-view>
            </div>
            <div class="col-sm-3">
                <LKNavBar class="align-self-center"></LKNavBar>
            </div>
        </div>
    </div>
</template>

<script>
import LKNavBar from '../components/LkNavBar.vue'

export default {
    data() {
        return {

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