<template>
  <div class="home">
    <div class="componets">
      <zr-row>
        <zr-col>
          <div class="title">输入框</div>
          <div class="content">
            <zr-input></zr-input>
          </div>
        </zr-col>
      </zr-row>
      <zr-row>
        <zr-col>
          <div class="title">验证码</div>
          <div class="content">
            <zr-code></zr-code>
          </div>
        </zr-col>
      </zr-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
