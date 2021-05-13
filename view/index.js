const iframe = document.querySelector("#iframe1")
function parser() {
    let data = iframe.contentWindow.document.body.children[0]?.innerHTML
    console.log(data)
    if(!data) return
    console.log("there is data")
    let jsonData = JSON.parse(data)
    console.log(jsonData)
    loadDataToTable(jsonData)
}
iframe.addEventListener("load",parser)

const table = document.querySelector("#tableDetect")
function loadDataToTable(jsonData) {
    jsonData.forEach(element => {
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        td1.innerText = element.description
        td2.innerText = element.timeStep
        tr.appendChild(td1)
        tr.appendChild(td2)
        table.appendChild(tr)
    });
}