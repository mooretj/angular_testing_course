import {CalculatorService} from "./calculator.service";
import {LoggerService} from "./logger.service";
import {TestBed} from "@angular/core/testing";

describe('CalculatorService', () => {

  let calculator: CalculatorService,
      loggerSpy: any;

  beforeEach(() => {

    console.log("Calling beforeEach");
    loggerSpy = jasmine.createSpyObj('LoggerService',['log']);
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {provide: LoggerService, useValue: loggerSpy},
      ]
    })
    calculator = TestBed.get(CalculatorService);

  })

  it('should add two numbers', () => {

    console.log("Add test");
    const result = calculator.add(2,2);
    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);

  });

  it('should subtract two numbers', () => {

    console.log("Subtract test");
    const result = calculator.subtract(3,2);
    expect(result).toBe(1);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);

  })
});
