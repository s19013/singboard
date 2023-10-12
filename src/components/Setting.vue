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
</script>

<template>
  <div class="Setting">
    <div class="body">
      <label for="">文字</label>
      <textarea v-model="body" name="body" cols="30" rows="5" />
    </div>

    <div class="fontSize">
      文字の大きさ
      <label>
        特大
        <input type="radio" v-model="fontSize" value="larger" />
      </label>
      <label>
        大
        <input type="radio" v-model="fontSize" value="large" />
      </label>
      <label>
        中
        <input type="radio" v-model="fontSize" value="middle" />
      </label>
      <label>
        小
        <input type="radio" v-model="fontSize" value="small" />
      </label>
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

    <div class="arrangement">
      配置
      <label>
        中央寄せ
        <input type="radio" v-model="arrangement" value="center" />
      </label>
      <label>
        左寄せ
        <input type="radio" v-model="arrangement" value="left" />
      </label>
      <label>
        右寄せ
        <input type="radio" v-model="arrangement" value="right" />
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
