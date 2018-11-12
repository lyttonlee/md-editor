<template>
  <div class="option">
    <h1>{{option}}</h1>
    <el-form
      :model="qnconfig"
      :rules="rules"
      ref="qnconfig" 
      label-width="60px" 
      label-position="right" 
      class="qnform">
      <el-form-item label="AK" prop="ak">
        <el-input 
          v-model="qnconfig.ak"
          placeholder="请输入七牛云密匙AK"></el-input>
      </el-form-item>
      <el-form-item label="SK" prop="sk">
        <el-input 
          v-model="qnconfig.sk"
          placeholder="请输入七牛云密匙SK"></el-input>
      </el-form-item>
      <el-form-item label="Scope" prop="scope">
        <el-input 
          v-model="qnconfig.scope"
          placeholder="请输入七牛云空间名称"></el-input>
      </el-form-item>
      <el-form-item label="Domain" prop="domain">
        <el-input 
          v-model="qnconfig.domain"
          placeholder="请输入七牛云空间外链域名"></el-input>
      </el-form-item>
      <el-form-item label="地区" prop="position">
        <el-select v-model="qnconfig.position" placeholder="请选择您所在的地区">
          <el-option label="华东" value="https://up.qiniup.com"></el-option>
          <el-option label="华北" value="https://up-z1.qiniup.com"></el-option>
          <el-option label="华南" value="https://up-z2.qiniup.com"></el-option>
          <el-option label="北美" value="https://up-na0.qiniup.com"></el-option>
          <el-option label="东南亚" value="https://up-as0.qiniup.com"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-if="nooption" type="success" @click="submitqn">确认并提交</el-button>
        <template v-if="hasoption">
          <el-button type="success" @click="editqn">修改七牛云配置</el-button>
          <el-button  type="danger" @click="deleteqn">删除七牛云配置</el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      option: '七牛云配置',
      nooption: true,
      hasoption: false,
      oldqnoption: '',
      qnconfig: {
        ak: '',
        sk: '',
        domain: '',
        scope: '',
        position: ''
      },
      rules: {
        ak: [
          { required: true, message: '请输入七牛云密匙AK', trigger: 'blur' }
        ],
        sk: [
          { required: true, message: '请输入七牛云密匙SK', trigger: 'blur' }
        ],
        scope: [
          { required: true, message: '请输入七牛云空间名称', trigger: 'blur' }
        ],
        domain: [
          { required: true, message: '请输入七牛云空间外链域名', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请选择您的区域所在', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitqn () {
      this.$refs.qnconfig.validate(valid => {
        if (valid) {
          let qnoption = {
            hasoption: true,
            option: {
              ak: this.qnconfig.ak.trim(),
              sk: this.qnconfig.sk.trim(),
              scope: this.qnconfig.scope.trim(),
              domain: this.qnconfig.domain.trim(),
              position: this.qnconfig.position
            }
          }
          console.log(qnoption)
          this.$db.insert(qnoption, (err, newDoc) => {
            if (err) {
              this.$message({
                type: 'error',
                message: '很抱歉提交失败，请稍后再试！'
              })
              console.log(err)
            } else {
              console.log(newDoc)
              if (!newDoc) {
                this.$message({
                  type: 'error',
                  message: '很抱歉插入数据失败，请稍后再试！'
                })
              } else {
                this.$router.push('/home')
              }
            }
          })
        } else {
          console.log('err')
        }
      })
    },
    editqn () {
      let updateqnoption = {
        hasoption: true,
        option: {
          ak: this.qnconfig.ak.trim(),
          sk: this.qnconfig.sk.trim(),
          scope: this.qnconfig.scope.trim(),
          domain: this.qnconfig.domain.trim(),
          position: this.qnconfig.position
        }
      }
      let query = {
        _id: this.oldqnoption._id
      }
      this.$db.update(query, updateqnoption, {}, (err, numReplaced) => {
        // console.log(numReplaced, err)
        if (err) {
          this.$message({
            type: 'error',
            message: '内部错误！获取数据失败'
          })
        } else {
          this.$message({
            type: 'success',
            message: '修改七牛云配置成功!'
          })
          this.$router.push('/home/lists')
        }
      })
    },
    deleteqn () {
      console.log('delete')
      this.$confirm('此操作将永久删除该七牛云配置, 是否确定删除?', '请确定你正在进行的操作!', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // let query = {
        //   _id: this.oldqnoption._id
        // }
        this.$db.remove({'_id': this.oldqnoption._id}, {}, (err, numRemoved) => {
          console.log(err, numRemoved)
          if (err) {
            this.$message({
              type: 'error',
              message: '删除失败!请稍后再试'
            })
          } else {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.$router.push('/')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getqnoption () {
      this.$db.findOne({hasoption: {$exists: true}}, (err, doc) => {
        if (err) {
          console.log(err + '出错误了！')
        } else {
          console.log(doc)
          if (doc) {
            // this.$router.push('/home')
            this.nooption = false
            this.hasoption = true
            this.oldqnoption = doc
            this.qnconfig.ak = doc.option.ak
            this.qnconfig.sk = doc.option.sk
            this.qnconfig.domain = doc.option.domain
            this.qnconfig.scope = doc.option.scope
            this.qnconfig.position = doc.option.position
          }
        }
      })
    }
  },
  mounted () {
    this.getqnoption()
  }
}
</script>
<style lang="less" scoped>
.option {
  .qnform {
    margin: 10px;
    .el-select {
      width: 100%;
    }
    .el-button {
      width: 100%;
      margin: 20px 0 ;
    }
  }
}
</style>


