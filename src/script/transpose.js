// Author Nils Rösel 2018

//chord => string like [Fmaj7] + or - dif half tone steps
function transposeNote(chord, dif) {
    const keys = CircularArray([
        ['C', 'D', 'E', 'F', 'G', 'A', 'H'],
        ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C'],
        ['D', 'E', 'F#', 'G', 'A', 'H', 'C#'],
        ['D#'],
        ['E'],
        ['F', 'G', 'A', 'A#', 'C', 'D', 'E'],
        ['F#'],
        ['G', 'A', 'H', 'C', 'D', 'E', 'F#'],
        ['G#'],
        ['A'],
        ['A#'],
        ['H']
    ]);
    const index = keys.map(key => key[0]).indexOf(chord)
    return keys.circle(index, dif)[0];
}
// Inputs text:string, dif:int :: Outputs modified Text 
function transposer(text, dif) {
    const alreadyTransposedKey = '--trspsd--';
    const chordMatcher = new RegExp('\[[a-z#0-9]*\]', 'gui').exec(text);
    chordMatcher.map(chord => {
        const targetChord = transpose(chord, dif) + alreadyTransposedKey;
        return TransposedChordMap(chord, targetChord);
    }).forEach(chordMapItem =>
        text.replaceAll(chordMapItem.origin, chordMapItem.target)
        );
    text.replaceAll(alreadyTransposedKey, '');
}

function TransposedChordMap(origin, target) {
    this.origin = origin;
    this.target = target;
    return this;
}

function CircularArray(target) {
    if (!target.length) return target;
    return Object.assign(target, {
        circle: (index, loopVal) => {
            let startIndex = index;
            for (i = loopVal; i !== 0; loopVal > 0 ? i-- : i++) {
                loopVal > 0 ? startIndex++ : startIndex--;
                if (startIndex === target.length) startIndex = 0;
                if (startIndex < 0) startIndex = target.length - 1;
            }
            return target[startIndex];
        }
    });
}
