<script setup>
import { ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiClose } from '@mdi/js'

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

  numberOfCharactersInLongestSentence.value = calculateHalfWidthAndFullWidthCharacters(
    findTheLongestCharacter(body.value)
  )
}

// 改行で分けたいので
const splitBody = (arg) => {
  return arg.split(/\r\n|\n|\r/)
}

// 一番文字数の多い行を探す
const findTheLongestCharacter = (array) => {
  let max = array[0].length
  let longestSentence = array[0]

  for (const element of array) {
    if (max < element.length) {
      max = element.length
      longestSentence = element
    }
  }

  return longestSentence
}

// 一番長い文字数を半角､全角で値を変えて数える
const calculateHalfWidthAndFullWidthCharacters = (arg) => {
  // encodeURIはUTF-8文字エンコーディングする
  // abcなどのアルファベット,数字,記号はそのまま出力される
  // 改行コードは[,],半角スペースは[%20]で出力される
  // 日本語などは[あ] -> [%E3] みたいに出力される
  // この性質を利用する
  // ちなみにencodeURIComponentは記号もエンコードするらしい

  const splited = [...arg]
  let count = 0.0

  // 半角0.5､全角1と数える
  for (const element of splited) {
    const encoded = encodeURI(element)

    if (encoded === '%20') {
      count += 0.5
    } else if (encoded.length < 3) {
      count += 0.5
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
  <div class="signboard" :class="[arrangement, fontSize]">
    <button @click="emit('stopExecution')">
      <svg-icon type="mdi" :path="mdiClose"></svg-icon>
      停止
    </button>
    <!-- <p>{{ encodeURI(body) }}</p> -->
    <!-- <p>{{ numberOfCharactersInLongestSentence }}</p> -->
    <p v-for="line in body" :key="line">
      {{ line }}
    </p>
  </div>
</template>

<style scoped>
.signboard {
  background-color: v-bind(backgroundColor);
  & p {
    color: v-bind(fontColor);
    margin: 0px;
  }
}

.center {
  text-align: center;
}

.left {
  text-align: left;
  & p {
    margin-left: 10px;
  }
}

.right {
  text-align: right;
  & p {
    margin-right: 10px;
  }
}

/* とにかく目いっぱい表示させたい */
.larger {
  & p {
    /*  色々ためしたところ + 1したらちょうどよくなった */
    font-size: calc(100vw / v-bind(numberOfCharactersInLongestSentence + 1));
  }
}

.large {
  & p {
    font-size: calc(100vw / v-bind((numberOfCharactersInLongestSentence + 1) * 1.5));
  }
}

.middle {
  & p {
    font-size: calc(100vw / v-bind((numberOfCharactersInLongestSentence + 1) * 2));
  }
}

.small {
  & p {
    font-size: calc(100vw / v-bind((numberOfCharactersInLongestSentence + 1) * 3));
  }
}

.smaller {
  & p {
    font-size: calc(100vw / v-bind((numberOfCharactersInLongestSentence + 1) * 4));
  }
}
</style>
