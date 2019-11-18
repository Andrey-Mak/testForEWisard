import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const url = "http://localhost:3000/users/";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {
		addUser(context, targetUser){
			axios({
				method: 'post',
				url: url,
				data: targetUser
			});
		},
		editUser(context, targetUser){
			axios({
				method: 'post',
				url: `${url}${targetUser["_id"]}`,
				data: targetUser
			});
		},
		deleteUser(context, targetUser){
			axios({
				method: 'delete',
				url: `${url}${targetUser["_id"]}`
			});
		}
	},
	modules: {}
})
