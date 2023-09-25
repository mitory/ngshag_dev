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

                <div v-if="step === 2" class="mb-4">
                    <div class="col-lg-10 col-xl-9 col-xxl-9 mx-auto">
                        <div class="typewriter p-1 border border-dark bg-secondary mb-3 mt-3">
                            <p class="line m-0 pb-0 text-center text-mobile" v-for="(line, index) in textLines2"
                                :key="index">
                                {{ line }}
                            </p>
                        </div>
                    </div>
                    <carousel :items-to-show="this.count_slides" class="mb-3">
                        <Slide
                            class="item d-flex flex-column justify-content-center align-items-start mb-4 bg-primary bg-gradient border border-primary-subtle rounded mx-lg-2 p-2 text-white"
                            v-for="category in categories_skills" :key="category.id">
                            <h2 class="mx-auto mb-3">{{ category.name }}</h2>
                            <div class="mx-auto text-start">
                                <div v-for="skill in category.skills" :key="skill.id" class="form-check mb-3">
                                    <input @change="add_skill(skill.id)" class="form-check-input" type="checkbox"
                                        v-bind:id="skill.id">
                                    <label class="form-check-label" v-bind:for="skill.id">
                                        {{ skill.name }}
                                    </label>
                                </div>
                            </div>
                            <!-- <Slider class="mx-auto my-4" :format="format" :min="1" :max="4" v-model="level_now"
                                style="width: 70%" /> -->
                            <p class="text-start">Мой уровень относительно учебной программы:</p>
                            <range-slider v-model:value="level_now" />
                        </Slide>
                        <Slide class="item"></Slide>
                        <template #addons>
                            <Navigation class="d-none d-md-block" />
                            <Pagination class="ps-0" />
                        </template>
                    </carousel>


                    <div class="d-flex justify-content-center">
                        <button @click="addSkillToUser" type="button" class="btn btn-primary">Завершить настройку</button>
                    </div>
                    <Slider v-model="level_now" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { userService } from '../services/user.service'
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import RangeSlider from "./mini-components/RangeSlider.vue";
import Slider from '@vueform/slider'

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
            step: 2,
            category_step: 1,
            width: 0,
            count_slides: 3,
            level_now: 0,
            format: function (level_now) {
                if (level_now === 1) {
                    return 'Хуже учебной программы'
                }
                if (level_now === 2) {
                    return 'Уровень учебной программы'
                }
                if (level_now === 3) {
                    return 'Выше уровня учебной программы'
                }
                if (level_now === 4) {
                    return 'Гораздо выше уровня учебной программы'
                }
                return ''
            },
            prospective_level: 1
        };
    },
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
        RangeSlider,
        Slider
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
        setWidth: function () {
            this.width = window.innerWidth;
            console.log(this.width)
        },
        setCountSlides: function () {
            if (window.innerWidth <= 992) {
                this.count_slides = 1.5
            }
            if (window.innerWidth <= 430) {
                this.count_slides = 1
            }
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
        this.setWidth();
        this.setCountSlides();
        userService.getSkills().then(response => {
            this.categories_skills = response
        })
    },
    mounted() {
        this.textLines1.push(this.text1[0])
        this.textLines2.push(this.text2[0])
        if (this.step === 1) {
            this.appendLine(this.line1, this.text1, this.textLines1);
        }


    },
    unmounted() {

    },
};
</script>
 
<style src="@vueform/slider/themes/default.css"></style>
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
  