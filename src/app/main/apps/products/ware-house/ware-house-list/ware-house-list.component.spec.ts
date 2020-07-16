import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WareHouseListComponent} from './ware-house-list.component';

describe('WareHouseListComponent', () => {
    let component: WareHouseListComponent;
    let fixture: ComponentFixture<WareHouseListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WareHouseListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WareHouseListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
