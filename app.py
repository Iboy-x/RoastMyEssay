import pyautogui
import time
import random

# Some random code snippets or phrases
snippets = [
    "def simulate_typing():",


    "for i in range(100):",


    "print('Hello, world!')",


    "if x > 0: return x",


    "while True: pass",


    "import numpy as np",


    "class HackerVibes:",


    "self.data = [i for i in range(10)]",


    "raise Exception('Just for the vibes')",



    "# TODO: Rewrite this spaghetti",
]

# Wait 5 seconds so you can open your IDE or terminal
print("Starting in 5 seconds... get ready!")
time.sleep(5)

for _ in range(100):
    snippet = random.choice(snippets)
    pyautogui.write(snippet, interval=0.08)
    pyautogui.press("enter")
    time.sleep(random.uniform(0.1, 0.4))
