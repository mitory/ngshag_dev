#!/bin/bash

# Переходим в папку dist
cd ./dist

# Добавляем все изменения в Git
git add .

# Коммитим изменения с сообщением "update"
git commit -m "update"

# Пушим изменения в удаленный репозиторий
git push