import {
    BadRequestException,
    ConflictException,
    HttpStatus,
    NotFoundException,
  } from '@nestjs/common';
  import mongoose, { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';
  import * as dot from 'dot-object';
  
  type ValidatedAction = 'create' | 'findOneAndUpdate' | 'update' | 'updateOne';
  export type ValidationContext = {
    action: ValidatedAction;
    entityId?: string;
  };
  
  export abstract class AbstractCrudHandler<T extends Document> {
    constructor(
      protected model: Model<T>,
    ) {}
  
    async create(createRequest: any): Promise<any> {
      await this.validate(createRequest, { action: 'create' });
      const mappedEntity = this.mapDtoToEntity(createRequest);
  
      return this.model
        .create(mappedEntity)
        .catch((error) => {
          this.throwUnhandledError(
            error,
            'create',
            `${this.model.name} couldn't be created`,
          );
        })
        .then((record) => this.afterCreate(record))
        .then((record) => {
          if (!record) {
            return;
          }
  
          return this.mapEntityToDto(record);
        });
    }
  
    find(filter: FilterQuery<T>): Promise<any[]> {
      return this.model
        .find(filter)
        .catch((error) =>
          this.throwUnhandledError(
            error,
            'find',
            `${this.model.name} couldn't be returned`,
          ),
        )
        .then((records) => {
          if (!records) {
            return null;
          }
  
          return records.map((record) => this.mapEntityToDto(record));
        });
    }
  
    findById(id: string): Promise<any> {
      this.validateObjectId(id);
  
      return this.model
        .findById(id)
        .catch((error) =>
          this.throwUnhandledError(
            error,
            'find',
            `${this.model.name} couldn't be returned`,
          ),
        )
        .then((record) => {
          if (!record) {
            throw new NotFoundException(`${this.model.name} not found`);
          }
  
          return this.mapEntityToDto(record);
        });
    }
  
    findOne(filter: FilterQuery<T>): Promise<any> {
      return this.model
        .findOne(filter)
        .catch((error) =>
          this.throwUnhandledError(
            error,
            'find',
            `${this.model.name} couldn't be returned`,
          ),
        )
        .then((record) => {
          if (!record) {
            throw new NotFoundException(`${this.model.name} not found`);
          }
  
          return this.mapEntityToDto(record);
        });
    }
  
    findOneAndUpdate(filter: FilterQuery<T>, updateRequest: UpdateQuery<T>) {
      this.validate(updateRequest, { action: 'findOneAndUpdate' });
      const updateRequestDot = dot.dot(updateRequest);
      return this.model
        .findOneAndUpdate(filter, updateRequestDot, {
          returnDocument: 'after',
        })
        .catch((error) => {
          this.throwUnhandledError(
            error,
            'findAndUpdate',
            `${this.model.name} couldn't be updated`,
          );
        })
        .then((record) => {
          if (!record) {
            throw new NotFoundException(`${this.model.name} not found`);
          }
  
          return this.mapEntityToDto(record);
        });
    }
  
    async update(
      id: string,
      updateRequest: UpdateQuery<T>,
      dotNotation = true,
    ): Promise<any> {
      this.validateObjectId(id);
      await this.validate(updateRequest, { action: 'update', entityId: id });
      const mappedEntity = this.mapDtoToEntity(updateRequest);
      dot.keepArray = true;
      const updateQuery = dotNotation ? dot.dot(mappedEntity) : mappedEntity;
  
      return this.model
        .findByIdAndUpdate(id, updateQuery, {
          returnDocument: 'after',
        })
        .catch((error) => {
          this.throwUnhandledError(
            error,
            'update',
            `${this.model.name} couldn't be updated`,
          );
        })
        .then((record) => this.afterUpdate(record))
        .then((record) => {
          if (!record) {
            throw new NotFoundException(`${this.model.name} not found`);
          }
  
          return this.mapEntityToDto(record);
        });
    }
  
    async updateOne(
      filter: FilterQuery<T>,
      updateRequest: UpdateQuery<T>,
      dotNotation = true,
    ): Promise<any> {
      await this.validate(updateRequest, { action: 'updateOne' });
      const mappedEntity = this.mapDtoToEntity(updateRequest);
      dot.keepArray = true;
      const updateQuery = dotNotation ? dot.dot(mappedEntity) : mappedEntity;
  
      return this.model
        .findOneAndUpdate(filter, updateQuery, {
          returnDocument: 'after',
        })
        .catch((error) => {
          this.throwUnhandledError(
            error,
            'updateOne',
            `${this.model.name} couldn't be updated`,
          );
        })
        .then((record) => this.afterUpdate(record))
        .then((record) => {
          if (!record) {
            throw new NotFoundException(`${this.model.name} not found`);
          }
  
          return this.mapEntityToDto(record);
        });
    }
  
    remove(id: string): Promise<void> {
      this.validateObjectId(id);
  
      return this.model
        .findByIdAndDelete(id)
        .catch((error) => {
          this.throwUnhandledError(
            error,
            'delete',
            `${this.model.name} couldn't be remove`,
          );
        })
        .then((home) => {
          if (!home) {
            throw new NotFoundException(`${this.model.name} not found`);
          }
        });
    }
  
    updateMany(
      filter: FilterQuery<T>,
      updateRequest: UpdateQuery<T>,
      executionContext = 'updateMany',
    ): Promise<any> {
      dot.keepArray = true;
      const updateRequestDot = dot.dot(updateRequest);
  
      return this.model
        .updateMany(filter, updateRequestDot, {
          returnDocument: 'after',
        })
        .catch((error) => {
          this.throwUnhandledError(
            error,
            executionContext,
            `${this.model.name} couldn't be updated`,
          );
        });
    }
  
    protected async afterCreate(record: T): Promise<T> {
      return record;
    }
  
    protected async afterUpdate(record: T): Promise<T> {
      return record;
    }
  
    protected throwUnhandledError(
      error: any,
      context: string,
      message: string,
    ): never {
        console.log(`Error in ${context} ${JSON.stringify(error)}`,
        error.stack,
        `${this.constructor.name}-service`)
  
      throw new ConflictException(error, message);
    }
  
    protected throwValidationError(message: string): never {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: [message],
        error: 'Bad Request',
      });
    }
  
    protected validateObjectId(id: string) {
      if (mongoose.Types.ObjectId.isValid(id)) return;
  
      throw new BadRequestException('ObjectId is not valid');
    }
  
    // assumes the dto object is compatible with T object
    protected mapDtoToEntity(dto: any): Partial<T> {
      return dto;
    }
  
    protected validate(_dtoToValidate: any, _context?: ValidationContext): void {
      return;
    }
  
    protected abstract mapEntityToDto(record: T): any;
  }
  