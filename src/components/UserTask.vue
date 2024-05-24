<template>
    <div class=''>
        <BackLink text="назад" />

        <h4 class="mx-auto text-center mb-4">{{ task.name }}</h4>

        <div class="mb-2">
            <h5>Описание задачи</h5>
            <p v-for="descr, index in task.description" :key="index" class="mb-1" v-html="descr"></p>
            <a v-if="task.file" :href="task.link" download 
                class="text-white link hover-btn text-decoration-underline">Скачать приложение</a>
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
        <div v-if="status">
            <div v-if="['C', 'О'].includes(status.is_accepted)" 
                class="mb-2">
                <label for="formFile" class="form-label" v-html="inputLabel(status.is_accepted)"></label>
                <div class="d-flex justify-content-between align-items-end">
                    <input class="form-control file-input" type="file" id="formFile" ref="fileInput" @change="updateFile">

                    <div class="d-flex justify-content-end">
                        <button class="btn btn-primary" @click="uploadFile">
                            Отправить решение {{ status.is_accepted == 'О' ? 'повторно' : '' }}
                        </button>
                    </div>
                </div>
            </div>
            <p class="mb-2" 
                :class="{
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
import BackLink from './mini-components/BackLink.vue'

import config from '../config'
const API_URL = config.apiURL;

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
        userService.getTask(this.$route.params.id).then(response => {
            if (response.status) {
                this.task = response.data;

                this.task.description = this.task.description.split('|')
                this.task.criteria_score = this.task.criteria_score.split('|')
                this.task.must_contain = this.task.must_contain.split('|')
                this.task.additional_requirements = this.task.additional_requirements.split('|')

                if(this.task.file){
                    this.task.link = `${API_URL}download-file/${this.task.id}/`;
                }
            }
        }).catch(err => {
            this.$store.dispatch('alert/sendMessage', { 
                message: err.status && err.status == 404 ? err.error: 'Непредвиденная ошибка', 
                type: 'Danger' 
            });
            this.$router.push("/LK/my-tasks");
        })
    },
    methods: {
        inputLabel(is_accepted) {
            return is_accepted == 'C' ? 'Загрузи архив с решением!' :
                'Если нет уверенности в решении, архив можно отправить <em class="text-second-blue">повторно</em>. <br>Учитывается только последнее загруженное решение.'
        },
        setStatus() {
            userService.getTaskStatus(this.$route.params.id).then(response => {
                if (response.status) {
                    this.status = response.data
                    if (['Н', 'П'].includes(this.status.is_accepted)) {
                        this.$router.push("/LK/my-tasks");
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
            if (!this.$refs.fileInput.value) {
                this.$store.dispatch('alert/sendMessage', { message: 'Файл не загружен', type: 'Danger' });
                return;
            }
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
    .file-input {
        max-width: 300px;
    }
</style>