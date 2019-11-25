<template>
	<v-data-table
			:headers="headers"
			:items="users"
			:search="search"
			class="elevation-1"
			:calculate-widths="true">

		<template v-slot:top>
			<v-container>
				<v-text-field class="mx-4 md-4" solo v-model="search" label="Search"
							  prepend-inner-icon="mdi-magnify"></v-text-field>

				<v-toolbar color="white">
					<v-toolbar-title @click="isFavorites = false"
									 :class="['tab-title', {active: !isFavorites}]">Contacts
					</v-toolbar-title>
					<v-divider class="mx-4" inset vertical></v-divider>
					<v-toolbar-title @click="isFavorites = true"
									 :class="['tab-title', {active: isFavorites}]">Favorites
					</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn color="primary" dark class="mb-2" @click="addUser">NEW CONTACT</v-btn>
					<dialog-popup :index="editedIndex"></dialog-popup>
				</v-toolbar>

			</v-container>
		</template>
		<template v-slot:item.action="{ item }">
			<v-icon small class="mr-2"
					v-text="item.favorite ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
					v-model="isFavorites"
					@click="favoriteUser(item)">favorite
			</v-icon>
			<v-icon small class="mr-2" v-text="'mdi-pencil'" @click="editUser(item)">edit</v-icon>
			<v-icon small class="mr-2" v-text="'mdi-delete'" @click="deleteUser(item)">delete
			</v-icon>
		</template>
		<template v-slot:no-data>
			<v-btn color="primary" @click="initialize">Reset</v-btn>
		</template>
	</v-data-table>
</template>

<script>
	import dialogPopup from '../components/dialog-popup';

	export default {
		name: 'tabs',
		components: {
			dialogPopup,
		},
		data(){
			return {
				headers: [
					{
						text: 'Name',
						align: 'left',
						sortable: false,
						value: 'name'
					},
					{text: 'Phone', value: 'phone_number'},
					{
						text: 'Actions', value: 'action', sortable: false,
						filter: (value, search, item) =>{
							if(!this.isFavorites) return true;
							return this.isFavorites && item.favorite;
						}
					}
				],
				search: '',
				isFavorites: false,
				loading: true,
				editedIndex: -1
			}
		},
		computed: {
			users(){
				let userList = this.$store.getters.usersList;
				userList.forEach((user) => user.name = `${user.first_name} ${user.last_name}`);
				return userList
			}
		},
		methods: {
			initialize(){
				this.$store.dispatch('getUsersList');
			},
			favoriteUser(user){
				user.favorite = !user.favorite;
				this.$store.dispatch('editUser', user);
			},
			deleteUser(user){
				if(confirm(`Are you sure you want to delete ${user.name}?`)){
					this.editedIndex = -1;
					this.$store.dispatch('deleteUser', user);
				}
			},
			showDialog(){
				this.$store.commit('showPopup', true);
			},
			addUser(){
				this.editedIndex = -1;
				this.showDialog();
			},
			editUser(currentUser){
				this.editedIndex = this.users.findIndex((user) => user["_id"] === currentUser["_id"]);
				this.showDialog();
			}
		},
		mounted(){
			this.initialize()
		}
	}
</script>

<style scoped>
	.tab-title{
		cursor: pointer;
	}
	.tab-title.active{
		border-bottom: 2px solid grey;
	}
</style>
