import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent {
  router = inject(Router);
  goHome():void{
    this.router.navigate(['dashboard']);
  }
}
