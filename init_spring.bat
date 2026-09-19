@echo off
curl "https://start.spring.io/starter.zip?type=maven-project&language=java&baseDir=backend&groupId=com.example&artifactId=auth&name=auth&description=Demo&packageName=com.example.auth&packaging=jar&javaVersion=17&dependencies=web,data-mongodb,security,validation" -o backend.zip
tar -xf backend.zip
del backend.zip
