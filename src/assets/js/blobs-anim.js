var speed = 7500;
// пятно для первого экрана

$(function () {
  console.log('blobs works');
  try {
    var firstblobname = Snap('body');
    firstblob = firstblobname.select('.firstblob path');
    firstblobConfig = {
      from: firstblob.attr('d'),
      to: 'M545 180C545 241.301 522.818 296.079 483.787 335C446.413 372.269 393.59 395 330 395C200 395 5 321.5 5 219.5C5 104.5 244 15 380 15C429.711 15 470.773 33.5338 499.5 63.2307C528.562 93.2731 545 134.74 545 180Z',
      toNext: 'M545 230C545 274.98 499 325 432.5 350.5C366 376 278.32 395 190 395C58.5 395 5 288 5 170C5.00089 85.5 53 5 140 5C236.5 5 356 53.5 432.5 92C509 130.5 545 175 545 230Z'
    };
    firstfirstblobAnimation();
  } catch (e) {

  }
});

$(function () {
  try {
    var firstblobname = Snap('body');
    firstblob = firstblobname.select('.firstblob2 path');
    firstblobConfig = {
      from: firstblob.attr('d'),
      to: 'M545 180C545 241.301 522.818 296.079 483.787 335C446.413 372.269 393.59 395 330 395C200 395 5 321.5 5 219.5C5 104.5 244 15 380 15C429.711 15 470.773 33.5338 499.5 63.2307C528.562 93.2731 545 134.74 545 180Z',
      toNext: 'M545 230C545 274.98 499 325 432.5 350.5C366 376 278.32 395 190 395C58.5 395 5 288 5 170C5.00089 85.5 53 5 140 5C236.5 5 356 53.5 432.5 92C509 130.5 545 175 545 230Z'
    };
    firstfirstblobAnimation();
  } catch (e) {

  }
});

function firstfirstblobAnimation() {
  try {
    firstblob.animate({'path': firstblobConfig.to}, speed, secondfirstblobAnimation);
  } catch (e) {

  }
}

function secondfirstblobAnimation() {
  try {
    firstblob.animate({'path': firstblobConfig.toNext}, speed, firstfirstblobAnimation);
  } catch (e) {

  }
}

//анимация-2

$(function () {
  try {
    var blobonename = Snap('body');
    blobone = blobonename.select('.blobone path');
    bloboneConfig = {
      from: blobone.attr('d'),
      to: 'M420 247.323C420 340 335 395 255 395C156.5 395 30 316.5 30 216C30 104.5 128 5 222 5C316 5 420 150.5 420 247.323Z',
      toNext: 'M434.997 161.5C434.997 293 351.5 387.5 231 385C135.021 383.008 15.0527 325 15.0527 225.5C15.0527 111 184 15.0063 300.5 15.0063C382 15.0063 434.997 75.5001 434.997 161.5Z'
    };
    firstbloboneAnimation();
  } catch (e) {

  }
});

function firstbloboneAnimation() {
  try {
    console.log({blobone});
    blobone.animate({'path': bloboneConfig.to}, speed, secondbloboneAnimation);
  } catch (e) {
    console.error({e})
  }
}

function secondbloboneAnimation() {
  try {
    blobone.animate({'path': bloboneConfig.toNext}, speed, firstbloboneAnimation);
  } catch (e) {

  }
}

// анимация-2 реверс

$(function () {
  try {
    var blobonerevname = Snap('body');
    blobonerev = blobonerevname.select('.blobonerev path');
    blobonerevConfig = {
      from: blobonerev.attr('d'),
      to: 'M434.997 161.5C434.997 293 351.5 387.5 231 385C135.021 383.008 15.0527 325 15.0527 225.5C15.0527 111 184 15.0063 300.5 15.0063C382 15.0063 434.997 75.5001 434.997 161.5Z',
      toNext: 'M420 247.323C420 340 335 395 255 395C156.5 395 30 316.5 30 216C30 104.5 128 5 222 5C316 5 420 150.5 420 247.323Z'
    };
    firstblobonerevAnimation();
  } catch (e) {

  }
});

function firstblobonerevAnimation() {
  try {
    blobonerev.animate({'path': blobonerevConfig.to}, speed, secondblobonerevAnimation);
  } catch (e) {

  }
}

function secondblobonerevAnimation() {
  try {
    blobonerev.animate({'path': blobonerevConfig.toNext}, speed, firstblobonerevAnimation);
  } catch (e) {

  }
}

// анимация-3

