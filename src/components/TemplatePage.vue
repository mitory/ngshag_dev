<template>
    <div class='py-5 pb-2 bg__blue text-white' v-html="content"></div>
</template>

<script>
import { publicService } from '../services/public.service';

export default {
    data() {
        return {
            content: ''
        }
    },
    created() {
        this.fetchPageContent(this.$route.params.name)
    },
    components: {

    },
    watch: {
        '$route.params.name': 'fetchPageContent'
    },
    methods: {
        fetchPageContent(name) {
            if(!this.$route.path.startsWith('/page')){
                return;
            }
            if (!name) {
                this.$router.push("/");
            } else {
                publicService.getPageContent(name).then(response => {
                    this.content = response.content;
                });
            }
        }
    }
}
</script>

<style scoped></style>