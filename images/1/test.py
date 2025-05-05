import os

def list_files(directory):
    for files in os.walk(directory):
        for file in files:
            print(file)

# Example usage
if __name__ == "__main__":
    current_directory = os.getcwd()
    print(current_directory)
    list_files(current_directory)
