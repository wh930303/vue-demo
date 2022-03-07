<!--
  * @Author: wanghao
 * @Date: 2021-10-28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-07 17:44:26
 * @Description:
-->
<template>
  <div></div>
</template>

<script>
// 如果采用架构提供的自适应布局框架，则必需引入 coreMixin
import layoutMixin from '@ncp-web/hsa-ui/lib/mixins/adaptive-layout-mixin'
import {
  isEmpty,
  isUndefined,
  set,
  get,
  cloneDeep,
  defaults,
  defaultsDeep,
  orderBy,
  values,
  groupBy
} from 'lodash'

export default {
  // 如果采用架构提供的自适应布局框架，则必需 mixin coreMixin
  mixins: [layoutMixin],
  // components: { demo },
  props: {},
  data () {
    return {
      testData: [
        { name: 'wanghao1', age: 10 },
        { name: 'wanghao2', age: 20 },
        { name: 'wanghao3', age: 30 },
        { name: 'wanghao4', age: 10 },
        { name: 'wanghao5', age: 20 },
        { name: 'wanghao6', age: 30 }
      ]
    }
  },
  methods: {
    // 对象数组根据某一属性去重
    assignDistinct (arr, att) {
      let endList = []
      values(groupBy(arr, att)).forEach(itemList => {
        let data = {}
        itemList.forEach(d => {
          data = Object.assign(data, d)
        })
        return endList.push(data)
      })
      return endList
    },
    // 对象数组根据某一属性分组
    assignArray (arr, att) {
      let endList = []
      values(groupBy(arr, att)).forEach(itemList => {
        return endList.push(itemList)
      })
      return endList
    }
  },
  created () {
    console.log(JSON.stringify(this.assignDistinct(this.testData, 'age')))

    console.log(JSON.stringify(this.assignArray(this.testData, 'age')))
    console.log(JSON.stringify(values(groupBy(this.testData, 'age'))))
    console.log(JSON.stringify(groupBy(this.testData, 'age')))
    // // isEmpty(value) 检查 value 是否为一个空对象，集合，映射或者set。
    // // 判断的依据是除非是有枚举属性的对象，length 大于 0 的 arguments object, array, string 或类jquery选择器。
    // console.info('isEmpty(null) =>', isEmpty(null)) // => true
    // console.info('isEmpty(undefined) =>', isEmpty(undefined)) // => true
    // console.info("isEmpty('') =>", isEmpty('')) // => true
    // console.info('isEmpty(true) =>', isEmpty(true)) // => true
    // console.info('isEmpty(1) =>', isEmpty(1)) // => true
    // console.info('isEmpty([1,2,3]) =>', isEmpty([1, 2, 3])) // => false
    // console.info('isEmpty({a:1}) =>', isEmpty({ a: 1 })) // => false
    // console.info("isEmpty('haha') =>", isEmpty('haha')) // => false

    // // isUndefined(value) 检查 value 是否是 undefined.
    // console.log('')
    // console.info('isUndefined() =>', isUndefined(undefined)) // => true
    // console.info('isUndefined() =>', isUndefined(null)) // => false
    // console.info('isUndefined() =>', isUndefined('')) // => false

    // // set(object, path, value)  设置 object对象中对应 path 属性路径上的值，如果path不存在，则创建。
    // // 缺少的索引属性会创建为数组，而缺少的属性会创建为对象。
    // console.log('')
    // var object = { a: [{ b: { c: 3 } }] }
    // set(object, 'a[0].b.c', 4)
    // console.log('var object = { a: [{ b: { c: 3 } }] }')
    // console.log("set(object, 'a[0].b.c', 4)")
    // console.info('object.a[0].b.c =>', object.a[0].b.c) // => 4

    // set(object, ['x', '0', 'y', 'z'], 5)
    // console.log("set(object, ['x', '0', 'y', 'z'], 5)")
    // console.info('object.x[0].y.z =>', object.x[0].y.z) // => 5
    // console.info('object =>', object)

    // // get(object, path, [defaultValue]) 根据 object对象的path路径获取值。
    // // 如果解析 value 是 undefined 会以 defaultValue 取代
    // console.log('')
    // var object1 = { a: [{ b: { c: 3 } }] }
    // console.log("var object1 = { 'a': [{ 'b': { 'c': 3 } }] }")
    // console.info("get(object1, 'a[0].b.c') =>", get(object1, 'a[0].b.c')) // => 3
    // console.info(
    //   "get(object1, ['a', '0', 'b', 'c']) =>",
    //   get(object1, ['a', '0', 'b', 'c'])
    // ) // => 3
    // console.info(
    //   "get(object1, 'a.b.c', 'default') =>",
    //   get(object1, 'a.b.c', 'default')
    // ) // => 'default'

    // // cloneDeep(value) 深拷贝
    // console.log('')
    // var objects = [{ a: 1 }, { b: 2 }]
    // var deep = cloneDeep(objects)
    // console.log("var objects = [{ 'a': 1 }, { 'b': 2 }]")
    // console.log('var deep = cloneDeep(objects)')
    // console.info('deep[0] === objects[0]', deep[0] === objects[0]) // => false

    // // defaults(object, [sources]) 分配来源对象的可枚举属性到目标对象所有解析为 undefined 的属性上。
    // // 来源对象从左到右应用。 一旦设置了相同属性的值，后续的将被忽略掉。
    // console.log('')
    // console.info(
    //   "defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 }) =>",
    //   defaults({ a: 1 }, { b: 2 }, { a: 3 })
    // ) // => { 'a': 1, 'b': 2 }

    // // defaultsDeep(object, [sources]) 这个方法类似_.defaults，除了它会递归分配默认属性。
    // console.log('')
    // console.info(
    //   "defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } }) =>",
    //   defaultsDeep({ a: { b: 2 } }, { a: { b: 1, c: 3 } })
    // ) // => { 'a': { 'b': 2, 'c': 3 } }

    // // orderBy(collection, [iteratees=[_.identity]], [orders]) 此方法类似于_.sortBy，除了它允许指定 iteratee（迭代函数）结果如何排序。
    // // 如果没指定 orders（排序），所有值以升序排序。 否则，指定为"desc" 降序，或者指定为 "asc" 升序，排序对应值。
    // console.log('')
    // var users = [
    //   { user: 'fred', age: 48 },
    //   { user: 'barney', age: 34 },
    //   { user: 'fred', age: 40 },
    //   { user: 'barney', age: 36 }
    // ]
    // console.log(
    //   "var users = [{ 'user': 'fred', 'age': 48 },{ 'user': 'barney', 'age': 34 },{ 'user': 'fred', 'age': 40 },{ 'user': 'barney', 'age': 36 }]"
    // )
    // // 以 `user` 升序排序 再以 `age` 降序排序。
    // console.info(
    //   "orderBy(users, ['user', 'age'], ['asc', 'desc']) =>",
    //   orderBy(users, ['user', 'age'], ['asc', 'desc'])
    // )
  }
}
</script>

<style lang="scss" scoped>
.red {
  color: red;
}
.blue {
  color: blue;
  font-size: 100px;
}
</style>
