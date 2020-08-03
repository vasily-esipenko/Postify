export default {
    actions: {
        async fetchMessages(ctx) {
            const res = await fetch('http://localhost:7000/messages');
            const messages = await res.json();
            ctx.commit('updateMessages', messages);
        },
        async addMessage(ctx, message) {
            const res = await fetch('http://localhost:7000/messages', {
                method: "POST",
                body: JSON.stringify(message),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            const newMessage = await res.json();
            ctx.commit('insertNewMessage', newMessage);
        }
    },
    mutations: {
        updateMessages(state, messages) {
            state.messages = messages;
        },
        insertNewMessage(state, message) {
            state.messages.push(message);
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
