export default {
    actions: {
        async addToSavedPosts(ctx, posts) {
            ctx.commit('setSavedPost', posts);
        },
        async addSavedPostsToServer(request) {
            const res = await fetch('http://localhost:7000/api/user/save', {
                method: "POST",
                mode: 'no-cors',
                body: JSON.stringify(request),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            const response = await res.json();
            console.log(response);
        }
    },
    mutations: {
        setSavedPost(state, posts) {
            state.savedPosts = posts;
            localStorage.setItem("savedPosts", JSON.stringify(posts));
        }
    },
    state: {
        savedPosts: JSON.parse(localStorage.getItem("savedPosts"))
    },
    getters: {
        getSavedPosts(state) {
            return Array.from(new Set(state.savedPosts));
        }
    }
}
