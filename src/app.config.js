export default {
	pages: [
		'pages/index/index',
		'pages/record/record',
		'pages/self/self'
	],
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'WeChat',
		navigationBarTextStyle: 'black'
	},
	"tabBar": {
		"backgroundColor": "eee",
		"color": "#3F536E",
		"selectedColor": "#007AFF",
		"list": [
			{
				"pagePath": "pages/index/index",
				"text": "首页"
			},
			{
				"pagePath": "pages/record/record",
				"text": "订单"
			},
			{
				"pagePath": "pages/self/self",
				"text": "我的"
			}
		]
	}
}
