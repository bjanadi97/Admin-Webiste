import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { getComponentViewByInstance } from '@angular/core/src/render3/context_discovery';
import {Color} from 'ng2-charts/ng2-charts';
import * as moment from 'moment';



@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.sass'],
  providers:[ApiService]
})
export class DogComponent implements OnInit { 

  heading = 'Tom';
  subheading = 'Labrador';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';

  myDate = new Date();
  dateString;


  isRunning:boolean = false;
  isWalking:boolean= true;

    //walking
  dailyWalkingData;
  weeklyWalkingData;
  monthlyWalkingData;
  annualWalkingData;

  dailyWalkingMinutes;

  weeklyWalkingMinutes;
  walkingDataInWeek= [];

  monthlyWalkingMinutes;
  walkingWeekArray=[]
  weeklyWalkingDataInMonth=[];

  annualWalkingMinutes;
  monthlyWalkingDataInYear=[];

  //running
  dailyRunningData;
  weeklyRunningData;
  monthlyRunningData;
  annualRunningData;

  dailyRunningMinutes;

  weeklyRunningMinutes;
  runningDataInWeek= [];

  monthlyRunningMinutes;
  weekArray=[]
  weeklyRunningDataInMonth=[];

  annualRunningMinutes;
  monthlyRunningDataInYear=[];
  
  
  constructor(private api: ApiService) {
     this.getCurrentDateInApiFormat();

 
     //Walking Data
     this.dailyWalkingData= {
      activity:1,
      dog:parseInt(localStorage.getItem('dogId')),
      date:this.dateString
    };
    this.weeklyWalkingData ={
      activity:1,
      dog:parseInt(localStorage.getItem('dogId')),
      date:this.dateString
    };
    this.monthlyWalkingData={
      activity:1,
      dog:parseInt(localStorage.getItem('dogId')),
      month:7,
      year:2020
    };
    this.annualWalkingData={
      activity:1,
      dog:parseInt(localStorage.getItem('dogId')),
      year:2020
    };

    this.getTotalWalkingMinutesPerDay();

    this.getTotalWalkingMinutesPerWeek();
    this.getDailyWalkingDetailsInWeek();

    this.getTotalWalkingMinutesPerMonth();
    this.getWeeklyWalkingDetailsInMonth();

    this.getTotalWalkingMinutesPerYear();
    this.getMonthlyWalkingDetailsInYear();  


    //Running Data
    this.dailyRunningData= {
      activity:2,
      dog:parseInt(localStorage.getItem('dogId')),
      date:this.dateString
    };
    

    this.weeklyRunningData ={
      activity:2,
      dog:parseInt(localStorage.getItem('dogId')),
      date:this.dateString
    };
    this.monthlyRunningData={
      activity:2,
      dog:parseInt(localStorage.getItem('dogId')),
      month:7,
      year:2020
    };
    this.annualRunningData={
      activity:2,
      dog:parseInt(localStorage.getItem('dogId')),
      year:2020
    };

    this.getTotalRunningMinutesPerDay();

    this.getTotalRunningMinutesPerWeek();
    this.getDailyRunningDetailsInWeek();

    this.getTotalRunningMinutesPerMonth();
    this.getWeeklyRunningDetailsInMonth();

    this.getTotalRunningMinutesPerYear();
    this.getMonthlyRunningDetailsInYear();
   

    //Resting Data

    //Barking Data

  }

   ngOnInit() {      

  }
  
  getCurrentDateInApiFormat() {
    const date = this.myDate;
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    this.dateString =[date.getFullYear(), month, day].join('-');
 }
  //running
  RunningDiv = () => {
    this.isRunning = true;
    this.isWalking =false;

  }



  getTotalRunningMinutesPerDay = () => {
    this.api.getTotalMinutesPerDay(this.dailyRunningData).subscribe(
      data => {
        for(var i=0; i< data.length; i++){
          this.dailyRunningMinutes= data[i]['minutes per day'];
        }   
      },
      error => {
        console.log(error);
      }
      
    )
  }

  getTotalRunningMinutesPerWeek = () => {
    this.api.getTotalMinutesPerWeek(this.weeklyRunningData).subscribe(
      data => {
        for(var i=0; i< data.length; i++){
          this.weeklyRunningMinutes= data[i]['minutes per week'];
        }     
       },
      error => {
        console.log(error);
      }
      
    )
  }  

