<template>
    <div class="container">
        <div class="row" style="height: 100vh">
            <div class="m-auto">
                <div v-if="step === 1" class="">
                    <div class="col-md-10 col-lg-8 col-xl-8 col-xxl-8 mx-auto">
                        <div class="typewriter p-1 border border-dark bg-secondary mb-3">
                            <p class="line m-0 pb-0 text-center fs-sm-5 text-mobile" v-for="(line, index) in textLines1"
                                :key="index">
                                {{ line }}
                            </p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button @click="nextStep" type="button" class="btn btn-primary">Продолжить</button>
                    </div>
                </div>

                <div v-if="step === 2">
                    <div class="col-lg-10 col-xl-9 col-xxl-9 mx-auto">
                        <div class="typewriter p-1 border border-dark bg-secondary mb-3 mt-3">
                            <p class="line m-0 pb-0 text-center text-mobile" v-for="(line, index) in textLines2"
                                :key="index">
                                {{ line }}
                            </p>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-center">
                        <div class="" v-for="category in categories_skills" :key="category.id"
                            v-show="category_step === category.id">
                            <h2>{{ category.name }}</h2>
                            <div v-for="skill in category.skills" :key="skill.id" class="form-check mb-3">
                                <input @change="add_skill(skill.id)" class="form-check-input" type="checkbox"
                                    v-bind:id="skill.id">
                                <label class="form-check-label" v-bind:for="skill.id">
                                    {{ skill.name }}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button v-bind:disabled="category_step === 1" @click="backCategoryStep" type="button"
                            class="me-2 btn btn-light">Назад</button>
                        <button v-bind:class="{ 'd-none': category_step === categories_skills.length }"
                            @click="nextCategoryStep" type="button" class="btn btn-primary">Следующий шаг</button>
                        <button v-bind:class="{ 'd-none': category_step < categories_skills.length }"
                            @click="addSkillToUser" type="button" class="btn btn-primary">Продолжить</button>
                    </div>
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
            text1: [
                'Поздравляем с успешной регистрацией на платформе',
                'для проведения цифровых мероприятий! Это не только',
                'действенный способ усилить свои компетенции, но и',
                'возможность получить классные бонусы и предложение',
                'на работу в крупную ИТ-компанию.'
            ],
            text2: [
                'Выбери направления, в которых ты готов подтвердить свои компетенции:'
            ],
            textLines2: [],
            textLines1: [],
            line1: 1,
            line2: 1,
            categories_skills: [],
            set_skills_user: [],
            step: 1,
            category_step: 1
        };
    },
    methods: {
        addSkillToUser: function () {
            userService.postSkills(this.set_skills_user).then(() => {
                this.$router.push("/");
            })
        },
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
            if (this.step === 2) {
                this.appendLine(this.line2, this.text2, this.textLines2);
            }
        },
        nextCategoryStep: function () {
            ++this.category_step;
        },
        backCategoryStep: function () {
            --this.category_step;
        },
        appendLine: function (line, text, textLines) {
            const int = setInterval(() => {
                if (line < text.length) {
                    textLines.push(text[line])
                    ++line;
                    console.log(`${this.step} ${line}`)
                } else {
                    clearInterval(int)
                }
            }, 2000)
        },
        changeTextForMobile: function () {
            if (window.innerWidth <= 992) {
                this.text2 = [
                    'Выбери направления, в которых ты готов',
                    'подтвердить свои компетенции:'
                ]
            }
            if (window.innerWidth <= 768) {
                this.text1 = [
                    'Поздравляем с успешной регистрацией',
                    'на платформе для проведения цифровых',
                    'мероприятий! Это не только действенный',
                    'способ усилить свои компетенции, но и',
                    'возможность получить классные бонусы и',
                    'предложение на работу в крупную ИТ-компанию.'
                ]
            }
            if (window.innerWidth <= 510) {
                this.text1 = [
                    'Поздравляем с успешной регистрацией',
                    'на платформе для проведения цифровых',
                    'мероприятий! Это не только действенный',
                    'способ усилить свои компетенции, но и',
                    'возможность получить классные бонусы и',
                    'предложение на работу в крупную',
                    'ИТ-компанию.'
                ]
            }
            if (window.innerWidth <= 360) {
                this.text2 = [
                    'Выбери направления,',
                    'в которых ты готов',
                    'подтвердить свои компетенции:'
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
        this.textLines1.push(this.text1[0])
        this.textLines2.push(this.text2[0])
        if (this.step === 1) {
            this.appendLine(this.line1, this.text1, this.textLines1);
        }


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

@media (max-width: 410px) {
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
  