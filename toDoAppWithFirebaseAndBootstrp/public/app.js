





// alert("Hello Firebase");




var database = firebase.database().ref('/');
var inputN=document.getElementById('inputField');
var list = document.getElementById('listItem');


function demo(){

              var user ={
                          name:inputN.value    
                        }
  
     database.child('batch42').push(user);
               }
//data show in screen
      database.child('batch42').on("child_added",function(snapshot){
      var obj=snapshot.val();
      obj.id=snapshot.key;
      render(obj);
})

function render(user){
        var li=document.createElement("LI");
        var text =document.createTextNode(user.name);
        var span =document.createElement("SPAN");
        span.appendChild(text);
        li.appendChild(span);
        li.setAttribute("id",user.id);
        li.setAttribute("class", "list-group-item");


// for delete list indivual

       var deleteBtn =document.createElement("BUTTON");
       var btnText=document.createTextNode("Delete");
       deleteBtn.setAttribute("class", "btn btn-danger btn-sm pull-right btn-space");
       deleteBtn.appendChild(btnText);
       deleteBtn.onclick=function(){
                              remove(user.id)
};

// for Edit list indivual
      li.appendChild(deleteBtn);
      var editBtn =document.createElement('BUTTON');
      var editText =document.createTextNode('Edit');
      editBtn.appendChild(editText);
      editBtn.setAttribute('class', 'btn btn-info btn-sm pull-right');
      editBtn.onclick =function(){
      edit(user.id,user.name)

}
   
    list.appendChild(li);
     li.appendChild(editBtn);

}


//date remove from database
function remove(key){
    database.child("batch42/" + key).remove();
}
//data remove form screen
 database.child('batch42').on("child_removed",function(data){
        var deletedLi=document.getElementById(data.key);
        deletedLi.remove();
});




function edit(id, text){

    var newText = prompt('New Text', text);
    var newData = {
                    name:newText
                  }
                if(newText===null){
                    render();
                }
    database.child("batch42/"+ id).update(newData);
}


database.child("batch42").on("child_changed", function(data){
    var updateLi = document.getElementById(data.key);
    var textSpan = updateLi.firstChild;
    textSpan.innerHTML= data.val().name;
});


// //data remove All from database
function deleteAll(){
                     database.child("batch42/").remove();
                    }
database.child('batch42').on("child_removed_all",function(data){
          var deletedAll=document.getElementById(data);
          deletedAll.remove();
});

