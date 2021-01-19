import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    @ViewChild('barChart') barChart;
    constructor(private dataService: DataService) {
    }

    public data: SummaryData;
    public totalConfirmed = 0;
    public totalDeaths = 0;
    public totalRecovered = 0;
    bars: any;

    ngOnInit() {
        this.dataService.getTotal().subscribe((response: Summary) => {
            this.data = response.Global;
            this.dataSplit();
            this.createChart('doughnut');
        });
    }
    createChart(Type) {
        this.bars = new Chart(this.barChart.nativeElement, {
            type: Type,
            data: {
                labels: ['Totaal gevallen', 'Totaal dood', 'Totaal genezen'],
                datasets: [{
                    label: 'Corona gevallen',
                    data: [this.data.TotalConfirmed, this.data.TotalDeaths, this.data.TotalRecovered],
                    backgroundColor: ["#f54242", "#42f560", "#4272f5"],
                    borderColor: '#f000000',
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    private dataSplit() {
        this.totalConfirmed = this.data.TotalConfirmed;
        this.totalDeaths = this.data.TotalDeaths;
        this.totalRecovered = this.data.TotalRecovered;
    }


}
interface Summary {
    Countries: object[];
    Date: string;
    Global: SummaryData;
}

interface SummaryData {
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
}
