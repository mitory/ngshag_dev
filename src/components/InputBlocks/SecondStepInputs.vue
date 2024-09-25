<template>
    <div class = ''>
        <select @change="getUnivers();"
            class="form-select mb-3" v-model="userDataSecond.currentTypeInst"
            v-bind:class="{ 'border-danger': !(this.isCorrect.currentTypeInst)}">
            <option value="-1" selected>Тип учебного заведения</option>
            <option v-for="typeInst in utility.listTypeInst" :value="typeInst.id"
                :key="typeInst.id">
                {{ typeInst.name }}
            </option>
        </select>

        <select @change="getFacults();" v-if="userDataSecond.currentTypeInst !== '-1' && utility.listInst.length"
            class="form-select mb-3" v-model="userDataSecond.currentInst"
            :class="{ 'border-danger': !(this.isCorrect.currentInst)}">
            <option value="-1" selected>Название учебного заведения</option>
            <option v-for="inst in utility.listInst" :value="inst.id"
                :key="inst.id">
                {{ inst.institution_name }}
            </option>
        </select>

        <div v-if="userDataSecond.currentTypeInst !== '-1' && !utility.listInst.length">
            <p v-if="this.$route.path === '/reg'" class="text-danger fw-bold" v-html="regText.dont_find_inst1"></p>
            <p v-if="this.$route.path === '/LK'" class="text-danger fw-bold" v-html="regText.dont_find_inst2"></p>
        </div>

        <select @change="getSpecs();" v-if="userDataSecond.currentInst !== '-1' && utility.listFacult.length > 1"
            class="form-select mb-3" v-model="userDataSecond.currentFacult"
            :class="{ 'border-danger': !(this.isCorrect.currentFacult)}">
            <option value="-1" selected>Факультет</option>
            <option v-for="facult in utility.listFacult" :value="facult.id"
                :key="facult.id">
                {{ facult.faculty_name }}
            </option>
        </select>

        <select v-if="userDataSecond.currentFacult !== '-1' && utility.listSpec.length > 1"
            class="form-select mb-3" v-model="userDataSecond.currentSpec"
            :class="{ 'border-danger': !(this.isCorrect.currentSpec)}">
            <option value="-1" selected>Направление</option>
            <option v-for="spec in utility.listSpec" :value="spec.id"
                :key="spec.id">
                {{ spec.specialty_name }}
            </option>
        </select>

        <div v-if="this.utility.maxYear" class="mb-3">
            <label for="year" class="form-label">Курс<span class="text-danger">*</span></label>
            <select style="width: 5em;" id="year" @change="checkCorrectYear"
                class="form-select mb-3" v-model="userDataSecond.year">
                <option v-for="year in utility.maxYear" :value="year" :key="year">
                    {{ year }}
                </option>
            </select>

            <!-- <label for="year" class="form-label">Курс<span class="text-danger">*</span></label>

            <input @input="checkCorrectYear" v-model="userDataSecond.year"
                    inputmode="numeric" pattern="\d*" maxlength="2" type="number" class="form-control"
                    id="year" style="width: 5em;"> -->
        </div>
   </div>
</template>

<script>
import { coreService } from '../../services/core.service';
import { regText } from '../CoreSystemComponentsForUser/core.text';
import { modalsMethod } from '../../methods/modals.method';

export default {
    props: {
        userData: Object,
        out_utility: Object,
        isCorrect: Object
    },
    data() {
        return {
            regText: {},
            userDataSecond: {
                currentTypeInst: '-1',
                currentInst: '-1',
                currentFacult: '-1',
                currentSpec: '-1',
                year: 1,
            },
            utility: {
                listTypeInst: [],
                listInst: [],
                listFacult: [],
                listSpec: [],
                maxYear: 0,
            }
        }
    },
    components: {
        
    },
    async created(){
        try {
            this.utility.listTypeInst = await coreService.getEducationType();
        } catch (error) {
            modalsMethod.showTextModal(error.response.data)
            this.$router.push("/login");
        }
        this.regText = regText;
        if(this.out_utility && this.userData){
            Object.assign(this.utility, this.out_utility);
            this.userDataSecond.currentTypeInst = this.userData.currentTypeInst || '-1';
            this.userDataSecond.currentInst = this.userData.currentInst || '-1';
            this.userDataSecond.currentFacult = this.userData.currentFacult || '-1';
            this.userDataSecond.currentSpec = this.userData.currentSpec || '-1';
            this.userDataSecond.year = this.userData.year || 1;
        }
        
    },
    methods: {
        getData() {
            return {userData: this.userDataSecond, utility: this.utility};
        },
        call_alert_error() {
            const message = 'Возникла ошибка, попробуйте обновить страницу';
            this.$store.dispatch('alert/sendMessage', { message: message, type: 'Danger' })
        },
        async getUnivers() {
            this.utility.listInst = [];
            this.utility.listFacult = [];
            this.utility.listSpec = [];
            this.userDataSecond.currentInst = '-1';
            this.userDataSecond.currentFacult = '-1';
            this.userDataSecond.currentSpec = '-1';
            if(this.userDataSecond.currentTypeInst === '-1'){
                this.utility.maxYear = 0;
                return;
            }
            const currentType = this.utility.listTypeInst.find(x => x.id === this.userDataSecond.currentTypeInst)
            this.utility.maxYear = currentType.max_year

            try{
                this.utility.listInst = await coreService.getUnivers(currentType.id);
            } catch (error) {
                this.call_alert_error();
            }
            

        },
        async getFacults(){
            this.utility.listFacult = [];
            this.utility.listSpec = [];
            this.userDataSecond.currentFacult = '-1';
            this.userDataSecond.currentSpec = '-1';
            if(this.userDataSecond.currentInst === '-1'){
                this.utility.listFacult = [];
                return;
            }
            const currentInst = this.utility.listInst.find(x => x.id === this.userDataSecond.currentInst)

            try {
                this.utility.listFacult = await coreService.getFacults(currentInst.id);
            } catch (error) {
                this.call_alert_error();
                return;
            }

            if(this.utility.listFacult.length === 1){
                this.userDataSecond.currentFacult = this.utility.listFacult[0].id
                this.getSpecs()
            }
        },
        async getSpecs(){
            this.utility.listSpec = [];
            this.userDataSecond.currentSpec = '-1';
            if(this.userDataSecond.currentFacult === '-1'){
                this.utility.listSpec = [];
                return;
            }
            const currentFacult = this.utility.listFacult.find(x => x.id === this.userDataSecond.currentFacult)

            try {
                this.utility.listSpec = await coreService.getSpecialty(this.userDataSecond.currentInst, currentFacult.id);
            } catch (error) {
                this.call_alert_error();
                return;
            }

            if(this.utility.listSpec.length === 1){
                this.userDataSecond.currentSpec = this.utility.listSpec[0].id
            }
        },
        checkCorrectYear() {
            this.userDataSecond.year = Math.max(1, Math.min(this.userDataSecond.year, this.utility.maxYear));
        },
    }
}
</script>

<style scoped>
    
</style>