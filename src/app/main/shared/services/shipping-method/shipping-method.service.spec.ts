import {TestBed} from '@angular/core/testing';

import {ShippingMethodService} from './shipping-method.service';

describe('ShippingMethodService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ShippingMethodService = TestBed.get(ShippingMethodService);
        expect(service).toBeTruthy();
    });
});
