
// chrome.commands.onCommand.addListener(function(cmd){
//        if(cmd === 'save'){
//          console.log(cmd.selectionText);
//        }
// })

let contextMenuitems = {
  "id":"textsnippet",
  "title":"textsnippet",
  "contexts":["selection"]
}
let myLocationUrl = location.href;
chrome.storage.local.set({'url': myLocationUrl},function(){
 console.log('Url is set');
})
let arr=[];
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create(contextMenuitems);
 });

 chrome.storage.local.get(['url'],function(result){
  console.log(result.url);
 })
 
  chrome.contextMenus.onClicked.addListener(function(clickData){
    console.log(clickData.selectionText);
    let text = clickData.selectionText;
    arr.push(text);
    chrome.storage.local.set({'arr':arr}, function() {
      console.log('Value is set ');
    });
})
chrome.storage.local.get(['arr'], function(result) {
  console.log('Value currently is ' + result.text);
});

async function getCurrentTabUrl () {
  const tabs = await chrome.tabs.query({ active: true })
  let url = tabs[0].url;
  //Checking Url 
  chrome.storage.local.get(['url'],(data)=>{
  if(!(url===data.url)){
   chrome.storage.local.set({'arr':''}, function() {
     console.log('Value is Clear');
   });
  }
})
  //setting url
  chrome.storage.local.set({'url':url},()=>{
    console.log('Url is set');
  })
}

getCurrentTabUrl();

 