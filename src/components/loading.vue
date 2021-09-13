<template>
	<div>
		<div class="head">
			<h3>系统使用公告📢：</h3>

		</div>
		<div class="body fonts">
			<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;亲爱的用户(👨，👩，🧒···)，欢迎💐使用 The Job Management System 👏 ,目前系统处于version 1.1📝,可能在使用过程会有一些小bug，如遇到问题请先尝试刷新♻️页面，如问题仍然存在🐛.·····（其实我也很无奈😮‍💨，团队会努力💪解决的）<br>希望大家可以发邮件📧及时反馈。<br> 如果你有能力也很欢迎加入我们！<br>😊 🎉 🤝<br>目前只支持电脑端，移动端📱还未适配---建议用电脑使用💻</p>

		</div>
		<div class="foot">
			<p>By&nbsp;&nbsp;:&nbsp;&nbsp;Mimo Team🐒</p>
			<p>Mail📧&nbsp;&nbsp;:&nbsp;&nbsp;mixuxin@163.com</p>
		</div>
		
	</div>
</template>

<script>
	export default {
		name:"loading",
		mounted() {
			
		},
	}
	
</script>

<style scoped>
	.fonts{
		font-weight: 100;
		color: #3c3c3c;
		letter-spacing: 2px;
		/* line-height: 5px; */
	}
	.head{
		padding: 10px;
		/* border: red solid 1px; */

	}
	.body{
		margin: 0 auto;
		height: 30%;
		width: 90%;
		/* border: blueviolet solid 1px; */
	}
	.foot{
		/* border: palevioletred solid 1px; */
		direction: rtl;
		padding-right: 5%;
	}
</style>