<template>
  <div class="amap__container">
    <div id="amap__amap-container" class="amap__amap-container" ref="amap-container"></div>
  </div>
</template>

<script>
// import AMap from 'AMap'
import AMapLoader from '@amap/amap-jsapi-loader'
// import AmapApi from '@/module/amap/amap-api.js'
import AMapHandler from '@/module/amap/amap-handler.js'

export default {
  // props: {
  //   startData: {
  //     type: Object,
  //     default: () => {
  //       return {
  //         title: '浙江省宁波市',
  //         address: '浙江省宁波市海曙区天一广场'
  //       }
  //     }
  //   },
  //   endData: {
  //     type: Object,
  //     default: () => {
  //       return {
  //         title: '上海市浦东新区',
  //         address: '上海市浦东新区锦绣东路700号'
  //       }
  //     }
  //   }
  // },
  data () {
    return {
      AMap: null,
      map: null,
      startPoint: {
        isFinsh: false,
        latitude: 0,
        longitude: 0,
        title: '',
        address: ''
      },
      endPoint: {
        isFinsh: false,
        latitude: 0,
        longitude: 0,
        title: '',
        address: ''
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
    // this.initMap()
  },
  methods: {
    initData (option) {
      this.startPoint = Object.assign({}, this.startPoint, option.startData)
      this.endPoint = Object.assign({}, this.endPoint, option.endData)

      this.initMap()
    },
    async initMap () {
      const plugins = [
        // 'AMap.ToolBar', // 工具
        // 'AMap.Scale', // 比例尺
        'AMap.Marker', // 点标记
        'AMap.PolylineEditor', // 矢量图
        'AMap.Geolocation', // 定位
        'AMap.Geocoder', // 地理编码
        'AMap.Driving' // 路径规划
      ]
      const params = {
        key: '0d6f61194edf418d0f772089bd1e4b4e',
        version: '2.0',
        plugins: plugins
      }
      const AMap = await AMapLoader.load(params)
      this.AMap = AMap
      this.map = new AMap.Map('amap__amap-container', {
        // center: [this.centerPoint.longitude, this.centerPoint.latitude],
        resizeEnable: true,
        zooms: [5, 18],
        zoom: 5,
        viewMode: '2D',
        mapStyle: 'amap://styles/b89c88006c40bdb8d2d6e2ac37388443'
      })
      // this.map.addControl(new AMap.ToolBar())
      // this.map.addControl(new AMap.Scale())

      this.getCurrentLocation()
      this.getStartLocation()
      this.getEndLocation()
    },
    handleGetLocationFinish () {
      if (!this.startPoint.isFinsh || !this.endPoint.isFinsh) {
        return
      }
      this.map.setCenter([this.centerPoint.longitude, this.centerPoint.latitude])
      this.addMarkers()
      this.getFastPath()
    },
    async getCurrentLocation () {
      const { code, data } = await AMapHandler.getCurrentLocation(this.AMap)
      const currentPosition = data
      this.$emit('locationChange', data)
      if (code === 200) {
        const res = await AMapHandler.regeocoderLocation(data, this.AMap)
        if (res.code === 200) {
          currentPosition.address = res.data.address
          this.$emit('addressChange', data)
        }
      }
    },
    async getStartLocation () {
      const params = {
        address: this.startPoint.address
      }
      const { code, data } = await AMapHandler.geocoderAddress(params, this.AMap)
      if (code === 200) {
        this.startPoint.latitude = data.latitude
        this.startPoint.longitude = data.longitude
        this.startPoint.isFinsh = true
        this.handleGetLocationFinish()
      }
    },
    async getEndLocation () {
      const params = {
        address: this.endPoint.address
      }
      const { code, data } = await AMapHandler.geocoderAddress(params, this.AMap)
      if (code === 200) {
        this.endPoint.latitude = data.latitude
        this.endPoint.longitude = data.longitude
        this.endPoint.isFinsh = true
        this.handleGetLocationFinish()
      }
    },
    async getFastPath () {
      const params = {
        startPoint: this.startPoint,
        endPoint: this.endPoint
      }
      const { code, data } = await AMapHandler.getFastPathPoint(params, this.AMap)
      if (code === 200) {
        this.polyline = data
        this.addPolyline()
      }
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
        strokeWeight: 6,
        strokeColor: '#00ADC7',
        strokeOpacity: 1
      })
      this.map.add(polyline)
    }
  }
}
</script>

<style lang="stylus" scoped>
.amap__container {
  width: 100%;
  height: 100%;

  .amap__amap-container {
    width: 100%;
    height: 1200px;
    background-color: $color-bg;
  }
}
</style>
