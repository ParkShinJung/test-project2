@rem Gradle wrapper script for Windows

@echo off
setlocal enabledelayedexpansion

set DIR=%~dp0
cd /d "%DIR%"

if not exist gradle\wrapper\gradle-wrapper.jar (
    echo Gradle wrapper JAR not found. Please run: gradle wrapper
    exit /b 1
)

java -cp gradle\wrapper\gradle-wrapper.jar org.gradle.wrapper.GradleWrapperMain %*
