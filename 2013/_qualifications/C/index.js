// node index.js < C-small-practice.in > C-small-practice.out
// node index.js < C-large-practice-1.in > C-large-practice-1.out
// node index.js < C-large-practice-2.in > C-large-practice-2.out


// time: O(1)
// space: O(1)
function main() {
  var testCases = nextInt();
  var A, B, pldrms, res, high, cand, bins3, bins1, sumDigits, pad, bins, count;
  var MAX = 7;
  pldrms = ["1", "2", "3", "11", "22", "101", "111", "121", "202", "212"];
  res = [];
  high = Math.pow(2, MAX);
  bins = [];
  // bins3 = [];
  // bins1 = [];

  for (var i = 0; i < high; i++) {
    cand = i.toString(2);
    sumDigits = cand.split("").reduce((acc, val) => acc + parseInt(val), 0);

    bins.push(cand);
  }

  // bins.map(b => print(b));

  for (var i = 1; i <= MAX - 1; i++) {
    // print('i:  ' + i);
    // find all palindromes with 0,1,2,3 and squares of digits <=9

    // 1 on edges even
    pad = "";
    for (var j = 1; j < i; j++) {
      pad += "0"; // pad with leading zeros
    }
    // print('pad:  ' + pad);
    for (var j = 0; j < Math.pow(2, i); j++) {
      if (bins[j].split("").reduce((acc, val) => acc + parseInt(val), 0) <= 3) {
        pldrms.push("1" + (pad + bins[j]).slice(-i) + (pad + bins[j]).slice(-i).split("").reverse().join("") + "1");
      }
    }

    // 2 on edges - even
    pldrms.push("2" + Array(i + 1).join("0") + Array(i + 1).join("0") + "2");

    // 1 on edges odd
    for (var j = 0; j < Math.pow(2, i); j++) {
      sumDigits = bins[j].split("").reduce((acc, val) => acc + parseInt(val), 0);
      if (sumDigits <= 3) {
        pldrms.push("1" + (pad + bins[j]).slice(-i) + "0" + (pad + bins[j]).slice(-i).split("").reverse().join("") + "1");
        pldrms.push("1" + (pad + bins[j]).slice(-i) + "1" + (pad + bins[j]).slice(-i).split("").reverse().join("") + "1");
      }
      if (sumDigits <= 1) {
        pldrms.push("1" + (pad + bins[j]).slice(-i) + "2" + (pad + bins[j]).slice(-i).split("").reverse().join("") + "1");
      }
    }

    // 2 on edges - odd 
    pldrms.push("2" + Array(i + 1).join("0") + "0" + Array(i + 1).join("0") + "2");
    pldrms.push("2" + Array(i + 1).join("0") + "1" + Array(i + 1).join("0") + "2");
  }

  pldrms = pldrms.map(pldrm => pow(pldrm));
  // pldrms.map(pldrm => print(pldrm));

  for (var testCase = 1; testCase <= testCases; ++testCase) {
    A = next();
    B = next();
    count = 0;

    // go through the list of palindromes and count how much of them between A and B
    for (var i = 0; i < pldrms.length; i++) {
      // print('p:  ' + pldrms[i]);
      // print(compareStr(pldrms[i] + "", A) + ' ' + compareStr(B, pldrms[i] + "") + ' ' + count);
      if (!count) {
        if (compareStr(pldrms[i] + "", A) && compareStr(B, pldrms[i] + "")) {
          // print('c1');
          count++;
        } else if (compareStr(pldrms[i] + "", B)) {
          break;
        }
      } else if (compareStr(B, pldrms[i] + "")) {
        // print('c2');
        count++;
      } else {
        break;
      }
    }

    print("Case #" + testCase + ": " + count);
  }
}

function pow(str) {
  if (str.length === 1) {
    return Math.pow(parseInt(str), 2);
  } else {
    var res = "";
    var lng = str.length;
    for (var i = 1; i <= lng; i++) {
      var dig = 0;
      for (var j = 0; j < i; j++) {
        dig += parseInt(str[j]) * parseInt(str[i - j - 1]);
      }
      res += dig;
    }
    return res + res.slice(0, -1).split("").reverse().join("");
  }

}

function compareStr(str1, str2) {
  return (str1.length > str2.length || str1 == str2 || str1.length === str2.length && str1 > str2) ? 1 : 0;
}

// auxiliary code
var curTokens = [],
  curToken = 0;

function next() {
  while (curToken >= curTokens.length) {
    curTokens = readline().split(/[\s]+/);
    curToken = 0;
  }
  return curTokens[curToken++];
}

function nextInt() {
  return parseInt(next());
}

// code for nodejs
var inputBuffer = "",
  curLine = 0;

function readline() {
  return inputBuffer[curLine++];
}

function print(data) {
  process.stdout.write(data + "\n");
}

process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", function (chunk) {
  inputBuffer += chunk;
});

process.stdin.on("end", function () {
  inputBuffer = inputBuffer.split(/[\s]+/);
  main();
});