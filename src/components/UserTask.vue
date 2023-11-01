<template>
    <div class='col-8 mx-auto'>
        <BackLink link="/" text="вернуться к выбору номинации" />

        <h3 class="task__title">{{ task.nomination_name }}</h3>
        <p>Задача: <em class="text-primary task__title">{{ task.name }}</em></p>

        <div class="mb-2">
            <h5>Описание задачи</h5>
            <p v-for="descr, index in task.description" :key="index" class="mb-1" v-html="descr"></p>
            <a v-if="task.file" :href="'/api/download-file/' + this.$route.params.id + '/'" download class="text-dark"
                style="text-decoration: underline;">Скачать приложение</a>
        </div>
        <div class="mb-2">
            <h5>Критерии оценки</h5>
            <p v-for="criteria, index in task.criteria_score" :key="index" class="mb-1">{{ criteria }}</p>
        </div>
        <div class="mb-3">
            <h5>Требования к представлению результатов</h5>
            <p class="mb-1">- результаты представить в одном zip-архиве;</p>
            <p class="mb-1">- максимальный размер архива – {{ task.max_file_size }} Мб;</p>
            <div v-if="task.additional_requirements">
                <p v-for="requirement, index in task.additional_requirements" :key="index" class="mb-1">
                    {{ requirement }}
                </p>
            </div>
            <p class="mb-1">- архив должен обязательно содержать:</p>
            <p v-for="contain, index in task.must_contain" :key="index" class="mb-1" style="margin: 0 0 0 25px"
                v-html="contain">

            </p>
        </div>
        <div v-if="status && status.is_accepted && (status.is_accepted == 'C' || status.is_accepted == 'О')" class="">
            <label for="formFile" class="form-label" v-html="inputLabel(status.is_accepted)">

            </label>
            <input class="form-control mb-2" type="file" id="formFile" ref="fileInput" @change="updateFile">

            <p v-if="status" class="mb-2" :class="{
                'text-secondary': status.is_accepted == 'О',
                'text-success': status.is_accepted == 'П',
                'text-danger': status.is_accepted == 'Н',
                'd-none': status.is_accepted == 'C'
            }">
                {{ status.is_accepted_display }}
            </p>

            <div class="d-flex justify-content-end">
                <button class="btn btn-primary" @click="uploadFile">
                    Отправить решение {{ status.is_accepted == 'О' ? 'повторно' : '' }}
                </button>
            </div>
        </div>
        <div v-else>
            <p v-if="status" class="mb-2" :class="{
                'text-secondary': status.is_accepted == 'О',
                'text-success': status.is_accepted == 'П',
                'text-danger': status.is_accepted == 'Н',
                'd-none': status.is_accepted == 'C'
            }">
                {{ status.is_accepted_display }}
            </p>
        </div>
    </div>
</template>

<script>
import { userService } from '../services/user.service'
import config from '../config'
import BackLink from './mini-components/BackLink.vue'

export default {
    data() {
        return {
            task: {},
            selectedFile: null,
            status: null,
            link: ''
        }
    },
    components: {
        BackLink
    },
    created() {
        this.setStatus()
        this.link = config.apiURL.replace('api/', '')
        userService.getTask(this.$route.params.id).then(response => {
            if (response.status) {
                this.task = response.data;
                this.task.description = this.task.description.split('|')
                this.task.criteria_score = this.task.criteria_score.split('|')
                this.task.must_contain = this.task.must_contain.split('|')
                this.task.additional_requirements = this.task.additional_requirements.split('|')
            }
        }).catch(err => {
            if (err.status && err.status == 404) {
                this.$store.dispatch('alert/sendMessage', { message: err.error, type: 'Danger' });
            } else {
                this.$store.dispatch('alert/sendMessage', { message: 'Непредвиденная ошибка', type: 'Danger' });
            }
            this.$router.push("/LK/my-tasks");
        })
    },
    methods: {
        downloadFile() {
            window.location.href = 'https//nwstep.ru/api/download-file/' + this.$route.params.id + '/';
        },
        inputLabel(is_accepted) {
            return is_accepted == 'C' ? 'Загрузи архив с решением!' :
                'Если нет уверенности в решении, архив можно отправить <em class="text-primary">повторно</em>. <br>Учитывается только последнее загруженное решение.'
        },
        setStatus() {
            userService.getTaskStatus(this.$route.params.id).then(response => {
                if (response.status) {
                    if (response.data) {
                        this.status = response.data
                        if (this.status.is_accepted == 'Н' || this.status.is_accepted == 'П') {
                            this.$router.push("/LK/my-tasks");
                        }
                    }
                } else {
                    this.$router.push("/");
                }
            })
        },
        updateFile() {
            this.selectedFile = event.target.files[0];
        },
        uploadFile() {
            //this.updateFile()
            if (!this.$refs.fileInput.value) {
                this.$store.dispatch('alert/sendMessage', { message: 'Файл не загружен', type: 'Danger' });
                return;
            } else {
                const split_name = this.selectedFile.name.split('.')
                if (split_name[split_name.length - 1] != this.task.file_format) {
                    this.$store.dispatch('alert/sendMessage', { message: 'Неверный формат', type: 'Danger' });
                    this.$refs.fileInput.value = null;
                    return;
                }
                if (this.selectedFile.size > this.task.max_file_size * 1048576) {
                    this.$store.dispatch('alert/sendMessage', { message: 'Превышен максимальный размер файла', type: 'Danger' });
                    this.$refs.fileInput.value = null;
                    return;
                }
            }
            const formData = new FormData();
            formData.append('file', this.selectedFile);
            formData.append('id', this.status.id);

            userService.putTaskFile(formData).then(() => {
                this.$store.dispatch('alert/sendMessage', { message: 'Решение отправлено!', type: 'Success' })
                this.setStatus()
                this.$refs.fileInput.value = null;
            }).catch(error => {
                this.$store.dispatch('alert/sendMessage', { message: error.response.data.error, type: 'Danger' });
                this.$refs.fileInput.value = null;
            })
        }
    }
}
</script>

<style scoped>
a {
    text-decoration: none;
}
</style>