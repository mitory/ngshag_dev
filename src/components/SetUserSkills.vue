<template>
    <div class="container">
        <div
            class="col-12 col-sm-12 col-md-11 col-lg-8 col-xl-6 col-xxl-5 mx-auto p-1 border border-dark bg-secondary mb-3">
            <div v-if="step === 1" class="">
                <div style="height: 100vh" class="row d-flex flex-column justify-content-center"></div>
                <div class="typewriter my-auto">
                    <p class="line m-0 pb-0 text-center fs-sm-5 text-mobile" v-for="(line, index) in textLines"
                        :key="index">{{
                            line }}
                    </p>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <button @click="nextStep" type="button" class="btn btn-primary">Продолжить</button>
            </div>
        </div>
        <div v-if="step === 2">
            <div class="col-12 col-sm-12 col-md-11 col-lg-8 col-xl-8 mx-auto mt-5 p-1 border border-dark bg-secondary">
                <div class="typewriter my-auto">
                    <p class="line m-0 text-center text-mobile">
                        Выбери направления, в которых ты готов подтвердить свои компетенции:
                    </p>
                </div>
            </div>
            <div class="" v-for="category in categories_skills" :key="category.id">
                <h2>{{ category.name }}</h2>
                <div v-for="skill in category.skills" :key="skill.id" class="form-check mb-3">
                    <input @change="add_skill(skill.id)" class="form-check-input" type="checkbox" v-bind:id="skill.id">
                    <label class="form-check-label" v-bind:for="skill.id">
                        {{ skill.name }}
                    </label>
                </div>
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
            set_skills_user: [],
            step: 1
        };
    },
    methods: {
        add_skill: function (id) {
            if (!this.set_skills_user.includes(id)) {
                this.set_skills_user.push(id)
            } else {
                this.set_skills_user = this.set_skills_user.filter(function (val) {
                    return val != id;
                });
            }
            console.log(this.set_skills_user)
        },
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

            console.log(response)
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
  