import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './self.less'


@inject('store')
@observer
class Self extends Component {
	componentWillMount() { }

	componentDidMount() { }

	componentWillUnmount() { }

	componentDidShow() { }

	componentDidHide() { }

	render() {
		return (
			<View className='self'>
				我的
			</View>
		)
	}
}

export default Self
