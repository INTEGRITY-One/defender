#Initialize Ubuntu
RUN sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys E871F18B51E0147C77796AC81196BA81F6B0FC61
RUN sudo touch /etc/apt/sources.list.d/zfs.list
RUN sudo chmod -R 777 /etc/apt/sources.list.d
RUN sudo echo deb http://ppa.launchpad.net/zfs-native/stable/ubuntu trusty main > /etc/apt/sources.list.d/zfs.list

# Packaged dependencies
RUN sudo apt-get update && sudo apt-get install -y \
        apparmor \
        aufs-tools \
        automake \
        bash-completion \
        btrfs-tools \
        build-essential \
        curl \
        dpkg-sig \
        git \
        iptables \
        libapparmor-dev \
        libcap-dev \
        libsqlite3-dev \
        mercurial \
        parallel \
        python-mock \
        python-pip \
        python-websocket \
        reprepro \
        ruby1.9.1 \
        ruby1.9.1-dev \
        s3cmd=1.1.0* \
        ubuntu-zfs \
        libzfs-dev \
        --no-install-recommends

# Update NPM
RUN sudo npm install npm -g

#Install bower
RUN sudo npm install bower -g

#Install grunt
RUN sudo npm install grunt-cli -g

# Clone app from github
RUN sudo mkdir /Development
RUN cd /Development && sudo git clone https://github.com/INTEGRITY-One/defender.git

#Deploy Dependencies
RUN cd /Development/defender/src && sudo npm install && sudo grunt build && sudo nohup grunt serve > /Development/defender/server.out 2>&1 &

EXPOSE 9000 35279
