<template>
    <div class=''>

    </div>
</template>

<script>
import { userService } from '../services/user.service'

export default {
    data() {
        return {

        }
    },
    props: {
        id: String,
        key_link: String
    },
    created() {
        userService.getVerificeAcc(this.id, this.key_link).then(response => {
            this.$store.dispatch('alert/sendMessage', { message: response.message, type: 'Success' })
            this.$router.push("/");
        }).catch((error) => {

            if (error.data && Object.keys(error.data).includes('status')) {
                this.$store.dispatch('alert/sendMessage', { message: error.data.message, type: 'Danger' })
                this.$router.push("/");
            } else {
                this.$store.dispatch('alert/sendMessage', { message: 'Непредвиденная ошибка', type: 'Danger' })
                this.$router.push("/");
            }

        })
    },
    components: {

    },
    methods: {

    }
}
</script>

<style scoped></style>
  