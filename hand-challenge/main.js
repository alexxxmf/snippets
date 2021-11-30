const MIN_CELL = 0;
const MAX_CELL = 255;

const clampValue = (currentVal) => {
  if (currentVal < MIN_CELL) {
    return MAX_CELL;
  } else if (currentVal > MAX_CELL) {
    return MIN_CELL;
  } else {
    return currentVal;
  }
};

const createFistLoopStartAndCloseIndex = (arr) => {
  let fistClosureLoopCounter = 0;

  let openFistIndexArr = [];
  let closeFistIndexArr = [];

  const loopIndex = {
    "🤜": {},
    "🤛": {},
  };

  for (let i = 0; i < arr.length; i++) {
    const character = arr[i];

    if (character === "🤜") {
      openFistIndexArr.push(i);
      fistClosureLoopCounter++;
    }
    if (character === "🤛") {
      closeFistIndexArr.push(i);
      fistClosureLoopCounter--;
    }

    if (
      openFistIndexArr.length &&
      closeFistIndexArr.length &&
      fistClosureLoopCounter === 0
    ) {
      const reversedCloseFistIndexArr = closeFistIndexArr.reverse();
      openFistIndexArr.forEach((currentValue, index) => {
        loopIndex["🤜"][currentValue] = reversedCloseFistIndexArr[index];
        loopIndex["🤛"][reversedCloseFistIndexArr[index]] = currentValue;
      });

      openFistIndexArr = [];
      closeFistIndexArr = [];
    }
  }

  if (fistClosureLoopCounter !== 0) {
    throw new Error("An unclosed fist loop was spotted");
  } else {
    return loopIndex;
  }
};

const translate = (string) => {
  // current state of the memory
  let memory = [0];
  // current point in memory to operate with
  let pointer = 0;
  // index to keep track of the point we are reading from the given string
  let stringIndex = 0;
  // to keep track of the output
  let output = "";

  const arrayOfInstructions = Array.from(string);

  const loopIndex = createFistLoopStartAndCloseIndex(arrayOfInstructions);

  const actions = {
    "👉": () => {
      pointer++;
      if (!memory[pointer]) {
        memory.push(0);
      }
    },
    "👈": () => {
      pointer--;
    },
    "👆": () => {
      memory[pointer] = clampValue(memory[pointer] + 1);
    },
    "👇": () => {
      memory[pointer] = clampValue(memory[pointer] - 1);
    },
    "🤜": () => {
      if (memory[pointer] === 0) {
        stringIndex = loopIndex["🤜"][stringIndex];
      }
    },
    "🤛": () => {
      if (memory[pointer] !== 0) {
        stringIndex = loopIndex["🤛"][stringIndex];
      }
    },
    "👊": () => {
      output += String.fromCharCode(memory[pointer]);
    },
  };

  while (stringIndex < arrayOfInstructions.length) {
    const action = arrayOfInstructions[stringIndex];

    actions[action]();

    stringIndex++;
  }

  return output;
};

module.exports = {
  translate,
  createFistLoopStartAndCloseIndex,
};
