<template>
  <div class="amap__container">
    <div id="amap__amap-container" class="amap__amap-container" ref="amap-container"></div>
  </div>
</template>

<script>
// import AMap from 'AMap'
import AMapLoader from '@amap/amap-jsapi-loader'
import AmapApi from '@/utils/amap-api.js'

export default {
  data () {
    return {
      AMap: null,
      map: null,
      startPoint: {
        latitude: 37.5,
        longitude: 118.2,
        title: '山东济南'
      },
      endPoint: {
        latitude: 31.20,
        longitude: 121.52,
        title: '上海浦东'
      },
      polyline: []
    }
  },
  computed: {
    covers () {
      return [this.startPoint, this.endPoint]
    },
    centerPoint () {
      return {
        latitude: (this.startPoint.latitude + this.endPoint.latitude) / 2,
        longitude: (this.startPoint.longitude + this.endPoint.longitude) / 2
      }
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    async initMap () {
      const plugins = [
        'AMap.ToolBar',
        'AMap.Scale',
        'AMap.Marker',
        'AMap.PolylineEditor',
        'AMap.Geolocation'
      ]
      const params = {
        key: '75aa8dbb1c8754889515b823b9eb92ab',
        version: '2.0',
        plugins: plugins
      }
      const AMap = await AMapLoader.load(params)
      this.AMap = AMap
      this.map = new AMap.Map('amap__amap-container', {
        center: [this.centerPoint.longitude, this.centerPoint.latitude],
        resizeEnable: true,
        zooms: [5, 18],
        zoom: 5,
        viewMode: '2D'
      })
      this.map.addControl(new AMap.ToolBar())
      this.map.addControl(new AMap.Scale())
      this.addMarkers()
      this.requestPath()
    },
    addMarkers () {
      const startMarker = new this.AMap.Text({
        position: [this.startPoint.longitude, this.startPoint.latitude],
        text: this.startPoint.title,
        offset: new this.AMap.Pixel(0, 0)
      })
      const endMarker = new this.AMap.Text({
        position: [this.endPoint.longitude, this.endPoint.latitude],
        text: this.endPoint.title,
        offset: new this.AMap.Pixel(0, 0)
      })
      this.map.add([startMarker, endMarker])
      this.map.setFitView([startMarker, endMarker])
    },
    addPolyline () {
      const path = []
      this.polyline.forEach(el => {
        path.push([el.longitude, el.latitude])
      })
      const polyline = new this.AMap.Polyline({
        path: path,
        strokeWeight: 10,
        strokeColor: '#00ADC7',
        lineJoin: 'round'
      })
      this.map.add(polyline)
    },
    async requestPath () {
      const params = {
        startPoint: this.startPoint,
        endPoint: this.endPoint
      }
      const { code, data } = await AmapApi.getFastDrivingPath(params)
      if (code === 200 && data) {
        this.polyline = data
        this.addPolyline()
      }
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
    height 1000px
    background-color $color-bg
  }
}
</style>
