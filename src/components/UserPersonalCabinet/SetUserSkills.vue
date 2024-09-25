<template>
    <div class="mx-auto setUserSkills">
        <BackLink text='назад' />
        <div class="mb-4">
            <div class="mx-auto my-3">
                <h5 class="text-center mx-auto text-uppercase mb-4 col-sm-10 fs-6 fs-sm-3">
                    Выбери направления, в которых ты готов подтвердить свои компетенции:
                </h5>

            </div>
            <swiper class="mb-3" style="vertical-align: baseline;"
                :modules="modules"
                    :slides-per-view="1"
                    :space-between="0"
                    :loop="true"
                    navigation
                    :pagination="{ clickable: true }"
            >
                <swiper-slide :isDuplicate="true" 
                    class="my-auto" v-for="category, category_index in categories_skills" :key="category.id">
                    <div class="item d-flex flex-column justify-content-center align-items-start text-white p-2 mb-4 col-sm-9 col-10 mx-auto"
                    >

                        <p class="mx-auto text-center mb-3 fw-bold fs-6">{{ category.name }}</p>
                        <div class="mx-auto text-start">
                            <div v-for="skill in category.skills" :key="skill.id" class="mx-auto form-check mb-3">
                                <input @change="add_skill(category_index, category.id, skill.id)" class="form-check-input" :checked="categories_levels[category_index].prev_check_skill && categories_levels[category_index].prev_check_skill.includes(skill.id)"
                                    type="checkbox" v-bind:id="skill.id">
                                <label class="form-check-label cursor" v-bind:for="skill.id">
                                    {{ skill.name }}
                                </label>
                            </div>
                        </div>
                        <div v-if="categories_levels && categories_levels[category_index] && categories_levels[category_index].status" class="mx-auto">
                            <div 
                                class="mb-3 mx-auto">
                                <p class="text-center" style="max-width: 400px">Мой уровнень относительно учебной программы: 
                                    <br><span class="text-second-blue text-uppercase">{{ labels[categories_levels[category_index].level_now] }}</span>
                                </p>
                                <range-slider v-model:value="categories_levels[category_index].level_now"
                                    @update:value="onLevelNowChange(category_index, category.id)"/>
                            </div>
                            <div class="mx-auto">
                                <p class="text-center">Желаемый уровень (которого хочешь достигнуть): 
                                    <br>
                                    <span class="text-second-blue text-uppercase">{{ labels[categories_levels[category_index].prospective_level] }}
                                    </span>
                                </p>

                                <range-slider v-model:value="categories_levels[category_index].prospective_level"
                                    @update:value="onProspectiveNowChange(category_index, category.id)" />
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>


            <div class="d-flex justify-content-center">
                <button @click="addSkillToUser()" type="button" class="btn btn-primary">Завершить настройку</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import BackLink from '../MiniComponents/BackLink.vue';

import { LKService } from '../../services/LK.service';
import RangeSlider from "../MiniComponents/RangeSlider.vue";

import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default {
    data() {
        return {
            categories_skills: [],
            set_skills_user: [],
            width: 0,
            categories_levels: [],
            labels: ["Хуже", "На уровне", "Лучше", "Гораздо лучше"],
            modules: [ Navigation, Pagination, A11y ],
        };
    },
    components: {
        Swiper, SwiperSlide,
        RangeSlider, BackLink
    },
    methods: {
        async addSkillToUser() {
            try {
                await LKService.postSkills(this.set_skills_user);
                this.$store.dispatch('alert/sendMessage', { message: 'Навыки добавлены в список!', type: 'Success' })

            } catch (error) {
                this.$store.dispatch('alert/sendMessage', { message: 'Что-то пошло не так...', type: 'Danger' });
                this.$router.push("/LK");
                return;
            }

            try {
                await LKService.getLkInfo();
            } catch(error) {
                this.$store.dispatch('alert/sendMessage', { message: 'Не удалось получить обновленные данные', type: 'Danger' });
                this.$router.push("/login");
                return;
            }

            this.$router.push("/LK");
        },
        onLevelNowChange: function (category_index, id_cat) {
            const index = this.set_skills_user.findIndex(obj => obj.id === id_cat)
            if(index === -1){
                return;
            }
            if (this.categories_levels[category_index].level_now > this.categories_levels[category_index].prospective_level) {
                this.categories_levels[category_index].prospective_level = this.categories_levels[category_index].level_now
            }
            this.set_skills_user[index].level_now = Number(this.categories_levels[category_index].level_now) + 1
        },
        onProspectiveNowChange: function (category_index, id_cat) {
            const index = this.set_skills_user.findIndex(obj => obj.id === id_cat)
            if(index === -1){
                return;
            }
            if (this.categories_levels[category_index].prospective_level < this.categories_levels[category_index].level_now) {
                this.categories_levels[category_index].level_now = this.categories_levels[category_index].prospective_level
            }
            this.set_skills_user[index].prospective_level = Number(this.categories_levels[category_index].prospective_level) + 1
        },
        add_skill: function (category_index, id_cat, id_skill) {
            const obj = this.set_skills_user.find(obj => obj.id === id_cat)
            if (obj === undefined) {
                this.categories_levels[category_index].status = true
                this.set_skills_user.push({
                    id: id_cat,
                    skills: [id_skill],
                    level_now: Number(this.categories_levels[category_index].level_now) + 1,
                    prospective_level: Number(this.categories_levels[category_index].prospective_level) + 1
                })
            } else {
                if (!obj.skills.includes(id_skill)) {
                    obj.skills.push(id_skill)
                } else {
                    obj.skills = obj.skills.filter(val => val !== id_skill);
                    if (obj.skills.length === 0) {
                        this.categories_levels[category_index].status = false
                        this.set_skills_user = this.set_skills_user.filter(val => val !== obj);
                        this.categories_levels[category_index].level_now = "0"
                        this.categories_levels[category_index].prospective_level = "0"
                    }
                }
            }
        },
    },
    async beforeCreate() {
        try {
            this.categories_skills = await LKService.getSkills();
        } catch (error) {
            this.$store.dispatch('alert/sendMessage', { message: error.response.data, type: 'Danger' });
            this.$router.back();
            return;
        }

        this.categories_levels = this.categories_skills.map(() => ({
            level_now: "1",
            prospective_level: "1",
            status: false,
        }));

        const user_data = JSON.parse(localStorage.getItem('user_data'));

        if(!user_data) { return; }

        const user_skills = user_data.categories;
        for(let i = 0; i < user_skills.length; ++i){
            const index = this.categories_skills.findIndex(obj => obj.id === user_skills[i].id)
            if(index === -1){ continue; }

            this.categories_levels[index].status = true;
            this.categories_levels[index].level_now = String(user_skills[i].level_now - 1);
            this.categories_levels[index].prospective_level = String(user_skills[i].prospective_level - 1);
            this.categories_levels[index].prev_check_skill = user_skills[i].skills.map(obj => obj.id);
            for(let j = 0; j < user_skills[i].skills.length; ++j){
                this.add_skill(index, user_skills[i].id, user_skills[i].skills[j].id)
            }       
        }   
    },
};
</script>
 
<style scoped>

.banner {
    height: 150px;
}

.setUserSkills {
    background: transparent;
}
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