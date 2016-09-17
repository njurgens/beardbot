FROM debian:latest
MAINTAINER Nick Jurgens <nicholas2010081@gmail.com>

# Install build dependencies
RUN apt-get update && apt-get install -y\
	curl\
	git\
	build-essential\
 && rm -r /var/lib/apt/lists/*

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get update && apt-get install -y nodejs\
 && rm -r /var/lib/apt/lists/*

# Build beardbot
COPY . /opt/beardbot
WORKDIR /opt/beardbot
RUN npm install\
 && node_modules/.bin/gulp build\
 && npm prune --production

# Cleanup build depenencies
RUN apt-get remove --auto-remove -y\
	curl\
	git\
	build-essential

VOLUME /etc/beardbot /var/beardbot

RUN groupadd -r beardbot\
 && useradd -r -g beardbot beardbot
USER beardbot

CMD ["node", "dist/index.js"]
