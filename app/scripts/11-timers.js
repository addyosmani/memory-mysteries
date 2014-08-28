for (var i = 0; i < 100000; i++) {
    var buggyObject = {
       callAgain: function() {
         var ref = this;
         var val = setTimeout(function() {
            ref.callAgain(); 
         }, 1000000);
       }
    }

    buggyObject.callAgain();
    buggyObject = null;
}

/*
After many rounds of attempting to GC this, the memory consumption remains unchanged. 
buggyObject instantiates a setTimeout which calls itself, even if you change buggyObject to 
= null. Basically, saying you are done with the object and it can be GC'd. The object 
will not be garbage collected because there is still a reference to it in the setTimeout(). 
*/
