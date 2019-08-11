const music_file = ['music/shrine_of_light.m4a', 'music/you_are_not_alone.m4a',
                    'music/i_need_your_love.m4a']
let music = new Array()
let song

function preload() {
    music[0] = loadSound(music_file[0])
    music[1] = loadSound(music_file[1])
    music[2] = loadSound(music_file[2])

    song = music[2]
}

function play_music(id) {
    let next = music[id]

    if (song != next) {
        song.stop()
        song = next
    }

    song.playMode('restart')
    song.play()
}

// usage:
//    song = loadSound(song, loaded)
//
// function loaded() {
//     song.play()
// }

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms))
// }

function setup()
{
    let cnv = createCanvas(150, 50)
    noFill()
    // let x = (windowWidth - width) / 2;
    // let y = (windowHeight - height) / 2;
    cnv.parent('vz');
    cnv.mouseClicked(togglePlay)
    fft = new p5.FFT()
    song.amp(0.8)
    frameRate(30)
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function draw()
{
    background(30, 30, 45)


    // let spectrum = fft.analyze();
    // noStroke();
    // fill(0,255,0); // spectrum is green
    // for (let i = 0; i< spectrum.length; i++){
    //   let x = map(i, 0, spectrum.length, 0, width);
    //   let h = -height + map(spectrum[i], 0, 255, height, 0);
    //   rect(x, height, width / spectrum.length, h )
    // }

    let waveform = fft.waveform()

    stroke(255, 255, 255) // waveform is red
    strokeWeight(2)
    beginShape()
    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width)
        let y = map(waveform[i], -1, 1, 0, height)
        vertex(x, y)
    }
    endShape()

    // text('click to play / pause', 4, 10);
}

// fade song if mouse is over canvas
function togglePlay()
{
    if (song.isPlaying()) {
        song.pause()
    } else {
        song.play()
    }
}
