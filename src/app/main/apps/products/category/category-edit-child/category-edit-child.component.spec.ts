import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoryEditChildComponent} from './category-edit-child.component';

describe('CategoryEditChildComponent', () => {
    let component: CategoryEditChildComponent;
    let fixture: ComponentFixture<CategoryEditChildComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CategoryEditChildComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryEditChildComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
