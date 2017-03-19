//		设置初始比例（1：1像素还原）
		<script>
			var iScale = 1 / window.devicePixelRatio;
			document.write('<meta name="viewport" content="width=device-width,initial-scale='+iScale+',minimum-scale='+iScale+',maximum-scale='+iScale+',user-scalable=no"/>');
		</script>-->
//		<!--动态设置html字体大小-->
		<script>
			var iWidth = document.documentElement.clientWidth;
			document.getElementsByTagName('html')[0].style.fontSize = iWidth / 16 + 'px';
		</script>