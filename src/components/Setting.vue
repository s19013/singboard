<script setup>
import { ref } from 'vue'
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'
const body = ref('Sample')
const fontSize = ref('middle')
const fontColor = ref('#000000')
const backgroundColor = ref('#cccccc')
const arrangement = ref('center')
</script>

<template>
  <div class="Setting">
    <div class="body">
      <label for="">文字</label>
      <textarea v-model="body" name="body" cols="30" rows="5" />
    </div>

    <div class="fontSize">
      <label>
        特大
        <input type="radio" v-model="fontSize" value="veryLarge" />
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
  </div>
</template>

<style scoped></style>
