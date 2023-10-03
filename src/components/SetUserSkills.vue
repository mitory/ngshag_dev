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
                                    <input @change="add_skill(category.id, skill.id)" class="form-check-input"
                                        type="checkbox" v-bind:id="skill.id">
                                    <label class="form-check-label" v-bind:for="skill.id">
                                        {{ skill.name }}
                                    </label>
                                </div>
                            </div>
                            <div v-if="categories_levels && categories_levels[category.id] && categories_levels[category.id].status"
                                class="mb-3 mx-auto">
                                <p class="text-start">Мой уровень относительно учебной программы:</p>
                                <range-slider v-model:value="categories_levels[category.id].level_now"
                                    @update:value="onLevelNowChange(category.id)" />
                            </div>
                            <div v-if="categories_levels && categories_levels[category.id] && categories_levels[category.id].status"
                                class="mx-auto">
                                <p class="text-start">Желаемый уровень:</p>
                                <range-slider v-model:value="categories_levels[category.id].prospective_level"
                                    @update:value="onProspectiveNowChange(category.id)" />
                            </div>
                        </Slide>
                        <Slide v-if="width >= 768" class="item"></Slide>
                        <template #addons>
                            <Navigation class="d-none d-md-block px-md-0" />
                            <Pagination class="ps-0" />
                        </template>
                    </carousel>


                    <div class="d-flex justify-content-center">
                        <button @click="addSkillToUser(); nextStep()" type="button" class="btn btn-primary">Завершить
                            настройку</button>
                    </div>
                </div>

                <div v-if="step === 3" class="">
                    <div class="col-md-10 col-lg-8 col-xl-8 col-xxl-8 mx-auto">
                        <div class="typewriter p-1 border border-dark bg-secondary mb-3">
                            <p class="line m-0 pb-0 text-center fs-sm-5 text-mobile" v-for="(line, index) in textLines3"
                                :key="index">
                                {{ line }}
                            </p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button @click="nextStep" type="button" class="btn btn-primary">Понятно</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { userService } from '../services/user.service'
import { textService } from '../services/text.service'
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import RangeSlider from "./mini-components/RangeSlider.vue";

