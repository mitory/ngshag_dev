<template>
   <div class="">
        <div v-for="event in schedule" :key="event.event.id" class="">
            <h5  class="mb-3 text-center fs-6" v-html="event.event.name"></h5>
            <div class="mb-4 d-flex justify-content-center gap-3 align-items-center flex-wrap flex-lg-nowrap flex-lg-row">
                <div v-for="datepoint, index in event.stages" :key="index">
                    <div v-if="datepoint.nominations.length" class="mb-3 px-3 py-2 templ-item__bg mx-auto" style="max-width: 500px;" >
                        <h5 class="text-center"> Этап: {{ datepoint.name }}</h5>
                        <ul>
                            <li class="mb-1" v-for="time, index in datepoint.nominations" :key="index">
                            <em class="text-second-blue">{{ time.name }}</em>
                            <br>c {{ time.start }} до {{ time.end }} 
                            <br>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    props: {
        schedule: Array
    },
    data() {
        return {
            
        }
    },
    components: {
        
    },
    methods: {
    }
}
</script>

<style scoped>
    
</style>