  getDailyRunningDetailsInWeek = () => {
    
    this.api.getTotalMinutesPerDayInWeek(this.weeklyRunningData).subscribe(
      response => {
        for(var i=0; i< response.length; i++){
          const data =response[i]['data'];
          if(data.length == 0){
            this.runningDataInWeek[0] =0;
            this.runningDataInWeek[1] =0;
            this.runningDataInWeek[2] =0;
            this.runningDataInWeek[3] =0;
            this.runningDataInWeek[4] =0;
            this.runningDataInWeek[5] =0;
            this.runningDataInWeek[6] =0;
          }
          for(var j=0;j< data.length ; j++){
            if(data[j]['timePeriod'] == null){
              data[j]['timePeriod']=0;
            }
            const date =new Date(data[j]['date']).getDay();

            switch(date){
              case 1: this.runningDataInWeek[0] = data[j]['timePeriod']
                      break;
              case 2: this.runningDataInWeek[1] = data[j]['timePeriod']
                      break;
              case 3: this.runningDataInWeek[2] = data[j]['timePeriod']
                      break;
              case 4: this.runningDataInWeek[3] = data[j]['timePeriod']
                      break;
              case 5: this.runningDataInWeek[4] = data[j]['timePeriod']
                      break;
              case 6: this.runningDataInWeek[5] = data[j]['timePeriod']
                      break;
              case 7: this.runningDataInWeek[6] = data[j]['timePeriod']
                      break;
            }
          }        
        }   
       },
      error => {
        console.log(error);
      }
      
    )
  }  

  getTotalRunningMinutesPerMonth = () => {
    this.api.getTotalMinutesPerMonth(this.monthlyRunningData).subscribe(
      data => {
        for(var i=0; i< data.length; i++){
          this.monthlyRunningMinutes= data[i]['minutes per month'];
        }  
      },
      error => {
        console.log(error);
      }
      
    )
  }
  getWeeklyRunningDetailsInMonth = () => {
    
    this.api.getWeeklyDetailsInMonth(this.monthlyRunningData).subscribe(
      response => {
        for(var i=0; i< response.length; i++){
           const weeks =response[i]['weeks'];
           const times =response[i]['minutes'];
           
           for(var j=0;j< weeks.length;j++){
             this.weekArray[j]= weeks[j];
           }
           for(var k=0;k< times.length;k++){
            this.weeklyRunningDataInMonth[k]= times[k];
          }
        }   

       },
      error => {
        console.log(error);
      }
      
    )
  }  


  getTotalRunningMinutesPerYear = () => {
    this.api.getTotalMinutesPerYear(this.annualRunningData).subscribe(
      data => {
        for(var i=0; i< data.length; i++){
          this.annualRunningMinutes= data[i]['minutes per year'];
        }  
      },
      error => {
        console.log(error);
      }
      
    )
  }

  getMonthlyRunningDetailsInYear = () => {
    
    this.api.getMonthlyDetailsInYear(this.annualRunningData).subscribe(
      response => {
        for(var i=0; i< response.length; i++){
           const minutes =response[i]['minutes'];
           for(var k=0;k< minutes.length;k++){
            this.monthlyRunningDataInYear[k]= minutes[k];
          }
        } 
       },
      error => {
        console.log(error);
      }
    )
  }  


  //walking
  WalkingDiv = () => {
    this.isWalking =true;
    this.isRunning = false;

  } 

  getTotalWalkingMinutesPerDay = () => {
    this.api.getTotalMinutesPerDay(this.dailyWalkingData).subscribe(
      data => {
        for(var i=0; i< data.length; i++){
          this.dailyWalkingMinutes= data[i]['minutes per day'];
        }   
      },
      error => {
        console.log(error);
      }
      
    )
  }

  getTotalWalkingMinutesPerWeek = () => {
    this.api.getTotalMinutesPerWeek(this.weeklyWalkingData).subscribe(
      data => {
        for(var i=0; i< data.length; i++){
          this.weeklyWalkingMinutes= data[i]['minutes per week'];
        }     
       },
      error => {
        console.log(error);
      }
      
    )
  }  
  getDailyWalkingDetailsInWeek = () => {
    
    this.api.getTotalMinutesPerDayInWeek(this.weeklyWalkingData).subscribe(
      response => {
        for(var i=0; i< response.length; i++){
          const data =response[i]['data'];

          if(data.length == 0){
            this.walkingDataInWeek[0] =0;
            this.walkingDataInWeek[1] =0;
            this.walkingDataInWeek[2] =0;
            this.walkingDataInWeek[3] =0;
            this.walkingDataInWeek[4] =0;
            this.walkingDataInWeek[5] =0;
            this.walkingDataInWeek[6] =0;
          }
          for(var j=0;j< data.length ; j++){
            if(data[j]['timePeriod'] == null){
              data[j]['timePeriod']=0;
            }
            const date =new Date(data[j]['date']).getDay();

            switch(date){
              case 1: this.walkingDataInWeek[0] = data[j]['timePeriod']
                      break;
              case 2: this.walkingDataInWeek[1] = data[j]['timePeriod']
                      break;
              case 3: this.walkingDataInWeek[2] = data[j]['timePeriod']
                      break;
              case 4: this.walkingDataInWeek[3] = data[j]['timePeriod']
                      break;
              case 5: this.walkingDataInWeek[4] = data[j]['timePeriod']
                      break;
              case 6: this.walkingDataInWeek[5] = data[j]['timePeriod']
                      break;
              case 7: this.walkingDataInWeek[6] = data[j]['timePeriod']
                      break;
            }
          }        
        }
       },
      error => {
        console.log(error);
      }
      
    )
  }  
  getTotalWalkingMinutesPerMonth = () => {
    this.api.getTotalMinutesPerMonth(this.monthlyWalkingData).subscribe(
      data => {
        for(var i=0; i< data.length; i++){
          this.monthlyWalkingMinutes= data[i]['minutes per month'];
        }  
      },
      error => {
        console.log(error);
      }
      
    )
  }

