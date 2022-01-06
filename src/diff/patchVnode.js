import createElement from "./createElement";
/**
 * 此操作只涉及到新增，插入的操作
 *      注意： 新创建的节点（newVnodechildren[i].elm）插入到所有未处理的节点（oldVnodechildren[j].elm）之前，而不是所有已处理节点之后（后果：连续插入新的节点时会造成顺序错乱）
 *      删除 和 排序等，逻辑冗余，没有算法支撑，不是最有解，所以不推荐此做法
 * 
 */
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
      // 记录 oldVnode 的指针
      let un = 0;
      for (let i = 0; i < newVnode.children.length; i++) {
        const ch =  newVnode.children[i];
        // 再次遍历，看看 oldVnode 中有没有节点和它是 same 的
        let isExist = false;
        for (let j = 0; j < oldVnode.children.length; j++) {
          if (!oldVnode.children[j].key || !ch.key) {
            throw new Error('请添加 key 值')
          }
          if (oldVnode.children[j].sel === ch.sel && oldVnode.children[j].key === ch.key) {
            isExist =  true;
          }
        }
        // 需要插入的
        if (!isExist) {
          console.log(un, oldVnode.elm);
          const newDom = createElement(ch);
          ch.elm = newDom;
          if (un < oldVnode.children.length) {
            oldVnode.elm.insertBefore(newDom, oldVnode.children[un].elm);
          } else oldVnode.elm.appendChild(newDom);
        } else {
          // 让处理节点的指针下移
          un++;
        }
      }
    } else {
      // oldVnode 没有 children 属性，新节点有
      // 先清空 text 值
      oldVnode.elm.innerHTML = "";
      for (let i = 0; i < newVnode.children.length; i++) {
        const dom = createElement(newVnode.children[i]);
        newVnode.children[i].elm = dom;
        oldVnode.elm.appendChild(dom, oldVnode.elm);
      }
    }
  } 
}