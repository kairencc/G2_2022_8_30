import { Primitive, TransformComponent } from '../runtime';
import { ChannelTypes } from './geometry';

export type StatisticTransform =
  | StackYTransform
  | DodgeXTransform
  | NormalizeYTransform
  | StackEnterTransform
  | JitterTransform
  | JitterYTransform
  | SymmetryYTransform
  | SelectTransform
  | SelectXTransform
  | SelectYTransform
  | GroupXTransform;

export type StatisticOrder =
  | 'value'
  | 'sum'
  | 'series'
  | 'maxIndex'
  | string[]
  | ((data: Record<string, Primitive>) => Primitive);

export type StatisticTransformTypes =
  | 'dodgeX'
  | 'stackY'
  | 'normalizeY'
  | 'stackEnter'
  | 'jitter'
  | 'jitterY'
  | 'symmetryY'
  | 'select'
  | 'selectY'
  | 'selectX'
  | 'groupX'
  | TransformComponent;

export type DodgeXTransform = {
  type?: 'dodgeX';
  groupBy?: string | string[];
  reverse?: boolean;
  orderBy?: StatisticOrder;
  paddingInner?: number;
  paddingOuter?: number;
  padding?: number;
};

export type StackYTransform = {
  type?: 'stackY';
  groupBy?: string | string[];
  reverse?: boolean;
  orderBy?: StatisticOrder;
  y?: 'y' | 'y1';
};

export type NormalizeYTransform = {
  type?: 'normalizeY';
  series?: boolean;
  groupBy?: string | string[];
  basis?:
    | 'deviation'
    | 'first'
    | 'last'
    | 'max'
    | 'mean'
    | 'median'
    | 'min'
    | 'sum'
    | 'extent';
};

export type JitterTransform = {
  type?: 'jitter';
  paddingX?: number;
  paddingY?: number;
};

export type JitterYTransform = {
  type?: 'jitterY';
  padding?: number;
};

export type StackEnterTransform = {
  type?: 'stackEnter';
  by?: string[];
};

export type SymmetryYTransform = {
  type?: 'symmetryY';
  groupBy?: string | string[];
};

export type Selector =
  | 'min'
  | 'max'
  | 'first'
  | 'last'
  | 'mean'
  | 'median'
  | ((I: number[], V: number[]) => number[]);

export type SelectTransform = {
  type?: 'select';
  groupBy?: string | string[];
} & { [key in ChannelTypes]?: Selector };

export type SelectXTransform = {
  type?: 'selectX';
  groupBy?: string | string[];
  selector?: Selector;
};

export type SelectYTransform = {
  type?: 'selectY';
  groupBy?: string | string[];
  selector?: Selector;
};

export type Reducer =
  | 'mean'
  | 'max'
  | 'count'
  | 'min'
  | 'median'
  | 'sum'
  | 'first'
  | 'last'
  | ((I: number[], V: Primitive[]) => Primitive);

export type GroupXTransform = {
  type?: 'groupX';
  orderBy?: ChannelTypes;
  reverse?: boolean;
} & { [key in ChannelTypes]?: Reducer };
