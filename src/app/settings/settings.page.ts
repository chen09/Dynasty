import {Component, OnInit} from '@angular/core';
import {CommonService} from '../common.service';
import {Language} from '../language.enum';

@Component({
    selector: 'app-settings',
    templateUrl: 'settings.page.html',
    styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {

    constructor(private commonService: CommonService) {

    }

    public currentLanguage;
    public currentLanguageString;

    ngOnInit() {
        this.currentLanguage = this.commonService.language;
        this.currentLanguageString = Language[this.currentLanguage];

        this.commonService.languageState.subscribe(
            (language: string) => {
                this.currentLanguage = language;
                this.currentLanguageString = Language[language];
            }
        );
    }

}
