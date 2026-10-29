class CalculatorError(ValueError):
    """Raised when a requested calculation cannot be performed."""


def calculate(first_number: float, second_number: float, operation: str) -> float:
    operations = {
        "+": lambda: first_number + second_number,
        "-": lambda: first_number - second_number,
        "*": lambda: first_number * second_number,
        "/": lambda: first_number / second_number,
    }
    if operation not in operations:
        raise CalculatorError("Unsupported operation. Choose +, -, *, or /.")
    if operation == "/" and second_number == 0:
        raise CalculatorError("Cannot divide by zero.")
    return operations[operation]()
