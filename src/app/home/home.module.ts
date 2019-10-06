import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {HomePage} from './home.page';
import {PaintComponent} from './paint/paint.component';
import {CanvasDrawComponent} from './canvas-draw/canvas-draw.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            },
            {
                path: 'paint',
                component: PaintComponent
            },
            {
                path: 'canvas-draw',
                component: CanvasDrawComponent
            }

        ])
    ],
    declarations: [HomePage, PaintComponent, CanvasDrawComponent]
})
export class HomePageModule {
}
