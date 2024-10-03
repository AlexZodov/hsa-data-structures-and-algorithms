import { Global, Injectable } from '@nestjs/common';

@Injectable()
@Global()
export class MeasureHelper {
  async carryOutMeasure(algo: CallableFunction, dataset: any): Promise<number> {
    const startTime = process.hrtime.bigint();
    algo(dataset);
    const endTime = process.hrtime.bigint();
    const elapsedTime = endTime - startTime;

    return Number(elapsedTime);
  }
}
