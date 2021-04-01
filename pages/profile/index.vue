<template>
	<div class="profile-page">

		<div class="user-info">
			<div class="container">
				<div class="row">

					<div class="col-xs-12 col-md-10 offset-md-1">
						<img :src="profile.image" class="user-img" />
						<h4>{{profile.username}}</h4>
						<p>
							{{profile.bio}}
						</p>
						
					</div>

				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">

				<div class="col-xs-12 col-md-10 offset-md-1">
					<div class="articles-toggle">
						<ul class="nav nav-pills outline-active">
							<li class="nav-item">
								<nuxt-link exact class="nav-link"
													:class="{'active': tab === 'my_articles'}"
													:to="{
														name:'profile',
														params:{username: profile.username},
														query:{tab:'my_articles'}
													}">My Articles</nuxt-link>
							</li>
							<li class="nav-item">
								<nuxt-link exact class="nav-link" 
													:to="{
														name:'profile',
														params:{username: profile.username},
														query:{tab:'favorited_articles'}
													}"
													:class="{'active': tab === 'favorited_articles'}"
								>Favorited Articles</nuxt-link>
							</li>
						</ul>
					</div>

					<template v-for="article in articles" >
						<article-preview :article="article" :key="article.slug"></article-preview>
					</template>
				</div>
			</div>
  	</div>
	</div>
</template>

<script>
import { getArticles } from "@/api/article"
import ArticlePreview from "./components/article-preview"
import { getProfile } from "@/api/profile"

export default {
	watchQuery: ['tab'],
	middleware: ['authenticated'],
	name:'ProfileIndex',
	async asyncData({ query, params, store }) {
		const tab = query.tab || 'my_articles'
		const { username } = params
		const { data: { articles , articlesCount } } = await getArticles({author: tab === 'my_articles'? username:undefined, favorited: tab === 'favorited_articles' ? username:undefined})
		const isLoginUser = username === store.state.user.username
		let profile = null
		if( isLoginUser ) {
			const user = store.state.user
			profile = user
		} else {
			const	{ data } = await getProfile(username)
			profile = data.profile
		}
		return {
			tab,
			articles,
			profile
		}
	},
	components: {
		ArticlePreview
	},
	mounted(){
	},
	methods:{
		
	}
}
</script>

<style>

</style>