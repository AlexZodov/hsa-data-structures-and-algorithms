import { Module } from '@nestjs/common';
import { MeasureHelper } from './service';
import { DatasetPreparationHelper } from './service';

@Module({
  providers: [MeasureHelper, DatasetPreparationHelper],
  exports: [MeasureHelper, DatasetPreparationHelper],
})
export class ExperimentHelperModule {}
