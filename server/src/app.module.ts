import { Module } from '@nestjs/common';
import { ConfigModule } from './config';
import { BstModule } from './bst-module/bst.module';
import { ExperimentHelperModule } from './common';
import { CountSortModule } from './count-sort-module/count-sort.module';
import { ExperimentModule } from './experiment-module/experiment.module';

@Module({
  imports: [
    ConfigModule,
    ExperimentHelperModule,
    BstModule,
    CountSortModule,
    ExperimentModule,
  ],
})
export class AppModule {}
