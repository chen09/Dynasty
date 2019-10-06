import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../common.service';
import { Location } from '@angular/common';
import {Language} from '../../language.enum';

@Component({
    selector: 'app-language',
    templateUrl: './language.page.html',
    styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
    keys = Object.keys;
    language = Language;
    selected;

    constructor(private commonService: CommonService, private location: Location) {
    }

    ngOnInit() {
        this.selected = this.commonService.language;
    }

    save() {
        this.commonService.language = this.selected;
        this.location.back();
    }

    setLanguage(item) {
        this.selected = item;
    }
}
