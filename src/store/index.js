import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentView: 'edetail'
	},
	mutations: {
		changeCurrentView: (state, payload) => state.currentView = payload,
	},
	actions: {
		changeView(context, targetView){
			context.commit('changeCurrentView', targetView);
		}
	},
	modules: {}
})
