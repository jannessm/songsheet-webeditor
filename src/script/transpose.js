// Author Nils Rösel 2018

//chord => character root note; + or - dif half tone steps
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
    const chordMatcher =
        new RegExp('\\[[abcdefghABCDEFGH]#?[a-zA-Z#/ ]*?\\]', 'gui')
            .exec(text);
    chordMatcher.map(chord => {
        console.log(chord)
        // Get chord root
        const rootMatcher = new RegExp('\[[abcdefghABCDEFGH]#?', 'gui').exec(chord);
        const root = rootMatcher ?
            transposeNote(rootMatcher[0].replace('[', ''), dif) : '';
        // Get base root in the chord
        const baseMatcher = new RegExp('\/[abcdefghABCDEFGH]#?').exec(chord);
        const base = baseMatcher
            ? transposeNote(baseMatcher[0].replace('/', ''), dif) : '';

        // Get chord extension -> replace notes with empty string
        const noExtension =
            new RegExp('/[abcdefghABCDEFGH]#?|\\[[abcdefghABCDEFGH]#?', 'gui').exec(chord);
        let extString = chord;
        if (noExtension != null) {
            noExtension.forEach(match => extString = extString.replace(match, ''))
        }
        // Assemble transposed chord
        const targetChord = root + extString + base + alreadyTransposedKey;
        console.log(targetChord)
        return TransposedChordMap(chord, targetChord);
    }).forEach(chordMapItem =>
        text.replace(chordMapItem.origin, chordMapItem.target)
        );
    text.replace(alreadyTransposedKey, '');
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

const test = "testhallo[Cmaj7][Gmaj7]";
console.log(test);
console.log(transposer(test, 5))