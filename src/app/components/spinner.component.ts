import { Component } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [SharedModule],
  styles: ``,
  template: `<div class="inline-block animate-spin pl-3 pr-3 transition-all opacity-100 duration-500 delay-300">
  🌀
</div>`,
})
export class SpinnerComponent {

}