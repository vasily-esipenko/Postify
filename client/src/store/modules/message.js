export default {
    actions: {
        async fetchMessages(ctx) {
            const res = await fetch('http://localhost:7000/messages');
            const messages = await res.json();
            ctx.commit('updateMessages', messages);
        }
    },
    mutations: {
        updateMessages(state, messages) {
            state.messages = messages;
        }
    },
    state: {
        messages: []
    },
    getters: {
        getMessages(state) {
            return state.messages;
        }
    }
}
