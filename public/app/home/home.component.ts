import { Component } from '@angular/core'
import { AuthenticationService } from './../../authentication/authentication.service'

@Component({
    selector: 'home',
    templateUrl: './app/home/home.template.ts'
})

export class HomeComponent {
    user: any

    constructor(private _authService: AuthenticationService){
        this.user = _authService.user
    }
}