<template>
  <div class="amap__container">
    xxxx
    <div id="amap__amap-container" class="amap__amap-container" ref="amap-container"></div>
    <el-amap class="amap__amap-container" vid="map"></el-amap>
  </div>
</template>

<script>
import VueAMap from 'vue-amap'

export default {
  data () {
    return {
      aMap: null
    }
  },
  mounted() {
    console.log(111)
    this.$nextTick(() => {
      this.initMap()
    })
  },
  methods: {
    initMap () {
    console.log(111)
    this.aMap = VueAMap.initAMapApiLoader({
      key: '75aa8dbb1c8754889515b823b9eb92ab',
      plugin: [
        'AMap.Autocomplete',
        'AMap.PlaceSearch',
        'AMap.Scale',
        'AMap.OverView',
        'AMap.ToolBar',
        'AMap.MapType',
        'AMap.PolyEditor',
        'AMap.CircleEditor',
        'AMap.Geolocation'
      ],
      uiVersion: '1.0'
    })
  }
}
</script>

<style lang="stylus" scoped>
.amap__container {
  width 100%
  height 500px
  background-color #666666

  .amap__amap-container {
    width 100%
    height 100%
    background-color #333333
  }
}
</style>>
