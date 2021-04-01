<template>
	<div class="settings-page">
		<div class="container page">
			<div class="row">

				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Your Settings</h1>

					<form @submit.prevent="updateCurUser">
						<fieldset>
								<fieldset class="form-group">
									<input v-model="curUser.image" class="form-control" type="text" placeholder="URL of profile picture">
								</fieldset>
								<fieldset class="form-group">
									<input v-model="curUser.username" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
								</fieldset>
								<fieldset class="form-group">
									<textarea v-model="curUser.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
								</fieldset>
								<fieldset class="form-group">
									<input v-model="curUser.email" class="form-control form-control-lg" type="email" placeholder="Email" required>
								</fieldset>
								<fieldset class="form-group">
									<input v-model="curUser.password" class="form-control form-control-lg" type="password" placeholder="Password">
								</fieldset>
								<button class="btn btn-lg btn-primary pull-xs-right">
									Update Settings
								</button>
						</fieldset>
					</form>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import { getCurUser as getUser, updateCurUser as updateUser } from '@/api/user'

export default {
	middleware: ['authenticated'],
	name: 'SettingsIndex',
	data(){
		return {
			curUser:{}
		}
	},
	mounted(){
		this.getCurUser()
	},
	methods:{
		async getCurUser(){
			try{
				const { data: {user} } = await getUser()
				this.curUser = user				
			}catch(err){
				window.alert('获取用户信息错误，请重试！')
			}
		},
		async updateCurUser(){
			try{
				const {data:{user}} = await updateUser({user: this.curUser})
				this.curUser = user
			}catch(err){
				window.alert('修改用户信息错误，请重试！')
			}
		}
	}
}
</script>

<style>

</style>