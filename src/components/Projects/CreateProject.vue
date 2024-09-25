<template>
    <div class="py-5 pb-2 bg__blue text-white" style="min-height: 100vh">
        <div class="container">
            <div class="templ_bg">
                <div class="row d-flex flex-column-reverse flex-lg-row align-items-center justify-content-evenly">
                    <form @submit.prevent="loginUser" novalidate class="my-auto form-template py-2">
                        <h2 class="mb-1 text-blue text-center fs-6 pt-3 pb-3">
                            Создание проекта
                        </h2>

                        <div class="mb-3 input-box">
                            <label for="email" class="form-label">Название проекта</label>
                            <input v-model="name" type="text" class="input"
                                id="name"
                                v-bind:class="{ 'border-danger': !(isCorrect.name)}" style="width: 100%;">
                        </div>
                        <div class="mb-3 input-box">
                            <label for="email" class="form-label">Описание проекта</label>
                            <textarea rows='5' v-model="about_project" type="text" class="input"
                                    id="about_project"
                                    v-bind:class="{ 'border-danger': !(isCorrect.about_project)}" 
                                    style="width: 100%;">
                            </textarea>
                        </div>
                        <label for="stage" class="form-label">Стадия проекта</label>
                        <select @change="changeStage();"
                            class="form-select mb-3" v-model="stage"
                            :class="{ 'border-danger': !(this.isCorrect.stage)}" id="stage">
                            <option v-for="stage_el in stages" :value="stage_el.code" :key="stage_el.cod">
                                {{ stage_el.description }}
                            </option>
                        </select>
                        <div v-show="is_procent">
                            <p>{{ stage_procent }}</p>
                            <range-slider :value="stage_procent"
                                    @update:value="changeSlider" :max="'100'"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
   </div>
</template>


<!-- {
    "name": "string",
    "about_project": "string",
    "stage": "А",
    "stage_procent": 100,
    "view_count": 2147483647,
    "project_url": "string",
    "category": 0,
    "user": [
      0
    ]
} -->

<script>
import { projectService } from '../../services/project.service';
import RangeSlider from "../MiniComponents/RangeSlider.vue";

export default {
    data() {
        return {
            name: '',
            about_project: '',
            stage: '',
            stage_procent: "0",
            isCorrect: {
                name: true,
                about_project: true,
                stage: true
            },
            stages: [],
            is_procent: true
        }
    },
    components: {
        RangeSlider
    },
    async created(){
        this.stages = await projectService.getStages();
        this.stage = this.stages[0].code
    },
    methods: {
        changeStage() {
            console.log(this.stage)
            if(this.stage !== 'Р') {
                this.stage_procent = "0";
                this.is_procent = true;
            } else {
                this.is_procent = false;
            }
        },
        changeSlider(value){
            this.stage_procent = value;
            if(this.stage_procent === "100") {
                this.stage = 'Р';
                this.changeStage();
            }
        }
    }
}
</script>

<style scoped>
    
</style>