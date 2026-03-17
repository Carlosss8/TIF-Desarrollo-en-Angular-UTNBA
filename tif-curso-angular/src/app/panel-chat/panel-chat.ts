import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-panel-chat',
  imports: [MatSidenavModule, MatToolbarModule, MatListModule],
  templateUrl: './panel-chat.html',
  styleUrl: './panel-chat.css',
})
export class PanelChat { }
