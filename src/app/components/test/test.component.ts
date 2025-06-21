import { Component } from '@angular/core';
import { ActivatedRoute,RouterOutlet } from '@angular/router';
import { ListartestComponent } from './listartest/listartest.component';

@Component({
  selector: 'app-test',
  imports: [RouterOutlet, ListartestComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
 constructor(public route:ActivatedRoute){}

}
