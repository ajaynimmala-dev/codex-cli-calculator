from fastapi import APIRouter, HTTPException

from calculator_api.schemas.calculation import CalculationRequest, CalculationResponse
from calculator_api.services.calculator import CalculatorError, calculate

router = APIRouter()


@router.post("/calculate", response_model=CalculationResponse, tags=["calculator"])
def calculate_result(request: CalculationRequest) -> CalculationResponse:
    try:
        result = calculate(request.first_number, request.second_number, request.operation)
    except CalculatorError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return CalculationResponse(
        first_number=request.first_number,
        second_number=request.second_number,
        operation=request.operation,
        result=result,
    )
