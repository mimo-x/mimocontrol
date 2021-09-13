<template>
	<!-- 统计图 -->	
	<div class="box">
		<div class="item" v-for="(item, index) in localstor.result" :key="index">
			<!-- 进度条 -->
			<el-progress :percentage="((item.finish/item.count)*100).toFixed(2)" :color="customColors" class="progress scale-up-hor-left"></el-progress>
			<!-- 作业信息表单 -->
			<el-descriptions :title="item.workname" direction="vertical" :column="4" border size="mini">
			<el-descriptions-item label="已提交">{{item.finish}}</el-descriptions-item>
			<el-descriptions-item label="发布日期">{{item.date[0]}}</el-descriptions-item>
			<el-descriptions-item label="截止日期" :span="2">{{item.date[1]}}</el-descriptions-item>
			<el-descriptions-item label="发布人">
				<el-tag size="small">{{item.auth}}</el-tag>
			</el-descriptions-item>
			<el-descriptions-item label="备注信息">{{item.step}}</el-descriptions-item>
			</el-descriptions>
						
		</div>
	</div>

</template>

<script>

export default {
	name:"cartogram",
	data(){
		return{
			percentage:25,
			customColors: [
				{color: '#f56c6c', percentage: 20},
				{color: '#e6a23c', percentage: 40},
				{color: '#5cb87a', percentage: 60},
				{color: '#1989fa', percentage: 80},
				{color: '#6f7ad3', percentage: 100}
			],
			localstor:JSON.parse(localStorage.getItem("worklist")),

			
			
		}
	},
	
	mounted() {

		
	},

	methods: {

		
	},
}
</script>

<style scoped> 
	.scale-up-hor-left{-webkit-animation:scale-up-hor-left 1s cubic-bezier(.39,.575,.565,1.000) both;animation:scale-up-hor-left 1s cubic-bezier(.39,.575,.565,1.000) both}

	@-webkit-keyframes scale-up-hor-left{0%{-webkit-transform:scaleX(.4);transform:scaleX(.4);-webkit-transform-origin:0 0;transform-origin:0 0}100%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:0 0;transform-origin:0 0}}@keyframes scale-up-hor-left{0%{-webkit-transform:scaleX(.4);transform:scaleX(.4);-webkit-transform-origin:0 0;transform-origin:0 0}100%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:0 0;transform-origin:0 0}}
	
	.item{
		margin-bottom: 50px;
		margin-left: 20px;
	}
	.progress{
		margin: 20px;
	}
	
</style>