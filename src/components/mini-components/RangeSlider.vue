<template>
    <div class="range-slider">
        <div class="scale">
            <div v-for="(label, index) in labels" :key="index"
                class="me-1 d-flex align-items-center justify-content-center scale-label btn btn-light"
                :class="{ active: value === index }" @click="setValue(index)">
                {{ label }}
            </div>
        </div>
        <div class="slider-container">
            <div class="slider" :style="{ left: 0, width: sliderPosition }"></div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        value: Number,
    },
    emits: ['update:value'],
    data() {
        return {
            labels: ["Хуже", "На уровне", "Лучше", "Гораздо лучше"],
            sliderPosition: this.setPosition(this.value),
        };
    },
    computed: {
        sliderValue() {
            // Рассчитываем значение ползунка на основе ширины контейнера и позиции
            return Math.round((this.sliderPosition / this.scaleWidth));
        },
        scaleWidth() {
            return (this.labels.length) * 100;
        },
    },
    watch: {
        value(index) {
            // Обновляем позицию ползунка при изменении значения извне
            this.setPosition(index)
            //this.sliderPosition = (newValue / 3) * this.scaleWidth + "px";
        },
    },
    methods: {
        setPosition(index) {
            if (index === 0) {
                this.sliderPosition = 0
            }
            if (index === 1) {
                this.sliderPosition = 33 + '%'
            }
            if (index === 2) {
                this.sliderPosition = 66 + '%'
            }
            if (index === 3) {
                this.sliderPosition = 100 + '%'
            }
        },
        setValue(index) {
            // Обновляем значение при нажатии на шкалу и сдвигаем ползунок
            this.$emit("update:value", index);
            this.setPosition(index)
            //this.sliderPosition = (index / 3) * this.scaleWidth + "px";
        },
    },
    created() {
        //this.setValue(this.value)
    },
};
</script>
  
<style scoped>
.range-slider {
    display: inline-block;
    width: 100%;
    padding: 10px;
    position: relative;
}

.scale {
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    width: 100%;
}

.scale-label {
    flex: 1;
    text-align: center;
    cursor: pointer;
    transition: opacity 0.3s;
}

.scale-label.active {
    opacity: 1;
}

.scale-label:hover {
    opacity: 0.7;
}

.slider-container {
    width: 100%;
    height: 5px;
    background-color: #ddd;
    position: relative;
    margin-top: 10px;
}

.slider {
    width: 0;
    height: 5px;
    background-color: #044285;
    position: absolute;
    top: 0;
    /* transform: translateX(-50%);
    transition: left 0.3s; */
}
</style>
  