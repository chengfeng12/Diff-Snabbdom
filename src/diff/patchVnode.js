import createElement from "./createElement";

export default function patchVnode(oldVnode, newVnode) {
  // 判断 oldVnode 和 newVnode 是否是同一个对象, 如果是 什么都不做
  if (oldVnode === newVnode) return
  // 是否有 text 属性
  if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
    // newVnode 有 text 属性
    if (newVnode.text !== oldVnode.text) {
      // 如果 newVnode 节点中的 text 和 oldVnode 的 text 属性不同，那么直接让 newVnode 的 text 写入到 oldVnode 中，如果 oldVnode 中是 children，那么也会立刻消失掉
      console.log(oldVnode.elm, "oldVnode.elm");
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    // newVnode 没有 text 属性
    // 判断 oldVnode 有没有 children 属性
    if (oldVnode.children && oldVnode.children.length > 0) {
      // oldVnode 此时含有 children 属性，情况最复杂（新老节点都 children 属性）
    } else {
      // oldVnode 没有 children 属性，新节点有
      for (let i = 0; i < newVnode.children.length; i++) {
        const dom = createElement(newVnode.children[i]);
        newVnode.children[i].elm = dom;
        console.log(dom, oldVnode.elm);
        oldVnode.elm.appendChild(dom, oldVnode.elm);
      }
      oldVnode.elm.removeChild(oldVnode.elm)
    }
  } 

  /* else if (oldVnode.children && oldVnode.children.length > 0) {
    console.log('oldVnode 有 children 属性');
  } else {
    console.log('oldVnode 有 text 属性', oldVnode);
    if (newVnode.text !== oldVnode.text) {
      for (let i = 0; i < newVnode.children.length; i++) {
        const dom = createElement(newVnode.children[i]);
        newVnode.children[i].elm = dom;
        console.log(dom);
        oldVnode.elm.insterBefore(dom, oldVnode.elm);
      }
    }
  } */
}