import db from '../../data/datastore'
const state = {
  qnoption: {}
}

const mutations = {
  GET_QNOPTION (state) {
    // db.findOne({hasoption: {$exists: true}}, (err, doc) => {
    //   if (err) {
    //     console.log(err + '出错误了！')
    //     state.qnoption = ''
    //   } else {
    //     // console.log(doc)
    //     state.qnoption = doc.option
    //     console.log(state.qnoption)
    //   }
    // })
    state.qnoption = db.findOne({hasoption: {$exists: true}}, (err, doc) => {
      console.log(err, doc)
      // return new Promise((resolve, reject) => {
      //   if (doc) {
      //     resolve(doc)
      //   } else {
      //     reject(err)
      //   }
      // })
      return doc
    })
  }
}

const getters = {
  qnconf (state) {
    console.log(state)
    return state.qnoption
  }
}

const actions = {
  qnoption ({ commit }) {
    // do something async
    commit('GET_QNOPTION')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
