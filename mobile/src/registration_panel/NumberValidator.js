function nip(nip) {
    if (typeof nip !== 'string') {
        return false;
    }

    const nipWithoutDashes = nip.replace(/-/g, '');
    const reg = /^[0-9]{10}$/;
    if (reg.test(nipWithoutDashes) === false) {
        return false;
    } else {

        const dig = ('' + nipWithoutDashes).split('');
        const control = (6 * parseInt(dig[0], 10) + 5 * parseInt(dig[1], 10) + 7 * parseInt(dig[2], 10) + 2 * parseInt(dig[3], 10) + 3 * parseInt(dig[4], 10) + 4 * parseInt(dig[5], 10) + 5 * parseInt(dig[6], 10) + 6 * parseInt(dig[7], 10) + 7 * parseInt(dig[8], 10)) % 11;
        if (parseInt(dig[9], 10) === control) {
            return true;
        } else {
            return false;
        }

    }
}

function regon(regon) {
    const reg = /^[0-9]{9}$/;
    if (reg.test(regon) === false) {
        return false;
    } else {

        const dig = ('' + regon).split('');
        let control = (8 * parseInt(dig[0], 10) + 9 * parseInt(dig[1], 10) + 2 * parseInt(dig[2], 10) + 3 * parseInt(dig[3], 10) + 4 * parseInt(dig[4], 10) + 5 * parseInt(dig[5], 10) + 6 * parseInt(dig[6], 10) + 7 * parseInt(dig[7], 10)) % 11;
        if (control === 10) {
            control = 0;
        }

        if (parseInt(dig[8], 10) === control) {
            return true;
        } else {
            return false;
        }

    } 
}

export {nip, regon};
