import {Component, ViewChild, OnInit, ElementRef, AfterViewInit, Renderer2} from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-canvas-draw',
    templateUrl: './canvas-draw.component.html',
    styleUrls: ['./canvas-draw.component.scss'],
})
export class CanvasDrawComponent implements OnInit, AfterViewInit {

    // @ts-ignore
    @ViewChild('myCanvas') canvas: ElementRef;

    canvasElement: any;

    constructor(public platform: Platform, public renderer2: Renderer2) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {

        this.canvasElement = this.canvas.nativeElement;
        // console.log(this.canvasElement);
        console.log(this.platform.width());
        console.log(this.platform.height());
        this.renderer2.setAttribute(this.canvasElement, 'width', this.platform.width() + '');
        this.renderer2.setAttribute(this.canvasElement, 'height', this.platform.height() + '');
    }

    handleStart($event) {
        console.log($event);

    }

    handleMove($event) {
        console.log($event);
    }

    handleEnd($event) {
        console.log($event);
    }
}
