<template>
    <div class="agent component" @click="showAgentDetails(data.slug)">
        <div class="picture" v-if="data.picture">
            <img :src="data.picture.url" />
        </div>
        <div class="details">
            <div class="name" v-if="!data.isManager">{{ data.name }}</div>
            <div class="description">
                {{ data.bioSummary }}
                <span class="profile" v-if="!data.isManager">
                    <a>My Profile</a>
                </span>
            </div>
            <div class="name" v-if="data.isManager">{{ data.name }}</div>
            <div class="phone icon" v-if="data.officeNumber">{{ data.officeNumber }}</div>
            <div class="email icon">
                <a :href="`mailto:${data.emailAddress}`">Email Me</a>
            </div>
            <div class="profile icon" v-if="data.isManager">
                <a>My Profile</a>
            </div>
            <div class="clear" />
        </div>
        <div class="clear" />
    </div>
</template>

<script>
export default {
    props: ['data'],
    methods: {
        showAgentDetails(agentSlug) {
            this.$router.push({
                path: '/agent/' + agentSlug
            })
        }
    }
}
</script>