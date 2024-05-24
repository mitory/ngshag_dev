<template>
    <div class="d-flex justify-content-center align-items-center">
        <p class="my-0 mt-1">{{ text_about }}
        <router-link class="text-white link hover-btn" :to='path'>
            {{ text_button }}
        </router-link>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        text_about: String,
        text_button: String,
        path: String
    },
    data() {
        return {
            
        }
    },
    components: {
        
    },
    methods: {
        
    }
}
</script>

<style scoped>
    
</style>