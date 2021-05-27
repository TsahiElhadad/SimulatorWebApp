const iframe = document.querySelector("#iframe1")
const table = document.querySelector("#tableDetect")

/// function for check if user upload csv file.
function csvCheck(csvID) {
    let path = document.getElementById(csvID).value
    if(!path.endsWith(".csv")) { // if its csv file
        alert("Wrong Input! Please Upload CSV File.")
        document.getElementById(csvID).value = ""
    }
}

/// function that clear the detect table before each request of detect.
function clearBefore() {
    $("#tableDetect").find("tr:gt(0)").remove();
}   

/// function that parse the data we get from server to the frame and displayed it into the Detect Table.
function parser() {
    let data = iframe.contentWindow.document.body.children[0]?.innerHTML
    if(!data) return
    if(data === "error in csv") {
        alert("Error! Invalid CSV FILE. Please Upload Two Valid CSV Files")
        return
    }
    if(data === "no algoType") {
        alert("Please Choose An Algorithm")
        return
    }
    let jsonData = JSON.parse(data)
    loadDataToTable(jsonData)
}

iframe.addEventListener("load",parser)

/// function that create the detect table by the json data we get.
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