FROM ubuntu:latest
RUN apt-get -y update &&  apt-get install -y gcc binutils make python g++-multilib git socat
RUN git clone https://github.com/espruino/Espruino.git
WORKDIR Espruino
RUN make
RUN chmod +x espruino
COPY start.sh .
RUN chmod +x start.sh
CMD ["bash","-c","./start.sh"]
EXPOSE 2222

