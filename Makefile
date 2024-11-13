#
# Copyright 2023-2024 Rafał Wabik - IceG - From eko.one.pl forum
#
# Licensed to the GNU General Public License v3.0.
#

include $(TOPDIR)/rules.mk

LUCI_TITLE:=Drive info for the LuCI status page
PKG_MAINTAINER:=Rafał Wabik <4Rafal@gmail.com>
LUCI_DEPENDS:=+luci-mod-admin-full +lsblk
LUCI_PKGARCH:=all
PKG_LICENSE:=GNU General Public License v3.0
PKG_VERSION:=0.5
PKG_RELEASE:=20241111

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
