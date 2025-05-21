import math
# In python, `math.inf` represents positive infinity. It is a special floating-point value that is greater than any finite number. This is part of the `math` module, which provides access to mathematical functions and constants.


# In the context of 24 Game, `math.inf` is used in the `generate` function to handle division operations. Specifically, when performing division, if the denominator is zero, the code assigns `math.inf` to avoid division by zero errors. Here's how it works in the `generate` function.
def generate(a: float, b: float) -> list[float]:
    return [
        a * b,
        math.inf if b == 0 else a / b,  # division by b
        math.inf if a == 0 else b / a,  # division by a
        a + b,
        a - b,
        b - a,
    ]


# `math.inf if b == 0 else a / b` this line checks if `b` is zero. if it is, return `math.inf` instead of performing the division `a / b`, which would raise a `ZeroDivisionError`

# similarly, `math.inf if a == 0 else b / a` checks if `a` is zero before performing the division.
