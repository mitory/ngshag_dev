<template>
    <div>
        <div class="col-sm-8 m-auto">
            <div class="typewriter">
                <p class="line" v-for="(line, index) in textLines" :key="index">{{ line }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            text: `Поздравляем с успешной регистрацией на платформе для проведения \nцифровых мероприятий!
          Это не только действенный способ усилить свои компетенции, \nно и возможность получить классные бонусы и предложение \nна работу в крупную ИТ-компанию.`,
            textLines: [],
        };
    },
    mounted() {
        this.textLines = this.text.split('\n');
    },
};
</script>
  
<style scoped>
.typewriter {
    font-family: monospace;
    white-space: pre;
    overflow: hidden;
}

.line {
    overflow: hidden;
    white-space: nowrap;
    animation: typing 5s steps(40) forwardsW;
}

@keyframes typing {
    0% {
        width: 0;
    }

    100% {
        width: 100%;
    }
}
</style>
  