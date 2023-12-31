<script setup>
import { ref } from 'vue'

// 行ごとにpで囲いたいため配列
const body = ref(['sample'])
const fontSize = ref('middle')
const fontColor = ref('#000000')
const backgroundColor = ref('#E9E9E9')
const arrangement = ref('center')
const fullScreen = ref(false)

// 一番長い行の文字数
const numberOfCharactersInLongestSentence = ref(0.0)

//
const setConfig = (optinos) => {
  body.value = splitBody(optinos.body ?? 'sample')
  fontSize.value = optinos.fontSize ?? 'middle'
  fontColor.value = optinos.fontColor ?? '#000000'
  backgroundColor.value = optinos.backgroundColor ?? '#E9E9E9'
  arrangement.value = optinos.arrangement ?? 'center'
  fullScreen.value = optinos.fullScreen ?? false

  numberOfCharactersInLongestSentence.value = findTheLongestCharacter(body.value)

  if (fullScreen.value) {
    executionFullScreen()
  }
}

const executionFullScreen = () => {
  document.documentElement.requestFullscreen()
}

// 改行で分けたいので
const splitBody = (sentence) => {
  return sentence.split(/\r\n|\n|\r/)
}

// 一番文字数の多い行を探してその行の文字数を数える
const findTheLongestCharacter = (array) => {
  let max = calculateHalfWidthAndFullWidthCharacters(array[0])

  for (const element of array) {
    const elementLength = calculateHalfWidthAndFullWidthCharacters(element)
    if (max < elementLength) {
      max = elementLength
    }
  }

  return max
}

// 文字を半角､全角で値を変えて数える
const calculateHalfWidthAndFullWidthCharacters = (line) => {
  const splited = [...line]
  let count = 0.0

  // 小数の計算だと誤差が発生するため -> 後でcss周りで小数を使いたい
  // 半角6､全角10と数えた後に10で割る
  // 色々ためしたところこれがちょうど良いので
  for (const element of splited) {
    // この正規表現で半角と判別できるらしい
    if (element.match(/[ -~]/)) {
      count += 6
    } else {
      count += 10
    }
  }

  return count / 10
}

const emit = defineEmits(['stopExecution'])

defineExpose({
  setConfig
})
</script>

<template>
  <div data-testid="Singboard">
    <button @click="emit('stopExecution')">✕ 停止</button>
    <div class="signboard" :class="arrangement">
      <!-- <p>{{ numberOfCharactersInLongestSentence }}</p> -->
      <div class="sentence">
        <p v-for="(line, index) in body" :key="index" :class="fontSize">
          {{ line }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signboard {
  min-height: 100vh;
  line-height: 1.25;
  background-color: v-bind(backgroundColor);
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  & .sentence {
    grid-row: 2 / 3;
  }
  & p {
    color: v-bind(fontColor);
    margin: 0px;
  }
}

button {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
}

.center {
  text-align: center;
}

.left {
  text-align: left;
  & p {
    margin-left: 1rem;
  }
}

.right {
  text-align: right;
  & p {
    margin-right: 1rem;
  }
}

/* とにかく目いっぱい表示させたい */
.larger {
  /*  色々ためしたところ + 0.6したらちょうどよくなった */
  font-size: calc(100vw / v-bind((numberOfCharactersInLongestSentence * 10 + 5) / 10));
}

.large {
  font-size: calc(100vw / v-bind((numberOfCharactersInLongestSentence) * 15 / 10));
}

.middle {
  font-size: calc(100vw / v-bind((numberOfCharactersInLongestSentence) * 2));
}

.small {
  font-size: calc(100vw / v-bind((numberOfCharactersInLongestSentence) * 3));
}

.smaller {
  font-size: calc(100vw / v-bind((numberOfCharactersInLongestSentence) * 4));
}
</style>
