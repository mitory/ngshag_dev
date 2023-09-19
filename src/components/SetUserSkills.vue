<template>
    <div>
        <div
            class="col-12 col-sm-12 col-md-11 col-lg-8 col-xl-6 col-xxl-5 mx-auto mt-5 p-1 border border-dark bg-secondary">
            <div class="typewriter my-auto">
                <p class="line m-0 pb-0 text-center fs-sm-5 text-mobile" v-for="(line, index) in textLines" :key="index">{{
                    line }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            text: [
                'Поздравляем с успешной регистрацией на платформе',
                'для проведения цифровых мероприятий! Это не только',
                'действенный способ усилить свои компетенции, но и',
                'возможность получить классные бонусы и предложение',
                'на работу в крупную ИТ-компанию.'
            ],
            textLines: [],
            line: 1,
            width: 0,
        };
    },
    methods: {
        handleResize() {
            this.$forceUpdate() // чтобы обновить отображение при изменении размера окна
        },
        appendLine: function () {
            const int = setInterval(() => { // time interval
                console.log(this.i)
                if (this.line < this.text.length) { // done = true when the end of array reached
                    this.textLines.push(this.text[this.line]) // concatenate word to the string
                    ++this.line;
                    console.log(this.textLines)
                } else {
                    clearInterval(int)
                }
            }, 3500) // interval duration, 1s
        },
        changeTextForMobile: function () {
            if (window.innerWidth <= 576) {
                console.log(window.innerWidth)
                this.text = [
                    'Поздравляем с успешной регистрацией',
                    'на платформе для проведения цифровых',
                    'мероприятий! Это не только действенный',
                    'способ усилить свои компетенции, но и',
                    'возможность получить классные бонусы и',
                    'предложение на работу в крупную ИТ-компанию.'
                ]
            }
            if (window.innerWidth <= 510) {
                console.log(window.innerWidth)
                this.text = [
                    'Поздравляем с успешной регистрацией',
                    'на платформе для проведения цифровых',
                    'мероприятий! Это не только действенный',
                    'способ усилить свои компетенции, но и',
                    'возможность получить классные бонусы и',
                    'предложение на работу в крупную',
                    'ИТ-компанию.'
                ]
            }
        }
    },
    created() {
        window.addEventListener('resize', () => {
            this.width = document.documentElement.clientWidth;
        })
        this.changeTextForMobile()
    },
    mounted() {
        window.addEventListener('resize', this.handleResize)
        this.textLines.push(this.text[0])
        this.appendLine();

    },
    unmounted() {
        window.removeEventListener('resize', this.handleResize)
    },
};
</script>
  
<style scoped>
@media (max-width: 510px) {
    .text-mobile {
        font-size: 14px;
    }
}

@media (max-width: 389px) {
    .text-mobile {
        font-size: 12px;
    }
}

/* .typewriter {
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
} */
</style>
  