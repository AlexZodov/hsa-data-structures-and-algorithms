import { Module } from '@nestjs/common';
import { BalancedBSTEntity } from './balanced-bst.entity';

@Module({
  providers: [BalancedBSTEntity],
  exports: [BalancedBSTEntity],
})
export class BstModule {}
