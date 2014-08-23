// require("heapdump");

// It is important to use named constructors
// like the one below, otherwise the snapshot
// will not produce useful outputs for you.

function ChocolateClass() {
  //
}

function runModule() {
  var sugar = [];
  setInterval(function() {
    for (var i = 0; i < 100; i++) {
      sugar.push(new ChocolateClass);
    }
    console.error("Chocolates: %d", sugar.length);
  }, 1000);
}

/*
We sorted the first heap snapshot by object count and found that the ChocolateClass
was the top memory utilizer with 37% of the objects in heap. But this is not enough
evidence to conclusively prove anything. We can see some retainers at higher levels
for other types of objects too.

Inspecting the second heap snapshot taken on the server after a delay of 1 minute from
the first one, confirmed our suspicions. We can see that the ChocolateClass has suddenly
bloated in heap consumption to about 77% of the heap size. The shallow and retainer sizes
of this class is now close to 30% of overall.

Drilling down into the ChocolateClass, we see it’s the sugar array which is causing all this
bloating. We can even inspect the call path, the data elements and attributes and all the objects
in depth. Retaining paths are actually any paths that link objects with GC roots. Path inspection
is critical here.

Interestingly, we can see that there are nearly 47K sugar units in the array and the array is not
being garbage collected properly.
*/

// http://strongloop.com/strongblog/node-js-performance-heap-profiling-tip/
