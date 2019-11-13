import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {
		findUsers(context, targetUser){
			axios({
				method: 'get',
				url: `http://localhost:3000/users`,
				data: targetUser
			});
		},
		addUser(context, targetUser){
			axios({
				method: 'post',
				url: `http://localhost:3000/users`,
				data: targetUser
			});
		},
		editUser(context, targetUser){
			axios({
				method: 'post',
				url: `http://localhost:3000/users/${targetUser["_id"]}`,
				data: targetUser
			});
		},
		deleteUser(context, targetUser){
			axios({
				method: 'delete',
				url: `http://localhost:3000/users/${targetUser["_id"]}`
			});
		}
	},
	modules: {}
})
