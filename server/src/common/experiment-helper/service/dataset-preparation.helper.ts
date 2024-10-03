import { Injectable } from '@nestjs/common';

@Injectable()
export class DatasetPreparationHelper {
  async generateDataset(size: number): Promise<number[]> {
    return Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100000),
    );
  }
}
