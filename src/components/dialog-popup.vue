<template>
	<v-dialog v-model="dialog" max-width="500px">
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
					<v-text-field type="phone" v-model="editedItem.phone_number" v-mask="'###-###-##-##'"
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
</template>

<script>
	import {mask} from 'vue-the-mask';

	export default {
		name: 'dialog-popup',
		directives: {
			mask
		},
		props: {
			index: {
				type: Number,
				default: -1
			}
		},
		data(){
			return {
				defaultItem: {
					first_name: '',
					last_name: '',
					phone_number: '',
					favorite: false
				}
			}
		},
		computed: {
			formTitle () {
				return this.index === -1 ? 'New Item' : 'Edit Item'
			},
			dialog: {
				get: function () {
					return this.$store.state.isShowPopup
				},
				set: function (newValue) {
					this.$store.commit('showPopup', newValue);
				}
			},
			users() {
				return this.$store.getters.usersList;
			},
			editedItem(){
				return this.index > -1 ? this.users[this.index] : this.defaultItem;
			}
		},
		methods: {
			close() {
				this.dialog = false;
			},
			save() {
				if (this.index > -1) {
					Object.assign(this.users[this.index], this.editedItem);
					this.$store.dispatch('editUser', this.users[this.index]);
				} else {
					this.$store.dispatch('addUser', this.editedItem);
				}
				console.log("updated", this.users);
				this.close()
			}
		},
		mounted(){

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
