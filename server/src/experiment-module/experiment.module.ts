import { Module } from '@nestjs/common';
import { BstModule } from '../bst-module/bst.module';
import { CountSortModule } from '../count-sort-module/count-sort.module';
import { ExperimentService } from './experiment.service';
import { ExperimentHelperModule } from '../common';

@Module({
  imports: [BstModule, CountSortModule, ExperimentHelperModule],
  providers: [ExperimentService],
})
export class ExperimentModule {}
