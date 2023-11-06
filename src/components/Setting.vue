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
const fullScreen = ref(false)

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
  arrangement,
  fullScreen
})
</script>

<template>
  <div class="Setting" data-testid="Setting">
    <div class="fullscreen">
      <label for="fullscreenCheck">
        <p>フルスクリーン</p>
      </label>
      <input id="fullscreenCheck" type="checkbox" v-model="fullScreen" />
    </div>

    <div class="body">
      <p>文字</p>
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
      <div class="labelAndSample">
        <p>文字の色</p>
        <p class="fontColorSample" />
      </div>
      <!-- スポイト機能はなし 実装が面倒-->
      <ColorPicker
        data-testid="fontColorPicker"
        theme="light"
        :color="fontColor"
        :sucker-hide="true"
        @changeColor="changeFontColor"
      />
    </div>

    <div class="backgroundColor">
      <div class="labelAndSample">
        <p>背景の色</p>
        <p class="backgroundColorSample" />
      </div>
      <!-- スポイト機能はなし 実装が面倒-->
      <ColorPicker
        data-testid="backgroundColorPicker"
        theme="light"
        :color="backgroundColor"
        :sucker-hide="true"
        @changeColor="changeBackgroundColor"
      />
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

.Setting {
  margin: 1rem;
}

@media (max-width: 549px) {
  .labelAndSample {
    display: flex;
    gap: 1rem;
  }

  & .fontSize,
  .arrangement {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
    & p {
      margin: 0;
      width: 8rem;
    }
  }
}

@media (min-width: 550px) {
  & .Setting {
    & p {
      margin: 0;
    }
  }

  & .fullscreen,
  .body,
  .fontSize,
  .arrangement,
  .fontColor,
  .backgroundColor {
    display: flex;
    margin: 1rem 0;
  }

  & .fullscreen,
  .body,
  .fontSize,
  .arrangement {
    & p {
      width: 8rem;
    }
  }

  & .fontColor,
  .backgroundColor {
    & .labelAndSample {
      width: 8rem;
    }
  }
}
</style>
