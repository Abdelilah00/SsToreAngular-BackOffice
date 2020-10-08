import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ShippedByGridComponent} from './shipped-by-grid.component';

describe('ShippedByGridComponent', () => {
    let component: ShippedByGridComponent;
    let fixture: ComponentFixture<ShippedByGridComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShippedByGridComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShippedByGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
