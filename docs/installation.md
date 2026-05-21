## Frontend with React Typescript
**Install node.js 22 via nvm**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
nvm alias default 22
```
**Verify**
```bash
node --version
npm --version
```
**Create vite typescript react project template**
```
npm create vite@latest frontend -- --template react-ts
```

## Backend with Java and Maven 
```
#'-y' to answer 'yes' to any confirmation prompts
sudo apt update && sudo apt upgrade -y 

# Install Java 17 (OpenJDK)
sudo apt install -y openjdk-17-jdk

# Install Maven
sudo apt install -y maven

# Verify
java --version
mvn --version

# Export Java bin to PATH
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
```