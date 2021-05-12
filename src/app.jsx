import { Component } from 'react'
import { Provider } from 'mobx-react'

import menu from './store/store'

// TaroUI 全局样式
import 'taro-ui/dist/style/index.scss'
import './app.less'



class App extends Component {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <Provider store={menu}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
