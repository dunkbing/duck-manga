import { Injectable } from '@nestjs/common';
import { getConnection, QueryRunner } from 'typeorm';

@Injectable()
export class CrudService {
  private queryRunner: QueryRunner;

  protected async startTransaction(): Promise<void> {
    this.queryRunner = getConnection().createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  protected async commitTransaction(): Promise<void> {
    await this.queryRunner.commitTransaction();
  }

  protected async rollbackTransaction(): Promise<void> {
    await this.queryRunner.rollbackTransaction();
  }

  protected async releaseTransaction(): Promise<void> {
    await this.queryRunner.release();
  }

  protected async saveData(value: any): Promise<any> {
    return this.queryRunner.manager.save(value);
  }

  protected async updateData(
    target: any,
    criteria: any,
    value: any
  ): Promise<any> {
    return this.queryRunner.manager.update(target, criteria, value);
  }

  public async deleteData(target: any, criteria: any): Promise<any> {
    return await this.queryRunner.manager.delete(target, criteria);
  }
}
