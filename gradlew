#!/bin/sh

# Gradle wrapper script

DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

if [ ! -f gradle/wrapper/gradle-wrapper.jar ]; then
    echo "Gradle wrapper JAR not found. Please run: gradle wrapper"
    exit 1
fi

exec java -cp gradle/wrapper/gradle-wrapper.jar org.gradle.wrapper.GradleWrapperMain "$@"
