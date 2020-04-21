<template>
  <div class="amap__container">
    <div id="amap__amap-container" class="amap__amap-container" ref="amap-container"></div>
    <!-- <el-amap class="amap__amap-container" vid="map"></el-amap> -->
  </div>
</template>

<script>
// import VueAMap from 'vue-amap'
import AMap from 'AMap'

export default {
  data () {
    return {
      map: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initMap()
    })
  },
  methods: {
    initMap () {
      console.log(111)
      this.map = new AMap.Map('amap__amap-container', {
        center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 10,
        lang: 'en'
      })
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
        this.map.addControl(new AMap.ToolBar())
        this.map.addControl(new AMap.Scale())
      })
      // this.aMap = VueAMap.initAMapApiLoader({
      //   key: '75aa8dbb1c8754889515b823b9eb92ab',
      //   plugin: [
      //     'AMap.Autocomplete',
      //     'AMap.PlaceSearch',
      //     'AMap.Scale',
      //     'AMap.OverView',
      //     'AMap.ToolBar',
      //     'AMap.MapType',
      //     'AMap.PolyEditor',
      //     'AMap.CircleEditor',
      //     'AMap.Geolocation'
      //   ],
      //   uiVersion: '1.0'
      // })
    }
  }
}
</script>

<style lang="stylus" scoped>
.amap__container {
  width 100%
  height 100%

  .amap__amap-container {
    width 100%
    height 1624px
    background-color #333333
  }
}
</style>
