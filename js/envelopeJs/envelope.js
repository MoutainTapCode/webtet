const envelopes = [
  {
    img: "../imgs/money/500k.jpg",
    message: "Bạn nhận được 500000 Đồng!",
    audio: "../audio/crowd_clap.mp3",
    reward: 500000,
  },
  {
    img: "../imgs/money/200k.jpg",
    message: "Bạn nhận được 200000 Đồng!",
    audio: "../audio/crowd_clap.mp3",
    reward: 200000,
  },
  {
    img: "../imgs/money/100k.jpg",
    message: "Bạn nhận được 100000 Đồng!",
    audio: "../audio/crowd_clap.mp3",
    reward: 100000,
  },
  {
    img: "../imgs/money/50k.jpg",
    message: "Bạn nhận được 50000 Đồng!",
    audio: "../audio/crowd_clap.mp3",
    reward: 50000,
  },
  {
    img: "../imgs/money/20k.jpg",
    message: "Bạn nhận được 20000 Đồng!",
    audio: "../audio/crowd_clap.mp3",
    reward: 20000,
  },
  {
    img: "../imgs/money/10k.jpg",
    message: "Bạn nhận được 10000 Đồng!",
    audio: "../audio/crowd_clap.mp3",
    reward: 10000,
  },
  {
    img: "../imgs/money/5k.jpg",
    message: "Bạn nhận được 5000 Đồng!",
    audio: "../audio/Sad Meow.mp3",
    reward: 5000,
  },
  {
    img: "../imgs/money/2k.jpg",
    message: "Bạn nhận được 2000 Đồng!",
    audio: "../audio/Sad Meow.mp3",
    reward: 2000,
  },
  {
    img: "../imgs/money/1k.jpg",
    message: "Bạn nhận được 1000 Đồng!",
    audio: "../audio/Sad Meow.mp3",
    reward: 1000,
  },
  {
    img: "../imgs/money/5d.jpg",
    message: "Bạn nhận được 500 VNĐ!",
    audio: "../audio/Sad Meow.mp3",
    reward: 500,
  },
  {
    img: "../imgs/money/nit.jpg",
    message: "Còn cái Nịt!",
    audio: "../audio/Cai_Nit.mp3",
    reward: 0,
  },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateEnvelopes() {
  const container = document.getElementById("envelopeContainer");
  container.innerHTML = "";

  const shuffledEnvelopes = shuffleArray([...envelopes]).slice(0, 6);

  shuffledEnvelopes.forEach((envelope, index) => {
    const col = document.createElement("div");
    col.className = "col-md-4 col-lg-4 d-flex justify-content-center";

    col.innerHTML = `
      <div class="envelope-card text-center" id="envelope-${index}">
        <img src="../imgs/red_envelope.png" alt="Envelope ${
          index + 1
        }" class="envelope-img" onclick="openEnvelope(${index})">
      </div>
    `;
    container.appendChild(col);
  });

  window.shuffledEnvelopes = shuffledEnvelopes;
}

function disableEnvelopes() {
  const envelopeElements = document.querySelectorAll(".envelope-card img");
  envelopeElements.forEach((img) => {
    img.onclick = null;
    img.style.cursor = "not-allowed";
  });
}

let envelopeOpened = false;

function openEnvelope(index) {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const shuffledEnvelopes = window.shuffledEnvelopes || [];
  const envelopeData = shuffledEnvelopes[index];
  if (!envelopeData) {
    console.error("Envelope data not found!");
    return;
  }

  const envelopeElement = document
    .getElementById(`envelope-${index}`)
    ?.querySelector("img");
  if (envelopeElement) {
    envelopeElement.src = envelopeData.img;
  }

  const modalImage = document.getElementById("modalImage");
  const messageElement = document.getElementById("modalMessage");
  if (modalImage && messageElement) {
    modalImage.src = envelopeData.img;
    messageElement.innerText = envelopeData.message;
    messageElement.classList.add("animated-message");
    messageElement.setAttribute("data-reward", envelopeData.reward || "N/A");
  }

  if (envelopeData.audio?.includes("crowd_clap")) {
    triggerConfetti();
  }

  if (envelopeData.audio) {
    const audio = new Audio(envelopeData.audio);
    audio.play().catch((err) => console.error("Audio playback failed:", err));
  }

  const modal = new bootstrap.Modal(document.getElementById("envelopeModal"));
  modal.show();

  disableEnvelopes();
}

function disableEnvelopes() {
  const envelopeButtons = document.querySelectorAll(".envelope");
  envelopeButtons.forEach((button) => {
    button.setAttribute("disabled", "true");
  });
}

function preloadImages() {
  envelopes.forEach((envelope) => {
    const img = new Image();
    img.src = envelope.img;
  });
}

function triggerConfetti() {
  const confettiCanvas = document.getElementById("confettiCanvas");
  confettiCanvas.confetti =
    confettiCanvas.confetti ||
    confetti.create(confettiCanvas, { resize: true });
  confettiCanvas.confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

window.onload = () => {
  preloadImages();
  const clapSound = document.getElementById("clap");
  const sadSound = document.getElementById("sad");
  const nitSound = document.getElementById("nit");
  clapSound.load();
  sadSound.load();
  nitSound.load();
  generateEnvelopes();
};
