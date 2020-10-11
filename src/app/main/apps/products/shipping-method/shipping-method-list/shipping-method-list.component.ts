import {Component, OnInit} from '@angular/core';
import {ShippingMethodService} from "../../../../shared/services/shipping-method/shipping-method.service";
import {fuseAnimations} from "../../../../../../@fuse/animations";

@Component({
    selector: 'app-shipping-method-list',
    templateUrl: './shipping-method-list.component.html',
    styleUrls: ['./shipping-method-list.component.scss'],
    animations: fuseAnimations,
})
export class ShippingMethodListComponent implements OnInit {

    gridData: any[];
    displayedColumns = ['name', 'image'];

    constructor(
        private shippingMethodService: ShippingMethodService) {
    }

    ngOnInit(): void {
        this.shippingMethodService.getAll().subscribe(data => this.gridData = data);
    }
}
