<template>
	<div>
		<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>作业下载助手-1.1</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="download">点击下载</el-button>
		</div>
		<div class="text item" v-for=" (item,index) in infolist" :key="index" >
			{{item}}
		</div>
		
		</el-card>
	</div>
</template>

<script>
export default {
	name:"download",
	data(){
		return{
			infolist:["版本介绍：","1.文件原始格式下载，未提供文件统一格式化","2.文件命名统一格式（例子：徐鑫2028224195.zip）","下次更新","1.一键压缩/解压"]
		}
	},
	methods:{
		download(){
			this.axios.get('https://qcakyo.fn.thelarkcloud.com/download', {
				
				
				})
				.then(function (response) {
					// console.log(response.data.url)
					window.open(response.data.url)
					
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}
}
</script>

<style>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 480px;
		margin: 150px auto;
	}

</style>