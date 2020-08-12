import auth from './auth';

export default {
    actions: {
        async addToSavedPosts(ctx, post) {
            ctx.commit('setSavedPost', post);
        }
    },
    mutations: {
        setSavedPost(state, post) {
            if (!(post in state.savedPosts)) {
                state.savedPosts.push(post);
            }
        },
        setServerSavedPosts(state, posts) {
            state.serverSavedPosts = posts;
        }
    },
    state: {
        savedPosts: [],
        serverSavedPosts: []
    },
    getters: {
        getSavedPosts(state) {
            return state.savedPosts;
        },
        getServerSavedPosts(state) {
            return state.serverSavedPosts;
        }
    }
}
