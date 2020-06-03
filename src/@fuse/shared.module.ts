import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {FlexLayoutModule} from '@angular/flex-layout';

import {FuseDirectivesModule} from '@fuse/directives/directives';
import {FusePipesModule} from '@fuse/pipes/pipes.module';
import {MatFileUploadModule} from 'angular-material-fileupload';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule,
        MatFileUploadModule,
    ]
})
export class FuseSharedModule {
}
