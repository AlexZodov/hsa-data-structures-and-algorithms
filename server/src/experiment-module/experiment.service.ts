import { Injectable, OnModuleInit } from '@nestjs/common';
import { BalancedBSTEntity } from '../bst-module/balanced-bst.entity';
import { CountSortService } from '../count-sort-module/count-sort.service';
import {
  DatasetPreparationHelper,
  MeasureHelper,
} from '../common/experiment-helper/service';

@Injectable()
export class ExperimentService implements OnModuleInit {
  constructor(
    private balancedBSTEntity: BalancedBSTEntity,
    private readonly countSortService: CountSortService,
    private readonly measureHelper: MeasureHelper,
    private readonly datasetPreparationHelper: DatasetPreparationHelper,
  ) {}
  async onModuleInit(): Promise<any> {
    const sizeArray = [
      10, 50, 100, 200, 500, 800, 1000, 1500, 2000, 3000, 4000, 8000, 10000,
      15000, 20000, 25000, 35000, 50000, 75000, 100000,
    ];
    const bstInsertTimeArr = [];
    const bstFindTimeArr = [];
    const bstDeleteTimeArr = [];
    const countingSortTimeArr = [];

    for (const size of sizeArray) {
      const data = await this.datasetPreparationHelper.generateDataset(size);

      const bstInsertTime = await this.measureHelper.carryOutMeasure(
        async () => await this.balancedBSTEntity.insert(data),
        data,
      );
      const bstFindTime = await this.measureHelper.carryOutMeasure(
        async () =>
          await this.balancedBSTEntity.find(Math.floor(Math.random() * 100000)),
        Math.floor(Math.random() * 100000),
      );
      const bstDeleteTime = await this.measureHelper.carryOutMeasure(
        async () =>
          await this.balancedBSTEntity.delete(
            Math.floor(Math.random() * 100000),
          ),
        Math.floor(Math.random() * 100000),
      );
      const countingSortTime = await this.measureHelper.carryOutMeasure(
        async () => await this.countSortService.executeSort(data),
        data,
      );

      await this.balancedBSTEntity.erase();

      console.log('------------------------------------------------------');
      console.log('Dataset size: ' + size);
      console.log('------------------------------------------------------');
      console.log('BST - Insert Time: ' + bstInsertTime + ' nanoseconds');
      console.log('BST - Find Time: ' + bstFindTime + ' nanoseconds');
      console.log('BST - Delete Time: ' + bstDeleteTime + ' nanoseconds');
      console.log('Counting Sort Time: ' + countingSortTime + ' nanoseconds');
      console.log('------------------------------------------------------');

      bstInsertTimeArr.push(bstInsertTime);
      bstFindTimeArr.push(bstFindTime);
      bstDeleteTimeArr.push(bstDeleteTime);
      countingSortTimeArr.push(countingSortTime);
    }
  }
}
