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
        <el-button type="success" @click="submitqn">确认并提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      option: '七牛云设置',
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
              ak: this.qnconfig.ak,
              sk: this.qnconfig.sk,
              scope: this.qnconfig.scope,
              domain: this.qnconfig.domain,
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
    }
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
    }
  }
}
</style>


