import patchVnode from "./patchVnode.js";
import createElement from "./createElement.js";

function sameVnode(node1, node2) {
  return (node1.key === node2.key && node1.sel === node2.sel)
}

export default function updateChildren(parentElement, oldCh, newCh) {
  // 旧前
  let oldStartIdx = 0;
  // 新前
  let newStartIdx = 0;
  // 旧后
  let oldEndIdx = oldCh.length - 1;
  // 新后
  let newEndIdx = newCh.length - 1;
  // 旧前DOM
  let oldStartVnode = oldCh[oldStartIdx];
  // 新前DOM
  let newStartVnode = newCh[newStartIdx];
  // 旧后DOM
  let oldEndVnode = oldCh[oldEndIdx];
  // 新后DOM
  let newEndVnode = newCh[newEndIdx];

  let keyMap = null

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null || oldStartVnode == undefined) {
      oldStartIdx ++;
    } else if (oldEndVnode == null || oldEndVnode == undefined) {
      oldEndIdx --;
    } else if (newStartVnode == null || newStartVnode == undefined) {
      newStartIdx ++;
    } else if (newEndVnode == null || newEndVnode == undefined) {
      newEndIdx --;
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // 新前和旧前命中
      console.log("①新前和旧前命中");
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(newEndVnode, oldEndVnode)) {
      // 新后与旧后命中
      console.log("②新后与旧后命中");
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(newEndVnode, oldStartVnode)) {
      // 新后与旧前命中
      console.log("③新后与旧前命中");
      patchVnode(oldStartVnode, newEndVnode);
      // 把老节点命中的节点插入到 旧后的后面
      parentElement.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(newStartVnode, oldEndVnode)) {
      // 新前与旧后命中
      console.log("④新前与旧后命中");
      patchVnode(oldEndVnode, newStartVnode);
      // 此时要移动节点，移动新前指向的节点到老节点旧前的前面
      parentElement.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      // 如何移动节点，只要插入一个已经在 DOM 树上的节点，它就会被移动
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
      // console.log(parentElement);
      // return
    } else  {
      // 都没有命中
      console.log("都没有命中");
      if (!keyMap) {
        keyMap = {};
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key;
          if (key) {
            keyMap[key] = i;
          }
        }
      }
      // 寻找当前这项（newStartIdx）这项在 keyMap 中的映射的位置序号
      const idxInOld = keyMap[newStartVnode.key];
      console.log(idxInOld, "idxInOld");
      if (idxInOld == undefined) {
        // 判断，如果 indInOld 是 undefined 表示它是全新的项
        // 被及收入的项（就是 neStartNode 这项），现在还不是真正的 DOM 节点
        parentElement.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        // 如果不是，不是全新的项，表示要移动
        const elmToMove = oldCh[idxInOld];
        patchVnode(elmToMove, newStartVnode);
        oldCh[idxInOld] = undefined;
        // 移动，调用 insertBefore 也可以实现移动
        console.log(elmToMove.elm, "elmToMove.elm");
        parentElement.insertBefore(elmToMove.elm, oldStartVnode.elm);
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }

  // 结束循环 开始判断没有处理的子节点
  if (newStartIdx <= newEndIdx) {
    console.log("newCh 有剩余节点", newStartIdx, newEndIdx);
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      let old = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
      console.log(createElement(newCh[i]), old, "222");
      parentElement.insertBefore(createElement(newCh[i]), old);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log("oldCh 有剩余节点");
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElement.removeChild(oldCh[i].elm);
      }
    }
  }
}