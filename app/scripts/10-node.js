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
    console.log("Chocolates: %d", sugar.length);
  }, 1000);
}
