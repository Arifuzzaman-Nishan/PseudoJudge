import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProblemDetailsDocument = HydratedDocument<ProblemDetails>;

interface IDescription {
  problemDesc?: string;
  inputDesc?: string;
  outputDesc?: string;
}

interface ISampleDataset {
  sampleInput: string;
  sampleOutput: string;
}

interface ITestDataset {
  testInput: string;
  testOutput: string;
}

interface ILimit {
  timeLimit: string;
  memoryLimit?: string;
}

@Schema()
export class ProblemDetails {
  @Prop({
    default: null,
  })
  pdfUrl: string;

  @Prop({
    default: null,
  })
  imageUrl: string;

  @Prop({
    type: {
      problemDesc: {
        type: String,
        default: null,
      },
      inputDesc: {
        type: String,
        default: null,
      },
      outputDesc: {
        type: String,
        default: null,
      },
      _id: false,
    },
  })
  description: IDescription;

  @Prop({
    required: true,
    type: {
      sampleInput: String,
      sampleOutput: String,
      _id: false,
    },
  })
  sampleDataset: ISampleDataset;

  @Prop({
    required: true,
    type: {
      testInput: String,
      testOutput: String,
      _id: false,
    },
  })
  testDataset: ITestDataset;

  @Prop({
    type: {
      timeLimit: String,
      memoryLimit: {
        type: String,
        default: null,
      },
      _id: false,
    },
  })
  limit: ILimit;
}

export const ProblemDetailsSchema =
  SchemaFactory.createForClass(ProblemDetails);
