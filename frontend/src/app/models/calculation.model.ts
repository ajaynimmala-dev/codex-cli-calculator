export type Operation = '+' | '-' | '*' | '/';

export interface CalculationRequest {
  first_number: number;
  second_number: number;
  operation: Operation;
}

export interface CalculationResponse extends CalculationRequest {
  result: number;
}
