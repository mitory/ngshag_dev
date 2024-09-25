<template>
    <div class=''>

    </div>
</template>

<script>
import { coreService } from '../../services/core.service'

export default {
    data() { return {} },
    props: {
        id: String,
        key_link: String
    },
    async created() {
        try {
            const response = await coreService.getVerificeAcc(this.id, this.key_link);
            this.$store.dispatch('alert/sendMessage', { message: response.message, type: 'Success' })
        } catch(error) {
            const res = error.response;
            const message = res.status === 500 ? res.data : res.data.message;
            this.$store.dispatch('alert/sendMessage', { message: message, type: 'Danger' })
        } finally {
            this.$router.push("/login");
        }
    },
    components: {

    },
    methods: {

    }
}
</script>

<style scoped></style>
  