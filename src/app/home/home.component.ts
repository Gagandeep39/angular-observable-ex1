import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  customIntervalObservable: Observable<any>;

  constructor() {
  }

  ngOnInit() {
    // Interval is an inbuilt Observale in rxjs
    // this.subscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    // Custom Observable that works same as 'Interval'
    this.customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count === 5) {
          observer.error('Count is 5');
        }
        count++;
      }, 1000);
    });

    // Operators
    // Used to Format our Observable Data using 'Pipes'
    // Output: 0, 1, 2, Completed
    const x: Observable<any> = this.customIntervalObservable.pipe(map((data: number) => {
      return 'Round: ' + (data + 1);
    }));
    // Output: 2, Completed
    const y: Observable<any> = this.customIntervalObservable.pipe(filter((data: number) => {
      return data > 1;
    }));

    // Here we are subscribing to the Observable we created
    // We can subscribe directly, or the one customized using operators
    this.subscription = y.subscribe((data) => {
      console.log(data);
    }, (data) => {
      console.log('Error: ' + data);
    }, () => {
      console.log('Completed');
    });

  }

  ngOnDestroy(): void {
    // Custom Observables need to be unsubscribe manually
    this.subscription.unsubscribe();
  }

}
