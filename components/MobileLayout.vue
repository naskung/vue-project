<template>
    <a-row type="flex" justify="center">
      <a-col :xs="24" :xl="10">
        <div id="mobile-layout">
          <div
            :style="initialHeight ? `min-height: ${initialHeight}px;` : ''"
            :class="[
              'app-background',
              {
                'super-graphic': superGraphic
              }
            ]"
          ></div>
          <div class="layout-wrap">
            <slot name="appbar"></slot>
            <div
              :class="[
                'layout-content',
                {
                  'with-app-bar': appBarSize === 'normal',
                  'with-large-app-bar': appBarSize === 'large'
                }
              ]"
            >
              <slot></slot>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </template>
  
  <script>
  export default {
    name: 'MobileLayout',
    props: {
      type: {
        type: String,
        default: () => 'default'
      },
      justify: {
        type: String,
        default: () => 'start'
      },
      superGraphic: {
        type: Boolean,
        default: () => true
      }
    },
    data() {
      return {
        initialHeight: null,
      }
    },
    computed: {
      appBarSize() {
        const {
          appbar = []
        } = this.$slots || []
        const {
          size = ''
        } = appbar[0]?.componentOptions?.propsData || {}
        return size || ''
      },
    },
    beforeMount() {
      this.initialHeight = window.innerHeight
    },
    methods: {
    }
  }
  </script>
  
  <style scoped>
  #mobile-layout {
    background-color:white;
    .app-background {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100vw;
      height: -webkit-fill-available;
      z-index: 1;
      &.super-graphic {
        background-image: url(~/static/images/super-graphic-background.svg);
        background-position: right bottom;
        background-size: 100% auto;
        background-repeat: no-repeat;
      }
    }
    .layout-wrap {
      position: relative;
      z-index: 2;
      height: 100vh;
    }
  
    .layout-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow-y: auto;
  
      &.with-app-bar {
        padding-top: 56px;
        padding-top: calc(56px + var(--safe-area-top));
      }
      &.with-large-app-bar {
        padding-top: 114px;
        padding-top: calc(114px + var(--safe-area-top));
      }
    }
  }
  
  .ant-spin-dot {
    color: white;
    font-size: 36pt !important;
  }
  .container-center {
    margin: 0 auto;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  </style>
  