$(function () {
  try {
    var blobtwoname = Snap('body');
    blobtwo = blobtwoname.select('.blobtwo path');
    blobtwoConfig = {
      from: blobtwo.attr('d'),
      to: 'M430 275C430 360 350 420 260 420C150 420 20 340 20 240C20 140 120 30 220 30C310 30 430 150 430 275Z',
      toNext: 'M425 135.017C425 239.5 285 444.98 180 444.98C89.5 444.98 25 352 25 225C25 98 127.5 5.01746 295.001 5.01746C375.5 5.01746 425 54.5 425 135.017Z'
    };
    firstblobtwoAnimation();
  } catch (e) {

  }
});

$(function () {
  try {
    var blobtwoname = Snap('body');
    blobtwo = blobtwoname.select('.blobtwo2 path');
    blobtwoConfig = {
      from: blobtwo.attr('d'),
      to: 'M430 275C430 360 350 420 260 420C150 420 20 340 20 240C20 140 120 30 220 30C310 30 430 150 430 275Z',
      toNext: 'M425 135.017C425 239.5 285 444.98 180 444.98C89.5 444.98 25 352 25 225C25 98 127.5 5.01746 295.001 5.01746C375.5 5.01746 425 54.5 425 135.017Z'
    };
    firstblobtwoAnimation();
  } catch (e) {

  }
});

function firstblobtwoAnimation() {
  try {
    blobtwo.animate({'path': blobtwoConfig.to}, speed, secondblobtwoAnimation);
  } catch (e) {

  }
}

function secondblobtwoAnimation() {
  try {
    blobtwo.animate({'path': blobtwoConfig.toNext}, speed, firstblobtwoAnimation);
  } catch (e) {

  }
}

// анимация-3 реверс

$(function () {
  try {
    var blobtworevname = Snap('body');
    blobtworev = blobtworevname.select('.blobtworev path');
    blobtworevConfig = {
      from: blobtworev.attr('d'),
      to: 'M425 135.017C425 239.5 285 444.98 180 444.98C89.5 444.98 25 352 25 225C25 98 127.5 5.01746 295.001 5.01746C375.5 5.01746 425 54.5 425 135.017Z',
      toNext: 'M420 247.323C420 340 335 395 255 395C156.5 395 30 316.5 30 216C30 104.5 128 5 222 5C316 5 420 150.5 420 247.323Z'
    };
    firstblobtworevAnimation();
  } catch (e) {

  }
});

$(function () {
  try {
    var blobtworevname = Snap('body');
    blobtworev = blobtworevname.select('.blobtworev2 path');
    blobtworevConfig = {
      from: blobtworev.attr('d'),
      to: 'M425 135.017C425 239.5 285 444.98 180 444.98C89.5 444.98 25 352 25 225C25 98 127.5 5.01746 295.001 5.01746C375.5 5.01746 425 54.5 425 135.017Z',
      toNext: 'M420 247.323C420 340 335 395 255 395C156.5 395 30 316.5 30 216C30 104.5 128 5 222 5C316 5 420 150.5 420 247.323Z'
    };
    firstblobtworevAnimation();
  } catch (e) {

  }
});

function firstblobtworevAnimation() {
  try {
    blobtworev.animate({'path': blobtworevConfig.to}, speed, secondblobtworevAnimation);
  } catch (e) {

  }
}

function secondblobtworevAnimation() {
  try {
    blobtworev.animate({'path': blobtworevConfig.toNext}, speed, firstblobtworevAnimation);
  } catch (e) {

  }
}

//болванка анимации-2
//просто найди и замени "blobtwo" на названия класса
/*
$(function() {

var substitutename = Snap('body' );

substitute = substitutename.select( '.substitute path' );

substituteConfig = {
    from : substitute.attr( 'd' ),
	to : 'M420 247.323C420 340 335 395 255 395C156.5 395 30 316.5 30 216C30 104.5 128 5 222 5C316 5 420 150.5 420 247.323Z',
    toNext : 'M434.997 161.5C434.997 293 351.5 387.5 231 385C135.021 383.008 15.0527 325 15.0527 225.5C15.0527 111 184 15.0063 300.5 15.0063C382 15.0063 434.997 75.5001 434.997 161.5Z'
};

firstsubstituteAnimation();
});

function firstsubstituteAnimation() {
    substitute.animate( { 'path' : substituteConfig.to }, speed, secondsubstituteAnimation);
}

function secondsubstituteAnimation() {
    substitute.animate( { 'path' : substituteConfig.toNext }, speed, firstsubstituteAnimation );
}
*/
