<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handlInputChange"/>
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked='item.done' @click.native="changeDoneById(item.id)">{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="deleteItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{remain}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button @click="ChangeList('all')" :type="viewKey === 'all' ? 'primary' :''">全部</a-button>
          <a-button @click="ChangeList('undone')" :type="viewKey === 'undone' ? 'primary' : ''">未完成</a-button>
          <a-button @click="ChangeList('done')" :type="viewKey === 'done' ? 'primary' : ''">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a slot="actions" @click="deletedone">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
export default {
  name: 'Todos-demo',
  created () {
  console.log('在created期间已创建')
  this.$store.dispatch('todosDemo/getList')
  },
  computed: {
      ...mapState({
        list: (state) =>state.todosDemo.list,
        inputValue: (state) =>state.todosDemo.inputValue,
        viewKey: (state) => state.todosDemo.viewKey
      }),
      ...mapGetters({
        remain: 'todosDemo/unDoneLength',
        infoList: 'todosDemo/infoList'
      })
      },
  methods: {
    handlInputChange($event) {
      this.$store.commit('todosDemo/setInputValue',$event.target.value)
    },
    addItemToList() {
      if (this.inputValue.trim().length <= 0) {
        return this.$notification.open({
          message: '文本框内容不能为空！',
          type: 'error',
        })
      }
      this.$store.commit('todosDemo/addItem')
    },
    deleteItem(id) {
      this.$store.commit('todosDemo/subItem',id)
    },
    changeDoneById(id) {
      this.$store.commit('todosDemo/changeDone',id)
    },
    ChangeList(key) {
      this.$store.commit('todosDemo/changeViewKey', key)
    },
    deletedone() {
      this.$store.commit('todosDemo/deleteDone')
    }
  },
  data () {
    return {
    }
  },
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>