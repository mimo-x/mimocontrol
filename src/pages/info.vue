<template>
	<div>
		<div class="top" v-show="true">
			<top></top>
		</div>
		<div class="leftandright">
			<div class="left">
				<left></left>
			</div>
			<div class="right" >
				
				<!-- 我的任务提交 -->
				<loading v-if="times=='0'"></loading>
				<!-- <div v-if="times=='0'">123</div> -->
				
				<tijiao v-else-if="rightpath === 'tijiao'" class="rotate-vert-center" ></tijiao>

				<!-- 班委提交任务 -->
				<issue v-else-if="rightpath === 'issue'"></issue>
				<perlist v-else-if="rightpath === 'perlist'"></perlist>
				<cartogram v-else-if="rightpath === 'cartogram'" ></cartogram>
				<feedback v-else-if="rightpath === 'feedback'"></feedback>
				<download v-else-if="rightpath === 'download'"></download>
				<cartogram v-else></cartogram>
				
			</div>
		</div>

	</div>
	
</template>

<script>
import left from '../components/left.vue'
import top from "../components/top.vue"
import cartogram from './cartogram.vue'
import tijiao from "./tijiao.vue"
import issue from "./issue.vue"
import perlist from "./perlist.vue"
import loading from "../components/loading.vue"
import Feedback from '../components/feedback.vue'
import Download from '../components/download.vue'

export default {
		name:"info",
		components:{
			top,left,tijiao,issue,cartogram,perlist,loading,
Feedback,
Download
		},

		data(){
			return{
				username:localStorage.getItem("username"),
				xuehao:localStorage.getItem("xuehao"),
				rightpath:"cartogram",
				times:localStorage.getItem("times"),

			}
		},
		mounted() {
			// 如果没有登录页面跳转
			if(!this.xuehao){
				this.$router.replace({
					path:"/login"
				})
			}

			// 设置钩子 传递参数用 更改界面
			this.$bus.$on("changepath",(data)=>{
				console.log("我是右边的box，",data)
				this.rightpath = data
			})

		},
		methods:{


		}
		
	}

</script>

<style scoped>
	.scale-up-hor-left{-webkit-animation:scale-up-hor-left 1s cubic-bezier(.39,.575,.565,1.000) both;animation:scale-up-hor-left 1s cubic-bezier(.39,.575,.565,1.000) both}

	@-webkit-keyframes scale-up-hor-left{0%{-webkit-transform:scaleX(.4);transform:scaleX(.4);-webkit-transform-origin:0 0;transform-origin:0 0}100%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:0 0;transform-origin:0 0}}@keyframes scale-up-hor-left{0%{-webkit-transform:scaleX(.4);transform:scaleX(.4);-webkit-transform-origin:0 0;transform-origin:0 0}100%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:0 0;transform-origin:0 0}}
	
	.rotate-vert-center{-webkit-animation:rotate-vert-center 1s cubic-bezier(.455,.03,.515,.955) both;animation:rotate-vert-center 1s cubic-bezier(.455,.03,.515,.955) both}

	@-webkit-keyframes rotate-vert-center{0%{-webkit-transform:rotateY(0);transform:rotateY(0)}100%{-webkit-transform:rotateY(360deg);transform:rotateY(360deg)}}@keyframes rotate-vert-center{0%{-webkit-transform:rotateY(0);transform:rotateY(0)}100%{-webkit-transform:rotateY(360deg);transform:rotateY(360deg)}}

	.rotate-hor-center{-webkit-animation:rotate-hor-center 1s cubic-bezier(.455,.03,.515,.955) both;animation:rotate-hor-center 1s cubic-bezier(.455,.03,.515,.955) both}

	@-webkit-keyframes rotate-hor-center{0%{-webkit-transform:rotateX(0);transform:rotateX(0)}100%{-webkit-transform:rotateX(-360deg);transform:rotateX(-360deg)}}@keyframes rotate-hor-center{0%{-webkit-transform:rotateX(0);transform:rotateX(0)}100%{-webkit-transform:rotateX(-360deg);transform:rotateX(-360deg)}}
	
	*{
		margin: 10px;
	}
	.top{
		/* border: red solid 1px; */
		width: 100%;
		height: 50px;
		background-color: #eef8fe;
		border-radius: 10px;

	}
	.leftandright{
		/* border: springgreen solid 1px; */
		display: flex;
		flex-wrap: nowrap;
		justify-items:center;
		
	}
	.left{
		border-radius: 10px;
		border: solid #5a9cf8 1px;
		width: 20%;
	}
	.right{
		/* border: solid purple 1px; */
		border-radius: 10px;
		width: 80%;
		box-shadow: 0px 0px 10px #949494bb;
		
	}
</style>