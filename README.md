# GAS_toroapp_transfar
サーバーサイドのtoroapp_transfar
<br>
code.js 2行目にスプレッドシートのIDを入力する必要があります
```
使い方:
https://script.google.com/macros/s/AKfycbxYA8zo16so3zlystt-1vTK8GbpRANUZPOdphESCQy2GmEAlQpj_POQtCR8bdaOnpM/exec?from=今いる場所&to=行先
Json形式で最短経路のデータが送られてくる

例:
澤部から赤急piimまで行きたいなら
https://script.google.com/macros/s/AKfycbxYA8zo16so3zlystt-1vTK8GbpRANUZPOdphESCQy2GmEAlQpj_POQtCR8bdaOnpM/exec?from=澤部&to=赤急piim

{"main":[[["赤急piim","芥川線"],["piim西","芥川線"],["秋津","芥川線"],["小平","芥川線"],["江差島","芥川線"],["雨宮","芥川線"],["成増","芥川線"],["市城","芥川線"],["新芥川","芥川線"],["赤急芥川","西和線"],["縣","西和線"],["西和","西和線"],["澤部","西和線"]],4189],"type":"ToData"}

行先を書かなかった場合

例:
市城から行ける場所を探したい
https://script.google.com/macros/s/AKfycbxYA8zo16so3zlystt-1vTK8GbpRANUZPOdphESCQy2GmEAlQpj_POQtCR8bdaOnpM/exec?from=市城&to=
または
https://script.google.com/macros/s/AKfycbxYA8zo16so3zlystt-1vTK8GbpRANUZPOdphESCQy2GmEAlQpj_POQtCR8bdaOnpM/exec?from=市城

{"main":[[[[["大前","石北線"],["赤急霜塚","石北線"],["氷川","石北線"],["石北","西和線"],["澤部","西和線"],["西和","西和線"],["縣","西和線"],["赤急芥川","芥川線"],["新芥川","芥川線"],["市城","芥川線"]],3705]],[[[["赤急霜塚","石北線"],["氷川","石北線"],["石北","西和線"],["澤部","西和線"],["西和","西和線"],["縣","西和線"],["赤急芥川","芥川線"],["新芥川","芥川線"],["市城","芥川線"]],3415]],.....[[[["成増","芥川線"],["市城","芥川線"]],168],[[["新芥川","芥川線"],["市城","芥川線"]],165]]],"type":"AllData"}

市城から行けるすべてのデータが送られてくる
```
