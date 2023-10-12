<template>
    <div class="container">
        <div class="row">
            <div class="mx-auto">
                <div class="mb-4">
                    <div class="mx-auto my-3">
                        <h5 class="text-center">
                            Выбери направления, в которых ты готов подтвердить свои компетенции:
                        </h5>
                    </div>
                    <carousel :items-to-show="1" class="mb-3">
                        <Slide
                            class="item d-flex flex-column justify-content-center align-items-start mb-4 bg-primary bg-gradient border p-1 border-primary-subtle rounded text-white"
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
                        <!-- <Slide v-if="width >= 768" class="item"></Slide> -->
                        <template #addons>
                            <Navigation class="navig d-none d-md-block px-md-0" />
                            <Pagination class="ps-0" />
                        </template>
                    </carousel>


                    <div class="d-flex justify-content-center">
                        <button @click="addSkillToUser()" type="button" class="btn btn-primary">Завершить
                            настройку</button>
                    </div>
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


export default {
    data() {
        return {
            categories_skills: [],
            set_skills_user: [],
            category_step: 1,
            width: 0,
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
                localStorage.removeItem('user_data');
                this.$router.push("/LK");
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
        setWidth: function () {
            this.width = window.innerWidth;
        }

    },
    created() {
        this.setWidth();
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

    },
    unmounted() {

    },
};
</script>
 
<style scoped>
.navig {
    left: -200px !important;
}

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
  