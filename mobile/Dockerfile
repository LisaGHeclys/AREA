FROM ubuntu

RUN apt update

ARG DEBIAN_FRONTEND=noninteractive

RUN apt install -y zsh
RUN apt install -y curl wget git
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

RUN apt install -y openjdk-11-jdk yarn
ENV JAVA_HOME=/usr/lib/jvm/default-java
ENV PATH=$PATH:$JAVA_HOME/bin

RUN apt update -y && apt-get install -y android-sdk sdkmanager android-sdk-build-tools
ENV ANDROID_HOME="/usr/lib/android-sdk/"
ENV PATH="${PATH}:${ANDROID_HOME}tools/:${ANDROID_HOME}platform-tools/"
ENV PATH="${PATH}:${ANDROID_HOME}tools/:${ANDROID_HOME}tools/bin"
RUN yes | sdkmanager --licenses
RUN sdkmanager --install "build-tools;31.0.0"

RUN apt-get install sudo

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

RUN npm install -g npm@latest
RUN npm install -g n
RUN n prune
RUN n lts

WORKDIR /mobile

COPY . .

RUN npm i

WORKDIR /mobile/android

RUN ["./gradlew", "assemble"]

