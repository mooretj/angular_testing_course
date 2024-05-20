import {fakeAsync, flush, flushMicrotasks, tick} from "@angular/core/testing";
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";


describe("Async Testing Examples", () => {

  it("Asynchronous test example with Jasmine done()", (done:DoneFn) => {

    let test = false;
    setTimeout(() => {
      console.log("Running assertions")
      test = true;
      expect(test).toBeTruthy();
      done();
      }, 1000);

  });

  it("Asynchronous test example with setTimeout()", fakeAsync(() => {

    let test = false;
    setTimeout(() => {
      console.log("Running assertions");
      test = true;
    }, 1000);
    flush();
    expect(test).toBeTruthy();

  }));

  it("Asynchronous test example with microtasks", fakeAsync(() => {

    let test = false;
    console.log("Creating promise");
    Promise.resolve().then(() => {
      console.log("Promise evaluated successfully");
      test = true;
    })
    flushMicrotasks();
    console.log("Running assertions");
    expect(test).toBeTruthy();

  }));

  it("Asynchronous test example with microtasks and setTimeout()", fakeAsync(() => {

    let counter = 0;
    Promise.resolve()
      .then(() => {
        counter += 10;
        setTimeout(() => {
          counter ++;
        },1000);
      });
    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    flush(); // or `tick(1000)`
    expect(counter).toBe(11);

  }));

  it("Asynchronous test example with Observables", fakeAsync(() => {

    let test = false;
    console.log("Creating observable");
    const test$ = of(test)
      .pipe(delay(1000));
    test$.subscribe(() => {
      test = true;
    });
    tick(1000);
    console.log(("Running assertions"));
    expect(test).toBe(true);

  }));

})
