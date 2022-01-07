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
  let oldStartNode = oldCh[oldStartIdx];
  // 新前DOM
  let newStartNode = newCh[newStartIdx];
  // 旧后DOM
  let oldEndNode = oldCh[oldEndIdx];
  // 新后DOM
  let newEndNode = newCh[newEndIdx];

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (sameVnode(oldStartNode, newStartNode)) {
      // 新前和旧前命中
      console.log("①新前和旧前命中");
      patchVnode(oldStartNode, newStartNode);
      oldStartNode = oldCh[++oldStartIdx];
      newStartNode = newCh[++newStartIdx];
    } else if (sameVnode(newEndNode, oldEndNode)) {
      // 新后与旧后命中
      console.log("②新后与旧后命中");
      patchVnode(oldEndNode, newEndNode);
      oldEndNode = oldCh[--oldEndIdx];
      newEndNode = newCh[--newEndIdx];
    } else if (sameVnode(newEndNode, oldStartNode)) {
      // 新后与旧前命中
      console.log("③新后与旧前命中");
      patchVnode(oldStartNode, newEndNode);
      // 把老节点命中的节点插入到 旧后的后面
      parentElement.insertBefore(oldStartNode.elm, oldEndNode.elm.nextSibling);
      oldStartNode = oldCh[++oldStartIdx];
      newEndNode = newCh[--newEndIdx];
    } else if (sameVnode(newStartNode, oldEndNode)) {
      // 新前与旧后命中
      console.log("④新前与旧后命中");
      patchVnode(oldEndNode, newStartNode);
      // 把老节点命中的节点插入到 旧后的后面
      parentElement.insertBefore(oldEndNode.elm, oldStartNode.elm.nextSibling);
      newStartNode = newCh[++newStartIdx];
      oldEndNode = oldCh[--oldEndIdx];
    } else  {
      // 都没有命中
      console.log("都没有命中");
    }
  }

  // 结束循环 开始判断没有处理的子节点
  if (newStartIdx <= newEndIdx) {
    console.log("newCh 有剩余节点");
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      let old = oldCh[oldEndIdx + 1] == null ? null : oldCh[oldEndIdx + 1].elm;
      console.log(createElement(newCh[i]), "222");
      parentElement.insertBefore(createElement(newCh[i]), old);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log("oldCh 有剩余节点");
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      parentElement.removeChild(oldCh[i].elm);
    }
  }
}