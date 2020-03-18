
// Check that service workers are registered
if ('serviceWorker' in navigator) {
   try{
    navigator.serviceWorker.register("js/sw.js");
    console.log("SW registered");
   }catch(err){
    console.log(err);
   }

  }
