export default {
    actions: {
        async registerUser(ctx, user) {
            const res = await fetch('http://localhost:7000/api/user/register', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
        }
    },
    mutations: {},
    state: {
        usernames: []
    },
    getters: {}
}