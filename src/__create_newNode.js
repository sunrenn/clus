export function newNode(what, content, id = "", parentId = "") {
    let newnode = document.createElement(what);
    let newcontent = document.createTextNode(content);
    newnode.appendChild(newcontent);
    if (id != "") {
        newnode.id = id;
    }
    let pNode;
    if (parentId != "") {
        pNode = document.querySelector("#" + parentId);
    }
    if (pNode) {
        pNode.appendChild(newnode);
    } else {
        document.body.appendChild(newnode);
    }
}