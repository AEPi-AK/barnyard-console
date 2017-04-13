#!/bin/bash

# using local electron module instead of the global electron lets you
# easily control specific version dependency between your app and electron itself.
# the syntax below starts an X istance with ONLY our electronJS fired up,
# it saves you a LOT of resources avoiding full-desktops envs

# Set host-name and enable-dbus
sed -i -e "s@#enable-dbus=yes@enable-dbus=no@" -e "s@#host-name=foo@host-name=$(echo $RESIN_DEVICE_UUID | cut -c1-7)@" /etc/avahi/avahi-daemon.conf

systemctl stop avahi-daemon && systemctl start avahi-daemon

rm /tmp/.X0-lock &>/dev/null || true
startx /usr/src/app/node_modules/electron/dist/electron /usr/src/app --enable-logging
