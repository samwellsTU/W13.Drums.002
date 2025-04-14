const otherSamples = {
  kick: [
    ["GSCW Drums Kit 1 Samples/Kick-V01-Yamaha-16x16.wav", null],
    ["GSCW Drums Kit 1 Samples/Kick-V02-Yamaha-16x16.wav", null],
    ["GSCW Drums Kit 1 Samples/Kick-V03-Yamaha-16x16.wav", null],
    ["GSCW Drums Kit 1 Samples/Kick-V04-Yamaha-16x16.wav", null],
    ["GSCW Drums Kit 1 Samples/Kick-V05-Yamaha-16x16.wav", null],
    ["GSCW Drums Kit 1 Samples/Kick-V06-Yamaha-16x16.wav", null],
    ["GSCW Drums Kit 1 Samples/Kick-V07-Yamaha-16x16.wav", null],
    ["GSCW Drums Kit 1 Samples/Kick-V08-Yamaha-16x16.wav", null],
    ["GSCW Drums Kit 1 Samples/Kick-V09-Yamaha-16x16.wav", null],
    ["GSCW Drums Kit 1 Samples/Kick-V10-Yamaha-16x16.wav", null],
    ["GSCW Drums Kit 1 Samples/Kick-V11-Yamaha-16x16.wav", null],
    ["GSCW Drums Kit 1 Samples/Kick-V12-Yamaha-16x16.wav", null],
  ],
  snare: [
    ["GSCW Drums Kit 1 Samples/SNARE-V01-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V02-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V03-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V04-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V05-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V06-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V07-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V08-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V09-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V10-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V11-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V12-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V13-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V14-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V15-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V16-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V17-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V18-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V19-CustomWorks-6x13.wav", null],
    ["GSCW Drums Kit 1 Samples/SNARE-V20-CustomWorks-6x13.wav", null],
  ],
};

const sampleLibrary = {
  kick: {
    path: "GSCW Drums Kit 1 Samples/Kick-V12-Yamaha-16x16.wav",
    buffer: null, //placeholder for decoded audio data
  },
  snare: {
    path: "GSCW Drums Kit 1 Samples/SNARE-V20-CustomWorks-6x13.wav",
    buffer: null, //placeholder for decoded audio data
  },
  hihatClosed: {
    path: "GSCW Drums Kit 1 Samples/HHats-CL-V10-SABIAN-AAX.wav",
    buffer: null,
  },
  hihatOpen: {
    path: "GSCW Drums Kit 1 Samples/HHats-OP-V08-SABIAN-AAX.wav",
    buffer: null,
  },
  tom: {
    path: "GSCW Drums Kit 1 Samples/TOM13-V08-StarClassic-13x13.wav",
    buffer: null,
  },
};
// Create the Audio Context — this is the main control center for all audio operations
const soundCtx = new AudioContext();

// Create a GainNode — this will control the overall volume
const masterGain = soundCtx.createGain();
masterGain.gain.value = 1.0; // Set the master volume to full (1.0)

// Connect the master gain node to the audio output (speakers or headphones)
masterGain.connect(soundCtx.destination);

/**
 *
 * @param {String} buff
 */
const play = function (buff) {
  let source = soundCtx.createBufferSource();
  source.onended = () => {
    source.disconnect();
    source = null;
  };

  // Attach the decoded audio data to the source node
  source.buffer = sampleLibrary[buff].buffer;

  // Connect the audio source to the master gain (volume control)
  source.connect(masterGain);

  // Start playing the audio immediately
  source.start();
};

const playOther = function (buff) {
  let source = soundCtx.createBufferSource();
  source.onended = () => {
    source.disconnect();
    source = null;
  };

  // Attach the decoded audio data to the source node

  let rando = Math.floor(Math.random() * otherSamples[buff].length);
  source.buffer = otherSamples[buff][rando][1];

  // Connect the audio source to the master gain (volume control)
  source.connect(masterGain);

  // Start playing the audio immediately
  source.start();
};

/**
 *
 * @param {String}path
 * @returns {Promise<AudioBuffer>}
 */
const loadBuffer = async function (path) {
  // Fetch the audio file — returns a Promise, so we await its completion
  const file = await fetch(path);

  // Convert the fetched file into an ArrayBuffer (raw binary data)
  // Await because this operation takes time
  const arrayBuffer = await file.arrayBuffer();

  // Decode the ArrayBuffer into an audio buffer that Web Audio can use
  // Await because decoding also takes time
  return await soundCtx.decodeAudioData(arrayBuffer);
};

for (let inst in otherSamples) {
  otherSamples[inst].forEach(async (singleSamp) => {
    singleSamp[1] = await loadBuffer(singleSamp[0]);

    console.log(singleSamp);
  });
}

for (let inst in sampleLibrary) {
  sampleLibrary[inst].buffer = await loadBuffer(sampleLibrary[inst].path);

  //   let p = sampleLibrary[inst].path;
  //   let audio = await loadBuffer(p);
  //   sampleLibrary[inst].buffer = audio;
}

console.log(sampleLibrary);

// Add a click event listener to the "start" button
// When clicked, it runs loadPlayAudio() to fetch, decode, and play the sound
document.getElementById("kick").addEventListener("mousedown", () => {
  play("kick");
});

// Add a click event listener to the "stop" button
// When clicked, it runs stopAudio() to stop the sound
document.getElementById("snare").addEventListener("mousedown", () => {
  play("snare");
});

/**
 * @event keydown
 * @description Listens for keydown events and starts a note if the key is mapped.
 */
document.addEventListener("keydown", (e) => {
  if (!e.repeat) {
    let key = e.key.toLowerCase();
    switch (key) {
      case "a":
        playOther("kick");
        break;
      case "w":
        break;
      case "s":
        playOther("snare");

        break;
      case "d":
        break;
      case "f":
        play("tom");
        break;
      case "t":
        play("hihatClosed");
        break;
      case "g":
        break;
      case "y":
        play("hihatOpen");
        break;
      case "h":
        break;
      case "u":
        break;
      case "j":
        break;
      case "k":
        break;
      case "o":
        break;
      case "l":
        break;
      case "p":
        break;
      case ";":
        break;
    }
  }
});
