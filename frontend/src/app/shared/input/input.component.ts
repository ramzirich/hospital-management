import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements ControlValueAccessor{
  @Input() type= "text";
  @Input() label: string="";

  constructor(@Self() public controlDir:NgControl ){
    this.controlDir.valueAccessor = this;
  }

  writeValue(obj: any): void {   
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  get control():FormControl{
    return this.controlDir.control as FormControl;
  }
  
}


