_Đầu tiên e chọn "card" làm thẻ chính, có 3 thẻ con là "header", "body", "final"

_"header" bao gồm img và calendar. Thẻ  "calendar" có position là 'relative' để khi hover vào "card" thì "calendar" không bị thay đổi vị trí theo img

_"body" với position là relative còn các thẻ con e để absolute vì khi hover các thẻ con sẽ dịch chuyển theo "body". Khi chưa :hover thì "body" có margin-top= 100px sau đó khi hover thì margin top = 0

-thẻ "final" nằm ngoài "body" để khi hover "body" di chuyển nhưng thẻ "final" vì có position: relative và k thuộc thẻ ocn của "body" nên sẽ k bị dịch chuyển theo