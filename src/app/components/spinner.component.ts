import { Component } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [SharedModule],
  template: `<div
  style="
    display: inline-block;
    animation: spin 1s linear infinite;
    padding-left: 12px;
    padding-right: 12px;
    transition: all 0.5s;
    opacity: 1;
    transition-duration: 0.5s;
    transition-delay: 0.3s;
  "
>
  🌀
</div>
<style>
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
</style>`,
})
export class SpinnerComponent {

}