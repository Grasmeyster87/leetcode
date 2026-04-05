function judgeCircle(moves) {
    let x = 0,
        y = 0;

    for (let i = 0; i < moves.length; i++) {
        const code = moves.charCodeAt(i);

        if (code === 85)
            y++; // 'U'
        else if (code === 68)
            y--; // 'D'
        else if (code === 82)
            x++; // 'R'
        else if (code === 76) x--; // 'L'
    }

    return x === 0 && y === 0;
}
