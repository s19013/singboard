<script setup>
import { ref } from 'vue'

// 行ごとにpで囲いたいため配列
const body = ref(['sample'])
const fontSize = ref('middle')
const fontColor = ref('#000000')
const backgroundColor = ref('#E9E9E9')
const arrangement = ref('center')

// 一番長い行の文字数
const numberOfCharactersInLongestSentence = ref(0.0)

//
const setConfig = (optinos) => {
  body.value = splitBody(optinos.body)
  fontSize.value = optinos.fontSize
  fontColor.value = optinos.fontColor
  backgroundColor.value = optinos.backgroundColor
  arrangement.value = optinos.arrangement

  numberOfCharactersInLongestSentence.value = findTheLongestCharacter(body.value)
}

// 改行で分けたいので
const splitBody = (arg) => {
  return arg.split(/\r\n|\n|\r/)
}

// 一番文字数の多い行を探す
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
const calculateHalfWidthAndFullWidthCharacters = (arg) => {
  // encodeURIはUTF-8文字エンコーディングする
  // abcなどのアルファベット,数字,記号はそのまま出力される
  // 改行コードは[,],半角スペースは[%20]で出力される
  // 日本語などは[あ] -> [%E3] みたいに出力される
  // この性質を利用する
  // ちなみにencodeURIComponentは記号もエンコードするらしい

  const splited = [...arg]
  let count = 0.0

  // 半角0.6､全角1と数える
  // 色々ためしたところこれがちょうど良いので
  for (const element of splited) {
    const encoded = encodeURI(element)

    if (encoded === '%20') {
      count += 0.6
    } else if (encoded.length < 3) {
      count += 0.6
    } else {
      count += 1
    }
  }

  return count
}

const emit = defineEmits(['stopExecution'])

defineExpose({
  setConfig
})
</script>

<template>
  <div>
    <button @click="emit('stopExecution')">✕ 停止</button>
    <div class="signboard" :class="arrangement">
      <!-- <p>{{ encodeURI(body) }}</p> -->
      <!-- <p>{{ numberOfCharactersInLongestSentence }}</p> -->
      <div class="sentence">
        <p v-for="line in body" :key="line" :class="fontSize">
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
  font-size: calc(100vw / v-bind(numberOfCharactersInLongestSentence + 0.5));
}

.large {
  font-size: calc(100vw / v-bind((numberOfCharactersInLongestSentence) * 1.5));
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
