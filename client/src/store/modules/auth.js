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
            const response = await res.json();

            if (localStorage.getItem("token")) {
                localStorage.token = response.token;
            } else {
                localStorage.setItem("token", JSON.stringify(response.token));
            }

            ctx.commit('setResult', response.message);
        },
        async loginUser(ctx, user) {
            const res = await fetch('http://localhost:7000/api/user/login', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            const response = await res.json();
            
            if (localStorage.getItem("token")) {
                localStorage.token = response.token;
            } else {
                localStorage.setItem("token", JSON.stringify(response.token));
            }

            ctx.commit('setLogResult', response.message);
        }
    },
    mutations: {
        setResult(state, res) {
            state.regResult = res;
        },
        setLogResult(state, res) {
            state.logResult = res;
        }
    },
    state: {
        regResult: "",
        logResult: "",
    },
    getters: {
        getResult(state) {
            return state.regResult;
        },
        getLogResult(state) {
            return state.logResult;
        }
    }
}
