#!/bin/bash

DEVICES=`adb devices | tail  -n +2 | cut -f1`

for DEVICE in $DEVICES
do
  adb -s $DEVICE $@
done