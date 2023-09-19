<template>
    <div>
        <div v-if="step === 1">
            <div
                class="col-12 col-sm-12 col-md-11 col-lg-8 col-xl-6 col-xxl-5 mx-auto mt-5 p-1 border border-dark bg-secondary">
                <div class="typewriter my-auto">
                    <p class="line m-0 pb-0 text-center fs-sm-5 text-mobile" v-for="(line, index) in textLines"
                        :key="index">{{
                            line }}</p>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <button @click="nextStep" type="button" class="btn btn-primary">Продолжить</button>
            </div>
        </div>
        <div v-if="step === 2">
            <div
                class="col-12 col-sm-12 col-md-11 col-lg-8 col-xl-6 col-xxl-5 mx-auto mt-5 p-1 border border-dark bg-secondary">
                <div class="typewriter my-auto">
                    <p>Выбери направления, в которых ты готов подтвердить свои компетенции:</p>
                    <p class="line m-0 pb-0 text-center fs-sm-5 text-mobile" v-for="(line, index) in textLines"
                        :key="index">{{
                            line }}</p>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <button @click="nextStep" type="button" class="btn btn-primary">Продолжить</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { userService } from '../services/user.service'

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
            categories_skills: [],
            step: 1
        };
    },
    methods: {
        nextStep: function () {
            ++this.step;
        },
        appendLine: function () {
            const int = setInterval(() => {
                if (this.line < this.text.length) {
                    this.textLines.push(this.text[this.line])
                    ++this.line;
                } else {
                    clearInterval(int)
                }
            }, 2000)
        },
        changeTextForMobile: function () {
            if (window.innerWidth <= 576) {
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
        this.changeTextForMobile()
        userService.getSkills().then(response => {

            this.categories_skills = response
        })

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
  