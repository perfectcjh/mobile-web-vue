<template>
  <div class="search-port-container">
    <div class="search-bar-container">
      <div class="search-bar">
        <div class="search-icon">
          <img src="../../static/common/icon-search.png" />
        </div>
        <div class="search-input">
          <van-field v-model="keyword" class="search-input-field" placeholder="请输入关键字搜索" />
        </div>
      </div>
    </div>
    <div v-if="keyword" class="search-result-container">
      <div v-for="(item, index) in listData" :key="index" class="search-result-item" @click.stop="handleItemClick(item)">{{ item.titleShow }}</div>
    </div>
    <div v-if="!keyword" class="search-hot-container">
      <div class="search-hot-box">
        <div v-for="(item, index) in hotListData" :key="index" class="search-hot-item" @click.stop="handleItemClick(item)">{{ item.titleShow }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  data () {
    this.requestSearchData = debounce(this.requestSearchData, 500)
    return {
      callback: null,
      keyword: '',
      listData: [],
      hotListData: []
    }
  },
  computed: {
    navTitle () {
      return '选择银行'
    }
  },
  mounted () {
    this.gethotListData()
  },
  methods: {
    gethotListData () {
      const params = {
        page: 1,
        size: 10
      }
      this.requestSearchData(params, true)
    },
    handleItemClick (item) {
      this.$native.postNotification({ name: 'UserAuthDidSelectBank', value: item })
      this.$native.navigateBack()
    },
    handleKeywordChange () {
      if (!this.keyword) { return }
      const params = {
        page: 1,
        size: 10,
        bankName: this.keyword
      }
      this.requestSearchData(params)
    },
    async requestSearchData (params, isHot) {
      const { code, data } = await this.$api.getSearchBankList(params)
      if (code === 200) {
        data.forEach(el => {
          el.titleShow = `${el.bankName || ''}`
        })
        if (isHot) {
          this.hotListData = data
        } else {
          this.listData = data
        }
      }
    }
  },
  watch: {
    keyword (val) {
      this.handleKeywordChange()
    }
  }
}
</script>

<style lang="stylus" scoped>
	.search-port-container {

		.search-bar-container {
			height: 98px;
			background-color: $color-white;
			padding: 0px 30px;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			justify-content: center;

			.search-bar {
				height: 60px;
				border-radius: 30px;
				background-color: $color-bg;
				display: flex;
				align-items: center;
				padding: 0px 20px;

				.search-icon {
					width: 26px;
					height: 26px;
				}

				.search-input {
					margin: 0px 20px;
					font-size: $font-13;
					color: $color-text-darkgray;
				}

        .search-input-field {
          font-size: $font-13;
          color: $color-text-darkgray;
          background-color: $color-bg;
        }
			}
		}

		.search-hot-container {
			padding: 20px 30px;

			.search-hot-box {
				border-radius: 16px;
				padding: 0px 26px;
				background-color: $color-white;

				.search-hot-item {
					height: 90px;
					line-height: 90px;
					color: $color-text-darkgray;
					font-size: $font-13;
					padding: 0px 8px;
					border-bottom: 1px solid $color-bg;
				}
			}
		}

		.search-result-container {
			padding: 0px 26px;
			background-color: $color-white;

			.search-result-item {
				height: 90px;
				line-height: 90px;
				color: $color-theme;
				font-size: $font-13;
				padding: 0px 8px;
				border-bottom: 1px solid $color-bg;
			}
		}
	}
</style>

<style lang="stylus">
.van-cell {
  padding 0px;
}
</style>
