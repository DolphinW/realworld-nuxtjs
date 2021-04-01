<template>
	<div class="editor-page">
		<div class="container page">
			<div class="row">

				<div class="col-md-10 offset-md-1 col-xs-12">
					<form @submit.prevent="publishArticle">
						<fieldset>
							<fieldset class="form-group">
									<input v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
							</fieldset>
							<fieldset class="form-group">
									<input v-model="article.description"	 type="text" class="form-control" placeholder="What's this article about?">
							</fieldset>
							<fieldset class="form-group">
									<textarea v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
							</fieldset>
							<fieldset class="form-group">
									<input v-model="tag" type="text" class="form-control" placeholder="Enter tags" @keyup.enter="addTag">
									<div class="tag-list">
										<span style="margin-right:10px;border:1px solid pink;" v-for="item in article.tagList" :key="item">{{ item }}</span>
									</div>
							</fieldset>
							<button class="btn btn-lg pull-xs-right btn-primary" type="button" :disabled="publishing">
									Publish Article
							</button>
						</fieldset>
					</form>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import {createArticles } from '@/api/article'

export default {
	// 在路由匹配组件渲染之前会先执行中间件处理。
	// 这里直接写middleware文件夹中的文件的名字即可。
	middleware: ['authenticated'],
	name:'EditorIndex',
	data() {
		return {
			article:{
				title:'',
				description:'',
				body:'',
				tagList:[]
			},
			tag:''
		}
	},
	computed: {
		publishing :{
			get() {
				const { title, body} = this.article
				return !title || !body
			},
			set(newVal) {}
		}
	},
	methods: {
		async publishArticle() {
			this.publishing = true
			await createArticles({
				article: this.article
			})
			this.publishing = false
			this.$router.push({name:'home'})
		},
		addTag() {
			this.article.tagList.push(this.tag)
			this.tag = ""
		}
	}
}
</script>

<style>

</style>