const shell = require('shelljs');
const isMock = process.env.NODE_ENV !== 'production'

if (!shell.which('mkvmerge')) {
  shell.echo('Sorry, this script requires mkvmerge');
  shell.exit(1);
}

const exec = (command) => {
  const worker = isMock ? console.log.bind(console) : shell.exec.bind(shell)
  worker(command)
}

for (let i = 1; i <= 101; i++) {
  const num = ('000' + i).slice(-3)
  const outputFileName = `SlamDunk${num}.mkv`
  exec(`mkvmerge -o ../SlamDunk/${outputFileName} Slam\\ Dunk.1993.EP${num}.x264.AC3-CalChi.mkv --language 0:kor Slam\\ Dunk.1993.EP${num}.x264.AC3-CalChi.srt`)
}

