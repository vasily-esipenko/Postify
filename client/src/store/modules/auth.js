export default {
    actions: {
        async registerUser(ctx, user) {
            const res = await fetch('http://localhost:7000/api/user/register', {
                method: 'POST',
                mode: 'no-cors',
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
                mode: 'no-cors',
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
        },
        removeUserData(ctx) {
            ctx.commit('removeUserData');
        },
        async verifyUser(ctx, token) {
            const res = await fetch('http://localhost:7000/api/user/verify', {
                method: "POST",
                mode: 'no-cors',
                body: JSON.stringify(token),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            const response = await res.json();
            localStorage.setItem("userData", JSON.stringify(response.data))
            localStorage.setItem("isLogged", JSON.stringify(response.result));
        },
        changeVerifyResult(ctx, status) {
            ctx.commit('changeVerifyResult', status);
        }
    },
    mutations: {
        setResult(state, res) {
            state.regResult = res;
        },
        setLogResult(state, res) {
            state.logResult = res;
        },
    },
    state: {
        regResult: "",
        logResult: "",
        verifyResult: JSON.parse(localStorage.getItem("isLogged")),
        userData: JSON.parse(localStorage.getItem("userData")),
    },
    getters: {
        getResult(state) {
            return state.regResult;
        },
        getLogResult(state) {
            return state.logResult;
        },
        getUserData(state) {
            return state.userData;
        },
        getVerifyResult(state) {
            return state.verifyResult;
        }
    }
}
