'use strict';

var fastObjects = [],
  slowObjects = [];


function calculateTotalFast(purchase) {
  purchase.total = purchase.units * purchase.price;
}

function calculateTotalSlow(purchase) {
  purchase.total = purchase.units * purchase.price;
}

function slowPurchase(units, price) {
  var slowObject = new SlowPurchase(units, price);
  delete slowObject.x;
  return slowObject;
}

function SlowPurchase(units, price) {
  this.units = units;
  this.price = price;
  this.total = 0;
  this.x = 1;
}

function FastPurchase(units, price) {
  this.units = units;
  this.price = price;
  this.total = 0;
  this.x = 1;
}


function createObjects123() {
  var i;
  for (i = 0; i < 500000; i++) {
    fastObjects.push(new FastPurchase(i, 10));
    slowObjects.push(slowPurchase(i, 10));
  }
  console.log(fastObjects.length);
}


function calculate() {
  var fastStart, slowStart, fastEnd, slowEnd;
  fastStart = new Date();
  fastObjects.forEach(calculateTotalFast);
  fastEnd = new Date();
  slowStart = new Date();
  slowObjects.forEach(calculateTotalSlow);
  slowEnd = new Date();
  document.getElementById('innerTime').innerHTML = 'Fast:' + (fastEnd - fastStart);
  document.getElementById('slowTime').innerHTML = 'Slow:' + (slowEnd - slowStart);
}
