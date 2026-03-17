import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PanelChat } from './panel-chat/panel-chat';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PanelChat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tif-curso-angular');
}
