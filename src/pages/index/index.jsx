import React, { Component } from 'react'
import Taro from '@tarojs/taro'

import TaroUI from 'taro-ui'

import { View, Button, Text , Swiper , SwiperItem , Image , ScrollView , Icon } from '@tarojs/components'
import { observer, inject } from 'mobx-react'



import './index.less'


// 图片
import banner1 from "../../static/banner1.png"
import banner2 from "../../static/banner2.png"
import logo from "../../static/logo.png"


@inject('store')
@observer
class Index extends Component {

	state = {
		tabNum:  0,
		menuNum: 0,
		optData:{
			open: false,
			sweet: 1,
			cold: 1,
			name: "",
			price: "",
		},
		cartData:{
			open: false,
			goods:[
				
			],
		},
		cartTotal: 0
	}
	
	componentWillMount() { }

	componentDidMount() { }

	componentWillUnmount() { }

	componentDidShow() { }

	componentDidHide() { }

	// 改变显示内容
	changeTab(num){
		this.setState({
			tabNum:num
		});
	}

	// 切换菜单板块
	changeMenu(num){
		this.setState({
			menuNum:num
		},()=>{
			console.log(this.state.menuNum)
		});
	}

	// 跳出商品选项
	setGood(name,price){
		let newOptData=Object.assign(this.state.optData,{open:true,name:name,price:price});
		this.setState({
			optData:newOptData
		});
	}

	// 设置商品参数
	setDetail( name , num ){
		let newOptData=Object.assign(this.state.optData,{[name]:num});
		this.setState({
			optData:newOptData
		});
	}

	// 加入购物车
	addToCart(){
		let id = new Date().getTime();
		let good = {
			name:  this.state.optData.name,
			sweet: this.state.optData.sweet,
			cold:  this.state.optData.cold,
			price: this.state.optData.price,
			id:    id
		}
		let arr = this.state.cartData.goods;
		arr.push(good);
		this.setState({
			cartData:{
				open:false,
				goods:arr
			}
		},()=>{
			this.checkTotal();
		});
		this.closeAll();
	}

	// 调整总价格
	checkTotal(){
		let Total = 0;
		this.state.cartData.goods.map(item=>{
			Total+=item.price;
		});
		this.setState({
			cartTotal:Total
		});
	}

	// 打开购物车
	openCart(){
		let newCartData=Object.assign(this.state.cartData,{open:true});
		this.setState({
			cartData:newCartData
		});
	}

	// 清空购物车
	resetCart(){
		this.setState({
			cartData:{
				open: false,
				goods:[]
			}
		},()=>{
			this.checkTotal();
		});
	}

	// 删除购物车商品
	delGood(index){
		let arr = this.state.cartData.goods;
		arr.splice(index,1);
		let newCartData=Object.assign(this.state.cartData,{goods:arr});
		this.setState({
			cartData:newCartData
		},()=>{
			this.checkTotal();
		});
	}

	// 关闭所有窗口
	closeAll(){
		let newCartData=Object.assign(this.state.cartData,{open:false});
		this.setState({
			optData:{
				open: false,
				sweet: 1,
				cold: 1,
				name: "",
				price: "",
			},
			cartData:newCartData
		});
	}

