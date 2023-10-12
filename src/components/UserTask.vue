<template>
    <div class=''>
        <h3 class="task__title">{{ task.name }}</h3>
        <p>Номинация: <em class="text-primary">{{ task.nomination_name }}</em></p>
        <div class="mb-2">
            <h5>Описание задачи</h5>
            <p v-for="descr, index in task.description" :key="index" class="mb-1">{{ descr }}</p>
            <a v-if="task.file" :href="link + task.file" download class="text-dark">Скачать приложение</a>
        </div>
        <div class="mb-2">
            <h5>Критерии оценки</h5>
            <p v-for="criteria, index in task.criteria_score" :key="index" class="mb-1">{{ criteria }}</p>
        </div>
        <div class="mb-3">
            <h5>Требования к представлению результатов</h5>
            <p class="mb-1">Формат файла: {{ task.file_format }}</p>
            <p class="mb-1">Максимальный размер файла: {{ task.max_file_size }}Mb</p>
            <div v-if="task.additional_requirements">
                <p v-for="requirement, index in task.additional_requirements" :key="index" class="mb-1">
                    {{ requirement }}
                </p>
            </div>
            <h5>Решение должно содержать:</h5>
            <p v-for="contain, index in task.must_contain" :key="index" class="mb-1">{{ contain }}</p>
        </div>
        <div v-if="!status" class="">
            <label for="formFile" class="form-label">Загрузите файл с решением</label>
            <input class="form-control mb-2" type="file" id="formFile" @change="updateFile">
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary" @click="uploadFile">
                    Отправить решение
                </button>
            </div>
        </div>
        <div v-else>
            <p v-if="status" class="mb-2" :class="{
                'text-secondary': status.is_accepted == 'О',
                'text-success': status.is_accepted == 'П',
                'text-danger': status.is_accepted == 'Н'
            }">
                {{ status.is_accepted_display }}
            </p>
        </div>
    </div>
</template>

<script>
import { userService } from '../services/user.service'
import config from '../config'

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

    },
    created() {
        this.link = config.apiURL.replace('api/', '')
        userService.getTask(this.$route.params.id).then(response => {
            if (response.status) {
                this.task = response.data;
                this.task.description = this.task.description.split(';')
                this.task.criteria_score = this.task.criteria_score.split(';')
                this.task.must_contain = this.task.must_contain.split(';')
                this.task.additional_requirements = this.task.additional_requirements.split(';')

                console.log(this.task)
            }
        })
        this.setStatus()
        //additional_requirements
        //nominations
    },
    methods: {
        setStatus() {
            userService.getTaskStatus(this.$route.params.id).then(response => {
                if (response.status) {
                    if (response.data) {
                        this.status = response.data
                    }
                    console.log(this.is_none)
                    console.log(this.status)
                }
            })
        },
        updateFile() {
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile)
        },
        uploadFile() {
            if (!this.selectedFile) {
                this.$store.dispatch('alert/sendMessage', { message: 'Файл не загружен', type: 'Danger' });
                return;
            } else {
                const split_name = this.selectedFile.name.split('.')
                if (split_name[split_name.length - 1] != this.task.file_format) {
                    this.$store.dispatch('alert/sendMessage', { message: 'Неверный формат', type: 'Danger' });
                    return;
                }
                if (this.selectedFile.size > this.task.max_file_size * 1048576) {
                    this.$store.dispatch('alert/sendMessage', { message: 'Превышен максимальный размер файла', type: 'Danger' });
                    return;
                }
            }
            const formData = new FormData();
            formData.append('file', this.selectedFile);
            formData.append('task_id', this.$route.params.id);

            userService.postTaskFile(formData).then(response => {
                console.log(response)
                this.$store.dispatch('alert/sendMessage', { message: 'Решение отправлено!', type: 'Success' })
                this.setStatus()
            }).catch(error => {
                this.$store.dispatch('alert/sendMessage', { message: error.response.data.error, type: 'Danger' });
            })
        }
    }
}
</script>

<style scoped></style>