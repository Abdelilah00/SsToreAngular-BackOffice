import {TestBed} from '@angular/core/testing';

import {WareHouseService} from './ware-house.service';

describe('WareHouseService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: WareHouseService = TestBed.get(WareHouseService);
        expect(service).toBeTruthy();
    });
});
