import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const url = "http://localhost:3000/users/";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		users: [],
		isShowPopup: false
	},
	getters: {
		usersList: state => {
			return state.users;
		}
	},
	mutations: {
		updateUsersList: (state, data) => state.users = data,
		addUser: (state, user) => state.users.push(user),
		showPopup: (state, isPopup) => state.isShowPopup = isPopup,
		editUser: (state, targetUser) => {
			const userIndex = state.users.findIndex((user) => user["_id"] === targetUser["_id"]);
			state.users.splice(userIndex, 1, Object.assign(state.users[userIndex], targetUser));
		},
		deleteUser: (state, userId) => {
			const userIndex = state.users.findIndex((user) => user["_id"] === userId);
			state.users.splice(userIndex, 1);
		}
	},
	actions: {
		getUsersList(context){
			axios.get(url)
				.then(response =>{
					if(response.status === 200){
						context.commit('updateUsersList', Object.values(response.data));
					}
				})
				.catch(err => console.warn(err))
		},
		addUser(context, targetUser){
			axios.post(url, targetUser)
				.then(response =>{
					if(response.status === 201){
						context.commit('addUser', response.data);
					}
				})
				.catch(err => console.warn(err))
		},
		editUser(context, targetUser){
			axios.put(`${url}${targetUser["_id"]}`, targetUser)
				.then(response =>{
					if(response.status === 200){
						context.commit('editUser', response.data);
					}
				})
				.catch(err => console.warn(err))
		},
		deleteUser(context, targetUser){
			axios.delete(`${url}${targetUser["_id"]}`)
				.then(response =>{
					if(response.status === 200){
						context.commit('deleteUser', response.data);
					}
				})
				.catch(err => console.warn(err))
		}
	},
	modules: {}
})
