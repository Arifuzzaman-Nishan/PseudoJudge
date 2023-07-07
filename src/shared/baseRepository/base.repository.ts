import { Injectable } from '@nestjs/common';
import {
  Aggregate,
  Document,
  FilterQuery,
  Model,
  ProjectionFields,
  UpdateQuery,
} from 'mongoose';

@Injectable()
export abstract class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  create(createDto: Partial<T>): Promise<T> {
    const createdEntity = new this.model(createDto);
    return createdEntity.save();
  }

  countDocuments(filter: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }

  find(filter: FilterQuery<T>, projection?: ProjectionFields<T>): Promise<T[]> {
    return this.model.find(filter, projection).exec();
  }

  findWithPopulate(
    filter: FilterQuery<T>,
    populateField: string,
    projection?: ProjectionFields<T>,
    populateOptions?: string,
  ): Promise<T[]> {
    return this.model
      .find(filter, projection)
      .populate(populateField, populateOptions)
      .exec();
  }

  findWithPaginate(
    filter: FilterQuery<T>,
    projection?: ProjectionFields<T>,
    limit?: number,
    page?: number,
  ): Promise<T[]> {
    return this.model
      .find(filter, projection)
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();
  }

  findAll(
    filter?: FilterQuery<T>,
    projection?: ProjectionFields<T>,
  ): Promise<T[]> {
    return this.model.find(filter, projection).exec();
  }

  findOne(id: string, projection?: ProjectionFields<T>): Promise<T> {
    return this.model.findById(id, projection).exec();
  }

  findOneByField(field: FilterQuery<T>): Promise<T> {
    return this.model.findOne(field).exec();
  }

  updateOne(filter: FilterQuery<T>, updateQuery: UpdateQuery<T>) {
    return this.model.updateOne(filter, updateQuery).exec();
  }

  update(id: string, updateDto: UpdateQuery<T>): Promise<T> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  delete(filter: FilterQuery<T>): Promise<T> {
    return this.model.findOneAndRemove(filter).exec();
  }

  aggregate(aggregationPipeline: any[]): Aggregate<any[]> {
    return this.model.aggregate(aggregationPipeline);
  }
}
