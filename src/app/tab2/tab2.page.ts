import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import { Chart } from 'chart.js';


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    @ViewChild('barChart') barChart;
    bars: any;
    constructor(private dataService: DataService) {
    }
    public data = [];
    countryNumber = 0;
    countryName = '';

    ngOnInit() {
        this.dataService.getTotal().subscribe((response: Summary) => {
            this.data = response.Countries;
            console.log(this.data);
        });
    }
    ionChange(event) {
        console.log(event.detail.value);
        this.countryName = event.detail.value;
        this.getCountry();
    }

    getCountry() {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].Country === this.countryName) {
                this.countryNumber = i;
                this.createBarChart();
            }
        }
    }
    createBarChart() {
        this.bars = new Chart(this.barChart.nativeElement, {
            type: 'doughnut',
            data: {
                labels: ['Totaal nieuwe gevallen', 'Totale gevallen', 'Totaal genezen'],
                datasets: [{
                    label: 'Corona gevallen',
                    data: [this.data[this.countryNumber].NewConfirmed, this.data[this.countryNumber].TotalConfirmed, this.data[this.countryNumber].TotalRecovered],
                    backgroundColor: 'rgb(255, 55, 64)',
                    borderColor: 'rgb(255, 0, 0)',
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
}

interface Summary {
    Countries: object[];
    Date: string;
}


