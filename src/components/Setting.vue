<script setup>
import { ref } from 'vue'
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'
import { debounce } from 'lodash'

const body = ref('Sample')
const fontSize = ref('middle')
const fontColor = ref('#000000')
const backgroundColor = ref('#E9E9E9')
const arrangement = ref('center')

// vue-color-kit関係
const changeFontColor = debounce((color) => {
  fontColor.value = color.hex
}, 200)

const changeBackgroundColor = debounce((color) => {
  backgroundColor.value = color.hex
}, 200)

defineExpose({
  body,
  fontSize,
  fontColor,
  backgroundColor,
  arrangement
})
</script>

<template>
  <div class="Setting">
    <div class="body">
      <label for="">文字</label>
      <textarea v-model="body" name="body" cols="30" rows="5" />
    </div>

    <div class="fontSize">
      <p>文字の大きさ</p>
      <select v-model="fontSize">
        <option value="larger">特大</option>
        <option value="large">大</option>
        <option value="middle">中</option>
        <option value="small">小</option>
        <option value="smaller">極小</option>
      </select>
    </div>

    <div class="arrangement">
      <p>配置</p>
      <select v-model="arrangement">
        <option value="center">中央寄せ</option>
        <option value="left">左寄せ</option>
        <option value="right">右寄せ</option>
      </select>
    </div>

    <div class="fontColor">
      <label for="">
        文字の色
        <div class="fontColorSample"></div>
        <!-- スポイト機能はなし 実装が面倒-->
        <ColorPicker
          theme="light"
          :color="fontColor"
          :sucker-hide="true"
          @changeColor="changeFontColor"
        />
      </label>
    </div>

    <div class="backgroundColor">
      <label for="">
        背景の色
        <div class="backgroundColorSample"></div>
        <!-- スポイト機能はなし 実装が面倒-->
        <ColorPicker
          theme="light"
          :color="backgroundColor"
          :sucker-hide="true"
          @changeColor="changeBackgroundColor"
        />
      </label>
    </div>
  </div>
</template>

<style scoped>
.fontColorSample {
  height: 1rem;
  width: 5rem;
  background-color: v-bind(fontColor);
}

.backgroundColorSample {
  height: 1rem;
  width: 5rem;
  background-color: v-bind(backgroundColor);
}
</style>
