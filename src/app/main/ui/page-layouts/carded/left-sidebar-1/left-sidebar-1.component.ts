import {Component} from '@angular/core';

import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';

@Component({
    selector: 'carded-left-sidebar-1',
    templateUrl: './left-sidebar-1.component.html',
    styleUrls: ['./left-sidebar-1.component.scss']
})
export class CardedLeftSidebar1Component {
    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
