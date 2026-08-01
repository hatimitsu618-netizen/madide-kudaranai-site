import random
from pyscript import document
from pyodide.ffi import create_proxy

def random_strings(word_list):
    short_words = ""
    for litter in word_list:
        if random.randint(0, 1) == 1:
            short_words += litter
    if not short_words:
        short_words = random.choice(word_list)
    return short_words

def button_clicked(event):
    clicked_btn = event.target
    btn_id =clicked_btn.id

    if btn_id == "make-btn1":
        word_list = []
        input_element = document.querySelector("#user-input")
        words = input_element.value
        print(words)
        if not words:
            document.querySelector("#result-text").innerText = "何か入力してね"
            return

        word_list = list(words)
        result = random_strings(word_list)
        document.querySelector("#result-text").innerText = result

    elif btn_id == "make-btn2":
        print('ok')

    elif btn_id == "make-btn3":
        print('ok')

def nige_ru(event):
    return

def main():
    buttons = document.querySelectorAll(".btn")
    button_proxy = create_proxy(button_clicked)
    for btn in buttons:
        btn.addEventListener("click", button_proxy)

main()