import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ShippingMethodListComponent} from './shipping-method-list.component';

describe('ShippingMethodListComponent', () => {
    let component: ShippingMethodListComponent;
    let fixture: ComponentFixture<ShippingMethodListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShippingMethodListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShippingMethodListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
