Как устанавливать конфиг nginx через гитхаб экшены:

1) Копируем рекурсивно файлы из директории `nginx` в директорию `etc/nginx/sites-available/`.
2) Создаем семантическую ссылку на файлы: `sudo ln -s /etc/nginx/sites-available/madrid-starship-11.ya-praktikum.tech /etc/nginx/sites-enabled/madrid-starship-11.ya-praktikum.tech`.
3) Перезагружаем nginx для применения конфига `sudo systemctl reload nginx`.
4) ...
5) PROFIT.
