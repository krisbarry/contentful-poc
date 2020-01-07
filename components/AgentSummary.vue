<template>
    <div class="agent-summary component" @click="goToAgentDetails" @enter="goToAgentDetails">
        <div class="image" v-if="data.picture">
            <img :src="data.picture.url" :alt="data.picture.name" />
        </div>
        <div class="subtitle">{{ data.name }}</div>
        <div class="agency">
            <span class="role">{{ data.agencyManager ? 'Agency Manager' : 'Agent' }}</span>,
            <span class="name">{{ data.agencyName }}</span>
        </div>
        <div class="details">
            <span class="city">{{ data.city }}</span>,
            <span class="county">{{ data.county }} County</span>,
            <span class="state">{{ data.state }}</span>
        </div>
    </div>
</template>

<script>

export default {
    props: ['data'],
    methods: {
        goToAgentDetails() {
            this.$router.push({
                path: `/agent/${this.data.slug}`
            })
        }
    }
}
</script>
