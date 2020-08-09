export default {
    actions: {
        async fetchMessages(ctx) {
            const res = await fetch('http://localhost:7000/api/messages/get');
            const messages = await res.json();
            ctx.commit('updateMessages', messages);
        },
        async addMessage(ctx, message) {
            const res = await fetch('http://localhost:7000/api/messages/insert', {
                method: "POST",
                body: JSON.stringify(message),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            const newMessage = await res.json();
            ctx.commit('insertNewMessage', newMessage);
        },
        async updateMessage(ctx, message) {
            const res = await fetch('http://localhost:7000/api/messages/put', {
                method: "PUT",
                body: JSON.stringify(message),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            const updatedMessage = await res.json();
            ctx.commit('updateOneMessage', updatedMessage);
        }
    },
    mutations: {
        updateMessages(state, messages) {
            state.messages = messages;
        },
        insertNewMessage(state, message) {
            state.messages.push(message);
        },
        updateOneMessage(state, message) {

        },
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
