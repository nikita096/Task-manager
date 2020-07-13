<template>
    <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th class="hide-on-med-and-down">Deadline</th>
                                    <th class="hide-on-med-and-down">Description</th>
                                    <th>Status</th>
                                    <th>Open</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(record , idx) of records" :key="record.id">
                                    <td>{{idx + 1}}</td>
                                    <td>{{record.title}}</td>
                                    <td class="hide-on-med-and-down">{{record.date| date('date')}}</td>
                                    <td class="hide-on-med-and-down text" v-tooltip="record.description">{{record.description}} </td>
                                    <td>
                                    <span class="pad-1" :class='[record.statusClass]'>
                                        {{record.statusText}}
                                    </span>
                                    </td>
                                    <td>
                                    <button 
                                        class="btn-small btn"
                                        @click="$router.push('/detail/' + record.id)"
                                    >
                                        <i class="material-icons">open_in_new</i>
                                    </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
</template>
<script>
export default {
    props: {
         records: {
            required: true,
            type: Array
        }
    },
    
}
</script>
<style scoped>
    .text {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        min-width: 200px;
        max-width: 400px;
    }
    .size {
        width: 75%;
        height: 75%;
        color: black
    }
</style>