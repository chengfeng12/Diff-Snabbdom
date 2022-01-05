import vnode from "./vnode";

export default function h(sel, data, c) {
  /**
   * 三个参数的写法
   * 
   * h('li', {}, "A")
   * 
   * h('li', {}, [
   *  h('li', {}, "A")
   * ])
   * 
   * h('li', {}, h('div', {}, "test"))
   */
  if (arguments.length !== 3) {
    throw new Error('参数不符合要求，必须为 3 个参数')
  } else if (typeof c === 'string' || typeof c === 'number') {
    console.log('文本类型');
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {
    console.log('带有子集');
    let children = [];
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel')))
        throw new Error('child 第三个参数类型不对')
      children.push(c[i])
    }
    return vnode(sel, data, children, undefined, undefined);
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    return vnode(sel, data, [c])
  } else {
    throw new Error('第三个参数类型不对')
  }
}