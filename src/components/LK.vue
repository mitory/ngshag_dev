<template>
    <div class='container'>
        <div class="row gx-sm-5 justify-content-end">
            <div class="col-sm-3 d-sm-none">
              <LKNavBar class="align-self-center"></LKNavBar>
            </div>
            <div class="col-sm-8">
                <router-view class="border p-1 p-lg-5"></router-view>
            </div>
            <div class="col-sm-3 d-none d-sm-block">
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