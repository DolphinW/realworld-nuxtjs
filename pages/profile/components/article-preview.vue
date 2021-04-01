<template>
	<div class="article-preview">
		<div class="article-meta">
			<nuxt-link :to="{
				name:  'profile', params: { username: article.author.username }
			}"><img :src="article.author.image" /></nuxt-link>
			<div class="info">
				<a href="" class="author">{{article.author.username}}</a>
				<span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
			</div>
			<button class="btn btn-outline-primary btn-sm pull-xs-right"
							:class="{active: article.favorited}"
							@click="toggleFavorite">
				<i class="ion-heart"></i> {{article.favoritesCount}}
			</button>
		</div>
		<nuxt-link :to="{
								name:  'profile', params: { username: article.author.username }
							}"
			 				class="preview-link">
			<h1>{{article.title}}</h1>
			<p>{{article.description}}</p>
			<span>Read more...</span>
		</nuxt-link>
	</div>
</template>

<script>
import { addFavorite, deleteFavorite } from '@/api/article'

export default {
name: "ArticlePreview",
props:{
	article:{
		type: Object,
		required: true
	}
},
methods: {
	async toggleFavorite() {
		try{
			const { favorited, slug } = this.article
			favorited ? await deleteFavorite(slug) : await addFavorite(slug)
			this.$router.go(0)
		}catch(err){
			window.alert('操作失败，请重新再试！')
		}
	},	
}
}
</script>

<style>

</style>