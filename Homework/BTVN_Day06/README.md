_Đầu tiên e chọn <div class="card"> làm thẻ chính, có 3 thẻ con là "header", "body", "final"

_"header" bao gồm img và calendar. Thẻ <div class="calendar"> có position là 'relative' để khi hover vào <div class="card"> thì <div class="calendar"> không bị thay đổi vị trí theo img

_"body" với position là relative còn các thẻ con e để absolute vì khi hover các thẻ con sẽ dịch chuyển theo <div class="body">. Khi chưa :hover thì <div class="body"> có margin-top= 100px sau đó khi hover thì margin top = 0

-thẻ <div class="final"> nằm ngoài <div class="body"> để khi hover <div class="body"> di chuyển nhưng thẻ <div class="final"> vì có position: relative và k thuộc thẻ ocn của<div class="body"> nên sẽ k bị dịch chuyển theo