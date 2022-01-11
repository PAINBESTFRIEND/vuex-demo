// Todos案例的 state，mutations，actions，getter
// 引入axios 自已又加工处理的那个【src/utils/axios.js】
import axios from '../utils/axios'

export default {
  namespace: false,
  state: {
    //下拉列表
    list: [],
    //输入框的要输入的值
    inputValue: '',
    // 下一个id
    nextId: 5,
    viewKey: 'all' // 默认为 all 显示全部待办 要是只是显示未完成的 设置成 undone 即可
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    setInputValue (state, value) {
      state.inputValue = value
    },
    // 添加项目列表
    addItem (state) {
      const obj = {
        id: state.nextId,
        //输入内容,trim去除空格
        info: state.inputValue.trim(),
        //是否完成的标识，默认为false未完成
        done: false
      }
      /**
       * 将该对象push到state属性的list中
       * 并且将nextId数值+1,且清空输入框里的内容
       */
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 根据id删除对应任务事项
    removeItem (state, id) {
      // 1.根据id查找对应项索引findIndex
      const index = state.list.findIndex(i => i.id === id)
      // 2.根据索引删除对应项,-1表示没找到,boolean值为falese
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    changeDone (state, id) {
      const index = state.list.findIndex(i => i.id === id)
      if (index !== -1) {
        state.list[index].done = !state.list[index].done
      }
    },
    // 清除已完成的任务
    cleanDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 修改页面上展示列表数据
    changeViewKey (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    /**
     * 由于axios是异步请求，需要将其放在actions中
     * 若请求成功返回一个data的回调函数
     */
    
    getList (context) {
      axios.get('./data/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    },
  },
  getters: {
    /**
     * 统计未完成的任务条数,x代表数组list中的一条数据
     * filter过滤完数组返回了一个新的数组的.length
     */
    unDoneLength (state) {
      return state.list.filter(x => x.done === false).length
    },
    /**
     * 给组件返回不同条件过滤后的数组
     */
    infoList (state) {
      if (state.viewKey === 'all') {
        return state.list
      } else if (state.viewKey === 'undone') {
        return state.list.filter(x => x.done === false)
      } else if (state.viewKey === 'done') {
        return state.list.filter(x => x.done === true)
      } else {
        return state.list
      }
    }
  }
}
