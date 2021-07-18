import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CoreValidators {
    static counters(minimumChars: number, minimumWords: number): ValidatorFn {
        return (ctrl: AbstractControl) => {
            let val: string = '';
            if ((ctrl) && (typeof (ctrl.value) === 'string'))
                val = <string>ctrl.value;

            const chars = val.length;
            const words = val.split(' ').filter(s => s).length;

            if ((chars >= minimumChars) && (words >= minimumWords)) return null;
            return {
                counters: {
                    requiredChars: minimumChars,
                    chars: chars,
                    requiredWords: minimumWords,
                    words: words
                }
            }
        }
    }
}