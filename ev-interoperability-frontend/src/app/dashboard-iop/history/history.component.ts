// history.component.ts
import { Component, OnInit } from '@angular/core';
import { Histories } from 'src/app/models/histories.model';
import { HistoryService } from 'src/app/services/history-service/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  historyEntries: any[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit() {
    this.fetchHistoryEntries();
  }

  fetchHistoryEntries() {
    this.historyService.getHistory().subscribe(
      (response: any) => {
        // Ensure 'history' property exists in the response
        if (response.history && Array.isArray(response.history)) {
          this.historyEntries = response.history;
        } else {
          console.error('Invalid history response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching history:', error);
      }
    );
  }
}
