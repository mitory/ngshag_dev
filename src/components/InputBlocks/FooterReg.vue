<template>
    <div>
        <div class="d-flex justify-content-center mb-2">
            <button v-if="step !== 1 && step !== -1" @click="backStep" type="button" class="me-3 btn btn-light">
                {{ regText.backStep1 }}
            </button>
            <button v-if="step !== 4 && step !== -1" @click="nextStep" type="button" class="btn btn-primary">
                {{ regText.nextStep1 }}
            </button>
            <button v-if="step === -1" @click="nextStep" class="mb-5 btn p-0 text-decoration-underline text-white link hover-btn">
                {{ regText.nextStep2 }}
            </button>
            <button v-if="step === 4" type="submit" class="btn btn-primary">{{ regText.button_reg }}</button>
        </div>
        <div v-if="step === 1" class="d-flex justify-content-center align-items-center">
            <p class="my-auto">{{ regText.about_login }}</p> 
            <router-link class="btn text-decoration-underline text-white link hover-btn" to="/login">
                {{ regText.login }}
            </router-link>
        </div>
        <div v-if="step === 1" class="d-flex flex-column justify-content-center align-items-center">
            <p class="my-0 mt-1">{{ regText.about_backStep2 }}</p> 
            <button @click="backStep" class="mb-2 btn p-0 text-decoration-underline text-white link hover-btn">
                {{ regText.backStep2 }}
            </button>
        </div>
    </div>
</template>

<script>
import { regText } from '../CoreSystemComponentsForUser/core.text'

export default {
    props: {
        step: Number,
    },
    data() {
        return {
            regText: {}
        }
    },
    components: {
        
    },
    created(){
        this.regText = regText;
    },
    methods: {
        nextStep() {
            this.$emit('next-step');
        },
        backStep() {
            this.$emit('back-step');
        },
    }
}
</script>

<style scoped>
</style>