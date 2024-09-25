<template>
    <div class='py-5 pb-2 bg__blue text-white' style="min-height: 90vh;">
        <div class="container">
            <BackLink text='назад'/>
        </div>
        
        <div v-html="content"></div>
    </div>
</template>

<script>
import { publicService } from '../../services/public.service';
import { modalsMethod } from '../../methods/modals.method';

import BackLink from '../MiniComponents/BackLink.vue'

export default {
    data() {
        return {
            content: ''
        }
    },
    created() {
        this.fetchPageContent(this.$route.params.name)
    },
    components: { BackLink },
    watch: {
        '$route.params.name': 'fetchPageContent'
    },
    methods: {
        async fetchPageContent(name) {
            if(!this.$route.path.startsWith('/page/')){
                return;
            }

            if (!name) {
                this.$router.push("/login");
                return;
            } 

            try {
                this.content = (await publicService.getPageContent(name)).content;
            } catch (error) {
                modalsMethod.showTextModal('Страница не найдена');
                this.$router.back();
            }
        }
    }
}
</script>

<style scoped></style>