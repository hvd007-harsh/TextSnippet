$(function(){
  let arr = [];
    chrome.storage.local.get(['arr'], function(result) {
      console.log(result.arr);
        arr = result.arr;
        $.map(arr,(e,i)=>{
          let x = $(`#para`).html();
          let y = `<p id="para${i}">${e}</p>
          <button class="btn" id="${i}">Delete</button>`;
          $('#para').html(y + x);
     })
    });
    
    $("#btn-delete-all").click(function(){
      chrome.storage.local.set({'arr':['']}, function() {
        console.log('Value is set ');
      })
 
      chrome.storage.local.get(['arr'], function(result) {
       console.log(result.arr);
        $('#para').text(result.arr[0]);
      })
    });

    $(document).on('click','.btn',function(){

      console.log($(this).attr("id"));
      var val = $(this).attr("id");
      chrome.storage.local.get(['arr'], function(result) {
        var arr = result.arr;
        console.log(arr);
        arr[val] = '';
        console.log(arr);
        chrome.storage.local.set({'arr':arr}, function() {
          console.log('text is get deleted ');
        })
     })
    })
    //val() - Sets or returns the value of form field
   
     
    // chrome.storage.local.get(['btn'],function(result){
    //   console.log(result.btn);
    // })
}) 

