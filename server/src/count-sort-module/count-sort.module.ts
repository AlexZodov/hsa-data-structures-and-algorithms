import { Module } from '@nestjs/common';
import { CountSortService } from './count-sort.service';

@Module({
  providers: [CountSortService],
  exports: [CountSortService],
})
export class CountSortModule {}
