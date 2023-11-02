import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Signboard from '@/components/Signboard.vue'


describe('Signboard', () => {
    // 期待:setConfigを通してコンポーネント内の変数を変更できる
  it('setConfig', () => {
    const wrapper = mount(Signboard)
    wrapper.vm.setConfig({
        body: "testing",
        fontSize: "small",
        fontColor: "#000000",
        backgroundColor: "#000000",
        arrangement: "left",
        fullScreen: false,
    })

    expect(wrapper.vm.body).toContain("testing")
    expect(wrapper.vm.fontSize).toBe("small")
    expect(wrapper.vm.fontColor).toBe("#000000")
    expect(wrapper.vm.backgroundColor).toBe("#000000")
    expect(wrapper.vm.arrangement).toBe("left")
    expect(wrapper.vm.fullScreen).toBe(false)
  })

    // 期待:改行コードを含む1行が改行コードで4つに分けられる
    // 分けられた後配列になって帰ってくる
  it('splitBody',() => {
    const wrapper = mount(Signboard)
    const array = wrapper.vm.splitBody("abc\ndef\rghi\r\njkl")

    expect(array.length).toBe(4)
    expect(array[0]).toBe("abc")
    expect(array[1]).toBe("def")
    expect(array[2]).toBe("ghi")
    expect(array[3]).toBe("jkl")
  })

  // 期待:配列が1つ1つpで表示されているか調べ
    it('text is displayed',async () => {
        const wrapper = mount(Signboard)
        await wrapper.vm.setConfig({
            body: "abc\ndef\nghi",
        })
        expect(wrapper.html()).toMatch(/<p .*>abc<\/p>/)
        expect(wrapper.html()).toMatch(/<p .*>def<\/p>/)
        expect(wrapper.html()).toMatch(/<p .*>ghi<\/p>/)
    })
})

describe('calculate half width and full width characters', () => {
    // 誤差が発生するため
    // 半角6､全角10と数えた後10で割る


    // 条件:すべて英語の文が渡される
    // 期待:(文字数 * 6) / 10 の値が帰ってくる
    it('allEnglish',() => {
        const wrapper = mount(Signboard)
        const sentence = "abcdef"
        const returnValue = wrapper.vm.calculateHalfWidthAndFullWidthCharacters(sentence)
        expect(returnValue).toBe((6 * sentence.length) / 10)
    })

    // 条件:すべて日本語の文が渡される
    // 期待:(文字数 * 10) / 10 の値が帰ってくる
    it('allJapanese',() => {
        const wrapper = mount(Signboard)
        const sentence = "あいうえお"
        const returnValue = wrapper.vm.calculateHalfWidthAndFullWidthCharacters(sentence)
        expect(returnValue).toBe((10 * sentence.length) / 10)
    })

    // 条件:日本語と英語が混ざった文が渡される
    // 期待:(日本語 * 10) + (英語 * 6) / 10 の値が帰ってくる
    it('EnglishAndJapanese',() => {
        const wrapper = mount(Signboard)
        const sentence = "あいうえおabcde"
        const returnValue = wrapper.vm.calculateHalfWidthAndFullWidthCharacters(sentence)
        expect(returnValue).toBe((10 * 5 + 6 * 5) / 10)
    })
})

describe('findTheLongestCharacter', () => {
    // 条件:すべて英語の文章が渡される
    // 期待:(一番長い行の文字数 * 6) / 10 の値が帰ってくる
    it('allEnglish',() => {
        const wrapper = mount(Signboard)
        const returnValue = wrapper.vm.findTheLongestCharacter(['a','abcdef','aaa'])
        expect(returnValue).toBe((6 * 6) / 10)
    })

    // 条件:すべて日本語の文章が渡される
    // 期待:(一番長い行の文字数 * 10) / 10 の値が帰ってくる
    it('allJapanese',() => {
        const wrapper = mount(Signboard)
        const returnValue = wrapper.vm.findTheLongestCharacter(['あ','あいうえお','あい'])
        expect(returnValue).toBe((10 * 5) / 10)
    })

    // 条件:英語と日本語が混ざった文章が渡される
    // 期待:calculateHalfWidthAndFullWidthCharactersのルールに従った値が帰ってくる
    it('EnglishAndJapanese',() => {
        const wrapper = mount(Signboard)
        const returnValue = wrapper.vm.findTheLongestCharacter(['あa','あいうab','あいabc'])
        expect(returnValue).toBe((6 * 2 + 3 * 10) / 10)
    })
})


// 期待 signboardのところのclassにarrangementの値が追記されているか
describe('Add class arrangement value', () => {
    it.each([
        'left',
        'center',
        'right'
    ])('%s',async (arrangement) => {
        // 更新しきるのを待つためasync await
        const wrapper = mount(Signboard)
        await wrapper.vm.setConfig({
            arrangement: arrangement,
        })
        expect(wrapper.html()).toMatch(new RegExp(`class=.*${arrangement}`))
    })
})

// 期待 sentenceのところのclassにfontsizeの値が追記されているか
describe('Add class fontSize value', () => {
    it.each([
        'larger',
        'large',
        'middle',
        'small',
        'smaller',
    ])('%s',async (fontSize) => {
        const wrapper = mount(Signboard)
        await wrapper.vm.setConfig({
            fontSize: fontSize,
        })
        console.log(wrapper.html());
        expect(wrapper.html()).toMatch(new RegExp(`class=.*${fontSize}`))
    })
})