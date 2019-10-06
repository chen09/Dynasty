import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {PaintService} from './paint.service';
import {fromEvent} from 'rxjs';
import {mergeMap, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-paint',
    templateUrl: './paint.component.html',
    styleUrls: ['./paint.component.scss'],
})
export class PaintComponent implements OnInit, AfterViewInit {

    constructor(private paintSvc: PaintService, private elRef: ElementRef) {
    }

    ngOnInit() {
        console.log(this.elRef);
        this.paintSvc.initialize(this.elRef.nativeElement);
        this.startPainting();
    }

    ngAfterViewInit() {

    }

    private startPainting() {
        const {nativeElement} = this.elRef;
        const canvas = nativeElement.querySelector('canvas') as HTMLCanvasElement;
        const move$ = fromEvent<MouseEvent>(canvas, 'mousemove');
        const down$ = fromEvent<MouseEvent>(canvas, 'mousedown');
        const up$ = fromEvent<MouseEvent>(canvas, 'mouseup');
        const paints$ = down$.pipe(
            mergeMap(down => move$.pipe(takeUntil(up$)))
            // mergeMap(down => move$)
        );

        // tslint:disable-next-line:no-console
        down$.subscribe(console.info);

        const offset = getOffset(canvas);

        paints$.subscribe((event) => {
            const clientX = event.clientX - offset.left;
            const clientY = event.clientY - offset.top;
            this.paintSvc.paint({clientX, clientY});
        });
    }

}

function getOffset(el: HTMLElement) {
    const rect = el.getBoundingClientRect();

    return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
    };
}
