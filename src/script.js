let volume = 0.5;

const heater1 = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/BLAST.wav'], volume });
const heater2 = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/HORN1.wav'], volume });
const heater3 = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/HORN2.wav'], volume });
const heater4 = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/PAD1.wav'], volume });
const clap = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/closed.WAV'], volume });
const openHH = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/PAD2.wav'], volume });
const kicknHat = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/kick.WAV'], volume });
const kick = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/snare.WAV'], volume });
const closedHH = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/open.WAV'], volume });


const chord1 = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/chord1.wav'], volume });
const chord2 = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/chord2.wav'], volume });
const lick = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/lick.wav'], volume });
const closeSeven = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/ClosedHH%207Mile.wav'], volume });
const clapSeven = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/Clap%207Mile.wav'], volume });
const kickSeven = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/Kick2.wav'], volume });
const snareSeven = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/Snare%207Mile%201.wav'], volume });
const openSeven = new Howl({ src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/OpenHH.wav'], volume });

const sounds = [
  heater1, heater2, heater3, heater4, clap, openHH, kicknHat, kick, closedHH,
  chord1, chord2, lick, closeSeven, clapSeven, kickSeven, snareSeven, openSeven
];

function changeVolume(value) {
  volume = value;
  sounds.forEach(sound => sound.volume(volume));
}

$("#volume-slider").on("input", function() {
  changeVolume(this.value / 100);
});

let isOn = false;
let currentBank = 1;

let padObject = {
  Q: { sound: heater1, name: 'Heater 1' },
  W: { sound: heater2, name: 'Heater 2' },
  E: { sound: heater3, name: 'Heater 3' },
  A: { sound: heater4, name: 'Heater 4' },
  S: { sound: clap, name: 'Clap' },
  D: { sound: openHH, name: 'Open HH' },
  Z: { sound: kicknHat, name: 'Kick n\' Hat' },
  X: { sound: kick, name: 'Kick' },
  C: { sound: closedHH, name: 'Closed HH' }
};

const playSound = (padKey) => {
  if (isOn) {
    const pad = padObject[padKey];
    if (pad) {
      pad.sound.play();
      $('#display .display-text').text(pad.name);
      $(`#${padKey}`).addClass('pressed');
      setTimeout(() => {
        $(`#${padKey}`).removeClass('pressed');
      }, 100);
    }
  }
};

$('.drum-pad').click(function() {
  playSound(this.id);
});

$(document).keydown(function(event) {
  const padKey = String.fromCharCode(event.keyCode);
  if (padObject.hasOwnProperty(padKey)) {
    playSound(padKey);
  }
});

$(".power-switch").click(function() {
  const input = $(this).find('input');
  input.prop('checked', !input.prop('checked'));

  isOn = input.prop('checked');

  if (isOn) {
    $('#display .display-text').text("FCC (β)");
  } else {
    $('#display .display-text').text("");
  }
});

$(".bank-switch").click(function() {
  const input = $(this).find('input');
  input.prop('checked', !input.prop('checked'));

  currentBank = currentBank === 1 ? 2 : 1;

  if (currentBank === 1) {
    padObject = {
      Q: { sound: heater1, name: 'Heater 1' },
      W: { sound: heater2, name: 'Heater 2' },
      E: { sound: heater3, name: 'Heater 3' },
      A: { sound: heater4, name: 'Heater 4' },
      S: { sound: clap, name: 'Clap' },
      D: { sound: openHH, name: 'Open HH' },
      Z: { sound: kicknHat, name: 'Kick n\' Hat' },
      X: { sound: kick, name: 'Kick' },
      C: { sound: closedHH, name: 'Closed HH' }
    };
  } else {
    padObject = {
      Q: { sound: chord1, name: 'Chord 1' },
      W: { sound: chord2, name: 'Chord 2' },
      E: { sound: lick, name: 'Lick' },
      A: { sound: heater4, name: 'Heater 4' },
      S: { sound: closeSeven, name: 'Closed HH 7' },
      D: { sound: clapSeven, name: 'Clap 7' },
      Z: { sound: kickSeven, name: 'Kick 7' },
      X: { sound: snareSeven, name: 'Snare 7' },
      C: { sound: openSeven, name: 'Open HH 7' }
    };
  }
});