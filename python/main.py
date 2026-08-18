"""
Python Examples - ilk-repo
Starter guide and practical examples for Python fundamentals.
"""


def greet(name: str) -> str:
    """Return a friendly greeting."""
    return f"Hello, {name}! Welcome to Python."


def demonstrate_basics():
    """Demonstrate basic Python data structures and operations."""
    print("--- Basic Python Operations ---")
    
    # 1. Variables & Types
    name = "Suleiman"
    number = 42
    is_active = True
    print(greet(name))
    print(f"Number: {number}, Active: {is_active}\n")

    # 2. Lists & Iteration
    languages = ["HTML", "CSS", "JavaScript", "Python"]
    print("Languages in this project:")
    for idx, lang in enumerate(languages, start=1):
        print(f"  {idx}. {lang}")
    print()

    # 3. Dictionaries (Key-Value pairs)
    project_info = {
        "title": "ilk-repo",
        "author": "Suleiman",
        "stack": ["HTML", "CSS", "JS", "Python"],
        "is_ready": True
    }
    print("Project Info:")
    for key, value in project_info.items():
        print(f"  {key}: {value}")
    print()

    # 4. List Comprehensions & Simple Math
    squares = [x ** 2 for x in range(1, 6)]
    print(f"Squares from 1 to 5: {squares}\n")


class Repository:
    """A simple class representing a code repository."""

    def __init__(self, name: str, branch: str):
        self.name = name
        self.branch = branch

    def get_status(self) -> str:
        return f"Repository '{self.name}' is currently on branch '{self.branch}'."


def main():
    print("========================================")
    print("   Welcome to Python Example Script     ")
    print("========================================")
    
    demonstrate_basics()
    
    # OOP example
    repo = Repository(name="ilk-repo", branch="suleiman")
    print("--- OOP Class Example ---")
    print(repo.get_status())
    print("========================================")


if __name__ == "__main__":
    main()



