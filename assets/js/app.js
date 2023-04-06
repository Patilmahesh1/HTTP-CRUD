let cl = console.log;

// CRUD >> Creat , Read , Update , Delete

const postcontainer = document.getElementById("postcontainer")
const postForm = document.getElementById("postForm")
const titlecontrol = document.getElementById("title")
const contentcontrol = document.getElementById("content")

let baseUrl = `https://jsonplaceholder.typicode.com/posts`;


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


const templating = (arr) => {
    let result = ``;
    arr.forEach(ele => {
        result +=`
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-header">
                                <h3>${ele.title}</h3>
                            </div>
                            <div class="card-body">
                                <p>
                                    ${ele.body}
                                </p>
                            </div>
                            <div class="card-footer text-right">
                                <button class="btn btn-primary">Edit</button>
                                <button class="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>    

                    `
    });
    postcontainer.innerHTML = result;
}

function makeApicall(methodname, apiUrl, body){
    let xhr = new XMLHttpRequest()

    xhr.open(methodname, apiUrl)

    xhr.onload = function(){
        if(xhr.status === 200 || xhr.status === 201){
            // cl(xhr.response)
            let data = JSON.parse(xhr.response)
            if(methodname === "GET"){
                templating(data)
            }
        }
    }
    xhr.send(body)
}
makeApicall("GET", baseUrl)


const onPostSubmit = (eve) => {
    eve.preventDefault();
    let postObj = {
        title : titlecontrol.value,
        body : contentcontrol.value,
        userId : Math.floor(Math.random() * 10) + 1,
        id : uuid()
    }
    cl(postObj)

    makeApicall("POST" , baseUrl , JSON.stringify(postObj))
}


postForm.addEventListener("submit" , onPostSubmit)