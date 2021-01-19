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
    public savedCountrys = [];
    countryNumber = 0;
    countryName = '';
    msg = "";
    error= ""
    ngOnInit() {
        this.dataService.getTotal().subscribe((response: Summary) => {
            this.data = response.Countries;
            console.log(this.data);
        });
        this.savedCountrys = this.getSavedCountry()
    }

    getland(land){
        this.countryName = land
        this.getCountry()
    }

    saveLand(countryName) {
        let saveCountrie = [];

        if(localStorage.getItem('country')){
            saveCountrie = this.getSavedCountry();
        }

        console.log(saveCountrie);
        if(saveCountrie.includes(countryName)){
            this.error = "Land is al opgeslagen"
        }else
        { saveCountrie.push(
            countryName
        );

            this.msg = "land toegevoegd"
            localStorage.setItem('country', JSON.stringify(saveCountrie))
            this.savedCountrys = this.getSavedCountry()
        }
    }
    getSavedCountry() {
        let ls = localStorage.getItem('country');

        let arrayLS = [];
        arrayLS = JSON.parse(ls);

        return arrayLS;
    }
    ionChange(event) {
        console.log(event.detail.value);
        this.countryName = event.detail.value;
        this.getCountry();
    }

    getCountry() {
        this.error = "";
        this.msg = "";
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].Country === this.countryName) {
                this.countryNumber = i;
                this.createBarChart();
            }
        }
    }
    createBarChart() {
        this.bars = new Chart(this.barChart.nativeElement, {
            type: 'bar',
            data: {
                labels: ['Totaal nieuwe gevallen', 'Totale gevallen', 'Totaal genezen'],
                datasets: [{
                    label: 'Corona gevallen',
                    data: [this.data[this.countryNumber].NewConfirmed, this.data[this.countryNumber].TotalConfirmed, this.data[this.countryNumber].TotalRecovered],
                    backgroundColor: ["#f54242", "#42f560", "#4272f5"],
                    borderColor: 'rgb(0, 0, 0)',
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