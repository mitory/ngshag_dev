#!/bin/bash

# Путь к папке dist
DIST_PATH="./dist"

# Проверяем, существует ли .git в папке dist
if [ -d "$DIST_PATH/.git" ]; then
    echo "Saving .git directory..."
    # Создаем временную директорию для сохранения .git
    TEMP_DIR="./git_temp"  # Создаем папку на уровне выше папки dist
    mkdir -p "./git_temp"
	
	chmod -R 755 "./git_temp"
    chmod -R 755 "$DIST_PATH/.git"
	
    # Копируем .git директорию во временную директорию
    cp -r "$DIST_PATH/.git" "./git_temp"
    
    # Удаляем .git директорию из dist
    rm -rf "$DIST_PATH/.git"
fi