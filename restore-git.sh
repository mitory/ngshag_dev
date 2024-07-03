#!/bin/bash

# Путь к папке dist
DIST_PATH="./dist"

# Проверяем, существует ли временная .git
TEMP_DIR="./git_temp"  # Создаем папку на уровне выше папки dist
if [ -d "./git_temp/.git" ]; then
    echo "Restoring .git directory..."
	
	 chmod -R 755 "./git_temp"
	
    rm -rf "$DIST_PATH/.git"
    
	# Копируем .git директорию обратно из временной директории
    cp -r "./git_temp/.git" "$DIST_PATH/"
	
    # Удаляем временную директорию
    rm -rf "./git_temp"
fi