export default {
    data() {
        return {
            text1: [
                'Поздравляем с успешной регистрацией на платформе',
                'для проведения цифровых мероприятий! Это не только',
                'действенный способ усилить свои компетенции, но и',
                'возможность получить классные бонусы и предложение',
                'на работу в крупную ИТ-компанию.',
                'Далее необходимо выяснить направления,',
                'по которым ты будешь участвовать в Чемпионате'
            ],
            text2: [
                'Выбери направления, в которых ты готов подтвердить свои компетенции:'
            ],
            text3: [
                'Отлично! С 3 по 7 ноября 2023 на площадке',
                'ДЦ «Октябрьский» состоится студенческий чемпионат',
                'в области информационных технологий.',
                'Извещение о твоих последующих действиях и отборочных',
                'заданиях придёт на указанный адрес электронной почты',
                'и в личный кабинет.'
            ],
            textLines3: [],
            textLines2: [],
            textLines1: [],
            line1: 1,
            line2: 1,
            line3: 1,
            categories_skills: [],
            set_skills_user: [],
            step: 1,
            category_step: 1,
            width: 0,
            count_slides: 2,
            categories_levels: [],
            level_now: 0,
            prospective_level: 1
        };
    },
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
        RangeSlider
    },
    methods: {
        onLevelNowChange: function (id_cat) {
            const index = this.set_skills_user.findIndex(obj => obj.id === id_cat)
            if (this.categories_levels[id_cat].level_now > this.categories_levels[id_cat].prospective_level) {
                this.categories_levels[id_cat].prospective_level = this.categories_levels[id_cat].level_now
            }
            this.set_skills_user[index].level_now = this.categories_levels[id_cat].level_now + 1
        },
        onProspectiveNowChange: function (id_cat) {
            const index = this.set_skills_user.findIndex(obj => obj.id === id_cat)
            if (this.categories_levels[id_cat].prospective_level < this.categories_levels[id_cat].level_now) {
                this.categories_levels[id_cat].level_now = this.categories_levels[id_cat].prospective_level
            }
            this.set_skills_user[index].prospective_level = this.categories_levels[id_cat].prospective_level + 1
        },
        addSkillToUser: function () {
            userService.postSkills(this.set_skills_user).then(() => {
                this.$store.dispatch('alert/sendMessage', { message: 'Ваши навыки добавлены в список!', type: 'Success' })
            }).catch(() => {
                this.$store.dispatch('alert/sendMessage', { message: 'Что-то пошло не так...', type: 'Danger' })
            })
        },
        add_skill: function (id_cat, id_skill) {
            const obj = this.set_skills_user.find(obj => obj.id === id_cat)
            if (obj === undefined) {
                this.categories_levels[id_cat].status = true
                this.set_skills_user.push({
                    id: id_cat,
                    skills: [id_skill],
                    level_now: this.categories_levels[id_cat].level_now + 1,
                    prospective_level: this.categories_levels[id_cat].prospective_level + 1
                })
            } else {
                if (!obj.skills.includes(id_skill)) {
                    obj.skills.push(id_skill)
                } else {
                    obj.skills = obj.skills.filter(function (val) {
                        return val !== id_skill;
                    })
                    if (obj.skills.length === 0) {
                        this.categories_levels[id_cat].status = false
                        this.set_skills_user = this.set_skills_user.filter(function (val) {
                            return val !== obj
                        })
                        this.categories_levels[id_cat].level_now = 0
                        this.categories_levels[id_cat].prospective_level = 0
                    }
                }
            }
        },
        nextStep: function () {
            ++this.step;
            if (this.step === 2) {
                textService.appendLine(this.line2, this.text2, this.textLines2);
            }
            if (this.step === 3) {
                textService.appendLine(this.line3, this.text3, this.textLines3)
            }
            if (this.step === 4) {
                this.$router.push("/");
            }
        },
        setWidth: function () {
            this.width = window.innerWidth;
        },
        setCountSlides: function () {
            if (window.innerWidth <= 992) {
                this.count_slides = 1.5
            }
            if (window.innerWidth <= 530) {
                this.count_slides = 1
            }
        },
        changeTextForMobile: function () {
            if (window.innerWidth <= 992) {
                this.text2 = [
                    'Выбери направления, в которых ты готов',
                    'подтвердить свои компетенции:'
                ]
                this.text3 = [
                    'Отлично! С 3 по 7 ноября 2023 на площадке',
                    'ДЦ «Октябрьский» состоится студенческий',
                    'чемпионат в области информационных технологий.',
                    'Извещение о твоих последующих действиях и',
                    'отборочных заданиях придёт на указанный адрес',
                    'электронной почты и в личный кабинет.'
                ]
            }
            if (window.innerWidth <= 768) {
                this.text1 = [
                    'Поздравляем с успешной регистрацией',
                    'на платформе для проведения цифровых',
                    'мероприятий! Это не только действенный',
                    'способ усилить свои компетенции, но и',
                    'возможность получить классные бонусы и',
                    'предложение на работу в крупную ИТ-компанию.',
                    'Далее необходимо выяснить направления,',
                    'по которым ты будешь участвовать в Чемпионате'
                ]
            }
            if (window.innerWidth <= 541) {
                this.text3 = [
                    'Отлично! С 3 по 7 ноября 2023 на площадке',
                    'ДЦ «Октябрьский» состоится студенческий',
                    'чемпионат в области информационных',
                    'технологий. Извещение о твоих последующих',
                    'действиях и отборочных заданиях придёт на',
                    'указанный адрес электронной почты',
                    'и в личный кабинет.'
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
                    'ИТ-компанию.',
                    'Далее необходимо выяснить направления,',
                    'по которым ты будешь участвовать',
                    'в Чемпионате'
                ]
            }
            if (window.innerWidth <= 439) {
                this.text3 = [
                    'Отлично! С 3 по 7 ноября 2023',
                    'на площадке ДЦ «Октябрьский»',
                    'состоится студенческий чемпионат',
                    'в области информационных технологий.',
                    'Извещение о твоих последующих действиях',
                    'и отборочных заданиях придёт на',
                    'указанный адрес электронной почты',
                    'и в личный кабинет.'
                ]
            }
            if (window.innerWidth <= 359) {
                this.text1 = [
                    'Поздравляем с успешной регистрацией',
                    'на платформе для проведения',
                    'цифровых мероприятий! Это не только',
                    'действенный способ усилить свои',
                    'компетенции, но и возможность',
                    'получить классные бонусы',
                    'и предложение на работу в крупную',
                    'ИТ-компанию.',
                    'Далее необходимо выяснить',
                    'направления, по которым ты будешь',
                    'участвовать в Чемпионате'
                ]
                this.text2 = [
                    'Выбери направления,',
                    'в которых ты готов',
                    'подтвердить свои компетенции:'
                ]
                this.text3 = [
                    'Отлично! С 3 по 7 ноября 2023',
                    'на площадке ДЦ «Октябрьский»',
                    'состоится студенческий чемпионат',
                    'в области информационных технологий.',
                    'Извещение о твоих последующих',
                    'действиях и отборочных заданиях',
                    'придёт на указанный адрес',
                    'электронной почты',
                    'и в личный кабинет.'
                ]
            }
        }
    },
    created() {
        this.changeTextForMobile()
        this.setWidth();
        this.setCountSlides();
    },
    async beforeCreate() {
        try {
            const response = await userService.getSkills();
            this.categories_skills = response;
            this.categories_levels = this.categories_skills.map(() => ({
                level_now: 0,
                prospective_level: 0,
                status: false,
            }));
            this.categories_levels.push({ level_now: 0, prospective_level: 0, status: false })
        } catch (error) {
            this.$store.dispatch('alert/sendMessage', { message: 'Не получен ответ от сервера', type: 'Danger' })
        }
    },
    mounted() {

        this.textLines1.push(this.text1[0])
        this.textLines2.push(this.text2[0])
        this.textLines3.push(this.text3[0])
        if (this.step === 1) {
            textService.appendLine(this.line1, this.text1, this.textLines1);
        }
        if (this.step === 2) {
            textService.appendLine(this.line2, this.text2, this.textLines2);
        }
        if (this.step === 3) {
            textService.appendLine(this.line3, this.text3, this.textLines3);
        }


    },
    unmounted() {

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
</style>
  