import { Injectable } from '@nestjs/common';
import { Model, Document as MongooseDocument } from 'mongoose';
import { IDatabaseRepository } from 'src/shared/interfaces/database-respository.interface';

@Injectable()
export class MongooseRepository<Document extends MongooseDocument>
  implements IDatabaseRepository<Document>
{
  public mongooseModel: Model<Document>;
  constructor(model: Model<Document>) {
    this.mongooseModel = model;
  }

  async getAll(filters?: Partial<Document>): Promise<Document[]> {
    return this.mongooseModel.find(filters as any).lean();
  }
  async getOne(id: string): Promise<Document> {
    return this.mongooseModel.findById(id).lean();
  }
  async create(data: Document): Promise<Document> {
    const created = await this.mongooseModel.create(data);

    return created.toJSON() as unknown as Document;
  }
  async update(id: string, data: Partial<Document>): Promise<Document> {
    return this.mongooseModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      } as any,
      {
        new: true,
        lean: true,
      },
    );
  }
  async delete(id: string): Promise<Document> {
    return this.mongooseModel.findByIdAndDelete(id, {
      new: true,
      lean: true,
    });
  }
}
