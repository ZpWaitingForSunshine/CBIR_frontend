<template>
  <div class="dashboard-editor-container">
    <!-- steps -->
    <div id="upload-step" class="step" @scroll.prevent>
      <el-steps :active="orderStatus">
        <el-step v-for="item in items" :key="item.id" :title="item.title" :description="item.description" :icon="item.icon" />
      </el-steps>
    </div>

    <!-- the first step -->
    <div v-show="orderStatus == 0" class="tabs">
      <transition key="hdr" name="el-fade-in-linear">
        <el-form :model="form">
          <el-form-item>
            <el-upload
              class="upload-file"
              drag
              :action="doUpload"
              :limit="1"
              :before-upload="beforeUploadFile"
              :on-change="fileChange"
              :on-exceed="exceedFile"
              :on-success="handleSuccess"
              :on-error="handleError"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">Drag HDR file here, or <em>Click for uploading</em></div>
            </el-upload>

            <!-- <div v-show="show" class="transition-box">.el-fade-in-linear</div> -->
          </el-form-item>
        </el-form>
      </transition>
    </div>

    <!-- the secord step hdr form -->
    <div v-show="orderStatus == 1" class="tabs">
      <transition key="hdrform" name="el-fade-in-linear">
        <hdrform
          :formdata="formdata"
          @showFinalStep="showFinal"
        />
      </transition>
    </div>

    <div v-show="orderStatus == 2" class="tabs">
      <el-row v-for="(value, key) in final" v-show="value != null">
        <el-col :span="3"><div class="grid-content bg-purple property-title"><h5>{{ key }}:</h5></div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple-light"><h5>{{ value }}</h5></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple property-title"><h5>Thumbnail:</h5></div></el-col>
        <el-col :span="18"><img :src="final.thumbnailurl"></img></el-col>
      </el-row>

    </div>

  </div>
</template>

<script>
import Hdrform from './components/form'

export default {
  name: 'DashboardEditor',
  components: { Hdrform },
  data() {
    return {
      orderStatus: 0,
      items: [
        {
          id: 1,
          title: 'Upload HDR File',
          description: ''
        }, {
          id: 2,
          title: 'Update Image\'s Information',
          description: ''
        }, {
          id: 3,
          title: 'Finished',
          description: ''
        }],
      doUpload: 'rest/image/hdrupload',
      fileList: [],
      importHeaders: ['multipart/form-data'],
      form: {
        file: ''
      },
      formdata: {},
      final: {}
    }
  },
  computed: {
    // ...mapGetters([
    //   'name',
    //   'avatar',
    //   'roles'
    // ])
  },
  methods: {
    beforeUpload(file) {
      return true
    },

    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$notify.warning({
        title: 'warning',
        message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`
      })
    },

    fileChange(file, fileList) {
      console.log('change')
      // console.log(file)
      this.form.file = file.raw
      // console.log(this.form.file)
      // console.log(fileList)
    },

    beforeUploadFile(file) {
      console.log('before upload')
      // console.log(file)
      const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      const size = file.size / 1024 / 1024
      if (extension !== 'hdr') {
        this.$notify.warning({
          title: 'warning',
          message: `hdr only`
        })
      }
      if (size > 100) {
        this.$notify.warning({
          title: 'warning',
          message: `10M limited`
        })
      }
    },

    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$notify.success({
        title: 'success',
        message: `hdr upload successfully`
      })
      console.log('success')
      // console.log(res)
      // console.log(JSON.stringify(res))
      this.orderStatus = 1
      this.formdata = res.data
      this.formdata['hdfsurl'] = null
    },

    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      console.log(err)
      this.$notify.error({
        title: 'error',
        message: `fiel upload faild`
      })
    },

    showFinal(payload) {
      console.log('hellod')
      this.orderStatus = 2
      this.final = payload
    }

    // uploadFile() {
    //   // this.$refs.uploadExcel.submit()
    // }
  }
}
</script>

<style lang="scss" scoped>

.tabs{
  margin-top: 20px;
}
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #fff;
    min-height: 100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
.property-title{
  display:flex;
  justify-content:flex-end;
  padding-right:20px;
}
</style>
