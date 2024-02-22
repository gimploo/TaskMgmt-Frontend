import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterMessage, ToasterConfig } from '../../services/toaster/toaster.service';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent implements OnInit {

  config: ToasterConfig;
  visibility: string;

  constructor(private toasterService: ToasterService) 
  { 
    this.config = {
      title: "Title",
      bgcolor: "black",
      message: "Message"
    }

    this.visibility = 'hidden';
  }

  private _setupToasterConfig(data: ToasterMessage)
  {
    switch(data.type.toLowerCase())
    {
      case 'success':
        this.config.title = 'Success';
        this.config.message = data.content;
        this.config.bgcolor = 'lightgreen';
        this._toggleVisibility();
      break;

      case 'error':
        this.config.title = 'Error';
        this.config.message = data.content;
        this.config.bgcolor = 'lightcoral';
        this._toggleVisibility();
      break;

      case 'unauthorized':
        this.config.title = 'Unauthorized';
        this.config.message = data.content;
        this.config.bgcolor = 'red';
        this._toggleVisibility();
      break;

      default:
      break;
    }
  }

  private _toggleVisibility()
  {
    this.visibility = 'visible';
    setTimeout(() => {
      this.visibility = 'hidden';
    }, 3000);
  }

  public ngOnInit(): void 
  {
    this.toasterService.message.subscribe(data => {
      console.log(data);
      this._setupToasterConfig(data);
    })
  }

}
