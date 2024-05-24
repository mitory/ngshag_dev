<template>
    <div class="range-slider">
        <input v-model="sliderValue" :update="setValue(sliderValue)" type="range" min="0" max="3" class="slider-field cursor col-12"/>
        <br />
    </div>
</template>
  
<script>
import { ref } from "vue";

export default {
    props: {
        value: String,
    },
    emits: ['update:value'],
    data() {
        return {
            sliderValue: ref(0),
        };
    },
    created(){
        this.setPosition(this.value);
    },
    watch: {
        value(index) {
            this.setPosition(index)
        },
    },
    methods: {
        setPosition(index) {
            this.sliderValue = ref(index);
        },
        setValue(index){
            this.$emit("update:value", String(index));
        }
    }
};
</script>
  
<style scoped>

</style>
  