  getWeeklyWalkingDetailsInMonth = () => {
    
    this.api.getWeeklyDetailsInMonth(this.monthlyWalkingData).subscribe(
      response => {
        for(var i=0; i< response.length; i++){
           const weeks =response[i]['weeks'];
           const times =response[i]['minutes'];
           for(var j=0;j< weeks.length;j++){
             this.weekArray[j]= weeks[j];
           }
           for(var k=0;k< times.length;k++){
            this.weeklyWalkingDataInMonth[k]= times[k];
          }
        }   
       },
      error => {
        console.log(error);
      }
      
    )
  }  
  getTotalWalkingMinutesPerYear = () => {
    this.api.getTotalMinutesPerYear(this.annualWalkingData).subscribe(
      data => {
        for(var i=0; i< data.length; i++){
          this.annualWalkingMinutes= data[i]['minutes per year'];
        }  
      },
      error => {
        console.log(error);
      }
      
    )
  }


  getMonthlyWalkingDetailsInYear = () => {
    
    this.api.getMonthlyDetailsInYear(this.annualWalkingData).subscribe(
      response => {
        console.log(response);
        for(var i=0; i< response.length; i++){
           const minutes =response[i]['minutes'];
           for(var k=0;k< minutes.length;k++){
            this.monthlyWalkingDataInYear[k]= minutes[k];
          }
        } 
       },
      error => {
        console.log(error);
      }
    )
  }  
  //data

  slideConfig6 = {
    className: 'center',
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    adaptiveHeight: true,
    dots: true,
  };

  //RUNNING
  //Weekly

  public weeklyRunningActivitydatasets = [
    {
      label: 'Daily',
      data: this.runningDataInWeek,
      datalabels: {
        display: false,
      },

    }
  ];
  public dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  //Monthly

  public monthlyRunningActivitydatasets = [
    {
      label: 'Weekly',
      data: this.weeklyRunningDataInMonth,
      datalabels: {
        display: false,
      },

    }
  ];
  public weekLabelsInMonth = this.weekArray;


  //Annually
  public annualRunningActivitydatasets = [
    {
      label: 'Monthly',
      data: this.monthlyRunningDataInYear,
      datalabels: {
        display: false,
      },

    }
  ];


 //WALKING
  //Weekly

  public weeklyWalkingActivitydatasets = [
    {
      label: 'Daily',
      data: this.walkingDataInWeek,
      datalabels: {
        display: false,
      },
    }
  ];

  public monthlyWalkingActivitydatasets = [
    {
      label: 'Weekly',
      data: this.  weeklyWalkingDataInMonth
      ,
      datalabels: {
        display: false,
      },

    }
  ];

  //Annually
  public annualWalkingActivitydatasets = [
    {
      label: 'Monthly',
      data: this.monthlyWalkingDataInYear,
      datalabels: {
        display: false,
      },

    }
  ];







  




  public datasets = [
    {
      label: 'My First dataset',
      data: [1,2,3,10,4,6,1],
      datalabels: {
        display: false,
      },

    }
  ];

  public datasets2 = [
    {
      label: 'My First dataset',
      data: [46, 55, 59, 80, 81, 38, 65, 59, 80],
      datalabels: {
        display: false,
      },

    }
  ];

  public datasets3 = [
    {
      label: 'My First dataset',
      data: [65, 59, 80, 81, 55, 38, 59, 80, 46],
      datalabels: {
        display: false,
      },

    }
  ];
  public lineChartColors: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(247, 185, 36, 0.2)',
      borderColor: '#f7b924',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#f7b924',
      pointBackgroundColor: '#fff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#f7b924',
    },
  ];

  public lineChartColors2: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(48, 177, 255, 0.2)',
      borderColor: '#30b1ff',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#30b1ff',
      pointBackgroundColor: '#ffffff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#30b1ff',
    },
  ];

  public lineChartColors3: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(86, 196, 121, 0.2)',
      borderColor: '#56c479',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#56c479',
      pointBackgroundColor: '#fff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#56c479',
    },
  ];

  public labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];

  public options = {
    layout: {
      padding: {
        left: 0,
        right: 8,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        ticks: {
          display: false
        },
        gridLines: {
          display: false
        }
      }]
    },
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false
  };




}
