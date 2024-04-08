import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-template',
  standalone: true,
  imports: [],
  templateUrl: './account-template.component.html',
  styleUrl: './account-template.component.css'
})
export class AccountTemplateComponent {
  @Input() title:string ='';
}
