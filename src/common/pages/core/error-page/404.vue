<template>
  <div class="page-404">
    <div class="wscn-http404-container">
      <div class="wscn-http404">
        <div class="pic-404">
          <img
            class="pic-404__parent"
            src="@/assets/core/404_images/404-pic.png"
            alt="404"
          />
        </div>
        <div class="bullshit">
          <div class="bullshit__headline">{{ message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  computed: {
    message () {
      return '对不起，访问的页面不存在。'
    }
  }
}
</script>

<style lang="scss" scoped>
.page-404 {
  position: absolute;
  top: 76;
  left: 0;
  width: 100%;
  height: calc(100% - 86px);
  overflow-x: hidden;
}
.wscn-http404-container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
}
.wscn-http404 {
  position: relative;
  padding: 0 50px;
  overflow: hidden;
  .pic-404 {
    position: relative;
    width: 560px;
    overflow: hidden;
    margin: 0 auto;
    &__parent {
      width: 100%;
    }
  }
  .bullshit {
    position: relative;
    width: 500px;
    padding: 26px 0;
    overflow: hidden;
    margin: 0 auto;
    text-align: center;
    &__headline {
      font-size: 16px;
      line-height: 24px;
      color: #333333;
      opacity: 0;
      letter-spacing: 2px;
      margin-bottom: 34px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      width: 110px;
      margin: 0 auto;
      height: 36px;
      background: #1890ff;
      border-radius: 2px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 16px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
