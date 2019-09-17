<template>
  <div class="dashboard-editor-container">
    <!-- steps -->
    <div id="upload-step" class="step" @scroll.prevent>
      <el-steps :active="$store.state.retrieval.step">
        <el-step v-for="item in items" :key="item.id" :title="item.title" :description="item.description" :icon="item.icon" />
      </el-steps>
    </div>

    <!-- the first step -->
    <div v-show="$store.state.retrieval.step == 0" class="tabs">
      <transition key="hdr" name="el-fade-in-linear">
        <HdrUpload />
      </transition>
    </div>

    <!-- the secord step hdr form -->
    <div v-show="$store.state.retrieval.step == 1" class="tabs">
      <!-- <transition key="hdrform" name="el-fade-in-linear">
        <hdrform
          :formdata="formdata"
          @showFinalStep="showFinal"
        />
      </transition> -->
    </div>

  </div>
</template>

<script>
import HdrUpload from './components/hdrupload'

export default {
  name: 'DashboardEditor',
  components: { HdrUpload },
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
