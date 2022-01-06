import h from './diff/h';
import patch from './diff/patch';


// 获取容器
const container = document.getElementById('container');
const btn = document.getElementById('btn');

/* const vnode1 = h('ul', {}, [
  h('li', {}, [
    h('div', {}, [
      h('ol', {}, [
        h('li', {}, h('h1', {}, 'Hemo')),
        h('li', {}, "测试1"),
        h('li', {}, h('h1', {}, '测试2')),
      ])
    ])
  ]),
  h('li', {}, "A"),
  h('li', {}, "B"),
  h('li', {}, "C"),
  h('li', {}, "D")
]) */

/* [
  h('li', {}, "A"),
  h('li', {}, "B"),
  h('li', {}, "C"),
] */
const vnode1 = h('ul', {}, "测试一段文字")


const vnode2 = h('ul', {}, [
  h('li', {}, "A"),
  h('li', {}, "B"),
  h('li', {}, "C"),
  h('li', {}, "D")
])


patch(container, vnode1);

btn.onclick = () => {
  patch(vnode1, vnode2);
}
