$(function(){
  let arr = [];
    chrome.storage.local.get(['arr'], function(result) {
      console.log(result.arr);
        arr = result.arr;
        $.map(arr,(e,i)=>{
          let x = $(`#para`).html();
          let y = `<p id="para${i}">${e}</p>`;
          $('#para').html(y + x);
     })
    });
    $("#btn").click(function(){
      chrome.storage.local.set({'arr':['']}, function() {
        console.log('Value is set ');
      })
 
      chrome.storage.local.get(['arr'], function(result) {
       console.log(result.arr);
        $('#para').text(result.arr[0]);
      })
    });
})