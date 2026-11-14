# Eight Queens: backtracking with column and diagonal constraints.
def solve_queens(n=8):
    solutions = []

    def backtrack(board, cols, diag1, diag2):
        row = len(board)
        if row == n:
            solutions.append(board)
            return

        for col in range(n):
            if (col in cols or
                row - col in diag1 or
                row + col in diag2):
                continue

            backtrack(
                board + [col],
                cols | {col},
                diag1 | {row - col},
                diag2 | {row + col},
            )

    backtrack([], set(), set(), set())
    return solutions


if __name__ == "__main__":
    answers = solve_queens()
    print(f"Solutions: {len(answers)}")  # 92
    for col in answers[0]:
        print(" ".join("Q" if c == col else "." for c in range(8)))
