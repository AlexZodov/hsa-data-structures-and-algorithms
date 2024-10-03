import { Injectable } from '@nestjs/common';

@Injectable()
export class CountSortService {
  async executeSort(dataset: number[]): Promise<number[]> {
    const maxVal = Math.max(...dataset);
    const countArr = new Array(maxVal + 1).fill(0);

    for (const val of dataset) {
      countArr[val]++;
    }

    const sortedArr = [];
    for (let i = 0; i < countArr.length; i++) {
      for (let j = 0; j < countArr[i]; j++) {
        sortedArr.push(i);
      }
    }

    return sortedArr;
  }
}
