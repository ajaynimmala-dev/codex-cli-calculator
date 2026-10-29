from typing import Literal

from pydantic import BaseModel, Field


class CalculationRequest(BaseModel):
    first_number: float = Field(allow_inf_nan=False)
    second_number: float = Field(allow_inf_nan=False)
    operation: Literal["+", "-", "*", "/"]


class CalculationResponse(BaseModel):
    first_number: float
    second_number: float
    operation: str
    result: float
