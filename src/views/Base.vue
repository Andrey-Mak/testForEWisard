<template>
	<v-data-table
			:headers="headers"
			:items="users"
			sort-by=""
			class="elevation-1">
		<template v-slot:top>
			<v-toolbar flat color="white">
				<v-toolbar-title>Contacts</v-toolbar-title>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-toolbar-title>Favorites</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-dialog v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on }">
						<v-btn color="primary" dark class="mb-2" v-on="on">NEW CONTACT</v-btn>
					</template>
					<v-card>
						<v-card-title>
							<span class="headline">{{ formTitle }}</span>
						</v-card-title>
						<v-card-text>
							<v-container>
								<v-text-field v-model="editedItem.first_name"
											  label="First name"></v-text-field>
								<v-text-field v-model="editedItem.last_name"
											  label="Last name"></v-text-field>
								<v-text-field v-model="editedItem.phone_number"
											  label="Phone"></v-text-field>
							</v-container>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
							<v-btn color="blue darken-1" text @click="save">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>
		<template v-slot:item.action="{ item }">
			<v-icon small class="mr-2"
					v-text="item.favorite ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
					@click="favoriteUser(item)">favorite
			</v-icon>
			<v-icon small class="mr-2" v-text="'mdi-pencil'" @click="editUser(item)">edit</v-icon>
			<v-icon small class="mr-2" v-text="'mdi-delete'" @click="deleteUser(item)">delete</v-icon>
		</template>
		<template v-slot:no-data>
			<v-btn color="primary" @click="initialize">Reset</v-btn>
		</template>
	</v-data-table>
</template>

<script>
	import axios from 'axios'

	export default {
		name: 'tabs',
		data: () => ({
			dialog: false,
			headers: [
				{
					text: 'Name',
					align: 'left',
					sortable: false,
					value: 'first_name'
				},
				{text: 'Phone', value: 'phone_number'},
				{text: 'Actions', value: 'action', sortable: false},
			],
			users: [],
			editedIndex: -1,
			editedItem: {
				first_name: '',
				phone_number: ''
			},
			defaultItem: {
				first_name: '',
				phone_number: ''
			},
		}),
		computed: {
			formTitle(){
				return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
			}
		},
		methods: {
			initialize(){
				axios
					.get('http://localhost:3000/users')
					.then(response =>{
						this.users = Object.values(response.data);
						console.log(this.users);
					})
					.catch(err => console.warn(err))
					.finally(() => (this.loading = false));
			},
			favoriteUser(user){
				console.log(user);
				user.favorite = !user.favorite;
				this.$store.dispatch('editUser', user);
			},
			editUser(user){
				this.editedIndex = this.users.indexOf(user)
				this.editedItem = Object.assign({}, user)
				this.dialog = true
			},

			deleteUser(user){
				console.log(user);
				const index = this.users.indexOf(user);
				if(confirm('Are you sure you want to delete this user?')){
					this.users.splice(index, 1);
					this.$store.dispatch('deleteUser', user);
				}
			},

			close(){
				this.dialog = false
				setTimeout(() =>{
					this.editedItem = Object.assign({}, this.defaultItem)
					this.editedIndex = -1
				}, 300)
			},

			save(){
				if(this.editedIndex > -1){
					Object.assign(this.users[this.editedIndex], this.editedItem);
					this.$store.dispatch('editUser', this.users[this.editedIndex]);
				}else{
					this.users.push(this.editedItem);
					this.$store.dispatch('editUser', this.editedItem);
				}
				console.log(this.users);

				this.close()
			}
		},
		mounted(){
			this.initialize()
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	h3{
		margin: 40px 0 0;
	}
	ul{
		list-style-type: none;
		padding: 0;
	}
	li{
		display: inline-block;
		margin: 0 10px;
	}
	a{
		color: #42b983;
	}
</style>
