<template>
	<div class="article-meta">
		<nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }"><img :src="article.author.image" /></nuxt-link>
		<div class="info">
			<nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }" class="author">{{ article.author.username }}</nuxt-link>
			<span class="date">{{ article.createdAt | date('MMM DD, YYYY')}}</span>
		</div>
		<button class="btn btn-sm btn-outline-secondary" :class="{active: article.author.following}" @click="toggleFollow">
			<i class="ion-plus-round"></i>
			&nbsp;
			Follow Eric Simons <span class="counter"></span>
		</button>
		&nbsp;&nbsp;
		<button class="btn btn-sm btn-outline-primary" :class="{active: article.favorited}" @click="toggleFavorite">
			<i class="ion-heart"></i>
			&nbsp;
			Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
		</button>
	</div>
</template>

<script>
import { addFavorite, deleteFavorite } from '@/api/article'
import { follow, unFollow } from '@/api/profile'

export default {
	name: 'ArticleMeta',
	props:{
		article:{
			type: Object,
			required: true
		}
	},
	methods:{
		async toggleFavorite() {
			try{
				const { favorited, slug } = this.article
				favorited ? await deleteFavorite(slug) : await addFavorite(slug)
				this.$router.go(0)
			}catch(err){
				window.alert('操作失败，请重新再试！')
			}
		},
		async toggleFollow() {
			try{
				const { author: { following, username } } = this.article
				following ? await unFollow(username) : await follow(username)
				this.$router.go(0)
			}catch(err){
				window.alert('操作失败，请重新再试！')
			}
		}
	}
}
</script>

<style>

</style>