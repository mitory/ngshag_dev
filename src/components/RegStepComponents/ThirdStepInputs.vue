<template>
    <div class = ''>
        <select
            class="form-select mb-3" v-model="userDataThird.currentTypeInst_third"
            v-bind:class="{ 'border-danger': !(this.isCorrect.currentTypeInst_third)}">
            <option value="-1" selected>Тип учебного заведения</option>
            <option v-for="typeInst in utility.listTypeInst" :value="typeInst.id"
                :key="typeInst.id">
                {{ typeInst.name }}
            </option>
        </select>

        <div class="mb-3 input-box d-flex flex-column g-2 justify-content-center align-items-center">
            <label for="inst_name" class="form-label">Название учебного заведения <span
                class="text-danger">*</span></label>
            <input v-model="userDataThird.inst_name" type="text"
                class="input" style="width: 100%;"
                :class="{ 'border-danger': !(isCorrect.inst_name)}"
                id="inst_name">
        </div>

        <div class="mb-3 input-box d-flex flex-column g-2 justify-content-center align-items-center">
            <label for="faculty_name" class="form-label">Факультет (если имеется)</label>
            <input v-model="userDataThird.faculty_name" type="text"
                class="input" style="width: 100%;"
                id="faculty_name">
        </div>

        <div class="mb-3 input-box d-flex flex-column g-2 justify-content-center align-items-center">
            <label for="spec_name" class="form-label">Специальность (если имеется)</label>
            <input v-model="userDataThird.spec_name" type="text"
                class="input" style="width: 100%;"
                id="spec_name">
        </div>

        <div class="mb-3">
            <label for="year_third" class="form-label">Курс<span class="text-danger">*</span></label>
            <input @input="userDataThird.year_third = Math.max(1, Math.min(userDataThird.year_third, 11));" v-model="userDataThird.year_third"
                    inputmode="numeric" pattern="\d*" maxlength="2" type="number" class="form-control"
                    id="year_third" style="width: 5em;">
        </div>
   </div>
</template>

<script>
import { registerService } from '../../services/register.service'

export default {
    props: {
        userData: Object,
        isCorrect: Object
    },
    data() {
        return {
            userDataThird: {
                currentTypeInst_third: '-1',
                inst_name: '',
                faculty_name: '',
                spec_name: '',
                year_third: 1
            },
            utility: {}
        }
    },
    components: {
        
    },
    created(){
        registerService.getEducationType().then(response => {
            this.utility.listTypeInst = response;
        })
        if(this.userData && 'currentTypeInst_third' in this.userData && 'inst_name' in this.userData && 'year_third' in this.userData) {
            this.userDataThird.currentTypeInst_third = this.userData.currentTypeInst_third
            this.userDataThird.inst_name = this.userData.inst_name
            this.userDataThird.faculty_name = this.userData.faculty_name
            this.userDataThird.spec_name = this.userData.spec_name
            this.userDataThird.year_third = this.userData.year_third
        }
    },
    methods: {
        getData() {
            return { userData: this.userDataThird, utility: this.utility };
        },
        getType(){
            const obj = this.utility.listTypeInst.find(el => el.id === this.userDataThird.currentTypeInst_third);
            if(obj && obj.name){
                return obj.name
            }
            
        }
    }
}
</script>

<style scoped>
    
</style>