(function() {
  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];

  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === "j") {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  // Додатковий функціонал:
  console.log("\n--- Custom Selection Based on ASCII Sum ---");

  var threshold = 600; // поріг суми ASCII
  for (var i = 0; i < names.length; i++) {
    var asciiSum = 0;
    for (var j = 0; j < names[i].length; j++) {
      asciiSum += names[i].charCodeAt(j);
    }

    if (asciiSum > threshold) {
      console.log("[" + names[i] + "] має ASCII-суму " + asciiSum + " — ВЕЛИКЕ ім'я");
    } else {
      console.log("[" + names[i] + "] має ASCII-суму " + asciiSum + " — маленьке ім'я");
    }
  }
})();