import { Component, OnInit } from '@angular/core';
import { MessageService } from '@app/services/custom/messages/message.service';

@Component({
  selector: 'app-overview-games-config',
  templateUrl: './overview-games-config.component.html',
  styleUrls: ['./overview-games-config.component.less']
})
export class OverviewGamesConfigComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.clearAll();
  }

}
