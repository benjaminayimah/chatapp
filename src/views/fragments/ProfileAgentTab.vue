<template>
    <div v-if="computedAgents.length" class="flex-1">
        <div class="flex jc-sb mb-16">
            <button @click="handleDropdown('agents_sort', 'agents_sort')" id="agents_sort" class="button-outline ai-c pl-8 pr-8 fw-600 fs-09 gap-8">
                All agents
                <svg height="6" viewBox="0 0 10 5.714">
                    <path d="M1.533,10a.714.714,0,0,1-.505-1.219L4.809,5,1.028,1.22A.714.714,0,0,1,2.038.21L6.324,4.5a.714.714,0,0,1,0,1.01L2.038,9.791A.712.712,0,0,1,1.533,10Z" transform="translate(10.001 -0.819) rotate(90)"/>
                </svg>
            </button>
            <button v-if="isOwner" @click="goToCreate" class="button-primary pl-8 pr-8 fw-600 fs-09 gap-4 ai-c">
                <svg height="12" viewBox="0 0 14 14">
                    <path d="M21.5,15.5h-6v6h-2v-6h-6v-2h6v-6h2v6h6Z" transform="translate(-7.5 -7.5)"/>
                </svg>
                <span>Add new</span>
            </button>
        </div>
        <div class="flex flex-column list-wrapper">
            <profile-agent-list
                v-for="agent in sortedAgents()"
                :key="agent.id"
                :agent="agent"
                :isOwner="isOwner"
            />
        </div>
        <div v-if="isLoading" class="flex jc-c">Fetching more...</div>
    </div>
    <empty-state v-else
        :message="computedMessage"
        :button="computedButtonState"
        @empty-btn-event="goToCreate"
    />

    <teleport to="main">
        <backdrop @click="handleDropdown('agents_sort', null)" v-if="dropdownToggle" :opacity="0" :zindex="501" />
        <div v-if="dropdownType === 'agents_sort'" class="dropdown bg-transition fixed" :style="{ top: dropdown.top + 30 + 'px', left: dropdown.left + 'px'}">
            <ul>
                <div @click="handleDropdown('agents_sort', null)">
                    <a v-for="sort in sorts" :key="sort.key" @click="$emit('sort-item', sort.key)" href="#" class="flex ai-c gap-8 jc-sb">
                        {{ sort.name }}
                        <svg v-if="sort.key === activeSort" width="13" height="13" viewBox="0 0 13 13">
                            <path d="M-1983.5,13a6.458,6.458,0,0,1-4.6-1.9,6.458,6.458,0,0,1-1.9-4.6,6.457,6.457,0,0,1,1.9-4.6,6.458,6.458,0,0,1,4.6-1.9,6.458,6.458,0,0,1,4.6,1.9,6.457,6.457,0,0,1,1.9,4.6,6.458,6.458,0,0,1-1.9,4.6A6.458,6.458,0,0,1-1983.5,13Zm-3.107-6.854a.461.461,0,0,0-.332.14.464.464,0,0,0,.009.656l2.269,2.244a.462.462,0,0,0,.324.132h.023a.465.465,0,0,0,.332-.165l3.946-4.707a.461.461,0,0,0,.106-.338.46.46,0,0,0-.164-.314.464.464,0,0,0-.3-.109.463.463,0,0,0-.355.166l-3.624,4.325-1.912-1.895A.461.461,0,0,0-1986.607,6.146Z" transform="translate(1990)" fill="#fff"/>
                        </svg>
                    </a>
                </div>
            </ul>
        </div>
    </teleport>
</template>

<script>
import EmptyState from '@/components/EmptyState.vue'
import ProfileAgentList from '@/components/ProfileAgentList.vue'
import Backdrop from '@/components/Backdrop.vue'
import dropdownMixin from '@/mixins/dropdownMixin';
export default {
    inheritAttrs: false,
    name: 'ProfileAgentTab',
    components: { EmptyState, ProfileAgentList, Backdrop },
    mixins: [dropdownMixin],
    props: {
        isOwner: Boolean,
        isLoading: Boolean,
        user: Object,
        activeSort: String
    },
    computed: {
        computedMessage() {
            const message = {
                heading: 'No agent',
                body: this.isOwner ? 'Create an AI Agent and train it to help you with specific tasks.' : 'This user has not created any Agent yet.',
                buttonText: 'Create Agent',
                icon: `
                    <svg height="14" viewBox="0 0 14 14">
                        <path d="M21.5,15.5h-6v6h-2v-6h-6v-2h6v-6h2v6h6Z" transform="translate(-7.5 -7.5)"/>
                    </svg>
                `
            }
            return message
        },
        computedButtonState() {
            return !!(this.computedMessage.buttonText && this.isOwner)
        },
        computedAgents() {
            if(!this.isOwner) {
                return this.user?.agents.filter(agent => agent.visibility === 'public') || []
            }
            return this.user?.agents || []
        }
    },
    data() {
        return {
            dropdownToggle: false,
            dropdownType: '',
            sorts: [
                { key: 'newest', name: 'Newest'},
                { key: 'a-z', name: 'Alphabetical'},
                { key: 'oldest', name: 'Oldest'}
            ],
        }
    },
    methods: {
        goToCreate() {
            this.$router.push({ name: 'CreateAgent' })
        },
        sortedAgents() {
            switch (this.activeSort) {
                case 'newest':
                    return [...this.computedAgents].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest
                case 'oldest':
                    return [...this.computedAgents].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // oldest
                case 'a-z':
                    return [...this.computedAgents].sort((a, b) => a.agentName.localeCompare(b.agentName)) //a-z
                default:
                    return [...this.computedAgents].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.list-wrapper {
    margin-right: -12px;
    margin-left: -12px;
}

button {
    height: 30px;
}

.dropdown {
    width: 170px;
    z-index: 502;
    background-color: var(--modal-main-background);
    font-size: 0.95rem;
    a {
        padding: 5px 12px 5px 16px;
        &:hover {
            background-color: var(--modal-main-background-2);
        }
    }
}
</style>