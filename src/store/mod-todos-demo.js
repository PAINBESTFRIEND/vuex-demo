import axios from '../utils/axios'
export default {
    namespaced: true,
    state: {
    //输出下拉列表
    list: [],
    inputValue: '',
    nextId: 5,
    viewKey: 'all'
    },
    mutations: {
        initList (state,list) {
        state.list =list
    },
        setInputValue (state,value) {
        state.inputValue =value
    },
        addItem (state) {
        const obj ={
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
    }
        state.list.push(obj)
        state.nextId++
        state.inputValue = ''
    },
        subItem (state,id) {
        const newlist = state.list.filter(x => x.id!==id)
        state.list =newlist
    },
        changeDone (state,id) {
        const index = state.list.findIndex(i => i.id === id)
        if (index !== -1) {
        state.list[index].done = !state.list[index].done 
        } 
    },
        changeViewKey (state,key) {
        state.viewKey = key
        console.log(state.viewKey)
        },
        deleteDone (state) {
        state.list =state.list.filter( i => i.done === false)
        }
    },
    actions: {
    getList (context) {
        axios.get('./data/list.json').then(({ data }) => {
            context.commit('initList', data)
        })
    }
    },
    getters: {
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