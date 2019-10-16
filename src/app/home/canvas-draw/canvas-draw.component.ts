import {Component, ViewChild, OnInit, ElementRef, AfterViewInit, Renderer2} from '@angular/core';
import {Platform} from '@ionic/angular';
import {compilerSetStylingMode} from '@angular/compiler/src/render3/view/styling_state';

@Component({
    selector: 'app-canvas-draw',
    templateUrl: './canvas-draw.component.html',
    styleUrls: ['./canvas-draw.component.scss'],
})
export class CanvasDrawComponent implements OnInit, AfterViewInit {

    // @ts-ignore
    @ViewChild('myCanvas') canvas: ElementRef;

    htmlCanvasElement: HTMLCanvasElement;
    canvasElement: any;
    lastX: number;
    lastY: number;

    constructor(public platform: Platform, public renderer2: Renderer2, private elRef: ElementRef) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {

        const {nativeElement} = this.elRef;
        this.htmlCanvasElement = nativeElement.querySelector('canvas') as HTMLCanvasElement;

        this.canvasElement = this.canvas.nativeElement;

        console.log('width:' + this.platform.width());
        console.log('height:' + this.platform.height());

        const offset = getOffset(this.htmlCanvasElement);
        console.log(offset);

        this.renderer2.setAttribute(this.canvasElement, 'width', this.platform.width() - offset.left + '');
        this.renderer2.setAttribute(this.canvasElement, 'height', this.platform.height() - offset.top + '');

        // this.canvas.width = mountPoint.offsetWidth;
        // this.canvas.height = mountPoint.offsetHeight;

        // this.ctx = this.canvas.getContext('2d');
        // this.canvas.width = mountPoint.offsetWidth;
        // this.canvas.height = mountPoint.offsetHeight;
        // this.ctx.lineJoin = 'round';
        // this.ctx.lineCap = 'round';
        // this.ctx.lineWidth = 30;


        // console.log(this.canvasElement);

        // console.log(this.platform.width());
        // console.log(this.platform.height());
        // this.renderer2.setAttribute(this.canvasElement, 'width', this.platform.width() + '');
        // this.renderer2.setAttribute(this.canvasElement, 'height', this.platform.height() + '');
    }

    handleStart($event) {
        // console.log($event);
        this.lastX = $event.touches[0].pageX;
        this.lastY = $event.touches[0].pageY;


        // tslint:disable-next-line:max-line-length
        // console.log('dX:' + ($event.touches[0].pageX - $event.touches[0].screenX) + '\tdY:' + ($event.touches[0].pageY - $event.touches[0].screenY));
    }

    handleMove($event) {
        // console.log($event);

        const ctx = this.canvasElement.getContext('2d');
        ctx.beginPath();
        const offset = getOffset(this.htmlCanvasElement);

        ctx.moveTo(this.lastX - offset.left, this.lastY - offset.top);
        ctx.lineTo($event.touches[0].pageX - offset.left, $event.touches[0].pageY - offset.top);

        ctx.closePath();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 5;
        ctx.stroke();

        this.lastX = $event.touches[0].pageX;
        this.lastY = $event.touches[0].pageY;

        // console.log('x:' + this.lastX + '\ty:' + this.lastY);
        // console.log('screenX:' + $event.touches[0].screenX + '\tscreenY:' + $event.touches[0].screenY);
        // // tslint:disable-next-line:max-line-length
        // console.log('dX:' + ($event.touches[0].pageX - $event.touches[0].screenX) + '\tdY:' + ($event.touches[0].pageY - $event.touches[0].screenY));
    }

    handleEnd($event) {
        // console.log($event);
    }

    clear() {
        const ctx = this.canvasElement.getContext('2d');
        console.log(ctx);
        // ctx.beginPath();
        ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    }

    check() {
        const dataURL = this.htmlCanvasElement.toDataURL();
        console.log(dataURL);
    }
}

function getOffset(el: HTMLElement) {
    const rect = el.getBoundingClientRect();

    return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
    };
}
