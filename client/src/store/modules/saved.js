import auth from './auth';

export default {
    actions: {
        async addToSavedPosts(ctx, posts) {
            ctx.commit('setSavedPost', posts);
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
