FROM ubuntu:16.04
MAINTAINER pa_ssion
LABEL Description="Computer Networking Messenger Application" VERSION="0.5"

RUN rm -rf /var/lib/apt/lists/*
RUN apt update -y
RUN apt clean -y
RUN apt upgrade -y
RUN apt update -y --fix-missing
RUN apt install -y software-properties-common

RUN apt update -y
RUN add-apt-repository -y ppa:certbot/certbot && \
  curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash - && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

RUN apt update -y

RUN apt install -y python3-venv python3-pip python3-dev
RUN apt install -y nginx gunicorn3
RUN apt install -y nodejs yarn

COPY requirements.txt /tmp/
RUN cd /tmp/ && pip3 install -r requirements.txt

COPY database/ /opt/

COPY components/ /opt/
RUN cd /opt/components && yarn && yarn watch

COPY sockets/ /opt/
COPY website/ /opt/

COPY serve.py /opt/

ENTRYPOINT ["python3", "/opt/serve.py"]