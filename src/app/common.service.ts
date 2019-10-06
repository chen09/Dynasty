import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    public languageSubject = new Subject<string>();
    public languageState = this.languageSubject.asObservable();

    get language() {
        const lang = localStorage.getItem('language');
        return lang == null ? 'zh' : lang;
    }

    set language(value) {
        localStorage.setItem('language', value);
        this.languageSubject.next(value);
    }

    constructor() {
    }

}
