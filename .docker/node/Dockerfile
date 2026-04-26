FROM node:24.15

RUN apt-get update

ARG FISH_VERSION="4.1.1-1~focal_amd64"

# fish
RUN curl -OSLs "https://launchpad.net/~fish-shell/+archive/ubuntu/release-4/+files/fish_${FISH_VERSION}.deb" \
    && apt-get install -y -f "./fish_${FISH_VERSION}.deb" \
    && rm "fish_${FISH_VERSION}.deb";
RUN mkdir -p /var/www/.local/share/fish
RUN mkdir -p /var/www/.config/fish

# cleanup
RUN apt-get clean autoclean && apt-get autoremove -y

WORKDIR /app