	render() {
		return (
			<View className='index'>


				{/* 轮播图 */}
				<Swiper className='banner' indicatorColor='#999' indicatorActiveColor='#333' circular indicatorDots autoplay>
					<SwiperItem>
						<Image className="img" mode="aspectFill" src={banner1}/>
					</SwiperItem>
					<SwiperItem>
						<Image className="img" mode="aspectFill" src={banner2}/>
					</SwiperItem>
				</Swiper>


				{/* Tab 栏 */}
				<View className="btn_list">
					<View className={`btn_hover ${(this.state.tabNum==0)&&"hover0"} ${(this.state.tabNum==1)&&"hover1"} ${(this.state.tabNum==2)&&"hover2"}`}></View>
					<View className="btn" onClick={()=>{this.changeTab(0)}}>外卖</View>
					<View className="btn" onClick={()=>{this.changeTab(1)}}>评论</View>
					<View className="btn" onClick={()=>{this.changeTab(2)}}>详情</View>
				</View>


				{/* Tab 内容 */}
				<Swiper className="page_content" current={this.state.tabNum} onChange={(e)=>this.changeTab(e.detail.current)}>
					<SwiperItem className="page_content_item">
						<View className="info_bar"><Icon size='12' type='info' color="#000" /><Text style="padding-left: 5px;">重大利好</Text></View>
						<View className="menu">

							<ScrollView className="tab_list" scrollY>

								{
									this.props.store.menu.map((item,index)=>{
										return(
											<View className="tab_item" key={index} onClick={()=>{this.changeMenu(index)}}>{ item.class+" "+(index+1) }</View>
										)
									})
								}

								<View className="bottom"></View>
								
							</ScrollView>
							
							<ScrollView className="good_list" scrollY>

								{
									this.props.store.menu[this.state.menuNum].list.map((item,index)=>{
										return(
											<View className="good_item" key={index}>
												<Image className="img" src={logo}></Image>
												<View className="name">{item.name+" "+(this.state.menuNum+1)+"-"+(index+1)}</View>
												<View className="price">￥ {(item.price+index)}</View>
												<View className="btn" onClick={()=>{this.setGood((item.name+" "+(this.state.menuNum+1)+"-"+(index+1)),(item.price+index))}}>选规格</View>
											</View>
										)
									})
								}
								
								<View className="bottom"></View>
								
							</ScrollView>
						</View>
					</SwiperItem>
					<SwiperItem>222222222
					</SwiperItem>
					<SwiperItem>33333333333
					</SwiperItem>
				</Swiper>


				{/* 深色背景遮盖 */}
				<View className="bg" onClick={this.closeAll.bind(this)} style={{"display":(this.state.optData.open||this.state.cartData.open)?"block":"none"}}></View>


				{/* 购物车 bar */}
				<View className="cart_bar">
					<View className="price" onClick={this.openCart.bind(this)}>￥{this.state.cartTotal}</View>
					<View className="pay">去结算</View>
				</View>


				{/* 购物车内容 */}
				<View className="cart_content" style={{"display":(this.state.cartData.open)?"block":"none"}}>
					<View className="info">
						<View className="title">
							<Text className="text">购物车</Text>
						</View>
						<View className="reset">
						<Icon size='12' type='clear' color="#555" /><Text className="text" onClick={this.resetCart.bind(this)}>清空</Text>
						</View>
					</View>
					
					<ScrollView className="cart_scroll" scrollY>

						{
							this.state.cartData.goods.map((item,index)=>{
								return(
									<View className="cart_item">
										<View className="title">
											<Text className="name">{item.name}</Text><br/>
											{/* <Text className="tag">{`${(item.cold==1)&&"正常冰"}${(item.cold==2)&&"少冰"}${(item.cold==3)&&"去冰"}${(item.cold==4)&&"常温"} ${(item.sweet==1)&&"标准"}${(item.sweet==2)&&"七分糖"}${(item.sweet==3)&&"五分糖"}${(item.sweet==4)&&"三分糖"}`}</Text> */}
											<Text className="tag">{(item.cold==1)&&"正常冰"}{(item.cold==2)&&"少冰"}{(item.cold==3)&&"去冰"}{(item.cold==4)&&"常温"} {(item.sweet==1)&&"标准"}{(item.sweet==2)&&"七分糖"}{(item.sweet==3)&&"五分糖"}{(item.sweet==4)&&"三分糖"}</Text>
										</View>
										<View className="price">￥{item.price}</View>
										<View className="del" onClick={()=>{this.delGood(index)}}><Icon size='25' type='clear' color="#999" /></View>
									</View>
								)
							})
						}
						
						{/* <View className="cart_item">
							<View className="title">
								<Text className="name">奶茶</Text><br/>
								<Text className="tag">正常冰 三分糖</Text>
							</View>
							<View className="price">￥10</View>
							<View className="del"><Icon size='25' type='clear' color="#999" /></View>
						</View> */}
						
						
						<View className="bottom"></View>
						
					</ScrollView>
				</View>


				{/* 商品选项卡 */}
				<View className="opt_content" style={{"display":(this.state.optData.open)?"block":"none"}}>
			
					<View className="close" onClick={this.closeAll.bind(this)}>
						<Icon size='20' type='clear' color="#000" />
					</View>
					
					<View className="title">{this.state.optData.name}</View>
					
					<View className="title_s">甜度：</View>
					<View className="group">
						<View className={`radio ${(this.state.optData.sweet==1)&&"on"}`} onClick={()=>{this.setDetail('sweet',1)}}>标准</View>
						<View className={`radio ${(this.state.optData.sweet==2)&&"on"}`} onClick={()=>{this.setDetail('sweet',2)}}>七分糖</View>
						<View className={`radio ${(this.state.optData.sweet==3)&&"on"}`} onClick={()=>{this.setDetail('sweet',3)}}>五分糖</View>
						<View className={`radio ${(this.state.optData.sweet==4)&&"on"}`} onClick={()=>{this.setDetail('sweet',4)}}>三分糖</View>
					</View>
					
					<View className="title_s">温度：</View>
					<View className="group">
						<View className={`radio ${(this.state.optData.cold==1)&&"on"}`} onClick={()=>{this.setDetail('cold',1)}}>正常冰</View>
						<View className={`radio ${(this.state.optData.cold==2)&&"on"}`} onClick={()=>{this.setDetail('cold',2)}}>少冰</View>
						<View className={`radio ${(this.state.optData.cold==3)&&"on"}`} onClick={()=>{this.setDetail('cold',3)}}>去冰</View>
						<View className={`radio ${(this.state.optData.cold==4)&&"on"}`} onClick={()=>{this.setDetail('cold',4)}}>常温</View>
					</View>
					
					<View className="pay_bar">
						<View className="price">￥{this.state.optData.price}</View>
						<View className="btn" onClick={()=>{this.addToCart()}}>加入购物车</View>
					</View>
					
				</View>

			</View>
		)
	}
}

export default Index
