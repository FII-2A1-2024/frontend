# Rulare proiect

1. Instalați Node.js (https://nodejs.org/en/download). Versiunea LTS, 20.12.1 e ok - pe Windows sigur merge, pe Mac nu am idee.
2. Nu e neapărată nevoie să bifați în Installer „Automatically install the necessary tools” - dacă bifați o să instaleze și alte pachete, precum Python și ceva software Chocolatey (ia cam 3GB) - IMO nu va fi nevoie de asta, proiectul rulează și cu și fără acele module adiționale.

3. Luați proiectul de pe Github (`git clone git@github.com:Becatric/FrontEnd_IP.git`). Dacă e pe alt branch, `cd FrontEnd_IP` `git checkout <nume-branch>`.
4. Intrați în aplicația și selectați folderul FrontEnd_IP. În cazul meu VSC.
5. Intrați în terminal (în VSC e în Headerul de sus - Terminal - New Terminal) și scrieți:
6. `npm i` SAU `npm install` (echivalente). Această comandă vă va genera un folder node_modules, fișiere necesare pentru rulare.
7. `npm run dev` 
8. Click pe localhost-ul oferit
9. Exceptând index.html, NU editați fișierele care nu sunt în vreun folder (.json și ce o mai fi). Doar .gitignore în caz de nevoie, însă e inițializat deja, ar trebui să nu fie nevoie editarea lui.

## Rulare când aveți deja node_modules.
În terminal, în folder-ul cu proiectul, `npm run dev`.
