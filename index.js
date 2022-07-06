console.log("Welcome to postman");

// utility Function
function getElementFromString(str) {
    let div = document.createElement("div");
    div.innerHTML = str;
    return div.firstElementChild;
}

let paramCount = 1;

// hide spinner 
const spinner = document.getElementById("spinner");
spinner.style.display = 'none';

// hide responsBox Intiall;
const responsBox = document.getElementById("responseBox");
responsBox.style.display = 'none';


// hide parameter box intailly
const parameterBox = document.getElementById("parameterbox");
parameterBox.style.display = "none";

// jsonBox 
const jsonBox = document.getElementById("jsonBox");



// if user clicks on params box hide the json box
// if user clicks on json box hide the params box

//if click on customparameter
const customParameter = document.getElementById("customParameter");
customParameter.addEventListener("click", () => {
    console.log("click on custtom");
    parameterBox.style.display = 'block';
    jsonBox.style.display = 'none';
})

// if click on json
const json = document.getElementById('json');
json.addEventListener("click", () => {
    console.log("click on json");
    const addParameterBox = document.getElementById("addParameter");

    jsonBox.style.display = 'block';
    parameterBox.style.display = 'none';
    addParameterBox.style.display = 'none';

})

// if user click on add button of custom parameter

const addButton = document.getElementById("add");
addButton.addEventListener("click", () => {
    console.log("click on add");

    const addParameter = document.getElementById("addParameter");
    paramCount++;
    let html = ` <div class="input-group my-2">
    <span class="input-group-text">
        <h5>Parameter ${paramCount}</h5>
    </span>
    <input type="text" aria-label="First name" class="form-control" id='parameterKey${paramCount}' placeholder="Enter Parameter ${paramCount} Key">
    <input type="text" aria-label="Last name" class="form-control" id='parameterValue${paramCount}' placeholder="Enter Parameter ${paramCount} value">
    <button id="add" class="btn btn-primary deleteParam">-</button>
</div>`


    // addParameter.innerHTML+=html;

    let paraElement = getElementFromString(html);
    addParameter.appendChild(paraElement)

    // add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');

    for (item of deleteParam) {
        item.addEventListener("click", (e) => {
            // add conformation box
            alert("do you want delete?")
            e.target.parentElement.remove();
        })
    }

})

// if user click on submit

const submit = document.getElementById("submit");

submit.addEventListener('click', (e) => {
    console.log("submit clicked");

    const url = document.getElementById("url").value;
    const requestType = document.querySelector("input[name='requestType']:checked").value;
    const contentType = document.querySelector("input[name='contentType']:checked").value;
    let data;


    if (contentType == 'customParameter') {
        data = {};
        for (i = 1; i < paramCount + 1; i++) {
            if (document.getElementById("parameterKey" + (i)) != undefined) {


                let key = document.getElementById('parameterKey' + (i)).value;
                let value = document.getElementById("parameterValue" + (i)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);

    }
    else {

        data = document.getElementById("requestJson").value;
    }


    if (url == "") {
        // if url is empty show alert
        alert("Please enter URL");
    }
    else {
        // spinner start
        spinner.style.display = "block";

        // if request type is get invoke fetch api to create a get request
        if (requestType == 'GET') {
            fetch(url, {
                // method:'GET',
            }).then(response => response.text())
                .then((text) => {

                    setTimeout(() => {
                        responsBox.style.display = 'block';
                        document.getElementById("responseTxt").innerHTML = text;
                        // spinner stop
                        spinner.style.display = "none";
                        console.log(text);
                    }, 5000);


                })
        }
        else if (requestType == 'POST') {
            fetch(url, {
                method: 'POST',
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.text())
                .then((text) => {
                    setTimeout(() => {
                        responsBox.style.display = 'block';
                        document.getElementById("responseTxt").innerHTML = text;
                        // spinner stop
                        spinner.style.display = "none"
                        console.log(text);
                    }, 5000);

                })
        }
    }
})

