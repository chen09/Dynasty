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
    lastX: number;
    lastY: number;

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
        // console.log($event);
        this.lastX = $event.touches[0].pageX;
        this.lastY = $event.touches[0].pageY;
        console.log('x:' + this.lastX + '\ty:' + this.lastY);
        console.log('screenX:' + $event.touches[0].screenX + '\tscreenY:' + $event.touches[0].screenY);
        // tslint:disable-next-line:max-line-length
        console.log('dX:' + ($event.touches[0].pageX - $event.touches[0].screenX) + '\tdY:' + ($event.touches[0].pageY - $event.touches[0].screenY));
    }

    handleMove($event) {
        // console.log($event);

        const ctx = this.canvasElement.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo($event.touches[0].pageX, $event.touches[0].pageY);
        ctx.closePath();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 5;
        ctx.stroke();

        this.lastX = $event.touches[0].pageX;
        this.lastY = $event.touches[0].pageY;

        console.log('x:' + this.lastX + '\ty:' + this.lastY);
        console.log('screenX:' + $event.touches[0].screenX + '\tscreenY:' + $event.touches[0].screenY);
        // tslint:disable-next-line:max-line-length
        console.log('dX:' + ($event.touches[0].pageX - $event.touches[0].screenX) + '\tdY:' + ($event.touches[0].pageY - $event.touches[0].screenY));
    }

    handleEnd($event) {
        // console.log($event);
    }
}
