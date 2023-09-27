<template>
    <div class='container'>
        <div class="row gx-3 gx-md-5 justify-content-end flex-sm-row flex-column-reverse">
            <div class="col-sm-8">
                <router-view class="border p-3 p-md-5"></router-view>
            </div>
            <div class="col-sm-4 col-md-3 d-sm-block mb-sm-0 mb-2">
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