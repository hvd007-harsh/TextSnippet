$(function(){
  let arr = [];
  
    chrome.storage.sync.get(['arr'], function(result) {
    chrome.storage.sync.get(['url'],(data)=>{
      console.log(result.arr);
        arr = result.arr;
        $.map(arr,(e,i)=>{
          let x = $(`#para`).html();
          let y = `<p id="para${i}">${e}</p>
          <button class="btn" id="${i}">Delete</button>`;
          $('#para').html(y + x);
        })
        url = data.url;
        $.map(arr,(e,i)=>{
          var blob = new Blob([e+url], { type: 'text/plain' });
          let textFile = window.URL.createObjectURL(blob);
          let window2 = window.open(textFile, 'log.' + new Date() + '.txt');
          window2.onload = e => window.URL.revokeObjectURL(textFile);
        })

      })
    });

    async function getCurrentTabUrl () {
      const tabs = await chrome.tabs.query({ active: true })
      let url = tabs[0].url;
      //Checking Url 
      chrome.storage.sync.get(['url'],(data)=>{
      if(!(url===data.url)){
       chrome.storage.sync.set({'arr':''}, function() {
         console.log('Value is Clear');
       });
      }
     })
      //setting url
      chrome.storage.sync.set({'url':url},()=>{
        console.log('Url is set');
      })
    }

    $("#btn-delete-all").click(function(){
      chrome.storage.sync.set({'arr':['']}, function() {
        console.log('Value is set ');
      })
    
      chrome.storage.sync.get(['arr'], function(result) {
       console.log(result.arr);
        $('#para').text(result.arr[0]);
      })
    });

    $(document).on('click','.btn',function(){

      console.log($(this).attr("id"));
      var val = $(this).attr("id");
      chrome.storage.sync.get(['arr'], function(result) {
        var arr = result.arr;
        console.log(arr);
        arr[val] = '';
        console.log(arr);
        chrome.storage.sync.set({'arr':arr}, function() {
          console.log('text is get deleted ');
        })
     })
    })
    //val() - Sets or returns the value of form field
   
     
    // chrome.storage.local.get(['btn'],function(result){
    //   console.log(result.btn);
    // })
    getCurrentTabUrl();

}) 

