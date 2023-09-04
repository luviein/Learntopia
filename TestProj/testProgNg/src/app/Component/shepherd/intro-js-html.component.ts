import { Component } from '@angular/core';
import { steps as defaultSteps, defaultStepOptions} from './data';
import { ShepherdService } from 'src/app/Service/shepherd-service.service';


@Component({
  selector: 'app-intro-js-html',
  templateUrl: './intro-js-html.component.html',
  styleUrls: ['./intro-js-html.component.css']
})
export class IntroJsHtmlComponent {
  constructor(private svc: ShepherdService) { }

  ngAfterViewInit() {
    this.svc.defaultStepOptions = defaultStepOptions;
    this.svc.modal = true;
    this.svc.confirmCancel = false;
    this.svc.addSteps(defaultSteps);
    this.svc.start();
  }
}
